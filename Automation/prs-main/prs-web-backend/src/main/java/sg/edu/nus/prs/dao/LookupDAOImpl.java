package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.xmlbeans.impl.xb.ltgfmt.Code;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.*;
import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalCategory;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalMaterialName;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrgan;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrigin;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalStrain;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalType;
import sg.edu.nus.prs.domain.purchase.ScientificName;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveSourceType;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.util.Constants;

@Repository
public class LookupDAOImpl extends BaseDAOImpl implements LookupDAO {
    private static final Logger logger = LoggerFactory.getLogger(LookupDAOImpl.class);

    @Override
    public List<Faculty> getFaculties() {
        return this.prsJdbcTemplate.query(
                "SELECT fac_c, INITCAP(fac_t) as fac_t \n" +
                        "FROM faculty \n" +
                        "WHERE (defunct_f IS NULL OR defunct_f <> 'Y') \n" +
                        "ORDER BY fac_t",
                this::facultyRowMapper
        );
    }

    @Override
    public Faculty getFacultyBySAPCode(String sapFacultyCode) {
        List<Faculty> faculties = this.prsJdbcTemplate.query(
                "SELECT fac_c, INITCAP(fac_t) as fac_t \n" +
                        "FROM faculty \n" +
                        "WHERE (defunct_f IS NULL OR defunct_f <> 'Y') AND sap_fac_c = ? \n" +
                        "ORDER BY fac_t",
                this::facultyRowMapper,
                sapFacultyCode
        );

        if (CollectionUtils.isNotEmpty(faculties)) {
            return faculties.get(0);
        }

        return null;
    }

    Faculty facultyRowMapper(ResultSet rs, int i) throws SQLException {
        Faculty faculty = new Faculty();
        faculty.setFaculty(rs.getString("fac_c"));
        faculty.setDescription(rs.getString("fac_t"));

        return faculty;
    }

    @Override
    public List<Department> getDepartmentsOfFaculty(String facultyCode) {
        if (StringUtils.isEmpty(facultyCode)) {
            throw new IllegalArgumentException("Faculty Code is required.");
        }

        return this.prsJdbcTemplate.query(
                "SELECT dept_c, sap_dept_c, INITCAP(dept_t2) as dept_t2 \n" +
                        "FROM department \n" +
                        "WHERE (defunct_f IS NULL OR defunct_f <> 'Y') \n" +
                        "AND fac_c = ?\n" +
                        "ORDER BY dept_t2",
                this::departmentRowMapper,
                facultyCode
        );
    }

    @Override
    public Department getDepartmentByCode(String departmentCode) {
        if (StringUtils.isEmpty(departmentCode)) {
            throw new IllegalArgumentException("Department Code is required.");
        }

        List<Department> departments = this.prsJdbcTemplate.query(
                "SELECT dept_c, sap_dept_c, INITCAP(dept_t2) as dept_t2 \n" +
                        "FROM department \n" +
                        "WHERE dept_c = ? and ( defunct_f IS NULL OR defunct_f <> 'Y') ",
                this::departmentRowMapper,
                departmentCode
        );

        if (CollectionUtils.isNotEmpty(departments)) {
            return departments.get(0);
        }

        return null;
    }
    

    @Override
    public Department getDepartmentBySAPCode(String departmentCode) {
        if (StringUtils.isEmpty(departmentCode)) {
            throw new IllegalArgumentException("Department Code is required.");
        }

        List<Department> departments = this.prsJdbcTemplate.query(
                "SELECT dept_c, sap_dept_c, INITCAP(dept_t2) as dept_t2 \n" +
                        "FROM department \n" +
                        "WHERE sap_dept_c = ? and ( defunct_f IS NULL OR defunct_f <> 'Y') ",
                this::departmentRowMapper,
                departmentCode
        );

        if (CollectionUtils.isNotEmpty(departments)) {
            return departments.get(0);
        }

        return null;
    }

