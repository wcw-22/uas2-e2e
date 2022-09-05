package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContract;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractApplicableFor;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractCategory;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractLevel;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractProductPriceTier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSearchForm;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSearchResults;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractStatus;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierAdditionalCharge;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierProduct;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractType;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractUtilisation;
import sg.edu.nus.prs.domain.purchase.PurchaseLineItem;
import sg.edu.nus.prs.domain.purchase.Unit;
import sg.edu.nus.prs.domain.purchase.catalog.AdditionalChargeCatalogItem;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.Role;
import sg.edu.nus.prs.domain.user.UserAttributeType;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.Constants;

@SuppressWarnings("Duplicates")
@Repository
public class PeriodContractDAOImpl extends BaseDAOImpl implements PeriodContractDAO {

	private static final Logger logger = LoggerFactory.getLogger(PeriodContractDAOImpl.class);

	@Override
	public PagedData<PeriodContractSearchResults> searchPeriodContract(PeriodContractSearchForm input) {
		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			StringBuilder query = new StringBuilder();

			if (input == null) {
				throw new IllegalArgumentException("Period Contract search Input is required.");
			} else {
				query.append(
						"SELECT DISTINCT \n" +
						"    ctr.PRDCON_SEQ_N, ctr.CON_N, ctr.CON_A, ctr.CRCY_C, ICC.CRCY_T, \n" +
						"    suppl.SUPP_T, ctr.CON_ST_D, ctr.CON_END_D, \n" +
						"    ctr.con_desc_t, ctr.con_lvl_c, ctr.con_sts_c \n" +
						" FROM PRS_PERIODCONTRACT_PARTICS ctr \n" +
						"	 LEFT JOIN PRSCURRENCY ICC ON ctr.CRCY_C = ICC.CRCY_C \n" +
						"    LEFT JOIN PRS_PRDCONTRACT_SUPPLIER csup ON ctr.PRDCON_SEQ_N = csup.PRDCON_SEQ_N \n" +
						"    LEFT JOIN PRS_PRDCONTRACT_PRODUCT cpr ON csup.SUPP_N = cpr.SUPP_N \n" +
						"    LEFT JOIN HMMS_PRS_CHM_PRD prd ON cpr.PRDC_REF_N = prd.CHM_PRDC_N \n" +
						"    LEFT JOIN HMMS_PRS_CHM_CTG ctg ON prd.CHM_N = ctg.CHM_N \n" +
						"    LEFT JOIN (SELECT PRDCON_SEQ_N,  \n" +
						"                                        LISTAGG(supp.SUPP_T, ';') WITHIN GROUP (ORDER BY supp.SUPP_T) SUPP_T  \n" +
						"                            FROM PRSSUPPLIER supp  \n" +
						"                                INNER JOIN PRS_PRDCONTRACT_SUPPLIER csp \n" +
						"                                    ON csp.SUPP_C = supp.SUPP_C \n" +
						"                                    GROUP BY PRDCON_SEQ_N \n" +
						"                            ) suppl \n" +
						"     ON ctr.PRDCON_SEQ_N = suppl.PRDCON_SEQ_N \n" +
						" WHERE 1=1 AND ctr.con_sts_c IN (:con_sts_c) \n"
				);

				if (input.getContractStatus() != null) {
					params.addValue("con_sts_c", Collections.singletonList(
							input.getContractStatus().toString()
					));
				} else {
					params.addValue("con_sts_c", Arrays.asList(
							PeriodContractStatus.PERIOD_CTRCT_STS_DEFUNCT.toString(),
							PeriodContractStatus.PERIOD_CTRCT_STS_DRAFT.toString(),
							PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH.toString(),
							PeriodContractStatus.PERIOD_CTRCT_STS_UNPUBLISH.toString()
					));
				}

				if (StringUtils.isNotBlank(input.getContractNumber())) {
					query.append(" AND UPPER(ctr.CON_N) like :CON_N \n");
					params.addValue("CON_N", "%" + input.getContractNumber().trim().toUpperCase() + "%");
				}
				if (CollectionUtils.isNotEmpty(input.getSupplierCodes())) {
					query.append(" AND csup.supp_c IN (:SUPP_C) \n");
					params.addValue("SUPP_C", input.getSupplierCodes());
				}
				if (StringUtils.isNotBlank(input.getSupplierPartNumber())) {
					query.append(" AND UPPER(cpr.SUPP_PART_N) like :SUPP_PART_N \n");
					params.addValue("SUPP_PART_N", "%" + input.getSupplierPartNumber().trim().toUpperCase() + "%");
				}
				if (StringUtils.isNotBlank(input.getContractDescription())) {
					query.append(" AND UPPER(ctr.CON_DESC_T) like :CON_DESC_T \n");
					params.addValue("CON_DESC_T", "%" + input.getContractDescription().trim().toUpperCase() + "%");
				}
				if (input.getCategory() != null) {
					query.append(" AND UPPER(ctr.CON_CAT_C) like :CON_CAT_C \n");
					params.addValue("CON_CAT_C", input.getCategory().toString());
				}
				if (StringUtils.isNotBlank(input.getCasNumber())) {
					query.append(" AND UPPER(ctg.CAS_N) like :CAS_N \n");
					params.addValue("CAS_N", "%" + input.getCasNumber().trim().toUpperCase() + "%");
				}
				if (StringUtils.isNotBlank(input.getChemicalName())) {
					query.append(" AND UPPER(ctg.CHM_NM_T) like :CHM_NM_T \n");
					params.addValue("CHM_NM_T", "%" + input.getChemicalName().trim().toUpperCase() + "%");
				}
				SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
				if (StringUtils.isNotBlank(input.getStartDate()) && StringUtils.isNotBlank(input.getStartDate())) {
					query.append(" AND trunc(ctr.CON_END_D)  >= :ST_D AND trunc(ctr.CON_ST_D) <= :END_D \n");
					params.addValue("ST_D", sdf.parse(input.getStartDate()));
					params.addValue("END_D", sdf.parse(input.getEndDate()));
				}

				// If a user is specified, limit results according to the user's access as specified in PRS_USER_ACCESS.
				if (CollectionUtils.isNotEmpty(input.getRestrictByUserNo())) {
					params.addValue("catalogueAdminRole", Role.ROLE_CATALOGUE_ADMIN.toString());
					params.addValue("restrictByUserNo", input.getRestrictByUserNo());

					params.addValue("userAttrPeriodContractLevel", UserAttributeType.USER_ATTR_PERIOD_CONTRACT_LEVEL.toString());

					params.addValue("pcUserCampusLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_NUS.toString());
					params.addValue("pcUserFacultyLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_FAC.toString());
					params.addValue("pcUserDepartmentLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_DEPT.toString());

					query.append(
							"AND (\n" +
							"    -- NUS Level access, can search all.\n" +
							"    EXISTS (SELECT atp.accesstp_n \n" +
							"            FROM prs_user_access ua \n" +
							"                JOIN prs_user_accesstp atp ON atp.access_n = ua.access_n \n" +
							"            WHERE \n" +
							"                ua.access_tp_c = :catalogueAdminRole \n" +
							"                AND ua.user_i IN (:restrictByUserNo) \n" +
							"                AND atp.accesstp_c = :userAttrPeriodContractLevel \n" +
							"                AND atp.accesstp_t = :pcUserCampusLevel)\n" +
							"    -- Fac level access, only fac level.\n" +
							"    OR EXISTS (SELECT atp.accesstp_n \n" +
							"            FROM prs_user_access ua \n" +
							"                JOIN prs_user_accesstp atp ON atp.access_n = ua.access_n \n" +
							"                JOIN prs_prdcontract_access ppa ON ppa.fac_c = ua.fac_c\n" +
							"            WHERE \n" +
							"                ua.access_tp_c = :catalogueAdminRole \n" +
							"                AND ua.user_i IN (:restrictByUserNo) \n" +
							"                AND atp.accesstp_c = :userAttrPeriodContractLevel \n" +
							"                AND atp.accesstp_t = :pcUserFacultyLevel\n" +
							"                AND ppa.prdcon_seq_n = ctr.prdcon_seq_n)\n" +
							"    -- Dept level access, only dept level.\n" +
							"    OR EXISTS (SELECT atp.accesstp_n \n" +
							"            FROM prs_user_access ua \n" +
							"                JOIN prs_user_accesstp atp ON atp.access_n = ua.access_n \n" +
							"                JOIN prs_prdcontract_access ppa ON ppa.fac_c = ua.fac_c AND ppa.dept_c = ua.dept_c\n" +
							"            WHERE \n" +
							"                ua.access_tp_c = :catalogueAdminRole \n" +
							"                AND ua.user_i IN (:restrictByUserNo) \n" +
							"                AND atp.accesstp_c = :userAttrPeriodContractLevel \n" +
							"                AND atp.accesstp_t = :pcUserDepartmentLevel\n" +
							"                AND ppa.prdcon_seq_n = ctr.prdcon_seq_n)\n" +
							")"
					);
				}

				return applyWithPagingAndSorting(input, query.toString(), params, this::periodContractRowMapper);
			}
		} catch (Exception e) {
			logger.error("PeriodContractDAOImpl::searchPeriodContract>> " + e.getMessage());
			throw new RuntimeException("PeriodContractDAOImpl::searchPeriodContract.");
		}
	}

	PeriodContractSearchResults periodContractRowMapper(ResultSet rs, int i) throws SQLException {
		PeriodContractSearchResults periodContract = new PeriodContractSearchResults();

		periodContract.setPeriodContractSequenceNumber(rs.getString("PRDCON_SEQ_N"));
		periodContract.setContractNumber(rs.getString("CON_N"));
		periodContract.setContractValue(rs.getBigDecimal("CON_A"));
		String currencyCode = rs.getString("CRCY_C");
		if (StringUtils.isNotEmpty(currencyCode)) {
			Currency currency = new Currency();
			currency.setCode(currencyCode);
			currency.setDescription(rs.getString("CRCY_T"));
			periodContract.setCurrency(currency);
		}
		periodContract.setContractSuppliers(rs.getString("SUPP_T"));
		periodContract.setStartDate(rs.getDate("CON_ST_D"));
		periodContract.setEndDate(rs.getDate("CON_END_D"));

		periodContract.setContractDescription(rs.getString("CON_DESC_T"));

		String applicableFor = rs.getString("CON_LVL_C");
		if (StringUtils.isNotBlank(applicableFor)) {
			periodContract.setContractApplicableFor(PeriodContractApplicableFor.valueOf(applicableFor));
		}

		String statusCode = rs.getString("CON_STS_C");
		if (StringUtils.isNotBlank(statusCode)) {
			periodContract.setContractStatus(PeriodContractStatus.valueOf(statusCode));
		}

		return periodContract;
	}

	@Override
	public PeriodContract getPeriodContract(String periodContractSequenceNumber) {
		if (StringUtils.isEmpty(periodContractSequenceNumber)) {
			throw new IllegalArgumentException("Period contract sequence number is required.");
		}

		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			StringBuilder query = new StringBuilder("SELECT \n"
					+ "    PC.PRDCON_SEQ_N, PC.CON_N, PC.CON_A, PC.CRCY_C, PCC.CRCY_T,  PC.CON_DESC_T, PC.CON_ST_D, PC.CON_END_D, PC.CON_LVL_C ,   \n"
					+ "    PC.CON_TP_C    , PC.CON_CAT_C   , PC.CON_STS_C,   \n"
					+ "    PAS.ACCESS_N, PAS.FAC_C , F.FAC_T, PAS. DEPT_C, D.DEPT_T2,            \n"
					+ "    PS.SUPP_N         ,  PS.SUPP_C     , S.SUPP_T    , PS.CRCY_C as SUP_CRCY_C , PSC.CRCY_C as SUP_CRCY_T,     \n"
					+ "    PA.SUPP_ADDlCHRG_N  ,  PA.ADDL_CHRG_T            , PA.ADDL_CHRG_A,  \n"
					+ "    PP.SUPP_PRDC_N, PP.PRDC_CAT_C  ,  PP.PRDC_REF_N    , PP.SUPP_PART_N    , PP.MSRUNIT_C , M.MSRUNIT_T , PP.PRDC_QTY_Q,   \n"
					+ "    PPC.PRDC_CTRL_N  ,  PPC.QTY_MIN_Q            , PPC.QTY_MAX_Q   , PPC.UNITPX_A               \n"
					+ "FROM \n" + "    PRS_PERIODCONTRACT_PARTICS PC \n"
					+ "    LEFT JOIN PRS_PRDCONTRACT_ACCESS PAS ON PAS.PRDCON_SEQ_N   = PC.PRDCON_SEQ_N   \n"
					+ "    LEFT JOIN PRS_PRDCONTRACT_SUPPLIER PS ON PS.PRDCON_SEQ_N = PC.PRDCON_SEQ_N  \n"
					+ "    LEFT JOIN PRS_PRODCONTRACT_ADDLCHARGE PA ON PA.SUPP_N  = PS.SUPP_N  \n"
					+ "    LEFT JOIN PRS_PRDCONTRACT_PRODUCT PP ON PP.SUPP_N  = PS.SUPP_N  \n"
					+ "    LEFT JOIN PRS_PRDCONTRACT_PRODUCTCONTROL PPC ON PPC.SUPP_PRDC_N   = PP.SUPP_PRDC_N   \n"
					+ "    LEFT JOIN PRSCURRENCY PCC ON PC.CRCY_C   = PCC.CRCY_C   \n"
					+ "    LEFT JOIN PRSCURRENCY PSC ON PS.CRCY_C   = PSC.CRCY_C   \n"
					+ "    LEFT JOIN PRSSUPPLIER S ON PS.SUPP_C   = S.SUPP_C   \n" 
					+ "    LEFT JOIN MSRUNIT M ON PP.MSRUNIT_C   = M.MSRUNIT_C   \n" 
					+ "    LEFT JOIN FACULTY F ON PAS.FAC_C   = F.FAC_C   \n" 
					+ "    LEFT JOIN DEPARTMENT D ON PAS.DEPT_C   = D.DEPT_C   \n" 
					+ " WHERE \n" + "    1=1 ");

			if (StringUtils.isNotEmpty(periodContractSequenceNumber)) {
				query.append(" AND PC.PRDCON_SEQ_N = :periodContractSequenceNumber ");
				params.addValue("periodContractSequenceNumber", periodContractSequenceNumber);
			}

			final Map<String, PeriodContract> periodContractMap = new HashMap<>();
			final Map<String, PeriodContractSupplier> periodContractSupplierMap = new HashMap<>();
			final Map<String, PeriodContractSupplierProduct> periodContractProductMap = new HashMap<>();
			final Map<String, PeriodContractProductPriceTier> periodContractPriceTierrMap = new HashMap<>();

			this.prsNamedJdbcTemplate.query(query.toString(), params,
					(rs, rowNum) -> {
						PeriodContract periodContract = populatePeriodContract(periodContractMap, rs);
						populatePeriodContractAccess(periodContract, rs);
						PeriodContractSupplier supplier = populateSupplier(periodContractSupplierMap, rs, periodContract);
						populateAdditionalCharges(supplier, rs);

						PeriodContractSupplierProduct product = populateSupplierProduct(periodContractProductMap, rs, supplier);
						populatePriceTier(periodContractPriceTierrMap, rs, product);
						return periodContract;

					}
			);

			final String periodContractContactsQuery =
					"SELECT\n" +
					"    prdcon_seq_n, contact_email_t\n" +
					"FROM\n" +
					"    prs_periodcontract_contact\n" +
					"WHERE\n" +
					"    prdcon_seq_n IN (:sequences)\n" +
					"ORDER BY\n" +
					"    disp_seq_n";

			Set<String> periodContractIdSet = periodContractMap.keySet();
			if (CollectionUtils.isNotEmpty(periodContractIdSet)) {
				MapSqlParameterSource contactParams = new MapSqlParameterSource();
				contactParams.addValue("sequences", periodContractIdSet);

				this.prsNamedJdbcTemplate.query(
						periodContractContactsQuery,
						contactParams,
						(rs, i) -> {
							PeriodContract contract = periodContractMap.get(rs.getString("prdcon_seq_n"));
							if (contract.getContactEmails() == null) {
								contract.setContactEmails(new ArrayList<>());
							}

							contract.getContactEmails().add(rs.getString("contact_email_t"));

							return contract;
						});
			}
			
			List<PeriodContract> periodContracts = periodContractMap.values().stream()
			        .filter(Objects::nonNull)
					.filter(p -> StringUtils.isNotBlank(p.getPeriodContractSequenceNumber()))
					.collect(Collectors.toList());

			if (CollectionUtils.isNotEmpty(periodContracts)) {
				return periodContracts.get(0);
			}

		} catch (Exception e) {
			logger.error("Could not get period contrac", e);
		}
		return null;
	}

	private void populatePeriodContractAccess(PeriodContract periodContract, ResultSet rs) {
		if (periodContract == null) { return; }
		
		try {
			String facultyCode = rs.getString("FAC_C");
			String faculltyDesc = rs.getString("FAC_T");

			if (StringUtils.isBlank(facultyCode)) { return; }

			Faculty newFaculty = new Faculty(facultyCode, faculltyDesc);

			Optional<Faculty> faculty = CollectionUtils.emptyIfNull(periodContract.getFaculties()).stream().filter(fac -> fac.getFaculty().equals(facultyCode)).findAny();
			faculty.ifPresentOrElse(x-> {
				try {
					addDepartment(x, rs);
				} catch (SQLException e) {
					logger.error("Could not add department", e);
				}
			}, () -> {
				try {
					addFaculty(periodContract, newFaculty, rs);
				} catch (SQLException e) {
					logger.error("Could not add faculty", e);
				}
			});		
			
		}catch (SQLException e) {
			logger.error("Could not get faculties", e);
		}
	}
		

	private Faculty addFaculty(PeriodContract periodContract, Faculty faculty, ResultSet rs) throws SQLException {
		if(periodContract.getFaculties() == null) {
			periodContract.setFaculties(new ArrayList<>());
		}
		periodContract.getFaculties().add(faculty);
		addDepartment(faculty, rs);
		return faculty;
	}

	private Faculty addDepartment(Faculty faculty, ResultSet rs) throws SQLException {
		if(StringUtils.isNotEmpty(rs.getString("DEPT_C"))) {			
			String departmentCode = rs.getString("DEPT_C");
			String departmentDesc = rs.getString("DEPT_T2");
			Optional<Department> department = CollectionUtils.emptyIfNull(faculty.getDepartments()).stream().filter(dept -> dept.getDepartment().equals(departmentCode)).findAny();
			if(department.isEmpty()) {
				Department newDepartment = new Department(departmentCode, departmentDesc);

				if(faculty.getDepartments() == null) {
					faculty.setDepartments(new ArrayList<>());
				}
				faculty.getDepartments().add(newDepartment);
			}
		}
		return faculty;
	}

	private void populatePriceTier(Map<String, PeriodContractProductPriceTier> periodContractPriceTierrMap,
			ResultSet rs, PeriodContractSupplierProduct product) throws SQLException {
		if (product == null) { return; }

		periodContractPriceTierrMap.computeIfAbsent(rs.getString("PRDC_CTRL_N"), k -> {
		PeriodContractProductPriceTier priceTier = new PeriodContractProductPriceTier();
		try {
			priceTier.setPriceTierNumber(rs.getString("PRDC_CTRL_N"));
			priceTier.setSupplierProductNumber(rs.getString("SUPP_PRDC_N"));
			priceTier.setMinQuantity(rs.getBigDecimal("QTY_MIN_Q"));
			priceTier.setMaxQuantity(rs.getBigDecimal("QTY_MAX_Q"));
			priceTier.setUnitPrice(rs.getBigDecimal("UNITPX_A"));

			if (product.getPriceTierList() == null) {
				product.setPriceTierList(new ArrayList<>());
			}

			product.getPriceTierList().add(priceTier);

			return priceTier;
		} catch (SQLException e) {
			logger.error("Could not get price tier", e);
		}
		return null;
		});

	}

	private PeriodContractSupplierProduct populateSupplierProduct(Map<String, PeriodContractSupplierProduct> periodContractProductMap,
			ResultSet rs, PeriodContractSupplier supplier) throws SQLException {
		if (supplier == null) { return null; }

		String suppPrdcN = rs.getString("SUPP_PRDC_N");
		if (StringUtils.isBlank(suppPrdcN)) { return null; }

		return periodContractProductMap.computeIfAbsent(suppPrdcN, k-> {
			PeriodContractSupplierProduct supplierProduct = new PeriodContractSupplierProduct();
			try {
				supplierProduct.setProductNumber(rs.getString("SUPP_PRDC_N"));
				supplierProduct.setSupplierNumber(rs.getString("SUPP_N"));
				supplierProduct.setSupplierPartNumber(rs.getString("SUPP_PART_N"));
				supplierProduct.setQuantityPerUnit(rs.getBigDecimal("PRDC_QTY_Q"));
				if (StringUtils.isNotEmpty(rs.getString("MSRUNIT_T"))) {
					supplierProduct.setUnit(Unit.valueOf(rs.getString("MSRUNIT_T")));
				}
				supplierProduct.setProductReferenceNumber(rs.getString("PRDC_REF_N"));
				if (StringUtils.isNotEmpty(rs.getString("PRDC_CAT_C"))) {
					supplierProduct.setProductTypeCode(
							sg.edu.nus.prs.domain.purchase.ProductTypeCode.valueOf(rs.getString("PRDC_CAT_C")));
				}

				if (supplier.getProductList() == null) {
					supplier.setProductList(new ArrayList<>());
				}

				supplier.getProductList().add(supplierProduct);

				return supplierProduct;
			} catch (SQLException e) {
				logger.error("Could not get product", e);
			}
			return null;

		});

	}

	private void populateAdditionalCharges(PeriodContractSupplier supplier, ResultSet rs) {
		if (supplier == null) { return; }

		try {
			PeriodContractSupplierAdditionalCharge additionalCharge = new PeriodContractSupplierAdditionalCharge();

			additionalCharge.setAdditionalChargeNumber(rs.getString("SUPP_ADDlCHRG_N"));
			additionalCharge.setSupplierNumber(rs.getString("SUPP_N"));
			additionalCharge.setAdditionalChargeText(rs.getString("ADDL_CHRG_T"));
			additionalCharge.setAdditionalChargeAmount(rs.getBigDecimal("ADDL_CHRG_A"));

			supplier.setAdditionalCharge(additionalCharge);

		} catch (SQLException e) {
			logger.error("Could not get additional charges", e);
		}
	}

	private PeriodContract populatePeriodContract(final Map<String, PeriodContract> periodContractMap, ResultSet rs)
			throws SQLException {
		return periodContractMap.computeIfAbsent(rs.getString("PRDCON_SEQ_N"), k -> {
			PeriodContract periodContract = new PeriodContract();
			try {
				periodContract.setPeriodContractSequenceNumber(rs.getString("PRDCON_SEQ_N"));
				periodContract.setContractNumber(rs.getString("CON_N"));
				periodContract.setContractValue(rs.getBigDecimal("CON_A"));
				String currencyCode = rs.getString("CRCY_C");
				if (StringUtils.isNotEmpty(currencyCode)) {
					Currency currency = new Currency();
					currency.setCode(currencyCode);
					currency.setDescription(rs.getString("CRCY_T"));
					periodContract.setCurrency(currency);
				}
				periodContract.setContractDesc(rs.getString("CON_DESC_T"));

				if (StringUtils.isNotEmpty(rs.getString("CON_STS_C"))) {
					periodContract.setContractStatus(PeriodContractStatus.valueOf(rs.getString("CON_STS_C")));
				}
				periodContract.setStartDate(rs.getDate("CON_ST_D"));
				periodContract.setEndDate(rs.getDate("CON_END_D"));
				if (StringUtils.isNotEmpty(rs.getString("CON_LVL_C"))) {
					periodContract
							.setContractApplicableFor(PeriodContractApplicableFor.valueOf(rs.getString("CON_LVL_C")));
				}
				if (StringUtils.isNotEmpty(rs.getString("CON_TP_C"))) {
					periodContract.setContractType(PeriodContractType.valueOf(rs.getString("CON_TP_C")));
				}
				if (StringUtils.isNotEmpty(rs.getString("CON_CAT_C"))) {
					periodContract.setContractCategory(PeriodContractCategory.valueOf(rs.getString("CON_CAT_C")));
				}
				return periodContract;
			} catch (SQLException e) {
				logger.error("Could not get period contract", e);
			}

			return periodContract;
		});
	}

	private PeriodContractSupplier populateSupplier(final Map<String, PeriodContractSupplier> periodContractSupplierMap,
													ResultSet rs,
													PeriodContract periodContract)
			throws SQLException {
		String supplierNumber = rs.getString("SUPP_N");
		if (StringUtils.isBlank(supplierNumber)) {
			return null;
		}

		return periodContractSupplierMap.computeIfAbsent(supplierNumber, k -> {
			PeriodContractSupplier supplier = new PeriodContractSupplier();
			try {
				supplier.setSupplierNumber(rs.getString("SUPP_N"));
				supplier.setPeriodContractNumber(rs.getString("PRDCON_SEQ_N"));
				String currencyCode = rs.getString("SUP_CRCY_C");
				if (StringUtils.isNotEmpty(currencyCode)) {
					Currency currency = new Currency();
					currency.setCode(currencyCode);
					currency.setDescription(rs.getString("SUP_CRCY_T"));
					supplier.setCurrency(currency);
				}
				supplier.setSupplierCode(rs.getString("SUPP_C"));
				supplier.setSupplierName(rs.getString("SUPP_T"));

				if (periodContract.getSupplierList() == null) {
					periodContract.setSupplierList(new ArrayList<>());
				}
				periodContract.getSupplierList().add(supplier);

				return supplier;
			} catch (SQLException e) {
				logger.error("Could not get supplier", e);
			}
			return null;
		});
	}

	@Override
	public PeriodContract savePeriodContract(PeriodContract contract) {
		if (StringUtils.isNotBlank(contract.getPeriodContractSequenceNumber())) {
			// Is Edit. Clear off old data.
			this.clearPeriodContractData(contract);

			this.updatePeriodContract(contract);
		} else {
			// New. Insert master record.
			this.insertPeriodContract(contract);
		}

		// Insert child records.
		insertPeriodContractFacultyDepartment(contract);

		// Insert contacts.
		insertPeriodContractContacts(contract);

		if (CollectionUtils.isNotEmpty(contract.getSupplierList())) {
			for (PeriodContractSupplier supplier : contract.getSupplierList()) {
				this.insertPeriodContractSupplier(contract, supplier);
			}
		}

		return contract;
	}

	private void clearPeriodContractData(PeriodContract contract) {
		final String clearFacultyDepartmentQuery =
				"DELETE FROM prs_prdcontract_access\n"
						+ "WHERE\n"
						+ "     prdcon_seq_n = ? ";

		this.prsJdbcTemplate.update(clearFacultyDepartmentQuery, contract.getPeriodContractSequenceNumber());

		final String clearContactsQuery =
				"DELETE FROM prs_periodcontract_contact\n" +
				"WHERE\n" +
				"    prdcon_seq_n = ? ";

		this.prsJdbcTemplate.update(clearContactsQuery, contract.getPeriodContractSequenceNumber());

		final String contractSupplierIdsQuery = "SELECT supp_n FROM prs_prdcontract_supplier WHERE prdcon_seq_n = ? ";

		List<String> supplierIds = this.prsJdbcTemplate.queryForList(contractSupplierIdsQuery, String.class,
				contract.getPeriodContractSequenceNumber());

		if (CollectionUtils.isEmpty(supplierIds)) {
			// No suppliers.
			return;
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("suppliers", supplierIds);

		final String clearProductTiersQuery =
				"DELETE FROM prs_prdcontract_productcontrol\n" +
				"WHERE\n" +
				"    supp_prdc_n IN (\n" +
				"        SELECT pp.supp_prdc_n \n" +
				"        FROM prs_prdcontract_product pp\n" +
				"        WHERE pp.supp_n IN (:suppliers)\n" +
				"    )";

		this.prsNamedJdbcTemplate.update(clearProductTiersQuery, params);

		final String clearProductsQuery =
				"DELETE FROM prs_prdcontract_product\n" +
				"WHERE\n" +
				"     supp_n IN (:suppliers)";

		this.prsNamedJdbcTemplate.update(clearProductsQuery, params);

		final String clearAdditionalChargesQuery =
				"DELETE FROM prs_prodcontract_addlcharge\n" +
				"WHERE\n" +
				"     supp_n IN (:suppliers)";

		this.prsNamedJdbcTemplate.update(clearAdditionalChargesQuery, params);

		final String clearSuppliersQuery =
				"DELETE FROM prs_prdcontract_supplier\n" +
				"WHERE\n" +
				"     supp_n IN (:suppliers)";

		this.prsNamedJdbcTemplate.update(clearSuppliersQuery, params);
	}

	private PeriodContract insertPeriodContract(PeriodContract contract) {
		final String insertSql = "INSERT INTO PRS_PERIODCONTRACT_PARTICS (\n" + "    prdcon_seq_n,\n"
				+ "    con_n, con_a, crcy_c,\n" + "    con_desc_t,\n" + "    con_st_d, con_end_d,\n"
				+ "    con_lvl_c, con_tp_c, con_cat_c, con_sts_c,\n" + "    rec_create_dtm, rec_createuser_i\n"
				+ ") VALUES (\n" + "    PRS_CONTRACT_PRD_SEQ.NEXTVAL,\n" + "    :con_n, :con_a, :crcy_c,\n"
				+ "    :con_desc_t,\n" + "    :con_st_d, :con_end_d,\n"
				+ "    :con_lvl_c, :con_tp_c, :con_cat_c, :con_sts_c,\n" + "    SYSDATE, :rec_createuser_i\n" + ")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("con_n", contract.getContractNumber());
		params.addValue("con_a", contract.getContractValue());
		params.addValue("crcy_c", (contract.getCurrency() != null) ? contract.getCurrency().getCode() : null);
		params.addValue("con_desc_t", contract.getContractDesc());
		params.addValue("con_st_d", contract.getStartDate());
		params.addValue("con_end_d", contract.getEndDate());
		params.addValue("con_lvl_c",
				(contract.getContractApplicableFor() != null) ? contract.getContractApplicableFor().toString() : null);
		params.addValue("con_tp_c",
				(contract.getContractType() != null) ? contract.getContractType().toString() : null);
		params.addValue("con_cat_c",
				(contract.getContractCategory() != null) ? contract.getContractCategory().toString() : null);
		params.addValue("con_sts_c",
				(contract.getContractStatus() != null) ? contract.getContractStatus().toString() : null);
		params.addValue("rec_createuser_i", contract.getCreatedUserId());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql, params, keyHolder, new String[] { "PRDCON_SEQ_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("PRDCON_SEQ_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		contract.setPeriodContractSequenceNumber((keyHolderMap.get("PRDCON_SEQ_N").toString()));

		return contract;
	}

	private PeriodContract updatePeriodContract(PeriodContract contract) {
		final String updateSql = "UPDATE prs_periodcontract_partics SET\n" + "    con_n = :con_n,\n"
				+ "    con_a  = :con_a ,\n" + "    crcy_c = :crcy_c,\n" + "    con_desc_t = :con_desc_t,\n"
				+ "    con_st_d  = :con_st_d ,\n" + "    con_end_d = :con_end_d,\n" + "    con_lvl_c = :con_lvl_c,\n"
				+ "    con_tp_c = :con_tp_c,\n" + "    con_cat_c = :con_cat_c,\n" + "    con_sts_c = :con_sts_c,\n"
				+ "    rec_upd_dtm = SYSDATE,\n" + "    rec_upduser_i = :rec_upduser_i\n" + "WHERE\n"
				+ "    prdcon_seq_n = :prdcon_seq_n";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("prdcon_seq_n", contract.getPeriodContractSequenceNumber());
		params.addValue("con_n", contract.getContractNumber());
		params.addValue("con_a", contract.getContractValue());
		params.addValue("crcy_c", (contract.getCurrency() != null) ? contract.getCurrency().getCode() : null);
		params.addValue("con_desc_t", contract.getContractDesc());
		params.addValue("con_st_d", contract.getStartDate());
		params.addValue("con_end_d", contract.getEndDate());
		params.addValue("con_lvl_c",
				(contract.getContractApplicableFor() != null) ? contract.getContractApplicableFor().toString() : null);
		params.addValue("con_tp_c",
				(contract.getContractType() != null) ? contract.getContractType().toString() : null);
		params.addValue("con_cat_c",
				(contract.getContractCategory() != null) ? contract.getContractCategory().toString() : null);
		params.addValue("con_sts_c",
				(contract.getContractStatus() != null) ? contract.getContractStatus().toString() : null);
		params.addValue("rec_upduser_i", contract.getUpdatedUserId());

		this.prsNamedJdbcTemplate.update(updateSql, params);

		return contract;
	}

	private void insertPeriodContractFacultyDepartment(PeriodContract contract) {
		if (contract.getContractApplicableFor() == null
			|| contract.getContractApplicableFor() == PeriodContractApplicableFor.PERIOD_CTRCT_AC_CAMPUS) {
			return;
		}

		final String insertQuery =
				"INSERT INTO prs_prdcontract_access (\n" +
				"    access_n,\n" +
				"    prdcon_seq_n,\n" +
				"    fac_c, dept_c\n" +
				") VALUES (\n" +
				"    PRS_PRDCONTRACT_ACCESS_SEQ.NEXTVAL,\n" +
				"    :prdcon_seq_n,\n" +
				"    :fac_c, :dept_c\n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("prdcon_seq_n", contract.getPeriodContractSequenceNumber());

		if (CollectionUtils.isNotEmpty(contract.getFaculties())) {
			for (Faculty f: contract.getFaculties()) {
				if (contract.getContractApplicableFor() == PeriodContractApplicableFor.PERIOD_CTRCT_AC_FAC) {
					// Only insert faculty.
					params.addValue("fac_c", f.getFaculty());
					params.addValue("dept_c", null);

					this.prsNamedJdbcTemplate.update(insertQuery, params);

				} else if (contract.getContractApplicableFor() == PeriodContractApplicableFor.PERIOD_CTRCT_AC_DEPT) {
					if (CollectionUtils.isNotEmpty(f.getDepartments())) {
						for (Department d: f.getDepartments()) {
							params.addValue("fac_c", f.getFaculty());
							params.addValue("dept_c", d.getDepartment());

							this.prsNamedJdbcTemplate.update(insertQuery, params);
						}
					}
				}
			}
		}
	}

	private void insertPeriodContractContacts(PeriodContract contract) {
		if (CollectionUtils.isEmpty(contract.getContactEmails())) {
			return;
		}

		final String insertQuery =
				"INSERT INTO prs_periodcontract_contact (\n" +
						"    prd_contact_n,\n" +
						"    prdcon_seq_n,\n" +
						"    contact_email_t, disp_seq_n\n" +
						") VALUES (\n" +
						"    PRS_PERIODCONTRACT_CONTACT_SEQ.NEXTVAL,\n" +
						"    :prdcon_seq_n,\n" +
						"    :contact_email_t, :disp_seq_n\n" +
						")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("prdcon_seq_n", contract.getPeriodContractSequenceNumber());

		if (CollectionUtils.isNotEmpty(contract.getContactEmails())) {
			int idx = 0;
			for (String contact: contract.getContactEmails()) {
				idx++;

				params.addValue("contact_email_t", contact);
				params.addValue("disp_seq_n", idx);

				this.prsNamedJdbcTemplate.update(insertQuery, params);
			}
		}
	}

	private PeriodContractSupplier insertPeriodContractSupplier(PeriodContract contract,
			PeriodContractSupplier supplier) {
		final String insertSupplierSql = "INSERT INTO prs_prdcontract_supplier (\n" + "    supp_n,\n"
				+ "    prdcon_seq_n,\n" + "    supp_c,\n" + "    crcy_c\n" + ") VALUES (\n"
				+ "    PRS_PRDCONTRACT_SUPPLIER_SEQ.NEXTVAL,\n" + "    :prdcon_seq_n,\n" + "    :supp_c,\n"
				+ "    :crcy_c\n" + ")";

		MapSqlParameterSource supplierParams = new MapSqlParameterSource();
		supplierParams.addValue("prdcon_seq_n", contract.getPeriodContractSequenceNumber());
		supplierParams.addValue("supp_c", supplier.getSupplierCode());
		supplierParams.addValue("crcy_c", (supplier.getCurrency() != null) ? supplier.getCurrency().getCode() : null);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSupplierSql, supplierParams, keyHolder, new String[] { "SUPP_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("SUPP_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		supplier.setSupplierNumber((keyHolderMap.get("SUPP_N").toString()));

		if (supplier.getAdditionalCharge() != null) {
			PeriodContractSupplierAdditionalCharge ac = supplier.getAdditionalCharge();

			final String insertAdditionalChargeSql = "INSERT INTO prs_prodcontract_addlcharge (\n"
					+ "    supp_addlchrg_n,\n" + "    supp_n,\n" + "    addl_chrg_t,\n" + "    addl_chrg_a\n"
					+ ") VALUES (\n" + "    PRS_PRDCONTRACT_SUPPADDL_SEQ.NEXTVAL,\n" + "    :supp_n,\n"
					+ "    :addl_chrg_t,\n" + "    :addl_chrg_a\n" + ")";

			MapSqlParameterSource additionalChargeParams = new MapSqlParameterSource();
			additionalChargeParams.addValue("supp_n", supplier.getSupplierNumber());
			additionalChargeParams.addValue("addl_chrg_t", ac.getAdditionalChargeText());
			additionalChargeParams.addValue("addl_chrg_a", ac.getAdditionalChargeAmount());

			KeyHolder additionalChargeKeyHolder = new GeneratedKeyHolder();
			this.prsNamedJdbcTemplate.update(insertAdditionalChargeSql, additionalChargeParams,
					additionalChargeKeyHolder, new String[] { "SUPP_ADDLCHRG_N" });

			if (additionalChargeKeyHolder.getKeyList() == null || additionalChargeKeyHolder.getKeyList().size() < 1) {
				throw new IllegalStateException("SUPP_ADDLCHRG_N not returned in KeyHolder");
			}

			Map<String, Object> additionalChargeKeyHolderMap = additionalChargeKeyHolder.getKeyList().get(0);
			ac.setAdditionalChargeNumber((additionalChargeKeyHolderMap.get("SUPP_ADDLCHRG_N").toString()));
		}

		if (CollectionUtils.isNotEmpty(supplier.getProductList())) {
			for (PeriodContractSupplierProduct product : supplier.getProductList()) {
				this.insertPeriodContractSupplierProduct(supplier, product);
			}
		}

		return supplier;
	}

	private PeriodContractSupplierProduct insertPeriodContractSupplierProduct(PeriodContractSupplier supplier,
			PeriodContractSupplierProduct product) {
		final String insertProductSql = "INSERT INTO prs_prdcontract_product (\n" + "    supp_prdc_n,\n"
				+ "    supp_n,\n" + "    prdc_cat_c,\n" + "    prdc_ref_n,\n" + "    supp_part_n,\n"
				+ "    msrunit_c,\n" + "    prdc_qty_q\n" + ") VALUES (\n"
				+ "    PRS_PRDCONTRACT_PRODUCT_SEQ.NEXTVAL,\n" + "    :supp_n,\n" + "    :prdc_cat_c,\n"
				+ "    :prdc_ref_n,\n" + "    :supp_part_n,\n" + "    :msrunit_c,\n" + "    :prdc_qty_q\n" + ")";

		String unitCode = null;
		if (product.getUnit() != null) {
			unitCode = prsJdbcTemplate.queryForObject(
					"SELECT MSRUNIT_C FROM MSRUNIT WHERE UPPER(MSRUNIT_T) = UPPER(?) ",
					String.class,
					product.getUnit().toString());
		}

		MapSqlParameterSource productParams = new MapSqlParameterSource();
		productParams.addValue("supp_n", supplier.getSupplierNumber());
		productParams.addValue("prdc_cat_c",
				(product.getProductTypeCode() != null) ? product.getProductTypeCode().toString() : null);
		productParams.addValue("prdc_ref_n", product.getProductReferenceNumber());
		productParams.addValue("supp_part_n", product.getSupplierPartNumber());
		productParams.addValue("msrunit_c", unitCode);
		productParams.addValue("prdc_qty_q", product.getQuantityPerUnit());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertProductSql, productParams, keyHolder, new String[] { "SUPP_PRDC_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("SUPP_PRDC_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		product.setProductNumber((keyHolderMap.get("SUPP_PRDC_N").toString()));

		if (CollectionUtils.isNotEmpty(product.getPriceTierList())) {
			for (PeriodContractProductPriceTier tier : product.getPriceTierList()) {
				final String insertTierSql = "INSERT INTO prs_prdcontract_productcontrol (\n" + "    prdc_ctrl_n,\n"
						+ "    supp_prdc_n,\n" + "    qty_min_q,\n" + "    qty_max_q,\n" + "    unitpx_a\n"
						+ ") VALUES (\n" + "    PRS_PRDCONTRACT_PRDCTRL_SEQ.NEXTVAL,\n" + "    :supp_prdc_n,\n"
						+ "    :qty_min_q,\n" + "    :qty_max_q,\n" + "    :unitpx_a\n" + ")";

				MapSqlParameterSource tierParams = new MapSqlParameterSource();
				tierParams.addValue("supp_prdc_n", product.getProductNumber());
				tierParams.addValue("qty_min_q", tier.getMinQuantity());
				tierParams.addValue("qty_max_q", tier.getMaxQuantity());
				tierParams.addValue("unitpx_a", tier.getUnitPrice());

				KeyHolder tierKeyHolder = new GeneratedKeyHolder();
				this.prsNamedJdbcTemplate.update(insertTierSql, tierParams, tierKeyHolder,
						new String[] { "PRDC_CTRL_N" });

				if (tierKeyHolder.getKeyList() == null || tierKeyHolder.getKeyList().size() < 1) {
					throw new IllegalStateException("PRDC_CTRL_N not returned in KeyHolder");
				}

				Map<String, Object> tierKeyHolderMap = tierKeyHolder.getKeyList().get(0);
				tier.setPriceTierNumber((tierKeyHolderMap.get("PRDC_CTRL_N").toString()));
			}
		}

		return product;
	}

	@Override
	public List<String> getPeriodContractIdsByContractNumber(List<String> contractNumbers,
															 List<PeriodContractStatus> statuses) {
		String query =
				"SELECT prdcon_seq_n\n" +
				"FROM prs_periodcontract_partics\n" +
				"WHERE\n" +
				"    con_n IN (:contractNumbers)\n";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("contractNumbers", contractNumbers);

		if (CollectionUtils.isNotEmpty(statuses)) {
			query += "    AND con_sts_c IN (:statuses)";
			params.addValue("statuses", statuses.stream()
					.map(PeriodContractStatus::toString)
					.collect(Collectors.toList()));
		}

		return this.prsNamedJdbcTemplate.queryForList(
				query,
				params,
				String.class
		);
	}

	@Override
	public boolean unpublishPeriodContract(String periodContractId, String updateUserNo) {
		final String updateSql =
				"UPDATE prs_periodcontract_partics SET\n"
				+ "    con_sts_c = :con_sts_c,\n"
				+ "    rec_upd_dtm = SYSDATE,\n"
				+ "    rec_upduser_i = :rec_upduser_i\n"
				+ "WHERE\n"
				+ "    prdcon_seq_n = :prdcon_seq_n";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("prdcon_seq_n", periodContractId);
		params.addValue("con_sts_c", PeriodContractStatus.PERIOD_CTRCT_STS_UNPUBLISH.toString());
		params.addValue("rec_upduser_i", updateUserNo);


		int affected = this.prsNamedJdbcTemplate.update(updateSql, params);

		return affected > 0;
	}

	@Override
	public List<PurchaseLineItem> getPeriodContractSupplierAdditionalCharge(String contractNumber, String supplierCode) {
		final String querySql =
				"SELECT  \n" +
				"    ac.addl_chrg_t, ac.addl_chrg_a,\n" +
				"    c.crcy_c, c.crcy_t,\n" +
				"    sp.supp_c, sp.supp_t,\n" +
				"    p.con_n\n" +
				"FROM\n" +
				"    PRS_PRODCONTRACT_ADDLCHARGE ac\n" +
				"    JOIN PRS_PRDCONTRACT_SUPPLIER s ON ac.supp_n = s.supp_n\n" +
				"    JOIN PRSSUPPLIER sp ON s.supp_c = sp.supp_c\n" +
				"    JOIN PRS_PERIODCONTRACT_PARTICS p ON s.prdcon_seq_n = p.prdcon_seq_n\n" +
				"    LEFT JOIN prscurrency c ON s.crcy_c = c.crcy_c\n" +
				"WHERE\n" +
				"    p.con_sts_c = 'PERIOD_CTRCT_STS_PUBLISH'\n" +
				"    AND p.con_n = :CON_N\n" +
				"    AND s.supp_c = :SUPP_C";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("CON_N", contractNumber);
		params.addValue("SUPP_C", supplierCode);

		return this.prsNamedJdbcTemplate.query(querySql, params, this::periodContractSupplierAdditionalChargeRowMapper);
	}

	PurchaseLineItem periodContractSupplierAdditionalChargeRowMapper(ResultSet rs, int i) throws SQLException {
		PurchaseLineItem pi = new PurchaseLineItem();
		pi.setQuantity(BigDecimal.ONE);
		pi.setUnitCode(Unit.EA);
		pi.setUnitPrice(rs.getBigDecimal("ADDL_CHRG_A"));
		pi.setSubTotal(pi.getUnitPrice());
		pi.setDescription(rs.getString("ADDL_CHRG_T"));

		pi.setSupplier(new Supplier(rs.getString("SUPP_C"), rs.getString("SUPP_T")));
		pi.setCurrency(new Currency(rs.getString("CRCY_C"), rs.getString("CRCY_T")));

		AdditionalChargeCatalogItem aci = new AdditionalChargeCatalogItem();
		aci.setDescription(pi.getDescription());
		aci.setContractNumber(rs.getString("CON_N"));
		aci.setCurrency(pi.getCurrency());
		pi.setCatalogItem(aci);

		return pi;
	}

	@Override
	public boolean checkPeriodContractProductExists(Date asOf, String contractNumber, String productId, String supplierCode) {
		final String querySql =
				"SELECT\n" +
				"    COUNT(supp_prdc_n)\n" +
				"FROM\n" +
				"    PRS_PRDCONTRACT_PRODUCT pp\n" +
				"    JOIN PRS_PRDCONTRACT_SUPPLIER ps ON pp.supp_n = ps.supp_n\n" +
				"    JOIN prs_periodcontract_partics pcp ON ps.prdcon_seq_n = pcp.prdcon_seq_n\n" +
				"WHERE\n" +
				"    pcp.con_sts_c = 'PERIOD_CTRCT_STS_PUBLISH'\n" +
				"    AND pcp.con_st_d <= :AS_OF\n" +
				"    AND pcp.con_end_d >= :AS_OF\n" +
				"    AND pcp.con_n = :CON_N\n" +
				"    AND ps.supp_c = :SUPP_C\n" +
				"    AND pp.prdc_ref_n = :PRDC_REF_N";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("AS_OF", asOf);
		params.addValue("CON_N", contractNumber);
		params.addValue("SUPP_C", supplierCode);
		params.addValue("PRDC_REF_N", productId);

		Integer count = this.prsNamedJdbcTemplate.queryForObject(querySql, params, Integer.class);
		if (count == null) {
			return false;
		}

		return count > 0;
	}

	@Override
	public PeriodContractSupplier getPeriodContractProduct(Date asOf, String contractNumber, String productId, String supplierCode) {
		final String querySql =
				"SELECT \n" +
				"    pcp.con_n, \n" +
				"    pcpd.prdc_ref_n AS CP_PRDC_REF_N, pcp.con_n AS CB_CON_N, \n" +
				"    curr.crcy_c AS CB_CRCY_C, curr.crcy_t AS CB_CRCY_T,\n" +
				"    supp.supp_c AS CB_SUPP_C, supp.supp_t AS CB_SUPP_T,\n" +
				"    pcpd.supp_part_n AS CB_SUPP_PART_N, \n" +
				"    cu.msrunit_c AS CB_MSRUNIT_C, cu.msrunit_t AS CB_MSRUNIT_T, pcpd.prdc_qty_q AS CB_PRDC_QTY_Q,\n" +
				"    (SELECT LISTAGG(pcpdc.qty_min_q || ':' || pcpdc.qty_max_q || ':' || pcpdc.unitpx_a, '|') WITHIN GROUP (ORDER BY 1)\n" +
				"     FROM PRS_PRDCONTRACT_PRODUCTCONTROL pcpdc\n" +
				"     WHERE pcpd.supp_prdc_n = pcpdc.supp_prdc_n) AS CB_TIERS\n" +
				"FROM\n" +
				"    PRS_PERIODCONTRACT_PARTICS pcp\n" +
				"    JOIN PRS_PRDCONTRACT_SUPPLIER pcs ON pcp.prdcon_seq_n = pcs.prdcon_seq_n\n" +
				"    JOIN PRS_PRDCONTRACT_PRODUCT pcpd ON pcs.supp_n = pcpd.supp_n\n" +
				"    JOIN PRSSUPPLIER supp ON pcs.supp_c = supp.supp_c\n" +
				"    JOIN PRSCURRENCY curr ON curr.crcy_c = NVL(pcs.crcy_c, pcp.crcy_c)\n" +
				"    JOIN MSRUNIT cu ON pcpd.msrunit_c = cu.msrunit_c\n" +
				"WHERE\n" +
				"    pcp.con_sts_c IN (:periodContractStatus) \n" +
				"    AND pcp.con_st_d <= :AS_OF\n" +
				"    AND pcp.con_end_d >= :AS_OF\n" +
				"    AND pcp.con_n = :CON_N\n" +
				"    AND supp.supp_c = :SUPP_C\n" +
				"    AND pcpd.prdc_ref_n = :PRDC_REF_N ";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("periodContractStatus", Arrays.asList(
			PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH.toString(),
			PeriodContractStatus.PERIOD_CTRCT_STS_UNPUBLISH.toString(),
			PeriodContractStatus.PERIOD_CTRCT_STS_DEFUNCT.toString()
		));
		params.addValue("AS_OF", asOf);
		params.addValue("CON_N", contractNumber);
		params.addValue("SUPP_C", supplierCode);
		params.addValue("PRDC_REF_N", productId);

		List<PeriodContractSupplier> result = this.prsNamedJdbcTemplate.query(
				querySql,
				params,
				this::periodContractSupplierByProductRowMapper
		);
		if (CollectionUtils.isEmpty(result)) {
			return null;
		}

		return result.get(0);
	}

	PeriodContractSupplier periodContractSupplierByProductRowMapper(ResultSet rs, int i) throws SQLException {
		PeriodContractSupplier pcs = new PeriodContractSupplier();
		pcs.setPeriodContractNumber(rs.getString("CON_N"));
		pcs.setSupplierCode(rs.getString("CB_SUPP_C"));
		pcs.setSupplierName(rs.getString("CB_SUPP_T"));
		pcs.setCurrency(new Currency(rs.getString("CB_CRCY_C"), rs.getString("CB_CRCY_T")));


		PeriodContractSupplierProduct pcsp = new PeriodContractSupplierProduct();
		pcs.setProductList(Collections.singletonList(pcsp));

		pcsp.setProductReferenceNumber(rs.getString("CP_PRDC_REF_N"));
		pcsp.setSupplierPartNumber(rs.getString("CB_SUPP_PART_N"));
		pcsp.setUnit(Unit.valueOf(rs.getString("CB_MSRUNIT_T")));

		if (pcsp.getUnit() == Unit.BOX) {
			pcsp.setQuantityPerUnit(rs.getBigDecimal("CB_PRDC_QTY_Q"));
		}


		String pricing = rs.getString("CB_TIERS");
		String[] tiers = pricing.split("\\|");

		pcsp.setPriceTierList(new ArrayList<>(tiers.length));
		for (String tier: tiers) {
			String[] components = tier.split(":");

			PeriodContractProductPriceTier tierForm = new PeriodContractProductPriceTier();
			if (StringUtils.isNotBlank(components[0])) {
				tierForm.setMinQuantity(new BigDecimal(components[0]));
			}
			if (StringUtils.isNotBlank(components[1])) {
				tierForm.setMaxQuantity(new BigDecimal(components[1]));
			}
			if (StringUtils.isNotBlank(components[2])) {
				tierForm.setUnitPrice(new BigDecimal(components[2]));
			}

			pcsp.getPriceTierList().add(tierForm);
		}

		return pcs;
	}
	
	private void insertPeriodContractUtlisation(PeriodContractUtilisation contractUtilisation) {
		
		List<String> periodContractIds = this.getPeriodContractIdsByContractNumber(
				Collections.singletonList(contractUtilisation.getContractNumber()),
				Collections.singletonList(PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH));
		
		if(CollectionUtils.isEmpty(periodContractIds)) {
			throw new IllegalStateException("PRDCON_SEQ_N not found.");
		}
		
		final String insertSql = "INSERT INTO PRS_CONTRACT_UTILISATION (\n" +
				"CON_UTIL_N,\n" +
				"PRDCON_SEQ_N, \n" +
				"CON_UTIL_A, \n" +
				"SRCE_TP_C, \n" +
				"REC_CREATE_DTM \n" +
				") VALUES ( \n" +
				"    PRS_CONTRACT_UTIL_SEQ.NEXTVAL, \n" +
				"    :contractId, :utilisationAmount, \n" +
				"    :sourceType, sysdate \n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("contractId", periodContractIds.get(0))
				.addValue("utilisationAmount", contractUtilisation.getUtilisationAmount())
				.addValue("sourceType", (contractUtilisation.getSourceType() != null) ? 
						contractUtilisation.getSourceType().name() : null);
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"CON_UTIL_N"}
		);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("CON_UTIL_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		contractUtilisation.setId(keyHolderMap.get("CON_UTIL_N").toString());
	}

	@Override
	public void insertLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation) {
		insertPeriodContractUtlisation(contractUtlisation);

		// Update linkage table.
		this.prsJdbcTemplate.update(
				"INSERT INTO PRS_LINEITEM_CONTRACTUTIL (LINEITEM_CON_N, LINEITEM_N, CON_UTIL_N) VALUES (PRS_LINEITEM_CONTRACTUTIL_SEQ.nextVal, ?, ?)",
				contractUtlisation.getPrLineItemNumber(),
				contractUtlisation.getId()
		);
	}
	
	@Override
	public void insertPurchaseOrderLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation) {
		insertPeriodContractUtlisation(contractUtlisation);

		// Update linkage table.
		this.prsJdbcTemplate.update(
				"INSERT INTO PRS_POLINEITEM_CONTRACTUTIL (POLINEITEM_CON_N, LINEITEM_N, CON_UTIL_N) VALUES (PRS_POITEM_CONTRACTUTIL_SEQ.nextVal, ?, ?)",
				contractUtlisation.getPoLineItemNumber(),
				contractUtlisation.getId()
		);
	}
	
	@Override
	public void insertCollectionLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation) {
		insertPeriodContractUtlisation(contractUtlisation);

		// Update linkage table.
		this.prsJdbcTemplate.update(
				"INSERT INTO PRS_COLLECT_CONTRACTUTIL (COLLECT_CON_N, COLLECT_N, CON_UTIL_N) VALUES (PRS_COLLECT_CONTRACTUTIL_SEQ.nextVal, ?, ?)",
				contractUtlisation.getCollectionId(),
				contractUtlisation.getId()
		);
	}

	@Override
	public List<PeriodContract> fetchToBeExpiredPeriodContractList(String todaysDateStr,
			List<Long> reminderemailWaitingdays, double firstTriggerLimit, double secondTriggerLimit) {
		MapSqlParameterSource params = null;
		StringBuilder query = null;
		List<PeriodContract> periodContractList = null;
		if (StringUtils.isEmpty(todaysDateStr)) {
			throw new IllegalArgumentException("Input Date is required.");
		}
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append("SELECT A.PRDCON_SEQ_N, A.CON_N, A.CON_A, A.CRCY_C, D.CRCY_T, A.CON_DESC_T, A.CON_ST_D, A.CON_END_D, A.CON_LVL_C, A.CON_TP_C,   \n" + 
					"    A.CON_CAT_C, A.CON_STS_C, NVL(B.TOT_UTIL_A, 0) TOT_UTIL_A,  \n" + 
					"    TO_DATE(TO_CHAR(A.CON_END_D, 'YYYY-MM-DD'), 'YYYY-MM-DD')  - TO_DATE(TO_CHAR(TO_DATE(:todaysDateStr, 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD'), 'YYYY-MM-DD')  AS REMAINING_DAYS  \n" + 
					"FROM PRS_PERIODCONTRACT_PARTICS A,  PRSCURRENCY D, \n" + 
					"    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) TOT_UTIL_A FROM PRS_CONTRACT_UTILISATION GROUP BY PRDCON_SEQ_N) B  \n" + 
					"WHERE A.PRDCON_SEQ_N = B.PRDCON_SEQ_N(+)  AND A.CRCY_C = D.CRCY_C AND CON_END_D >= SYSDATE \n" + 
					"    AND  TO_DATE(TO_CHAR(A.CON_END_D, 'YYYY-MM-DD'), 'YYYY-MM-DD') -   \n" + 
					"    TO_DATE(TO_CHAR(TO_DATE(:todaysDateStr, 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD'), 'YYYY-MM-DD')  IN (:reminderemailWaitingdays)  \n" + 
					"    AND A.CON_STS_C IN (:periodContractStatus)  \n" + 
					" UNION   \n" + 
					"SELECT PRDCON_SEQ_N, CON_N, CON_A, CRCY_C,  CRCY_T, CON_DESC_T, CON_ST_D, CON_END_D, CON_LVL_C, CON_TP_C, CON_CAT_C, CON_STS_C, NVL(TOT_UTIL_A, 0) TOT_UTIL_A,  REMAINING_DAYS  \n" + 
					"FROM ( SELECT  A.PRDCON_SEQ_N, A.CON_N, A.CON_A, A.CRCY_C, D.CRCY_T, A.CON_DESC_T, A.CON_ST_D, A.CON_END_D, A.CON_LVL_C, A.CON_TP_C,   \n" + 
					"                    A.CON_CAT_C, A.CON_STS_C, NVL(B.UTILISED_AMOUT, 0) TOT_UTIL_A,    \n" + 
					"                    DECODE(UTILISED_AMOUT, NULL, 100, (100*((CON_A-UTILISED_AMOUT)/CON_A) ))REMAININGVALUE_PRECENTAGE,  \n" + 
					"                    DECODE(PREV_UTILISED_AMOUT, NULL, 100, (100*((CON_A-PREV_UTILISED_AMOUT)/CON_A) ))PREV_REMAININGVALUE_PRECENTAGE,  \n" + 
					"                    TO_DATE(TO_CHAR(A.CON_END_D, 'YYYY-MM-DD'), 'YYYY-MM-DD')  - TO_DATE(TO_CHAR(TO_DATE(:todaysDateStr, 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD'), 'YYYY-MM-DD')  AS REMAINING_DAYS  \n" + 
					"                FROM PRS_PERIODCONTRACT_PARTICS A, PRSCURRENCY D, \n" + 
					"                    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) UTILISED_AMOUT FROM PRS_CONTRACT_UTILISATION  GROUP BY PRDCON_SEQ_N) B,  \n" + 
					"                    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) PREV_UTILISED_AMOUT FROM PRS_CONTRACT_UTILISATION WHERE REC_CREATE_DTM < SYSDATE GROUP BY PRDCON_SEQ_N) C  \n" + 
					"                WHERE A.PRDCON_SEQ_N = B.PRDCON_SEQ_N(+) AND A.CRCY_C = D.CRCY_C AND CON_END_D >= SYSDATE \n" + 
					"                    AND  A.PRDCON_SEQ_N = C.PRDCON_SEQ_N(+)  \n" + 
					"                    AND CON_STS_C = :periodContractStatus )  \n" + 
					"WHERE REMAININGVALUE_PRECENTAGE <= :firstTriggerLimit \n" + 
					//"AND PREV_REMAININGVALUE_PRECENTAGE > :firstTriggerLimit  \n" + 
					" UNION  \n" + 
					"SELECT PRDCON_SEQ_N, CON_N, CON_A, CRCY_C,  CRCY_T, CON_DESC_T, CON_ST_D, CON_END_D, CON_LVL_C, CON_TP_C, CON_CAT_C, CON_STS_C, NVL(TOT_UTIL_A, 0) TOT_UTIL_A,  REMAINING_DAYS  \n" + 
					"FROM ( SELECT  A.PRDCON_SEQ_N, A.CON_N, A.CON_A, A.CRCY_C, D.CRCY_T, A.CON_DESC_T, A.CON_ST_D, A.CON_END_D, A.CON_LVL_C, A.CON_TP_C,   \n" + 
					"                    A.CON_CAT_C, A.CON_STS_C, NVL(B.UTILISED_AMOUT, 0) TOT_UTIL_A,  \n" + 
					"                    DECODE(UTILISED_AMOUT, NULL, 100, (100*((CON_A-UTILISED_AMOUT)/CON_A) ))REMAININGVALUE_PRECENTAGE,  \n" + 
					"                    DECODE(PREV_UTILISED_AMOUT, NULL, 100, (100*((CON_A-PREV_UTILISED_AMOUT)/CON_A) ))PREV_REMAININGVALUE_PRECENTAGE,  \n" + 
					"                    TO_DATE(TO_CHAR(A.CON_END_D, 'YYYY-MM-DD'), 'YYYY-MM-DD')  - TO_DATE(TO_CHAR(TO_DATE(:todaysDateStr, 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD'), 'YYYY-MM-DD')  AS REMAINING_DAYS  \n" + 
					"                FROM PRS_PERIODCONTRACT_PARTICS A,  PRSCURRENCY D,  \n" + 
					"                    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) UTILISED_AMOUT FROM PRS_CONTRACT_UTILISATION  GROUP BY PRDCON_SEQ_N) B,  \n" + 
					"                    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) PREV_UTILISED_AMOUT FROM PRS_CONTRACT_UTILISATION WHERE REC_CREATE_DTM < SYSDATE GROUP BY PRDCON_SEQ_N) C  \n" + 
					"                WHERE A.PRDCON_SEQ_N = B.PRDCON_SEQ_N(+) AND A.CRCY_C = D.CRCY_C AND CON_END_D >= SYSDATE \n" + 
					"                    AND  A.PRDCON_SEQ_N = C.PRDCON_SEQ_N(+)  \n" + 
					"                    AND CON_STS_C = :periodContractStatus)  \n" + 
					"WHERE REMAININGVALUE_PRECENTAGE <= :secondTriggerLimit \n" + 
					//"AND PREV_REMAININGVALUE_PRECENTAGE > :secondTriggerLimit ");
					" ");//to be commented
			params.addValue("reminderemailWaitingdays", reminderemailWaitingdays);
			params.addValue("todaysDateStr", todaysDateStr);
			params.addValue("firstTriggerLimit", firstTriggerLimit);
			params.addValue("secondTriggerLimit", secondTriggerLimit);
			params.addValue("periodContractStatus", PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH.toString());
			
			final Map<String, PeriodContract> periodContractMap = new HashMap<>();
			
			this.prsNamedJdbcTemplate.query(query.toString(), params,
					(rs, rowNum) -> {
						PeriodContract periodContract = populatePeriodContract(periodContractMap, rs);
						periodContract.setUtilisedContractValue(new BigDecimal(rs.getString("TOT_UTIL_A")));
						return periodContract;
					}
			);

			final String periodContractContactsQuery =
					"SELECT\n" +
					"    prdcon_seq_n, contact_email_t\n" +
					"FROM\n" +
					"    prs_periodcontract_contact\n" +
					"WHERE\n" +
					"    prdcon_seq_n IN (:sequences)\n" +
					"ORDER BY\n" +
					"    disp_seq_n";

			Set<String> periodContractIdSet = periodContractMap.keySet();
			if (CollectionUtils.isNotEmpty(periodContractIdSet)) {
				MapSqlParameterSource contactParams = new MapSqlParameterSource();
				contactParams.addValue("sequences", periodContractIdSet);

				this.prsNamedJdbcTemplate.query(
						periodContractContactsQuery,
						contactParams,
						(rs, i) -> {
							PeriodContract contract = periodContractMap.get(rs.getString("prdcon_seq_n"));
							if (contract.getContactEmails() == null) {
								contract.setContactEmails(new ArrayList<>());
							}

							contract.getContactEmails().add(rs.getString("contact_email_t"));

							return contract;
						});
			}
			
			periodContractList = periodContractMap.values().stream()
			        .filter(Objects::nonNull)
					.filter(p -> StringUtils.isNotBlank(p.getPeriodContractSequenceNumber()))
					.collect(Collectors.toList());

		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			params = null;
			query = null;
		}
		return periodContractList;
	}
	