    @Override
    public List<Faculty> getFacultiesWithDepartments() {
        Map<String, Faculty> facultyMap = new HashMap<>();

        this.prsJdbcTemplate.query(
                "SELECT d.dept_c, d.sap_dept_c, INITCAP(d.dept_t2) as dept_t2, f.fac_c, INITCAP(fac_t) as fac_t\n" +
                        "FROM department d JOIN faculty f ON d.fac_c = f.fac_c\n" +
                        "WHERE (d.defunct_f IS NULL OR d.defunct_f <> 'Y') ",
                (rs, i) -> this.facultyWithDepartmentRowMapper(rs, i, facultyMap)
        );

        return facultyMap.values().stream()
                .sorted((a, b) -> StringUtils.compare(a.getDescription(), b.getDescription()))
                .collect(Collectors.toList());
    }

    Faculty facultyWithDepartmentRowMapper(ResultSet rs, int i, Map<String, Faculty> facultyMap) throws SQLException {
        String facultyCode = rs.getString("fac_c");
        Faculty f = facultyMap.get(facultyCode);
        if (f == null) {
            f = this.facultyRowMapper(rs, i);
            facultyMap.put(facultyCode, f);
        }

        Department d = this.departmentRowMapper(rs, i);

        if (CollectionUtils.isEmpty(f.getDepartments())) {
            f.setDepartments(new ArrayList<>());
        }

        f.getDepartments().add(d);

        return f;
    }

    @Override
    public Faculty getFacultyOfDepartment(String departmentCode) {
        if (StringUtils.isEmpty(departmentCode)) {
            throw new IllegalArgumentException("Department Code is required.");
        }

        List<Faculty> facultyOfDepartment = this.prsJdbcTemplate.query(
                "SELECT d.dept_c, d.sap_dept_c, INITCAP(d.dept_t2) as dept_t2, f.fac_c, INITCAP(fac_t) as fac_t\n" +
                        "FROM department d JOIN faculty f ON d.fac_c = f.fac_c\n" +
                        "WHERE dept_c = ? and (d.defunct_f IS NULL OR d.defunct_f <> 'Y') ",
                this::facultyDepartmentRowMapper,
                departmentCode
        );

        if (CollectionUtils.isNotEmpty(facultyOfDepartment)) {
            return facultyOfDepartment.get(0);
        }

        return null;
    }

    Faculty facultyDepartmentRowMapper(ResultSet rs, int i) throws SQLException {
        Faculty f = this.facultyRowMapper(rs, i);
        Department d = this.departmentRowMapper(rs, i);

        f.setDepartments(Collections.singletonList(d));

        return f;
    }

    Department departmentRowMapper(ResultSet rs, int i) throws SQLException {
        Department department = new Department();
        department.setDepartment(rs.getString("dept_c"));
        department.setSapDepartment(rs.getString("sap_dept_c"));
        department.setDescription(rs.getString("dept_t2"));

        return department;
    }

	@Override
    public List<UnitMeasure> getUnitMeasures() {
        return this.prsJdbcTemplate.query(
            "SELECT\n" +
                "    mu.msrunit_c, INITCAP(mu.msrunit_t) as msrunit_t, mu.MSRUNIT_T1 \n" +
                "FROM\n" +
                "    msrunit mu ",
                this::unitMeasureRowMapper
        );
    }
	
    UnitMeasure unitMeasureRowMapper(ResultSet rs, int i) throws SQLException {
        UnitMeasure um = new UnitMeasure();
        um.setCode(rs.getString("MSRUNIT_C"));
        um.setDescription(rs.getString("MSRUNIT_T"));
        um.setAbbreviation(rs.getString("MSRUNIT_T1"));

        return um;
    }
    
    @Override
	public List<UnitMsr> getUnitMeasuresOfRadioActivity() {
		return this.prsJdbcTemplate.query(
				"SELECT RA_MSRUNIT_C, INITCAP(RA_MSRUNIT_T) AS RA_MSRUNIT_T, RA_MSRUNIT_T1 "
						+"FROM HMMSRADIOACTIVMSRUNIT", this::unitMsrRowMapper);
	}
    
    UnitMsr unitMsrRowMapper(ResultSet rs, int i) throws SQLException {
    	UnitMsr um = new UnitMsr(rs.getString("RA_MSRUNIT_C"), rs.getString("RA_MSRUNIT_T"),
    			rs.getString("RA_MSRUNIT_T1"));
    	
    	return um;
    }
	
	@Override
	public List<PhysicalForm> getPhysicalForms() {
		return this.prsJdbcTemplate.query(
            "SELECT phyfm_c, INITCAP(phyfm_t) AS phyfm_t \n" +
                    "FROM physicalform \n" +
                    "ORDER BY phyfm_c",
            this::physicalFormRowMapper
        );
	}

	PhysicalForm physicalFormRowMapper(ResultSet rs, int i) throws SQLException {
        PhysicalForm phyForm = new PhysicalForm();
        phyForm.setCode(rs.getString("phyfm_c"));
        phyForm.setDescription(rs.getString("phyfm_t"));

        return phyForm;
    }
    
    @Override
    public List<Currency> getCurrencies() {
        return this.prsJdbcTemplate.query(
                "SELECT crcy_c, crcy_t, decimal_f \n" +
                        "FROM PRSCURRENCY \n" +
                        "WHERE DEFUNCT_F <> 'Y' \n" +
                        "ORDER BY crcy_c",
                this::currencyRowMapper
        );
    }

    
    Currency currencyRowMapper(ResultSet rs, int i) throws SQLException {
    	boolean isDecimalCurrency = Constants.YES.equals(rs.getString("decimal_f"));
        Currency currency = new Currency(rs.getString("crcy_c"), rs.getString("crcy_t"), isDecimalCurrency);
        currency.setCode(rs.getString("crcy_c"));
        currency.setDescription(rs.getString("crcy_t"));

        return currency;
    }
    

    

    @Override
    public List<Supplier> searchSupplier(String partial) {
        return this.prsJdbcTemplate.query(
        "SELECT supp_c, supp_t, ctry_c, defunct_f " +
            "FROM prssupplier " +
            "WHERE UPPER(supp_t) LIKE '%'||UPPER(?)||'%' AND DEFUNCT_F = 'N' " +
            "ORDER BY supp_t " +
            "FETCH NEXT 50 ROWS ONLY",
            this::supplierMapper,
            partial
        );
    }

    @Override
    public List<Supplier> getSupplierByCode(String supplierCode) {
        return this.prsJdbcTemplate.query(
                "SELECT supp_c, supp_t, ctry_c, defunct_f " +
                        "FROM prssupplier " +
                        "WHERE supp_c = ? ",
                this::supplierMapper,
                supplierCode
        );
    }
    
    @Override
    public List<Supplier> getSuppliers() {
    	return this.prsJdbcTemplate.query(
    	        "SELECT supp_c, supp_t, ctry_c, defunct_f " +
    	            "FROM prssupplier " +
    	            "WHERE DEFUNCT_F = 'N' " +
    	            "ORDER BY supp_t ",
    	            this::supplierMapper
    	        );
    }

    Supplier supplierMapper(ResultSet rs, int i) throws SQLException {
        Supplier supplier = new Supplier();
        supplier.setSupplierCode(rs.getString("supp_c"));
        supplier.setSupplierName(rs.getString("supp_t"));
        supplier.setCountryCode(rs.getString("ctry_c"));
        supplier.setDefunct(Constants.YES.equals(rs.getString("defunct_f")));

        return supplier;
    }

	@Override
	public ControlParameter getParameter(ControlParameterCode parameterCode) {
		List<ControlParameter> parameters = this.prsJdbcTemplate.query(
                "SELECT param_n, param_t, param_val_t " +
                        "FROM prs_control_param " +
                        "WHERE param_t = ? and st_dtm <= sysdate and end_dtm >= sysdate",
                this::controlParameterMapper,
                parameterCode.toString()
        );
		
		if(CollectionUtils.isNotEmpty(parameters)) {
			return parameters.get(0);
		}
		return null;
	}
    
	
	ControlParameter controlParameterMapper(ResultSet rs, int i) throws SQLException {
		ControlParameter parameter = new ControlParameter();
		parameter.setId(rs.getString("param_n"));
		parameter.setCode(rs.getString("param_t"));
		parameter.setValue(rs.getString("param_val_t"));

		return parameter;
	}