	@Override
    public List<String> searchContractNumber(String partial, boolean allResults) {

        return this.prsJdbcTemplate.queryForList(
                "SELECT DISTINCT CON_N FROM PRS_PERIODCONTRACT_PARTICS \n"
              + "WHERE UPPER(CON_N) LIKE '%'||UPPER(?)||'%' \n"
              + "ORDER BY CON_N\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial);
        
    }

	@Override
	public BigDecimal getRemainingContractValue(String contractNumber) {
		
		final String querySql =
				"SELECT  \n"
				+ "    DECODE(UTILISED_AMOUT, NULL, CON_A, (CON_A-UTILISED_AMOUT) ) REMAINING_AMOUNT \n"
				+ "FROM PRS_PERIODCONTRACT_PARTICS A, PRSCURRENCY D, \n"
				+ "    (SELECT PRDCON_SEQ_N, SUM(CON_UTIL_A) UTILISED_AMOUT FROM PRS_CONTRACT_UTILISATION  GROUP BY PRDCON_SEQ_N) B \n"
				+ "WHERE A.PRDCON_SEQ_N = B.PRDCON_SEQ_N(+) AND A.CRCY_C = D.CRCY_C AND CON_END_D >= SYSDATE AND CON_ST_D <= SYSDATE \n"
				+ "    AND CON_STS_C = :periodContractStatus and A.CON_N = :contractNumber ";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("periodContractStatus", PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH.toString());
		params.addValue("contractNumber", contractNumber);
		
		List<BigDecimal> result = this.prsNamedJdbcTemplate.query(
				querySql,
				params, new RowMapper<BigDecimal>() {
					public BigDecimal mapRow(ResultSet rs, int rowNum) 
                            throws SQLException {
						return rs.getBigDecimal("REMAINING_AMOUNT");
}
				}
		);
		
		if(CollectionUtils.isNotEmpty(result)) {
			return result.get(0);
		}
		
		return BigDecimal.ZERO;
	}

	
	public List<Faculty> getPeriodContractAccess(String sequenceNumber) {
		StringBuilder query = new StringBuilder(
				  "SELECT PCA.FAC_C, PCA.DEPT_C FROM PRS_PRDCONTRACT_ACCESS PCA \n"
				+ "WHERE PCA.PRDCON_SEQ_N = :contractSeqNum");
		
		MapSqlParameterSource contactParams = new MapSqlParameterSource();
		contactParams.addValue("contractSeqNum", sequenceNumber);
		List<Faculty> appliedFacs = new ArrayList<>();
		this.prsNamedJdbcTemplate.query(
				query.toString(),
				contactParams,
				(rs, i) -> periodContractAccessMapper(rs, i, appliedFacs));
		
		return appliedFacs;
	}
	
	private Faculty periodContractAccessMapper(ResultSet rs, int i, List<Faculty> appliedFacs) throws SQLException {
		String facultyCode = rs.getString("FAC_C");
		if (StringUtils.isNotBlank(facultyCode)) {
			Optional<Faculty> matched = appliedFacs
				.stream()
				.filter(e -> e.getFaculty() == facultyCode)
				.findFirst();
			
			Faculty fac = matched.orElse(new Faculty(facultyCode, ""));
			
			String deptCode = rs.getString("DEPT_C");
			
			if (StringUtils.isNotBlank(deptCode)) {
				List<Department> depts = fac.getDepartments();
				
				if(depts == null) {
					depts = new ArrayList<>();
					fac.setDepartments(depts);
				}
				depts.add(new Department(deptCode, ""));
			}
			
			appliedFacs.add(fac);
			return fac;
		}
		return null;
	}
}