    @Override
    public List<ChemicalGrade> getChemicalGrades() {
        return this.prsJdbcTemplate.query(
            "SELECT\n" +
                "    CHM_GRD_C, CHM_GRD_T\n" +
                "FROM \n" +
                "    hmmschemicalgrade\n" +
                "ORDER BY\n" +
                "    CHM_GRD_T",
                this::chemicalGradeRowMapper
        );
    }

    ChemicalGrade chemicalGradeRowMapper(ResultSet rs, int i) throws SQLException {
        ChemicalGrade chemicalGrade = new ChemicalGrade();
        chemicalGrade.setCode(rs.getString("CHM_GRD_C"));
        chemicalGrade.setDescription(rs.getString("CHM_GRD_T"));

        return chemicalGrade;
    }

    @Override
    public List<ConcentrationUnit> getConcentrationUnits() {
        return this.prsJdbcTemplate.query(
                "SELECT\n" +
                    "    CONCUNIT_C, INITCAP(CONCUNIT_T) AS CONCUNIT_T\n" +
                    "FROM \n" +
                    "    concunit\n" +
                    "ORDER BY\n" +
                    "    CONCUNIT_T",
                this::concentrationUnitRowMapper
        );
    }

    ConcentrationUnit concentrationUnitRowMapper(ResultSet rs, int i) throws SQLException {
        ConcentrationUnit concentrationUnit = new ConcentrationUnit();
        concentrationUnit.setCode(rs.getString("CONCUNIT_C"));
        concentrationUnit.setDescription(rs.getString("CONCUNIT_T"));

        return concentrationUnit;
    }

	@Override
	public List<ConversionRule> getConversionRules() {
        return this.prsJdbcTemplate.query(
                "SELECT\n" +
                "    MSRUNIT_C, BASEUNIT_C, CONV_RATE_N, PHYFM_C\n" +
                "FROM\n" +
                "    HMMS_MSRUNITCONV ",
                this::conversionRuleRowMapper
        );
    }

    ConversionRule conversionRuleRowMapper(ResultSet rs, int i) throws SQLException {
        ConversionRule rule = new ConversionRule();
        rule.setFromUnitCode(rs.getString("MSRUNIT_C"));
        rule.setToUnitCode(rs.getString("BASEUNIT_C"));
        rule.setPhysicalFormCode(rs.getString("PHYFM_C"));
        rule.setRate(rs.getBigDecimal("CONV_RATE_N"));

        return rule;
    }

    @Override
    public List<GLAccount> getGLAccounts() {
        return this.prsJdbcTemplate.query(
                "SELECT GL_AC_N, GL_AC_T, DEFAULT_F, GL_ACTP_C FROM PRSGLAC WHERE DEFUNCT_F = 'N' ORDER BY GL_AC_N DESC ",
                this::glAccountRowMapper
        );
    }

    @Override
    public GLAccount getGLAccountByCode(String glAccount) {
        List<GLAccount> results = this.prsJdbcTemplate.query(
                "SELECT GL_AC_N, GL_AC_T, DEFAULT_F, GL_ACTP_C FROM PRSGLAC WHERE GL_AC_N = ? ORDER BY GL_AC_N DESC ",
                this::glAccountRowMapper,
                glAccount
        );

        if (CollectionUtils.isNotEmpty(results)) {
            return results.get(0);
        }

        return null;
    }

    GLAccount glAccountRowMapper(ResultSet rs, int i) throws SQLException {
        GLAccount glAccount = new GLAccount();
        glAccount.setGlAccount(rs.getString("GL_AC_N"));
        glAccount.setDescription(rs.getString("GL_AC_T"));
        glAccount.setDefaultAccount(StringUtils.equals(Constants.YES, rs.getString("DEFAULT_F")));
        glAccount.setGlAccountType(GLAccountType.valueOf(rs.getString("GL_ACTP_C")));

        return glAccount;
    }

	@Override
	public List<InternalStore> getInternalStores() {
		return this.prsJdbcTemplate.query(
                "SELECT PIS.INTL_STORE_N, PIS.SUPP_C, S.SUPP_T , PIS.WBS_AC_N, PIS.GL_AC_N, "
                + " PIS.CHM_LOC_N, PIS.FAC_C, INITCAP(F.FAC_T) AS FAC_T, PIS.DEPT_C, INITCAP(D.DEPT_T2) AS DEPT_T2 "
                + " FROM PRS_INTERNAL_STORE PIS "
                + " JOIN PRSSUPPLIER S ON PIS.SUPP_C = S.SUPP_C "
                + " JOIN DEPARTMENT D ON PIS.DEPT_C = D.DEPT_C "
                + " JOIN FACULTY F ON PIS.FAC_C = F.FAC_C "
                + " WHERE NVL(S.DEFUNCT_F, 'N') <> 'Y' AND NVL(PIS.DEFUNCT_F, 'N') <> 'Y' ",
                this::internalStoreMapper
        );	}

	@Override
	public InternalStore getInternalStoreBySupplierCode(String supplierCode) {
		List<InternalStore> results = this.prsJdbcTemplate.query(
                "SELECT PIS.INTL_STORE_N, PIS.SUPP_C, INITCAP(S.SUPP_T) AS SUPP_T , PIS.WBS_AC_N, PIS.GL_AC_N, "
                + " PIS.CHM_LOC_N, PIS.FAC_C, INITCAP(F.FAC_T) AS FAC_T, PIS.DEPT_C, INITCAP(D.DEPT_T2) AS DEPT_T2 "
                + " FROM PRS_INTERNAL_STORE PIS "
                + " JOIN PRSSUPPLIER S ON PIS.SUPP_C = S.SUPP_C "
                + " JOIN DEPARTMENT D ON PIS.DEPT_C = D.DEPT_C "
                + " JOIN FACULTY F ON PIS.FAC_C = F.FAC_C "
                + " WHERE NVL(S.DEFUNCT_F, 'N') <> 'Y' AND NVL(PIS.DEFUNCT_F, 'N') <> 'Y' and PIS.SUPP_C = ? ", 
                this::internalStoreMapper, 
                supplierCode
        );	
		
		if (CollectionUtils.isNotEmpty(results)) {
            return results.get(0);
        }

        return null;
	}
	
	public List<RadioactiveSourceType> getRadioactiveSourceTypes() {
		List<RadioactiveSourceType> results = this.prsJdbcTemplate.query(
				"SELECT RADNUCLD_SRCETP_C, RADNUCLD_SRCETP_T "
				+ "FROM HMMSRADNUCLDSOURCETYPE "
				+ "ORDER BY RADNUCLD_SRCETP_C", this::radNucldSourceTypeRowMapper);
		
		if (CollectionUtils.isNotEmpty(results)) {
			return results;
		}

		return null;
	}
	
	RadioactiveSourceType radNucldSourceTypeRowMapper(ResultSet rs, int i) throws SQLException {
		return RadioactiveSourceType.getRadioactiveSourceType(rs.getString("RADNUCLD_SRCETP_C"));
	}

	@Override
	public List<RadioactiveConcentrationUnit> getRadioactiveConcentrationUnits() {
        List<RadioactiveConcentrationUnit> results = this.prsJdbcTemplate.query(
                "SELECT RA_CONCMSRUNIT_C, RA_CONCMSRUNIT_T, RA_CONCMSRUNIT_T1 "
                        + "FROM HMMSRADIOACTIVCONCMSRUNIT "
                        + "ORDER BY RA_CONCMSRUNIT_C", this::radioactiveConcentrationUnitRowMapper);

        if (CollectionUtils.isNotEmpty(results)) {
            return results;
        }

        return null;
    }

    RadioactiveConcentrationUnit radioactiveConcentrationUnitRowMapper(ResultSet rs, int i) throws SQLException {
        return new RadioactiveConcentrationUnit(
                rs.getString("RA_CONCMSRUNIT_C"),
                rs.getString("RA_CONCMSRUNIT_T1"),
                rs.getString("RA_CONCMSRUNIT_T"));
    }
	
    @Override
    public List<BiologicalCategory> getBiologicalCategories() {
        return this.prsJdbcTemplate.query(
                "SELECT BIO_CAT_C, INITCAP(BIO_CAT_T) as BIO_CAT_T \n" +
                        "FROM HMMSBIOLOGICALCATEGORY \n" +
                        "WHERE (DEFUNCT_F IS NULL OR DEFUNCT_F <> 'Y') \n" +
                        "ORDER BY BIO_CAT_T",
                this::biologicalCategoriesRowMapper
        );
    }
    
    BiologicalCategory biologicalCategoriesRowMapper(ResultSet rs, int i) throws SQLException {
        BiologicalCategory category = new BiologicalCategory();
        category.setCode(rs.getString("BIO_CAT_C"));
        category.setDescription(rs.getString("BIO_CAT_T"));

        return category;
	}
	

    @Override
    public List<BiologicalType> getBiologicalTypes() {
        return this.prsJdbcTemplate.query(
                "SELECT BIO_TP_C, INITCAP(BIO_TP_T) as BIO_TP_T \n" +
                        "FROM HMMSBIOLOGICALTYPE \n" +
                        "WHERE (DEFUNCT_F IS NULL OR DEFUNCT_F <> 'Y') \n" +
                        "ORDER BY BIO_TP_T",
                this::biologicalTypesRowMapper
        );
    }
    
    BiologicalType biologicalTypesRowMapper(ResultSet rs, int i) throws SQLException {
        BiologicalType type = new BiologicalType();
        type.setCode(rs.getString("BIO_TP_C"));
        type.setDescription(rs.getString("BIO_TP_T"));

        return type;
    }
    
    @Override
    public List<BiologicalOrigin> getBiologicalOrigins() {
        return this.prsJdbcTemplate.query(
                "SELECT BIO_ORG_C, INITCAP(BIO_ORG_T) as BIO_ORG_T \n" +
                        "FROM HMMSBIOLOGICALORIGIN \n" +
                        "WHERE (DEFUNCT_F IS NULL OR DEFUNCT_F <> 'Y') \n" +
                        "ORDER BY BIO_ORG_T",
                this::biologicalStrainsRowMapper
        );
    }
    
    BiologicalOrigin biologicalStrainsRowMapper(ResultSet rs, int i) throws SQLException {
        BiologicalOrigin origin = new BiologicalOrigin();
        origin.setCode(rs.getString("BIO_ORG_C"));
        origin.setDescription(rs.getString("BIO_ORG_T"));

        return origin;
    }
    
    @Override
    public List<BiologicalOrgan> getBiologicalOrganTypes() {
        return this.prsJdbcTemplate.query(
                "SELECT BIO_ORGANTP_C, INITCAP(BIO_ORGANTP_T) as BIO_ORGANTP_T \n" +
                        "FROM HMMSBIOLOGICALORGANTYPE \n" +
                        "WHERE (DEFUNCT_F IS NULL OR DEFUNCT_F <> 'Y') \n" +
                        "ORDER BY BIO_ORGANTP_T",
                this::biologicalOrganSamplesRowMapper
        );
    }
    
    BiologicalOrgan biologicalOrganSamplesRowMapper(ResultSet rs, int i) throws SQLException {
        BiologicalOrgan organSample = new BiologicalOrgan();
        organSample.setCode(rs.getString("BIO_ORGANTP_C"));
        organSample.setDescription(rs.getString("BIO_ORGANTP_T"));

        return organSample;
    }

    @Override
    public List<ScientificName> searchScientificName(String partial) {
        return this.prsJdbcTemplate.query(
        "SELECT DISTINCT BIO_SCI_C, BIO_SCI_T " +
            "FROM HMMS_PRS_BIOAGENT " +
            "WHERE UPPER(BIO_SCI_T) LIKE '%'||UPPER(?)||'%' OR UPPER(COMMON_NAME) LIKE '%'||UPPER(?)||'%'" +
            "ORDER BY BIO_SCI_T " +
            "FETCH NEXT 50 ROWS ONLY",
            this::scientificNameMapper,
            partial, partial
        );
    }
    
    ScientificName scientificNameMapper(ResultSet rs, int i) throws SQLException {
        ScientificName scientific = new ScientificName();
        scientific.setCode(rs.getString("BIO_SCI_C"));
        scientific.setDescription(rs.getString("BIO_SCI_T"));

        return scientific;
    }
    
    @Override
    public List<BiologicalStrain> searchStrain(String partial) {
        return this.prsJdbcTemplate.query(
        "SELECT DISTINCT BIO_STRAIN_C, BIO_STRAIN_T " +
            "FROM HMMS_PRS_BIOAGENT " +
            "WHERE UPPER(BIO_STRAIN_T) LIKE '%'||UPPER(?)||'%' " +
            "ORDER BY BIO_STRAIN_T " +
            "FETCH NEXT 50 ROWS ONLY",
            this::strainMapper,
            partial
        );
    }
    
    BiologicalStrain strainMapper(ResultSet rs, int i) throws SQLException {
        BiologicalStrain strain = new BiologicalStrain();
        strain.setCode(rs.getString("BIO_STRAIN_C"));
        strain.setDescription(rs.getString("BIO_STRAIN_T"));

        return strain;
    }
    
    @Override
    public List<BiologicalMaterialName> searchBiologicalMaterialName(String partial) {
        return this.prsJdbcTemplate.query(
        "SELECT BIO_C, BIO_T " +
            "FROM HMMS_PRS_BIO_CTG " +
            "WHERE UPPER(BIO_T) LIKE '%'||UPPER(?)||'%' " +
            "ORDER BY BIO_T " +
            "FETCH NEXT 50 ROWS ONLY",
            this::biologicalMaterialNameMapper,
            partial
        );
    }
    
    BiologicalMaterialName biologicalMaterialNameMapper(ResultSet rs, int i) throws SQLException {
        BiologicalMaterialName materialName = new BiologicalMaterialName();
        materialName.setCode(rs.getString("BIO_C"));
        materialName.setDescription(rs.getString("BIO_T"));

        return materialName;
    }
    
    @Override
    public List<String> searchBiologicalProductNumber(String partial) {
        return this.prsJdbcTemplate.query(
        "SELECT DISTINCT BIO_MFRPRDC_N " +
            "FROM HMMS_PRS_BIO_PRD " +
            "WHERE UPPER(BIO_MFRPRDC_N) LIKE '%'||UPPER(?)||'%'" +
            "ORDER BY BIO_MFRPRDC_N " +
            "FETCH NEXT 50 ROWS ONLY",
            this::productNumberMapper,
            partial
        );
    }
    
    String productNumberMapper(ResultSet rs, int i) throws SQLException {
        return rs.getString("BIO_MFRPRDC_N");
    }

	InternalStore internalStoreMapper(ResultSet rs, int i) throws SQLException {
		InternalStore internalStore = new InternalStore();
		internalStore.setStoreId(rs.getString("INTL_STORE_N"));
		
		Supplier supplier = new Supplier();
		supplier.setSupplierCode(rs.getString("SUPP_C"));
		supplier.setSupplierName(rs.getString("SUPP_T"));
		internalStore.setSupplier(supplier);
		
		Department department = new Department();
		department.setDepartment(rs.getString("DEPT_C"));
		department.setDescription(rs.getString("DEPT_T2"));
		
		Faculty faculty = new Faculty();
		faculty.setFaculty(rs.getString("FAC_C"));
		faculty.setDescription(rs.getString("FAC_T"));
		faculty.setDepartments(Collections.singletonList(department));
		internalStore.setFaculty(faculty);
		
		internalStore.setChemicalLocationId(rs.getString("CHM_LOC_N"));
		internalStore.setGlAccount(rs.getString("GL_AC_N"));
		internalStore.setWbsAccountNo(rs.getString("WBS_AC_N"));
		return internalStore;
	}
}
