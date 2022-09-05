package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.ChemicalGrade;
import sg.edu.nus.prs.domain.common.ConcentrationUnit;
import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.common.NotationType;
import sg.edu.nus.prs.domain.common.NumericalValue;
import sg.edu.nus.prs.domain.common.PhyForm;
import sg.edu.nus.prs.domain.common.RegulationCheck;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.common.UnitMsr;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractApplicableFor;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractProductPriceTier;
import sg.edu.nus.prs.domain.purchase.ChemicalRegulation;
import sg.edu.nus.prs.domain.purchase.Manufacturer;
import sg.edu.nus.prs.domain.purchase.ProductTypeCode;
import sg.edu.nus.prs.domain.purchase.Unit;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalAgent;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalCategory;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalConcentrationUnit;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrgan;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalOrigin;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalProductFormat;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalType;
import sg.edu.nus.prs.domain.purchase.catalog.BiologicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.BiologicalCatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.catalog.ChemicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveActivity;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveSourceType;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.Constants;

@Repository
public class CatalogDAOImpl extends BaseDAOImpl implements CatalogDAO {
	
	private final int MAX_NUM_EXPRESSIONS = 1000; //Maximum number of expressions accepted by oracle
	
    @Override
    public PagedData<ChemicalCatalogItem> searchCatalog(CatalogSearchForm input) {
        // Searching will ignore records with status != 1
        MapSqlParameterSource params = new MapSqlParameterSource();

        StringBuilder chemicalQuery = new StringBuilder(
                "SELECT\n" +
                        "    DISTINCT\n" +
                        "    NULL AS CHM_PRDC_N,\n" +
                        "    NULL AS CHM_PRDCMFR_N,\n" +
                        "    CTG.CHM_N, CTG.CHM_NM_T, CTG.CHM_LBL_T,\n" +
                        "    CTG.CAS_N,\n" +
                        "    CTG.REGL_C, CTG.REGL_T,\n" +
                        "    NULL AS ORG_Q, NULL AS MSRUNIT_C, NULL AS MSRUNIT_T, \n" +
                        "    NULL AS CONC_Q, NULL AS CONCUNIT_C, NULL AS CONCUNIT_T,\n" +
                        "    NULL AS PHYFM_C, NULL AS PHYFM_T,\n" +
                        "    NULL AS CHM_GRD_C, NULL AS CHM_GRD_T,\n" +
                        "    NULL AS MFR_C, NULL AS MFR_T,\n" +
                        "    NULL AS MSRUNIT_ABBR, CTG.CHMWTP_C, \n" +
                        "    CTG.CHM_TP_T, \n" +
                        "    NULL AS CB_CON_N, \n" +
                        "    NULL AS CB_CRCY_C, NULL AS CB_CRCY_T, NULL AS CB_DECIMAL_F,\n" +
                        "    NULL AS CB_SUPP_C, NULL AS CB_SUPP_T, \n" +
                        "    NULL AS CB_SUPP_PART_N, \n" +
                        "    NULL AS CB_MSRUNIT_C, NULL AS CB_MSRUNIT_T, NULL AS CB_PRDC_QTY_Q, \n" +
                        "    NULL AS CB_TIERS \n" +
                        "FROM\n" +
                        "    HMMS_PRS_CHM_CTG CTG\n" +
                        "WHERE\n" +
                        "    CTG.REC_STS_C = '1' ");

        StringBuilder productQuery = new StringBuilder(
                "SELECT\n" +
                        "    PRD.CHM_PRDC_N,\n" +
                        "    PRD.CHM_PRDCMFR_N,\n" +
                        "    PRD.CHM_N, PRD.CHM_NM_T, NULL AS CHM_LBL_T,\n" +
                        "    PRD.CAS_N,\n" +
                        "    PRD.REGL_C, PRD.REGL_T,\n" +
                        "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, \n" +
                        "    PRD.CONC_Q, PRD.CONCUNIT_C, INITCAP(PRD.CONCUNIT_T) AS CONCUNIT_T,\n" +
                        "    PRD.PHYFM_C, INITCAP(PRD.PHYFM_T) AS PHYFM_T,\n" +
                        "    PRD.CHM_GRD_C, INITCAP(PRD.CHM_GRD_T) AS CHM_GRD_T,\n" +
                        "    PRD.MFR_C, PRD.MFR_T,\n" +
                        "    OU.MSRUNIT_T1 AS MSRUNIT_ABBR, PRD.CHMWTP_C,\n" +
                        "    CTG.CHM_TP_T, \n" +
                        "    NULL AS CB_CON_N, \n" +
                        "    NULL AS CB_CRCY_C, NULL AS CB_CRCY_T, NULL AS CB_DECIMAL_F,\n" +
                        "    NULL AS CB_SUPP_C, NULL AS CB_SUPP_T, \n" +
                        "    NULL AS CB_SUPP_PART_N, \n" +
                        "    NULL AS CB_MSRUNIT_C, NULL AS CB_MSRUNIT_T, NULL AS CB_PRDC_QTY_Q, \n" +
                        "    NULL AS CB_TIERS \n" +
                        "FROM\n" +
                        "    HMMS_PRS_CHM_PRD PRD\n" +
                        "    JOIN HMMS_PRS_CHM_CTG CTG ON PRD.CHM_N = CTG.CHM_N \n" +
                        "    LEFT JOIN MSRUNIT OU ON OU.MSRUNIT_C = PRD.MSRUNIT_C\n" +
                        "WHERE\n" +
                        "    PRD.REC_STS_C = '1' ");

        StringBuilder catalogQuery = new StringBuilder(
                "SELECT \n" +
                        "    PRD.CHM_PRDC_N,\n" +
                        "    PRD.CHM_PRDCMFR_N,\n" +
                        "    PRD.CHM_N, PRD.CHM_NM_T, NULL AS CHM_LBL_T,\n" +
                        "    PRD.CAS_N,\n" +
                        "    PRD.REGL_C, PRD.REGL_T,\n" +
                        "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, \n" +
                        "    PRD.CONC_Q, PRD.CONCUNIT_C, INITCAP(PRD.CONCUNIT_T) AS CONCUNIT_T,\n" +
                        "    PRD.PHYFM_C, INITCAP(PRD.PHYFM_T) AS PHYFM_T,\n" +
                        "    PRD.CHM_GRD_C, INITCAP(PRD.CHM_GRD_T) AS CHM_GRD_T,\n" +
                        "    PRD.MFR_C, PRD.MFR_T,\n" +
                        "    OU.MSRUNIT_T1 AS MSRUNIT_ABBR, PRD.CHMWTP_C,\n" +
                        "    CTG.CHM_TP_T,\n" +
                        "    pcp.con_n AS CB_CON_N, \n" +
                        "    curr.crcy_c AS CB_CRCY_C, curr.crcy_t AS CB_CRCY_T, curr.decimal_f AS CB_DECIMAL_F, \n" +
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
                        "    JOIN HMMS_PRS_CHM_PRD PRD ON pcpd.prdc_ref_n = prd.chm_prdc_n\n" +
                        "    JOIN HMMS_PRS_CHM_CTG CTG ON PRD.CHM_N = CTG.CHM_N \n" +
                        "    JOIN PRSSUPPLIER supp ON pcs.supp_c = supp.supp_c\n" +
                        "    JOIN PRSCURRENCY curr ON curr.crcy_c = NVL(pcs.crcy_c, pcp.crcy_c)\n" +
                        "    JOIN MSRUNIT cu ON pcpd.msrunit_c = cu.msrunit_c\n" +
                        "    LEFT JOIN MSRUNIT OU ON OU.MSRUNIT_C = PRD.MSRUNIT_C\n" +
                        "WHERE\n" +
                        "    PRD.REC_STS_C = '1' \n" +
                        "    AND pcpd.prdc_cat_c = 'PRODUCT_CHEMICAL'\n" +
                        "    AND pcp.con_sts_c = 'PERIOD_CTRCT_STS_PUBLISH' \n" +
                        "    AND pcp.con_st_d <= sysdate\n" +
                        "    AND pcp.con_end_d >= sysdate "
        );

        if (StringUtils.isNotBlank(input.getChemicalName())) {
            if (input.getChemicalName().startsWith("\"") && input.getChemicalName().endsWith("\"")) {
                // Exact match.
                chemicalQuery.append(" AND (UPPER(CTG.CHM_NM_T) = :chemicalName)");
                productQuery.append(" AND (UPPER(PRD.CHM_NM_T) = :chemicalName)");
                catalogQuery.append(" AND (UPPER(PRD.CHM_NM_T) = :chemicalName)");

                String chemicalName = input.getChemicalName().toUpperCase();
                chemicalName = chemicalName.substring(1, chemicalName.length() - 1);
                params.addValue("chemicalName", chemicalName);
            } else {
                // Partial match.
                chemicalQuery.append(" AND (UPPER(CTG.CHM_NM_T) LIKE :chemicalName OR UPPER(CTG.CHM_LBL_T) LIKE :chemicalName)");
                productQuery.append(" AND (UPPER(PRD.CHM_NM_T) LIKE :chemicalName)");
                catalogQuery.append(" AND (UPPER(PRD.CHM_NM_T) LIKE :chemicalName)");

                params.addValue("chemicalName", "%" + input.getChemicalName().toUpperCase().trim() + "%");
            }
        }

        if (StringUtils.isNotBlank(input.getCasNumber())) {
            chemicalQuery.append(" AND UPPER(CTG.CAS_N) LIKE :casNumber ");
            productQuery.append(" AND UPPER(PRD.CAS_N) LIKE :casNumber ");
            catalogQuery.append(" AND UPPER(PRD.CAS_N) LIKE :casNumber ");

            params.addValue("casNumber", "%" + input.getCasNumber().toUpperCase().trim() + "%");
        }

        if (StringUtils.isNotBlank(input.getProductNumber())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no product number.
            productQuery.append(" AND UPPER(PRD.CHM_PRDCMFR_N) = :productNumber ");
            catalogQuery.append(" AND UPPER(PRD.CHM_PRDCMFR_N) = :productNumber ");

            params.addValue("productNumber", input.getProductNumber().toUpperCase().trim());
        }

        if (CollectionUtils.isNotEmpty(input.getManufacturerCodes())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no manufacturers.
            productQuery.append(" AND PRD.MFR_C IN (:manufacturerCodes) ");
            catalogQuery.append(" AND PRD.MFR_C IN (:manufacturerCodes) ");

            params.addValue("manufacturerCodes", input.getManufacturerCodes());
        }

        if (StringUtils.isNotBlank(input.getPackagingSize())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no packaging size.
            productQuery.append(" AND PRD.ORG_Q = :packagingSize ");
            catalogQuery.append(" AND PRD.ORG_Q = :packagingSize ");

            params.addValue("packagingSize", input.getPackagingSize());
        }

        if (StringUtils.isNotBlank(input.getPackagingUnit())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no packaging unit.
            productQuery.append(" AND PRD.MSRUNIT_C = :packagingUnit ");
            catalogQuery.append(" AND PRD.MSRUNIT_C = :packagingUnit ");

            params.addValue("packagingUnit", input.getPackagingUnit());
        }

        if (StringUtils.isNotBlank(input.getConcentration())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no concentration.
            productQuery.append(" AND PRD.CONC_Q = :concentration ");
            catalogQuery.append(" AND PRD.CONC_Q = :concentration ");

            params.addValue("concentration", input.getConcentration());
        }

        if (StringUtils.isNotBlank(input.getConcentrationUnitCode())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no concentration unit.
            productQuery.append(" AND PRD.CONCUNIT_C = :concentrationUnit ");
            catalogQuery.append(" AND PRD.CONCUNIT_C = :concentrationUnit ");

            params.addValue("concentrationUnit", input.getConcentrationUnitCode());
        }

        if (StringUtils.isNotBlank(input.getGradeCode())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no grade.
            productQuery.append(" AND PRD.CHM_GRD_C = :gradeCode ");
            catalogQuery.append(" AND PRD.CHM_GRD_C = :gradeCode ");

            params.addValue("gradeCode", input.getGradeCode());
        }

        if (StringUtils.isNotBlank(input.getPhysicalFormCode())) {
            chemicalQuery.append(" AND 1 = 0 "); // <- Chemical catalog has no physical form.
            productQuery.append(" AND PRD.PHYFM_C = :physicalFormCode ");
            catalogQuery.append(" AND PRD.PHYFM_C = :physicalFormCode ");

            params.addValue("physicalFormCode", input.getPhysicalFormCode());
        }

        // Faculty/Department filtering for Catalog Buy items.
        StringBuilder catalogLevelCriteria = new StringBuilder(" pcp.con_lvl_c = :pcCampusLevel \n");
        params.addValue("pcCampusLevel", PeriodContractApplicableFor.PERIOD_CTRCT_AC_CAMPUS.toString());

        if (CollectionUtils.isNotEmpty(input.getFacultyDepartments())) {
            params.addValue("pcFacultyLevel", PeriodContractApplicableFor.PERIOD_CTRCT_AC_FAC.toString());
            params.addValue("pcDepartmentLevel", PeriodContractApplicableFor.PERIOD_CTRCT_AC_DEPT.toString());

            List<String> facultyCodeList = new ArrayList<>(input.getFacultyDepartments().size());

            int count = 0;
            for (Faculty f: input.getFacultyDepartments()) {
                count++;
                facultyCodeList.add(f.getFaculty());

                if (CollectionUtils.isNotEmpty(f.getDepartments())) {
                    catalogLevelCriteria.append(" OR (pcp.con_lvl_c = :pcDepartmentLevel AND EXISTS (\n");
                    catalogLevelCriteria.append("     SELECT pca.access_n \n");
                    catalogLevelCriteria.append("     FROM prs_prdcontract_access pca \n");
                    catalogLevelCriteria.append("     WHERE pca.prdcon_seq_n = pcp.prdcon_seq_n\n");
                    catalogLevelCriteria.append("         AND pca.fac_c = :pcDeptFac").append(count).append("\n");
                    catalogLevelCriteria.append("         AND pca.dept_c IN (:pcDeptFacList").append(count).append("))) \n");

                    params.addValue("pcDeptFac" + count, f.getFaculty());
                    params.addValue("pcDeptFacList" + count, f.getDepartments().stream()
                            .map(Department::getDepartment)
                            .collect(Collectors.toList()));
                }
            }

            catalogLevelCriteria.append("OR (pcp.con_lvl_c = :pcFacultyLevel AND EXISTS (\n");
            catalogLevelCriteria.append("     SELECT pca.access_n \n");
            catalogLevelCriteria.append("     FROM prs_prdcontract_access pca \n");
            catalogLevelCriteria.append("     WHERE pca.prdcon_seq_n = pcp.prdcon_seq_n\n");
            catalogLevelCriteria.append("         AND pca.fac_c IN (:pcFacCList))) \n");
            params.addValue("pcFacCList", facultyCodeList);
        }
        catalogQuery.append(" AND (").append(catalogLevelCriteria).append(" ) ");

        StringBuilder finalQuery = new StringBuilder();
        if (Boolean.TRUE.equals(input.getExcludeProducts()) || Constants.NO.equals(input.getFilterProducts())) {
            finalQuery.append(chemicalQuery);
        } else if (Constants.YES.equals(input.getFilterProducts())) {
            finalQuery.append(productQuery);
        } else if ("C".equals(input.getFilterProducts())) {
            finalQuery.append(catalogQuery);
        }else {
            finalQuery.append("SELECT * FROM (\n")
                    .append(chemicalQuery)
                    .append("\nUNION ALL\n")
                    .append(productQuery)
                    .append("\nUNION ALL\n")
                    .append(catalogQuery)
                    .append(")\n");
        }

        return applyWithPagingAndSorting(
                input,
                finalQuery.toString(),
                params,
                this::chemicalCatalogItemRowMapper
        );
    }
    
    @Override
    public PagedData<BiologicalCatalogItem> searchBiologicalCatalogItems(BiologicalCatalogSearchForm input) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        
        StringBuilder biologicalMaterialQuery = new StringBuilder(
                "SELECT\n" +
                        "    DISTINCT\n" +
                        "    NULL AS BIO_PRDC_N,\n" +
                        "    CTG.BIO_N, CTG.BIO_T,\n" +
                        "    NULL AS BIO_NOTNTP_C, NULL AS BIO_CONCACTL_N, \n" +
                        "    NULL AS BIO_CONCCOEFF_N, NULL AS BIO_CONCBASE_N, NULL AS BIO_CONCEXPON_N, \n" +
                        "    NULL AS BIO_CONCMSRUNIT_C, NULL AS BIO_CONCMSRUNIT_T2, \n" +
                        "    NULL AS ORG_Q, NULL AS BIO_MSRUNIT_C, NULL AS BIO_MSRUNIT_T2, \n" +
                        "    NULL AS MFR_C, NULL AS MFR_T, NULL AS BIO_MFRPRDC_N, \n" +
                        "    CTG.BIO_CAT_C, CTG.BIO_TP_C, CTG.BIO_ORG_C, CTG.BIO_ORGANTP_C, \n" +
                        "    CTG.BIO_CAT_T, CTG.BIO_TP_T, CTG.BIO_ORG_T, CTG.BIO_ORGANTP_T, \n" +
                        "    CTG.BIO_REGL_C AS REGL_C, CTG.BIO_REGL_T AS REGL_T,\n" +
                        "    NULL AS BIO_SAFETYLVL_T, NULL AS BIO_SAFETYLVL_C, \n" +
                        "    NULL AS GMO_F, \n" +
                        "    NULL AS BIO_PRDCFORMAT_T, NULL AS BIO_PRDCFORMAT_C \n" +
                        "FROM\n" +
                        "    HMMS_PRS_BIO_CTG CTG\n" +
                        "WHERE\n" +
                        "    (CTG.DEFUNCT_F IS NULL OR CTG.DEFUNCT_F <> 'Y') ");
        
        StringBuilder biologicalProductQuery = new StringBuilder(
                "SELECT\n" +
                        "    PRD.BIO_PRDC_N, \n" +
                        "    PRD.BIO_N, PRD.BIO_T, \n" +
                        "    PRD.BIO_NOTNTP_C, PRD.BIO_CONCACTL_N, \n" +
                        "    PRD.BIO_CONCCOEFF_N, PRD.BIO_CONCBASE_N, PRD.BIO_CONCEXPON_N, \n" +
                        "    PRD.BIO_CONCMSRUNIT_C, PRD.BIO_CONCMSRUNIT_T2, PRD.BIO_CONCMSRUNIT_T1, \n" +
                        "    PRD.ORG_Q, PRD.BIO_MSRUNIT_C, PRD.BIO_MSRUNIT_T2, \n" +
                        "    PRD.MFR_C, PRD.MFR_T, \n" +
                        "    PRD.BIO_MFRPRDC_N, \n" +
                        "    PRD.BIO_CAT_C, PRD.BIO_TP_C, PRD.BIO_ORG_C, PRD.BIO_ORGANTP_C, \n" +
                        "    PRD.BIO_CAT_T, PRD.BIO_TP_T, PRD.BIO_ORG_T, PRD.BIO_ORGANTP_T, \n" +
                        "    CTG.BIO_REGL_C AS REGL_C, CTG.BIO_REGL_T AS REGL_T,\n" +
                        "    PRD.BIO_SAFETYLVL_T, PRD.BIO_SAFETYLVL_C, PRD.GMO_F, PRD.BIO_PRDCFORMAT_T, PRD.BIO_PRDCFORMAT_C \n" +
                        "FROM\n" +
                        "    HMMS_PRS_BIO_PRD PRD\n" +
                        "    JOIN HMMS_PRS_BIO_CTG CTG ON PRD.BIO_N = CTG.BIO_N \n" +
                        "WHERE\n" +
                        "    (PRD.DEFUNCT_F IS NULL OR PRD.DEFUNCT_F <> 'Y') ");
        
        StringBuilder finalQuery = new StringBuilder();
        
        if (StringUtils.isNotEmpty(input.getCategoryCode())) {
            biologicalMaterialQuery.append(" AND UPPER(CTG.BIO_CAT_C) = :categoryCode ");
            biologicalProductQuery.append(" AND UPPER(PRD.BIO_CAT_C) = :categoryCode ");

            params.addValue("categoryCode", input.getCategoryCode());
        }
        
        if (StringUtils.isNotEmpty(input.getBiologicalTypeCode())) {
            biologicalMaterialQuery.append(" AND UPPER(CTG.BIO_TP_C) = :typeCode ");
            biologicalProductQuery.append(" AND UPPER(PRD.BIO_TP_C) = :typeCode ");

            params.addValue("typeCode", input.getBiologicalTypeCode());
        }
        
        if (StringUtils.isNotEmpty(input.getOriginCode())) {
            biologicalMaterialQuery.append(" AND UPPER(CTG.BIO_ORG_C) = :originCode ");
            biologicalProductQuery.append(" AND UPPER(PRD.BIO_ORG_C) = :originCode ");

            params.addValue("originCode", input.getOriginCode());
        }
        
        if (StringUtils.isNotEmpty(input.getOrganSampleTypeCode())) {
            biologicalMaterialQuery.append(" AND UPPER(CTG.BIO_ORGANTP_C) = :organTypeCode ");
            biologicalProductQuery.append(" AND UPPER(PRD.BIO_ORGANTP_C) = :organTypeCode ");

            params.addValue("organTypeCode", input.getOrganSampleTypeCode());
        }
        
        if (StringUtils.isNotEmpty(input.getScientificName())) {
            biologicalMaterialQuery.append(" AND CTG.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_SCI_T) LIKE :scientificName OR UPPER(AGT.COMMON_NAME) LIKE :scientificName ) ");
            biologicalProductQuery.append(" AND PRD.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_SCI_T) LIKE :scientificName OR UPPER(AGT.COMMON_NAME) LIKE :scientificName ) ");

            params.addValue("scientificName", "%" + input.getScientificName().trim().toUpperCase() + "%");
        }
        
        if (StringUtils.isNotEmpty(input.getStrain())) {
            biologicalMaterialQuery.append(" AND CTG.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_STRAIN_T) LIKE :strain ) ");
            biologicalProductQuery.append(" AND PRD.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_STRAIN_T) LIKE :strain ) ");

            params.addValue("strain", "%" + input.getStrain().trim().toUpperCase() + "%");
        }
        
        if (StringUtils.isNotEmpty(input.getBiologicalMaterialName())) {
            biologicalMaterialQuery.append(" AND (UPPER(CTG.BIO_T) LIKE :materialName OR CTG.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_T) LIKE :materialName )) ");
            biologicalProductQuery.append(" AND (UPPER(PRD.BIO_T) LIKE :materialName OR PRD.BIO_N IN (SELECT AGT.BIO_N FROM HMMS_PRS_BIOAGENT AGT WHERE UPPER(AGT.BIO_T) LIKE :materialName )) ");

            params.addValue("materialName", "%" + input.getBiologicalMaterialName().trim().toUpperCase() + "%");
        }
        
        if (StringUtils.isNotEmpty(input.getProductNumber())) {
            biologicalMaterialQuery.append(" AND 1 = 0 "); // <- biological material has no product number.
            biologicalProductQuery.append(" AND UPPER(PRD.BIO_MFRPRDC_N) = :productNumber ");

            params.addValue("productNumber", input.getProductNumber().toUpperCase());
        }

        if (CollectionUtils.isNotEmpty(input.getManufacturerCodes())) {
            biologicalMaterialQuery.append(" AND 1 = 0 "); // <- biological material has no manufacturers.
            biologicalProductQuery.append(" AND PRD.MFR_C IN (:manufacturerCodes) ");

            params.addValue("manufacturerCodes", input.getManufacturerCodes());
        }
        
        
        //Added for sqrr product check
  		if (StringUtils.isNotBlank(input.getBiologicalId())) {
  			biologicalMaterialQuery.append(" AND UPPER(CTG.BIO_N) = :bioId "); 
      		biologicalProductQuery.append(" AND UPPER(PRD.BIO_N) = :bioId ");

            params.addValue("bioId", input.getBiologicalId());
      	}
  		
	    if (StringUtils.isNotBlank(input.getGeneticallyModified())) {
	    	biologicalMaterialQuery.append(" AND 1 = 0 ");
			biologicalProductQuery.append(" AND PRD.GMO_F = :geneticallyModified ");
			
			params.addValue("geneticallyModified", input.getGeneticallyModified());
	    }
          
		if (StringUtils.isNotBlank(input.getProductFormatCode())) {
			biologicalMaterialQuery.append(" AND 1 = 0 ");
			biologicalProductQuery.append(" AND PRD.BIO_PRDCFORMAT_C = :productFormatCode ");

			params.addValue("productFormatCode", input.getProductFormatCode());
		}
          
		if (StringUtils.isNotBlank(input.getBioSafetyLevelCode())) {
			biologicalMaterialQuery.append(" AND 1 = 0 ");
			biologicalProductQuery.append(" AND PRD.BIO_SAFETYLVL_C = :safetyLevelCode ");

			params.addValue("safetyLevelCode", input.getBioSafetyLevelCode());
		}
          
		if (input.getPackagingSize() != null) {
			biologicalProductQuery.append(" AND PRD.ORG_Q = :originalQuantity ");

			params.addValue("originalQuantity", input.getPackagingSize());

			if (StringUtils.isNotBlank(input.getPackagingSizeUnitCode())) {
				biologicalProductQuery.append(" AND PRD.BIO_MSRUNIT_C = :originalQuantityUnitCode ");

				params.addValue("originalQuantityUnitCode", input.getPackagingSizeUnitCode());
			}
		}
          
          
		if (input.getConcentration() != null
				&& !input.getConcentration().isEmpty()) {
			NumericalValue nv = input.getConcentration();
			if (nv.getReal() != null) {
				biologicalProductQuery.append(" AND PRD.BIO_CONCACTL_N = :concReal ");
				params.addValue("concReal", nv.getReal());

			} else {
				biologicalProductQuery.append(" AND PRD.BIO_CONCCOEFF_N = :concCoef ");
				params.addValue("concCoef", nv.getCoefficient());

				biologicalProductQuery.append(" AND PRD.BIO_CONCBASE_N = :concBase ");
				params.addValue("concBase", nv.getBase());

				biologicalProductQuery.append(" AND PRD.BIO_CONCEXPON_N = :concExpon ");
				params.addValue("concExpon", nv.getExponent());
			}

			if (StringUtils.isNotBlank(input.getConcentrationUnitCode())) {
				biologicalProductQuery.append(" AND PRD.BIO_CONCMSRUNIT_C = :concMsrUnitCode ");
				params.addValue("concMsrUnitCode", input.getConcentrationUnitCode());
			}
		}
        
        if(Boolean.TRUE.equals(input.getExcludeProducts())) {
            finalQuery.append(biologicalMaterialQuery);
        } else {
            finalQuery.append(biologicalProductQuery);
        }
        
         PagedData<BiologicalCatalogItem> items = applyWithPagingAndSorting(
                input,
                finalQuery.toString(),
                params,
                this::biologicalCatalogItemRowMapper
        );
         
         if(items.getData() != null && !items.getData().isEmpty()) {
             this.getBiologicalAgents(items.getData());
         }
         
         return items;
    }

    private void getBiologicalAgents(List<BiologicalCatalogItem> items) {
        Map<String, List<BiologicalCatalogItem>> catalogItemMap = items.stream()
                .collect(Collectors.groupingBy(BiologicalCatalogItem::getBiologicalId));

        
        List<Set<String>> bioIdChunks = new ArrayList<>();

        
        int j = 0;
        while (j<items.size()) {
        	Set<String> set = new HashSet<>();
        	for (; j<items.size() && set.size() < MAX_NUM_EXPRESSIONS; j++) {
        		BiologicalCatalogItem item = items.get(j);
        		if (StringUtils.isNotBlank(item.getBiologicalId())) {
        			set.add(item.getBiologicalId());
        		}
        	}
        	
        	bioIdChunks.add(set);
        }

        if(CollectionUtils.isNotEmpty(bioIdChunks)) {
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("biologicalIds", bioIdChunks.get(0));

            StringBuilder queryBuilder = new StringBuilder(" SELECT BIO_N,BIO_SCI_T, COMMON_NAME, BIO_STRAIN_T, BIO_T,\n"
                            + "BIO_PRDCMOH_T, BIO_PRDCAVS_T, BIO_HS_T, BIO_REGL_T \n"
                            + "FROM HMMS_PRS_BIOAGENT \n"
                            + "WHERE BIO_N IN (:biologicalIds) \n");
            
            for (int i=1; i<bioIdChunks.size(); i++) {
            	queryBuilder.append("OR BIO_N IN (:biologicalIds"+ i +") \n");
            	params.addValue("biologicalIds"+i, bioIdChunks.get(i));
            }
            
            
            this.prsNamedJdbcTemplate.query(
            		queryBuilder.toString(),
                    params, (rs, i) -> this.biologicalAgentRowMapper(rs, i, catalogItemMap));
        }
    }
    
    @Override
    public PagedData<RadioactiveCatalogItem> searchRadioactiveCatalogItems(RadioactiveCatalogSearchForm input) {
    	MapSqlParameterSource params = new MapSqlParameterSource();
    	
    	StringBuilder finalQuery = new StringBuilder();
    	StringBuilder radactQry = queryBuildRadioactiveOnly();
    	StringBuilder productQry = queryBuildRadactProductsOnly();
    	
    	if(StringUtils.isNotEmpty(input.getRadionuclides())) {
    		radactQry.append(" AND (UPPER(CTG.RADNUCLD_T) LIKE :radioNuclides OR UPPER(CTG.RADNUCLD_LABELDESC_T) LIKE :radioNuclides)");
    		productQry.append(" AND (UPPER(PRD.RADNUCLD_T) LIKE :radioNuclides OR UPPER(PRD.RADNUCLD_LABELDESC_T) LIKE :radioNuclides)");
    		String radNuclides = input.getRadionuclides().trim().toUpperCase();
    		
    		params.addValue("radioNuclides", "%" + radNuclides + "%");
    	}
    	
    	if(StringUtils.isNoneEmpty(input.getMaterialName())) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND (UPPER(PRD.RADNUCLD_PRDCDESC_T) LIKE :materialName)");
    		String materialName = input.getMaterialName().trim().toUpperCase();
    		
    		params.addValue("materialName", "%" + materialName + "%");
    	}
    	
    	if(StringUtils.isNotEmpty(input.getProductNumber())) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND (UPPER(PRD.RADNUCLD_MFRPRDC_N) LIKE :productNumber)");
    		String productNumber = input.getProductNumber().trim().toUpperCase();
    		
    		params.addValue("productNumber", "%" + productNumber + "%");
    	}
    	
    	if(input.getRadioactiveSourceType() != null) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND (PRD.RADNUCLD_SRCETP_C = :sourceTypeCode)");
    		String sourceTypeCode = input.getRadioactiveSourceType().getCode();
    		params.addValue("sourceTypeCode", sourceTypeCode);
    	}
    	
    	if(StringUtils.isNotEmpty(input.getPhysicalFormCode())) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND (PRD.PHYFM_C = :physicalFormCode)");
    		String physicalFormCode = input.getPhysicalFormCode().trim().toUpperCase();
    		params.addValue("physicalFormCode", physicalFormCode);
    	}
    	
    	if(input.getManufacturerCodes() != null && !input.getManufacturerCodes().isEmpty()) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND PRD.MFR_C IN (:manufacturerCodes) ");

            params.addValue("manufacturerCodes", input.getManufacturerCodes());
    	}
    	
    	if(input.getActivity() != null && input.getActivity().getReal() != null 
    			&& StringUtils.isNotEmpty(input.getActivityUnit())) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND RADNUCLD_PRDC_N IN\n"
    				+ "(SELECT RADNUCLD_PRDC_N\n"
    				+ "FROM HMMS_PRS_RADNUCLD_ACTIVITY ACT\n"
    				+ "WHERE (ACT.RADACTIV_ACTL_N = :activityRealNum)\n"
    				+ "AND (ACT.RADACTIV_MSRUNIT_C = :activityUnitOfMeasure))");
    		
    		Double activActlNum = input.getActivity().getReal().doubleValue();
    		params.addValue("activityRealNum", activActlNum);
    		
    		String activityUnitOfMeasure = input.getActivityUnit();
    		params.addValue("activityUnitOfMeasure", activityUnitOfMeasure);
    	}
    	
    	if ((input.getActivity() == null || input.getActivity().getReal() == null) 
    			&& StringUtils.isNotEmpty(input.getActivityUnit())) {
    		radactQry.append(" AND 1 = 0 "); // na for non product
    		productQry.append(" AND RADNUCLD_PRDC_N IN\n"
    				+ "(SELECT RADNUCLD_PRDC_N\n"
    				+ "FROM HMMS_PRS_RADNUCLD_ACTIVITY ACT\n"
    				+ "WHERE (ACT.RADACTIV_MSRUNIT_C = :activityUnitOfMeasure)) ");
    		
    		String activityUnitOfMeasure = input.getActivityUnit();
    		params.addValue("activityUnitOfMeasure", activityUnitOfMeasure);
    	}
    	
    	if(Constants.YES.equals(input.getFilterProducts())) {
    		finalQuery.append(productQry);
    	} else if(Constants.NO.equals(input.getFilterProducts()) || Boolean.TRUE.equals(input.getExcludeProducts())) {
    		finalQuery.append(radactQry);
    	} else {
    		finalQuery.append("SELECT * FROM (\n")
            .append(radactQry)
            .append("\nUNION ALL\n")
            .append(productQry)
            .append(")\n");
    	}
    	
    	
    	PagedData<RadioactiveCatalogItem> items = applyWithPagingAndSorting(
                input,
                finalQuery.toString(),
                params,
                this::radioCatalogItemRowMapper
        );
    	
    	
    	if(items.getData() != null && !items.getData().isEmpty()) {
    		this.getRadionulideProductActivities(items.getData());
    	}
		    	
    	return items;
	}

	private void getRadionulideProductActivities(List<RadioactiveCatalogItem> items) {
        Map<String, RadioactiveCatalogItem> catlogMpTmp = new HashMap<>();
        List<String> catIdList = new ArrayList<>();

        items.forEach(e -> {
            if(e.getProductId() != null && StringUtils.isNotEmpty(e.getProductId())) {
                catIdList.add(e.getProductId());
                catlogMpTmp.put(e.getProductId(), e);
            }
        });

        if(!catIdList.isEmpty()) {
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("productIdList", catIdList);
            this.prsNamedJdbcTemplate.query(
                    " WITH ACTVY AS (SELECT a1.RADNUCLD_PRDC_N, p1.RADNUCLD_N, p1.RADNUCLD_T, p1.RADNUCLD_LABELDESC_T,\n"
                            + "RADACTIV_NOTNTP_C, RADACTIV_ACTL_N,\n"
                            + "RADACTIV_COEFF_N, RADACTIV_BASE_N, RADACTIV_EXPON_N,\n"
                            + "RADACTIV_MSRUNIT_C, RADACTIV_MSRUNIT_T, RADACTIV_MSRUNIT_T1,\n"
                            + "RADACTIVCONC_NOTNTP_C, RADACTIVCONC_ACTL_N,\n"
                            + "RADACTIVCONC_COEFF_N, RADACTIVCONC_BASE_N, RADACTIVCONC_EXPON_N,\n"
                            + "RADACTIVCONC_MSRUNIT_C, RADACTIVCONC_MSRUNIT_T, RADACTIVCONC_MSRUNIT_T1\n"
                            + "FROM HMMS_PRS_RADNUCLD_ACTIVITY a1\n "
                            + "JOIN HMMS_PRS_RADNUCLD_PRODUCT p1 ON a1.radnucld_prdc_n = p1.radnucld_prdc_n\n"
                            + "WHERE a1.RADNUCLD_N IS NULL\n "
                            + "UNION ALL\n"
                            + "SELECT a2.RADNUCLD_PRDC_N, c1.RADNUCLD_N, c1.RADNUCLD_T, c1.RADNUCLD_LABELDESC_T,\n"
                            + "RADACTIV_NOTNTP_C, RADACTIV_ACTL_N,\n"
                            + "RADACTIV_COEFF_N, RADACTIV_BASE_N, RADACTIV_EXPON_N,\n"
                            + "RADACTIV_MSRUNIT_C, RADACTIV_MSRUNIT_T, RADACTIV_MSRUNIT_T1,\n"
                            + "RADACTIVCONC_NOTNTP_C, RADACTIVCONC_ACTL_N,\n"
                            + "RADACTIVCONC_COEFF_N, RADACTIVCONC_BASE_N, RADACTIVCONC_EXPON_N,\n"
                            + "RADACTIVCONC_MSRUNIT_C, RADACTIVCONC_MSRUNIT_T, RADACTIVCONC_MSRUNIT_T1\n"
                            + "FROM HMMS_PRS_RADNUCLD_ACTIVITY a2\n"
                            + "JOIN HMMS_PRS_RADNUCLD_CATALOG c1 ON a2.RADNUCLD_N = c1.RADNUCLD_N\n"
                            + "WHERE a2.RADNUCLD_N IS NOT NULL)\n"
                            + "SELECT * FROM ACTVY\n"
                            + "WHERE ACTVY.RADNUCLD_PRDC_N IN (:productIdList)",
                    params, (rs, i) -> this.radionuclideActRowMapper1(rs, i, catlogMpTmp));

        }
    }
    
	RadioactiveActivity radionuclideActRowMapper1(ResultSet rs, int i,
			Map<String, RadioactiveCatalogItem> catalogMap) throws SQLException {
		
		RadioactiveActivity act = radioactiveActivityRowMapper(rs, i);
		RadioactiveCatalogItem ci = catalogMap.get(rs.getString("RADNUCLD_PRDC_N"));
		String [] nuclides = ci.getRadionuclideName().split(",");
		
		List<RadioactiveActivity> actMp = ci.getActivity();
		if (actMp == null) {
			actMp = new ArrayList<>(nuclides.length);
			ci.setActivity(actMp);
		}
		
		actMp.add(act);
		
		return act;
	}
    	
    RadioactiveActivity radioactiveActivityRowMapper(ResultSet rs, int i) throws SQLException {
        RadioactiveActivity activity = new RadioactiveActivity();
        String notType = rs.getString("RADACTIV_NOTNTP_C");
        if(StringUtils.isNotBlank(notType)) {
            NumericalValue numericalValue = new NumericalValue();
            activity.setActivity(numericalValue);

            numericalValue.setNotationType(NotationType.getNotationType(notType));
            numericalValue.setReal(BigDecimal.valueOf(rs.getDouble("RADACTIV_ACTL_N")));
            numericalValue.setBase(rs.getInt("RADACTIV_BASE_N"));
            numericalValue.setCoefficient(BigDecimal.valueOf(rs.getDouble("RADACTIV_COEFF_N")));
            numericalValue.setExponent(BigDecimal.valueOf(rs.getDouble("RADACTIV_EXPON_N")));

            UnitMsr uma = new UnitMsr(
                    rs.getString("RADACTIV_MSRUNIT_C"),
                    rs.getString("RADACTIV_MSRUNIT_T"),
                    rs.getString("RADACTIV_MSRUNIT_T1")
            );
            activity.setActivityUnit(uma);
        }

        String concNotType = rs.getString("RADACTIVCONC_NOTNTP_C");
        if(StringUtils.isNotBlank(concNotType)) {
            NumericalValue numericalValue = new NumericalValue();
            activity.setConcentration(numericalValue);

            numericalValue.setNotationType(NotationType.getNotationType(concNotType));
            numericalValue.setReal(BigDecimal.valueOf(rs.getDouble("RADACTIVCONC_ACTL_N")));
            numericalValue.setBase(rs.getInt("RADACTIVCONC_BASE_N"));
            numericalValue.setCoefficient(BigDecimal.valueOf(rs.getDouble("RADACTIVCONC_COEFF_N")));
            numericalValue.setExponent(BigDecimal.valueOf(rs.getDouble("RADACTIVCONC_EXPON_N")));

            UnitMsr umc = new UnitMsr(
                    rs.getString("RADACTIVCONC_MSRUNIT_C"),
                    rs.getString("RADACTIVCONC_MSRUNIT_T1"),
                    rs.getString("RADACTIVCONC_MSRUNIT_T")
            );
            activity.setConcentrationUnit(umc);
        }

        activity.setRadionuclideId(rs.getString("RADNUCLD_N"));
        activity.setRadionuclideName(rs.getString("RADNUCLD_T"));
        activity.setRadionuclideSynonyms(rs.getString("RADNUCLD_LABELDESC_T"));

        return activity;
    }
    
	RadioactiveCatalogItem radioCatalogItemRowMapper(ResultSet rs, int rowIdx) throws SQLException {

		RadioactiveCatalogItem catalogItem = new RadioactiveCatalogItem();

		catalogItem.setProductId(rs.getString("RADNUCLD_PRDC_N"));
		catalogItem.setRadionuclideId(rs.getString("RADNUCLD_N"));
		catalogItem.setRadionuclideName(rs.getString("RADNUCLD_T"));
		catalogItem.setRadionuclideSynonyms(rs.getString("RADNUCLD_LABELDESC_T"));
		catalogItem.setRadionuclideType(rs.getString("RADNUCLD_TP_T"));
		catalogItem.setRadionuclideTypeCode(rs.getString("RADNUCLD_TP_C"));

		catalogItem.setProductDescription(rs.getString("RADNUCLD_PRDCDESC_T"));

		catalogItem.setProductManufacturerNumber(rs.getString("RADNUCLD_MFRPRDC_N"));
		
		catalogItem.setOriginalQuantity(BigDecimal.valueOf(rs.getDouble("ORG_Q")));
		
		UnitMsr unitMsr = new UnitMsr();
		catalogItem.setOriginalQuantityUnit(unitMsr);
		if(StringUtils.isNotBlank(rs.getString("MSRUNIT_C")) 
				&& StringUtils.isNotBlank(rs.getString("MSRUNIT_T")) 
				&& StringUtils.isNotBlank(rs.getString("MSRUNIT_T1")) ) {
			unitMsr.setCode(rs.getString("MSRUNIT_C"));
			unitMsr.setDescription(rs.getString("MSRUNIT_T"));
			unitMsr.setAbbreviation(rs.getString("MSRUNIT_T1"));
		}

		if (StringUtils.isNotBlank(rs.getString("REG_T"))) {
			catalogItem.setRegulations(Collections.singletonList(rs.getString("REG_T")));
		}

		RadioactiveSourceType st = RadioactiveSourceType.getRadioactiveSourceType(rs.getString("RADNUCLD_SRCETP_C"));
		catalogItem.setSourceType(st);

        PhyForm pf = new PhyForm();
        catalogItem.setPhysicalForm(pf);
		if (StringUtils.isNotEmpty(rs.getString("PHYFM_C"))) {
			pf.setCode(rs.getString("PHYFM_C"));
			pf.setDescription(rs.getString("PHYFM_T"));
		}

		Manufacturer mf = new Manufacturer();
		catalogItem.setManufacturer(mf);
		if (StringUtils.isNotEmpty(rs.getString("MFR_C"))) {
			mf.setCode(rs.getString("MFR_C"));
			mf.setName(rs.getString("MFR_T"));
		}

		return catalogItem;

	}
    
    private StringBuilder queryBuildRadioactiveOnly() {
    	return new StringBuilder(
                "SELECT\n" +
                        "    DISTINCT\n" +
                        "    CTG.RADNUCLD_N, CTG.RADNUCLD_T, CTG.RADNUCLD_LABELDESC_T, CTG.RADNUCLD_TP_C, CTG.RADNUCLD_TP_T,\n" +
                        "    NULL AS RADNUCLD_PRDC_N,\n" +
                        "    NULL AS RADNUCLD_PRDCDESC_T,\n" +
                        "    NULL AS RADNUCLD_MFRPRDC_N,\n" +
                        "    NULL AS REG_T,\n" +
                        "    NULL AS RADNUCLD_SRCETP_C, NULL AS RADNUCLD_SRCETP_T,\n" +
                        "    NULL AS PHYFM_C, NULL AS PHYFM_T,\n" +
                        "    NULL AS MFR_C, NULL AS MFR_T,\n" +
                        "    NULL AS ORG_Q, NULL AS MSRUNIT_C, NULL AS MSRUNIT_T, NULL AS MSRUNIT_T1\n" +
                        "FROM\n" +
                        "    HMMS_PRS_RADNUCLD_CATALOG CTG\n" +
                        "WHERE\n" +
                        "    CTG.REC_STS_C = '1' ");
    }
    
    private StringBuilder queryBuildRadactProductsOnly() {
    	return new StringBuilder( "SELECT\n" +
                "    PRD.RADNUCLD_N, PRD.RADNUCLD_T, PRD.RADNUCLD_LABELDESC_T, PRD.RADNUCLD_TP_C, PRD.RADNUCLD_TP_T,\n" +
                "    PRD.RADNUCLD_PRDC_N,\n" +
                "    PRD.RADNUCLD_PRDCDESC_T,\n" +
                "    PRD.RADNUCLD_MFRPRDC_N,\n" +
                "    PRD.REG_T,\n" +
                "    PRD.RADNUCLD_SRCETP_C, PRD.RADNUCLD_SRCETP_T,\n" +
                "    PRD.PHYFM_C, PRD.PHYFM_T,\n" +
                "    PRD.MFR_C, PRD.MFR_T,\n" +
                "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, PRD.MSRUNIT_T1\n" +
                "FROM\n" +
                "    HMMS_PRS_RADNUCLD_PRODUCT PRD\n" +
                "WHERE\n" +
                "    PRD.REC_STS_C = '1' ");
    }

    @Override
    public List<CatalogItem> getCatalogById(ProductTypeCode productTypeCode, List<String> catalogItemIds) {
        List<CatalogItem> items = Collections.emptyList();

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("catalogItemIds", catalogItemIds);

        switch (productTypeCode) {
            case PRODUCT_CHEMICAL:
                items = this.prsNamedJdbcTemplate.query(
                        "SELECT\n" +
                        "    DISTINCT\n" +
                        "    NULL AS CHM_PRDC_N,\n" +
                        "    NULL AS CHM_PRDCMFR_N,\n" +
                        "    CTG.CHM_N, CTG.CHM_NM_T, CTG.CHM_LBL_T,\n" +
                        "    CTG.CAS_N,\n" +
                        "    CTG.REGL_C, CTG.REGL_T,\n" +
                        "    NULL AS ORG_Q, NULL AS MSRUNIT_C, NULL AS MSRUNIT_T, \n" +
                        "    NULL AS CONC_Q, NULL AS CONCUNIT_C, NULL AS CONCUNIT_T,\n" +
                        "    NULL AS PHYFM_C, NULL AS PHYFM_T,\n" +
                        "    NULL AS CHM_GRD_C, NULL AS CHM_GRD_T,\n" +
                        "    NULL AS MFR_C, NULL AS MFR_T,\n" +
                        "    NULL AS MSRUNIT_ABBR, CTG.CHMWTP_C, \n" +
                        "    CTG.CHM_TP_T \n" +
                        "FROM\n" +
                        "    HMMS_PRS_CHM_CTG CTG\n" +
                        "WHERE\n" +
                        "    CHM_N IN (:catalogItemIds)",
                        params,
                        this::chemicalCatalogItemRowMapper);
                break;

            case PRODUCT_RADIOACTIVE:
                items = this.prsNamedJdbcTemplate.query(
                        "SELECT\n" +
                        "    DISTINCT\n" +
                        "    CTG.RADNUCLD_N, CTG.RADNUCLD_T, CTG.RADNUCLD_LABELDESC_T, CTG.RADNUCLD_TP_C, CTG.RADNUCLD_TP_T,\n" +
                        "    NULL AS RADNUCLD_PRDC_N,\n" +
                        "    NULL AS RADNUCLD_PRDCDESC_T,\n" +
                        "    NULL AS RADNUCLD_MFRPRDC_N,\n" +
                        "    NULL AS REG_T,\n" +
                        "    NULL AS RADNUCLD_SRCETP_C, NULL AS RADNUCLD_SRCETP_T,\n" +
                        "    NULL AS PHYFM_C, NULL AS PHYFM_T,\n" +
                        "    NULL AS MFR_C, NULL AS MFR_T,\n" +
                        "    NULL AS ORG_Q, NULL AS MSRUNIT_C, NULL AS MSRUNIT_T, NULL AS MSRUNIT_T1\n" +
                        "FROM\n" +
                        "    HMMS_PRS_RADNUCLD_CATALOG CTG\n" +
                        "WHERE\n" +
                        "    ctg.RADNUCLD_N IN (:catalogItemIds) ",
                        params,
                        this::radioCatalogItemRowMapper
                );
                break;

            case PRODUCT_BIOLOGICAL:
                items = this.prsNamedJdbcTemplate.query(
                    "SELECT\n" +
                        "    DISTINCT\n" +
                        "    NULL AS BIO_PRDC_N,\n" +
                        "    CTG.BIO_N, CTG.BIO_T,\n" +
                        "    NULL AS BIO_NOTNTP_C, NULL AS BIO_CONCACTL_N, \n" +
                        "    NULL AS BIO_CONCCOEFF_N, NULL AS BIO_CONCBASE_N, NULL AS BIO_CONCEXPON_N, \n" +
                        "    NULL AS BIO_CONCMSRUNIT_C, NULL AS BIO_CONCMSRUNIT_T2, \n" +
                        "    NULL AS ORG_Q, NULL AS BIO_MSRUNIT_C, NULL AS BIO_MSRUNIT_T2, \n" +
                        "    NULL AS MFR_C, NULL AS MFR_T, NULL AS BIO_MFRPRDC_N, \n" +
                        "    CTG.BIO_CAT_C, CTG.BIO_TP_C, CTG.BIO_ORG_C, CTG.BIO_ORGANTP_C, \n" +
                        "    CTG.BIO_CAT_T, CTG.BIO_TP_T, CTG.BIO_ORG_T, CTG.BIO_ORGANTP_T, \n" +
                        "    CTG.BIO_REGL_C AS REGL_C, CTG.BIO_REGL_T AS REGL_T,\n" +
                        "    NULL AS BIO_SAFETYLVL_T, NULL AS BIO_SAFETYLVL_C, \n" +
                        "    NULL AS GMO_F, \n" +
                        "    NULL AS BIO_PRDCFORMAT_T, NULL AS BIO_PRDCFORMAT_C \n" +
                        "FROM\n" +
                        "    HMMS_PRS_BIO_CTG CTG\n" +
                        "WHERE\n" +
                        "    ctg.BIO_N IN (:catalogItemIds) ",
                        params,
                        this::biologicalCatalogItemRowMapper
                );

            default:
                break;
        }

        return items;
    }

    @Override
    public List<CatalogItem> getProductCatalogById(ProductTypeCode productTypeCode, List<String> productRefIds) {
        List<CatalogItem> items = Collections.emptyList();

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("productRefIds", productRefIds);

        switch (productTypeCode) {
            case PRODUCT_CHEMICAL:
                items = this.prsNamedJdbcTemplate.query(
                        "SELECT\n" +
                            "    PRD.CHM_PRDC_N,\n" +
                            "    PRD.CHM_PRDCMFR_N,\n" +
                            "    PRD.CHM_N, PRD.CHM_NM_T, NULL AS CHM_LBL_T,\n" +
                            "    PRD.CAS_N,\n" +
                            "    PRD.REGL_C, PRD.REGL_T,\n" +
                            "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, \n" +
                            "    PRD.CONC_Q, PRD.CONCUNIT_C, INITCAP(PRD.CONCUNIT_T) AS CONCUNIT_T,\n" +
                            "    PRD.PHYFM_C, INITCAP(PRD.PHYFM_T) AS PHYFM_T,\n" +
                            "    PRD.CHM_GRD_C, INITCAP(PRD.CHM_GRD_T) AS CHM_GRD_T,\n" +
                            "    PRD.MFR_C, PRD.MFR_T,\n" +
                            "    OU.MSRUNIT_T1 AS MSRUNIT_ABBR, PRD.CHMWTP_C, \n" +
                            "    CTG.CHM_TP_T \n" +
                            "FROM\n" +
                            "    HMMS_PRS_CHM_PRD PRD\n" +
                            "    JOIN HMMS_PRS_CHM_CTG CTG ON PRD.CHM_N = CTG.CHM_N \n" +
                            "    LEFT JOIN MSRUNIT OU ON OU.MSRUNIT_C = PRD.MSRUNIT_C\n" +
                            "WHERE\n" +
                            "    PRD.CHM_PRDC_N IN (:productRefIds)",
                        params,
                        this::chemicalCatalogItemRowMapper);
                break;

            case PRODUCT_BIOLOGICAL:
                List<BiologicalCatalogItem> biologicalCatalogItems = this.prsNamedJdbcTemplate.query(
                        "SELECT\n" +
                        "    PRD.BIO_PRDC_N, \n" +
                        "    PRD.BIO_N, PRD.BIO_T, \n" +
                        "    PRD.BIO_NOTNTP_C, PRD.BIO_CONCACTL_N, \n" +
                        "    PRD.BIO_CONCCOEFF_N, PRD.BIO_CONCBASE_N, PRD.BIO_CONCEXPON_N, \n" +
                        "    PRD.BIO_CONCMSRUNIT_C, PRD.BIO_CONCMSRUNIT_T2, PRD.BIO_CONCMSRUNIT_T1, \n" +
                        "    PRD.ORG_Q, PRD.BIO_MSRUNIT_C, PRD.BIO_MSRUNIT_T2, \n" +
                        "    PRD.MFR_C, PRD.MFR_T, \n" +
                        "    PRD.BIO_MFRPRDC_N, \n" +
                        "    PRD.BIO_CAT_C, PRD.BIO_TP_C, PRD.BIO_ORG_C, PRD.BIO_ORGANTP_C, \n" +
                        "    PRD.BIO_CAT_T, PRD.BIO_TP_T, PRD.BIO_ORG_T, PRD.BIO_ORGANTP_T, \n" +
                        "    CTG.BIO_REGL_C AS REGL_C, CTG.BIO_REGL_T AS REGL_T,\n" +
                        "    PRD.BIO_SAFETYLVL_T, PRD.BIO_SAFETYLVL_C, PRD.GMO_F, PRD.BIO_PRDCFORMAT_T, PRD.BIO_PRDCFORMAT_C \n" +
                        "FROM\n" +
                        "    HMMS_PRS_BIO_PRD PRD\n" +
                        "    JOIN HMMS_PRS_BIO_CTG CTG ON PRD.BIO_N = CTG.BIO_N \n" +
                        "WHERE\n" +
                        "    PRD.BIO_PRDC_N IN (:productRefIds) ",
                        params,
                        this::biologicalCatalogItemRowMapper);

                if (CollectionUtils.isNotEmpty(biologicalCatalogItems)) {
                    this.getBiologicalAgents(biologicalCatalogItems);
                }

                items = biologicalCatalogItems.stream()
                    .map(CatalogItem.class::cast)
                    .collect(Collectors.toList());

                break;

            case PRODUCT_RADIOACTIVE:
                List<RadioactiveCatalogItem> radioactiveCatalogItems = this.prsNamedJdbcTemplate.query(
                        "SELECT\n" +
                        "    PRD.RADNUCLD_N, PRD.RADNUCLD_T, PRD.RADNUCLD_LABELDESC_T, PRD.RADNUCLD_TP_C, PRD.RADNUCLD_TP_T,\n" +
                        "    PRD.RADNUCLD_PRDC_N,\n" +
                        "    PRD.RADNUCLD_PRDCDESC_T,\n" +
                        "    PRD.RADNUCLD_MFRPRDC_N,\n" +
                        "    PRD.REG_T,\n" +
                        "    PRD.RADNUCLD_SRCETP_C, PRD.RADNUCLD_SRCETP_T,\n" +
                        "    PRD.PHYFM_C, PRD.PHYFM_T,\n" +
                        "    PRD.MFR_C, PRD.MFR_T,\n" +
                        "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, PRD.MSRUNIT_T1\n" +
                        "FROM\n" +
                        "    HMMS_PRS_RADNUCLD_PRODUCT PRD\n" +
                        "WHERE\n" +
                        "    PRD.RADNUCLD_PRDC_N IN (:productRefIds) ",
                        params,
                        this::radioCatalogItemRowMapper);

                if (CollectionUtils.isNotEmpty(radioactiveCatalogItems)) {
                    this.getRadionulideProductActivities(radioactiveCatalogItems);
                }

                items = radioactiveCatalogItems.stream()
                    .map(CatalogItem.class::cast)
                    .collect(Collectors.toList());

                break;

            default:
                break;
        }

        return items;
    }
    
    @Override
    public ChemicalCatalogItem getProductCatalogByCriteria(ChemicalProductDetail chemicalProductdetail) {
        StringBuilder sqlQuery = new StringBuilder(
                    "SELECT\n" +
                    "    PRD.CHM_PRDC_N,\n" +
                    "    PRD.CHM_PRDCMFR_N,\n" +
                    "    PRD.CHM_N, PRD.CHM_NM_T, NULL AS CHM_LBL_T,\n" +
                    "    PRD.CAS_N,\n" +
                    "    PRD.REGL_C, PRD.REGL_T,\n" +
                    "    PRD.ORG_Q, PRD.MSRUNIT_C, PRD.MSRUNIT_T, \n" +
                    "    PRD.CONC_Q, PRD.CONCUNIT_C, INITCAP(PRD.CONCUNIT_T) AS CONCUNIT_T,\n" +
                    "    PRD.PHYFM_C, INITCAP(PRD.PHYFM_T) AS PHYFM_T,\n" +
                    "    PRD.CHM_GRD_C, INITCAP(PRD.CHM_GRD_T) AS CHM_GRD_T,\n" +
                    "    PRD.MFR_C, PRD.MFR_T,\n" +
                    "    OU.MSRUNIT_T1 AS MSRUNIT_ABBR, PRD.CHMWTP_C, \n" +
                    "    CTG.CHM_TP_T \n" +
                    "FROM\n" +
                    "    HMMS_PRS_CHM_PRD PRD \n" +
                    "    JOIN HMMS_PRS_CHM_CTG CTG ON PRD.CHM_N = CTG.CHM_N \n" +
                    "    LEFT JOIN MSRUNIT OU ON OU.MSRUNIT_C = PRD.MSRUNIT_C\n" +
                    "WHERE\n" +
                    "PRD.CHM_N = :chemicalId \n" +
                    "AND PRD.MFR_C = :manufacturerId \n" + 
                    "AND PRD.ORG_Q = :origQuantity \n" + 
                    "AND PRD.MSRUNIT_C = :unitOfMeasure \n" + 
                    "AND PRD.PHYFM_C = :physicalForm \n");
        
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("chemicalId", chemicalProductdetail.getChemicalNumber());
        params.addValue("productManufacturerNo", chemicalProductdetail.getProductManufacturerNumber());
        params.addValue("manufacturerId", chemicalProductdetail.getManufacturerCode());
        params.addValue("origQuantity", chemicalProductdetail.getOriginalQuantity());
        params.addValue("unitOfMeasure", chemicalProductdetail.getOriginalQuantityUnitCode());
        params.addValue("physicalForm", chemicalProductdetail.getPhysicalFormCode());
        
        if (StringUtils.isNotBlank(chemicalProductdetail.getProductManufacturerNumber())) {
        	sqlQuery.append("AND PRD.CHM_PRDCMFR_N = :productManufacturerNo \n"); 
        	params.addValue("productManufacturerNo", chemicalProductdetail.getProductManufacturerNumber());
        }else {
        	sqlQuery.append("AND PRD.CHM_PRDCMFR_N IS NULL \n");
        }

        if (chemicalProductdetail.getConcentration() != null) {
        	sqlQuery.append("AND PRD.CONC_Q = :concentration \n"); 
        	params.addValue("concentration", chemicalProductdetail.getConcentration());
        }else {
        	sqlQuery.append("AND PRD.CONC_Q IS NULL \n");
        }
        
        if (StringUtils.isNotBlank(chemicalProductdetail.getConcentrationUnitCode())) {
        	sqlQuery.append("AND PRD.CONCUNIT_C = :unitOfConcentration \n");
        	params.addValue("unitOfConcentration", chemicalProductdetail.getConcentrationUnitCode());
        }else {
        	sqlQuery.append("AND PRD.CONCUNIT_C IS NULL \n");
        }
        
        if (StringUtils.isNotBlank(chemicalProductdetail.getChemicalGradeCode())) {
        	sqlQuery.append("AND PRD.CHM_GRD_C = :grade \n");
        	params.addValue("grade", chemicalProductdetail.getChemicalGradeCode());
        }else {
        	sqlQuery.append("AND PRD.CHM_GRD_C IS NULL \n");
        }

        List<ChemicalCatalogItem> items = this.prsNamedJdbcTemplate.query(
        		sqlQuery.toString()
        		,
                params,
                this::chemicalCatalogItemRowMapper);


        return CollectionUtils.isNotEmpty(items) ? items.get(0) : null;
    }

    ChemicalCatalogItem chemicalCatalogItemRowMapper(ResultSet rs, int rowIdx) throws SQLException {
        String contractNumber = null;
        try {
            contractNumber = rs.getString("CB_CON_N");
        } catch (SQLException ignored) {}

        ChemicalCatalogItem pi = new ChemicalCatalogItem();

        pi.setProductId(rs.getString("CHM_PRDC_N"));
        pi.setProductManufacturerNumber(rs.getString("CHM_PRDCMFR_N"));

        pi.setChemicalNumber(rs.getString("CHM_N"));
        pi.setChemicalName(rs.getString("CHM_NM_T"));

        String synonyms = rs.getString("CHM_LBL_T");
        if (StringUtils.isNotEmpty(synonyms)) {
            pi.setSynonyms(Arrays.asList(synonyms.split("\\|\\|")));
        }

        String casNumbers = rs.getString("CAS_N");
        if (StringUtils.isNotEmpty(casNumbers)) {
            pi.setCasNumbers(Arrays.asList(casNumbers.split("\\|\\|")));
        }

        String regulationCodesStr = rs.getString("REGL_C");
        String regulationDescStr = rs.getString("REGL_T");
        String schedule = rs.getString("CHMWTP_C");
        if (StringUtils.isNotEmpty(regulationCodesStr)) {
            String[] regulationCodes = regulationCodesStr.split("\\|\\|");
            String[] regulationDesc = regulationDescStr.split("\\|\\|");

            pi.setRegulations(new ArrayList<>(regulationCodes.length));
            for (int i = 0; i < regulationCodes.length; i++) {
				ChemicalRegulation regulation = new ChemicalRegulation();
                regulation.setCode(regulationCodes[i]);
                regulation.setDescription(regulationDesc[i]);

                RegulationCheck regulationCheck = RegulationCheck.fromDescription(regulation.getDescription(), schedule);
                if (regulationCheck != null) {
                    regulation.setSchedule(regulationCheck.getSchedule());
                }

                pi.getRegulations().add(regulation);
            }
        }

        String originalQuantityStr = rs.getString("ORG_Q");
        UnitMsr originalQuantityUnit = new UnitMsr();
        pi.setOriginalQuantityUnit(originalQuantityUnit);
        if (StringUtils.isNotEmpty(originalQuantityStr)) {
            pi.setOriginalQuantity(new BigDecimal(originalQuantityStr));

            originalQuantityUnit.setCode(rs.getString("MSRUNIT_C"));
            originalQuantityUnit.setDescription(rs.getString("MSRUNIT_T"));
            originalQuantityUnit.setAbbreviation(rs.getString("MSRUNIT_ABBR"));
        }

        String concentrationStr = rs.getString("CONC_Q");
        ConcentrationUnit concentrationUnit = new ConcentrationUnit();
        pi.setConcentrationUnit(concentrationUnit);
        if (StringUtils.isNotEmpty(concentrationStr)) {
            pi.setConcentration(new BigDecimal(concentrationStr));

            concentrationUnit.setCode(rs.getString("CONCUNIT_C"));
            concentrationUnit.setDescription(rs.getString("CONCUNIT_T"));
        }

        String physicalFormCode = rs.getString("PHYFM_C");
        PhyForm physicalForm = new PhyForm();
        pi.setPhysicalForm(physicalForm);
        if (StringUtils.isNotEmpty(physicalFormCode)) {

            physicalForm.setCode(physicalFormCode);
            physicalForm.setDescription(rs.getString("PHYFM_T"));
        }

        String chemicalGradeCode = rs.getString("CHM_GRD_C");
        ChemicalGrade chemicalGrade = new ChemicalGrade();
        pi.setChemicalGrade(chemicalGrade);
        if (StringUtils.isNotEmpty(chemicalGradeCode)) {
            chemicalGrade.setCode(chemicalGradeCode);
            chemicalGrade.setDescription(rs.getString("CHM_GRD_T"));
        }

        String manufacturerCode = rs.getString("MFR_C");
        Manufacturer manufacturer = new Manufacturer();
        pi.setManufacturer(manufacturer);
        if (StringUtils.isNotEmpty(manufacturerCode)) {
            manufacturer.setCode(manufacturerCode);
            manufacturer.setName(rs.getString("MFR_T"));
        }

        pi.setChemicalType(rs.getString("CHM_TP_T"));

        if (StringUtils.isNotBlank(contractNumber)) {
            pi.setContractNumber(contractNumber);
            pi.setSupplierPartNumber(rs.getString("CB_SUPP_PART_N"));
            pi.setSupplier(new Supplier(rs.getString("CB_SUPP_C"), rs.getString("CB_SUPP_T")));
            pi.setCurrency(new Currency(rs.getString("CB_CRCY_C"), rs.getString("CB_CRCY_T"), Constants.YES.equals(rs.getString("CB_DECIMAL_F"))));
            pi.setContractUnit(Unit.valueOf(rs.getString("CB_MSRUNIT_T")));

            if (pi.getContractUnit() == Unit.BOX) {
                pi.setQuantityPerUnit(rs.getBigDecimal("CB_PRDC_QTY_Q"));
            }

            String pricing = rs.getString("CB_TIERS");
            String[] tiers = pricing.split("\\|");

            pi.setTiers(new ArrayList<>(tiers.length));
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

                pi.getTiers().add(tierForm);
            }
        }

        return pi;
    }
    
    /**
     * method to map create biological catalog item.
     * 
     * @param rs
     * @param rowIdx
     * @return
     * @throws SQLException
     */
    BiologicalCatalogItem biologicalCatalogItemRowMapper(ResultSet rs, int rowIdx) throws SQLException {
        BiologicalCatalogItem bc = new BiologicalCatalogItem();

        bc.setProductId(rs.getString("BIO_PRDC_N"));
        bc.setBiologicalId(rs.getString("BIO_N"));
        
        bc.setBiologicalMaterialName(rs.getString("BIO_T"));

        String notationType = rs.getString("BIO_NOTNTP_C");
        if(StringUtils.isNotBlank(notationType)) {
            NotationType nt = NotationType.getNotationType(notationType);
            if (nt == NotationType.REAL_NUMBER_FORM) {
                bc.setConcentration(NumericalValue.RealValue(rs.getBigDecimal("BIO_CONCACTL_N")));
            } else {
                bc.setConcentration(NumericalValue.ScientificValue(
                        rs.getInt("BIO_CONCBASE_N"),
                        rs.getBigDecimal("BIO_CONCEXPON_N"),
                        rs.getBigDecimal("BIO_CONCCOEFF_N")
                ));
            }

            BiologicalConcentrationUnit uma = new BiologicalConcentrationUnit(
                    rs.getString("BIO_CONCMSRUNIT_C"),
                    rs.getString("BIO_CONCMSRUNIT_T2"),
                    rs.getString("BIO_CONCMSRUNIT_T1"));
            bc.setConcentrationUnit(uma);
        }
        

        String originalQuantityStr = rs.getString("ORG_Q");
        UnitMsr originalQuantityUnit = new UnitMsr();
        bc.setOriginalQuantityUnit(originalQuantityUnit);
        if (StringUtils.isNotEmpty(originalQuantityStr)) {
            
            originalQuantityUnit.setCode(rs.getString("BIO_MSRUNIT_C"));
            originalQuantityUnit.setDescription(rs.getString("BIO_MSRUNIT_T2"));
            originalQuantityUnit.setAbbreviation(rs.getString("BIO_MSRUNIT_T2"));
            
            bc.setOriginalQuantity(new BigDecimal(originalQuantityStr));
        }

        String manufacturerCode = rs.getString("MFR_C");
        if (StringUtils.isNotEmpty(manufacturerCode)) {
            Manufacturer manufacturer = new Manufacturer();
            
            manufacturer.setCode(manufacturerCode);
            manufacturer.setName(rs.getString("MFR_T"));
            
            bc.setManufacturer(manufacturer);
        }

        bc.setProductManufacturerNumber(rs.getString("BIO_MFRPRDC_N"));

        String categoryCode = rs.getString("BIO_CAT_C");
        if (StringUtils.isNotBlank(categoryCode)) {
            BiologicalCategory cat = new BiologicalCategory();
            cat.setCode(categoryCode);
            cat.setDescription(rs.getString("BIO_CAT_T"));
            bc.setCategory(cat);
        }

        String typeCode = rs.getString("BIO_TP_C");
        if (StringUtils.isNotBlank(typeCode)) {
            BiologicalType type = new BiologicalType();
            type.setCode(typeCode);
            type.setDescription(rs.getString("BIO_TP_T"));
            bc.setBiologicalType(type);
        }

        String originCode = rs.getString("BIO_ORG_C");
        if (StringUtils.isNotBlank(originCode)) {
            BiologicalOrigin origin = new BiologicalOrigin();
            origin.setCode(originCode);
            origin.setDescription(rs.getString("BIO_ORG_T"));
            bc.setOrigin(origin);
        }

        String organSampleTypeCode = rs.getString("BIO_ORGANTP_C");
        if (StringUtils.isNotBlank(organSampleTypeCode)) {
            BiologicalOrgan organSampleType = new BiologicalOrgan();
            organSampleType.setCode(organSampleTypeCode);
            organSampleType.setDescription(rs.getString("BIO_ORGANTP_T"));
            bc.setOrganSampleType(organSampleType);
        }
        
        String regulationDesc = rs.getString("REGL_T");
        if (StringUtils.isNotEmpty(regulationDesc)) {
            bc.setOtherRegulations(Collections.singletonList(regulationDesc));
        }

        bc.setSafetyLevel(rs.getString("BIO_SAFETYLVL_T"));
        bc.setSafetyLevelCode(rs.getString("BIO_SAFETYLVL_C"));

        bc.setGeneticallyModified(rs.getString("GMO_F"));

        String productFormatCode = rs.getString("BIO_PRDCFORMAT_C");
        if (StringUtils.isNotBlank(productFormatCode)) {
            BiologicalProductFormat productFormat = new BiologicalProductFormat();
            productFormat.setCode(productFormatCode);
            productFormat.setDescription(rs.getString("BIO_PRDCFORMAT_T"));
            bc.setProductFormat(productFormat);
        }
        
        return bc;
    }
    
    /**
     * method to map biological agent to biological catalog item base on the id matched.
     * 
     * @param rs
     * @param i
     * @param catalogMap
     * @throws SQLException
     */
    BiologicalAgent biologicalAgentRowMapper(ResultSet rs, int i, Map<String, List<BiologicalCatalogItem>> catalogMap) throws SQLException {
        String biologicalId = rs.getString("BIO_N");
        
        BiologicalAgent agent = new BiologicalAgent();
        agent.setScientificName(rs.getString("BIO_SCI_T"));
        agent.setCommonName(rs.getString("COMMON_NAME"));
        agent.setStrain(rs.getString("BIO_STRAIN_T"));
        agent.setToxinName(rs.getString("BIO_T"));
        agent.setMohProductCode(rs.getString("BIO_PRDCMOH_T"));
        agent.setAvsProductCode(rs.getString("BIO_PRDCAVS_T"));
        agent.setHsCode(rs.getString("BIO_HS_T"));
        if(StringUtils.isNotBlank(rs.getString("BIO_REGL_T"))) {
            agent.setRegulations(Arrays.asList(rs.getString("BIO_REGL_T").split("\\|\\|")));
        }

        List<BiologicalCatalogItem> catalogItems = catalogMap.get(biologicalId);
        if (CollectionUtils.isNotEmpty(catalogItems)) {
            for (BiologicalCatalogItem item : catalogItems) {
                if (CollectionUtils.isEmpty(item.getAgents())) {
                    List<BiologicalAgent> agents = new ArrayList<>(1);
                    agents.add(agent);

                    item.setAgents(agents);
                } else {
                    item.getAgents().add(agent);
                }
            }
        }
        return agent;
    }

    @Override
    public List<Manufacturer> getManufacturerList() {
        return this.prsJdbcTemplate.query(
                " SELECT MFR_C, MFR_T FROM HMMSMANUFACTURER WHERE REC_STS_C = '1' ORDER BY MFR_T",
                this::manufacturerRowMapper);
    }

    @Override
    public List<Manufacturer> getManufacturerListByName(List<String> manufacturerNames) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("manufacturerNames", manufacturerNames);

        return this.prsNamedJdbcTemplate.query(
                " SELECT MFR_C, MFR_T FROM HMMSMANUFACTURER WHERE MFR_T IN (:manufacturerNames) ORDER BY MFR_T",
                params,
                this::manufacturerRowMapper);
    }

    @Override
    public List<Manufacturer> getManufacturerListByIds(List<String> manufacturerIds) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("manufacturerIds", manufacturerIds);

        return this.prsNamedJdbcTemplate.query(
                " SELECT MFR_C, MFR_T FROM HMMSMANUFACTURER WHERE MFR_C IN (:manufacturerIds) ORDER BY MFR_T",
                params,
                this::manufacturerRowMapper);
    }

    Manufacturer manufacturerRowMapper(ResultSet rs, int i) throws SQLException {
        Manufacturer manufacturer = new Manufacturer();
        manufacturer.setCode(rs.getString("MFR_C"));
        manufacturer.setName(rs.getString("MFR_T"));

        return manufacturer;
    }

    @Override
    public List<String> searchChemicalNameList(String partial, boolean activeOnly, boolean allResults) {
        String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";
        String partialNameFragment = " (UPPER(CHM_NM_T) LIKE '%'||UPPER(?)||'%')\n";
        String partialLabelFragment = " (UPPER(CHM_LBL_T) LIKE '%'||UPPER(?)||'%')\n";

        if (StringUtils.isNotEmpty(partial)) {
            if (partial.startsWith("\"")) {
                // Exact match.
                partialNameFragment = " UPPER(CHM_NM_T) LIKE UPPER(?)||'%'\n";
                partialLabelFragment = " UPPER(CHM_LBL_T) LIKE UPPER(?)||'%'\n";

                partial = partial.substring(1);
            }
        }

        return this.prsJdbcTemplate.queryForList(
                "SELECT \n" +
                    " \tDISTINCT CHM_NM_T \n" +
                    "FROM HMMS_PRS_CHM_CTG \n" +
                    "WHERE " + partialNameFragment + activeFragment +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    " \tDISTINCT CHM_LBL_T \n" +
                    "FROM HMMS_PRS_CHM_CTG \n" +
                    "WHERE " + partialLabelFragment + activeFragment +
                    ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial, partial)
                .stream()
                .flatMap(s -> Stream.of(s.split("\\|\\|")))
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> searchCASNumberList(String partial, boolean activeOnly, boolean allResults) {
        String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";

        return this.prsJdbcTemplate.queryForList(
                " SELECT DISTINCT CAS_N FROM HMMS_PRS_CHM_CTG " +
                        " WHERE UPPER(CAS_N) LIKE '%'||UPPER(?)||'%' " + activeFragment +
                        " ORDER BY CAS_N\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial)
                .stream()
                .flatMap(s -> Stream.of(s.split("\\|\\|")))
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> searchProductNumberList(String partial, boolean activeOnly, boolean allResults) {
        String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";

        return this.prsJdbcTemplate.queryForList(
                " SELECT DISTINCT CHM_PRDCMFR_N FROM HMMS_PRS_CHM_PRD " +
                        " WHERE UPPER(CHM_PRDCMFR_N) LIKE '%'||UPPER(?)||'%' " + activeFragment +
                        " ORDER BY CHM_PRDCMFR_N\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial);
    }
    
    @Override
    public List<String> searchRadioactiveProductNumberList(String partial, boolean activeOnly, boolean allResults) {
    	String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";
    	
    	return this.prsJdbcTemplate.queryForList(
                " SELECT DISTINCT RADNUCLD_MFRPRDC_N FROM HMMS_PRS_RADNUCLD_PRODUCT " +
                        " WHERE UPPER(RADNUCLD_MFRPRDC_N) LIKE '%'||UPPER(?)||'%' " + activeFragment +
                        " ORDER BY RADNUCLD_MFRPRDC_N\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial);
    }
    
    @Override
    public List<String> searchRadioNuclidesList(String partial, boolean activeOnly, boolean allResults) {
    	String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";
    	
    	return this.prsJdbcTemplate.queryForList(
                " SELECT DISTINCT RADNUCLD_T FROM HMMS_PRS_RADNUCLD_CATALOG " +
                        " WHERE (UPPER(RADNUCLD_T) LIKE '%'||UPPER(?)||'%' OR " +
                        " UPPER(RADNUCLD_LABELDESC_T) LIKE '%'||UPPER(?)||'%')" + activeFragment +
                        " ORDER BY RADNUCLD_T\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial, partial);
    }
    
    @Override
	public List<String> searchRadioactiveMaterialNameList(String partial, boolean activeOnly, boolean allResults) {
    	String activeFragment = (activeOnly) ? " AND REC_STS_C = '1' \n" : "";
    	
    	return this.prsJdbcTemplate.queryForList(
                " SELECT DISTINCT RADNUCLD_PRDCDESC_T FROM HMMS_PRS_RADNUCLD_PRODUCT " +
                        " WHERE UPPER(RADNUCLD_PRDCDESC_T) LIKE '%'||UPPER(?)||'%' " + activeFragment +
                        " ORDER BY RADNUCLD_PRDCDESC_T\n" +
                        ((!allResults) ? " FETCH NEXT " + Constants.TYPEAHEAD_MAX + " ROWS ONLY" : ""),
                String.class, partial);
    }
    
    public Map<String, List<RadioactiveActivity>> getRadioActivityForItems(List<RadioactiveCatalogItem> catalogItems) {
    	Map<String, List<RadioactiveActivity>> resultMap= new HashMap<>();
		for (RadioactiveCatalogItem radioItem : catalogItems) {
            if(radioItem.getActivity() != null)
                continue;
            List<String> radionuclideList = Arrays.asList((radioItem).getRadionuclideName().split(","));
            List<String> orderByList = new ArrayList<>();
            int i = 1;
            for(String radionuclide: radionuclideList) {
                orderByList.add(radionuclide);
                orderByList.add(String.valueOf(i));
                i++;
            }
            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValue("radionuclideTList", radionuclideList);
            params.addValue("orderByList", orderByList);
            List<RadioactiveActivity> activities = this.prsNamedJdbcTemplate.query(
                    "SELECT RADNUCLD_N, RADNUCLD_T\n"
                    + "FROM HMMS_PRS_RADNUCLD_CATALOG\n"
                    + "WHERE RADNUCLD_T IN (:radionuclideTList)\n AND REC_STS_C = '1'"
                    + "ORDER BY DECODE(RADNUCLD_T, :orderByList)",
                            params,
                            this::emptyActivityRowMapper);
            resultMap.put((radioItem).getRadionuclideName(), activities);
		}

		return resultMap;
    }
    
    RadioactiveActivity emptyActivityRowMapper(ResultSet rs, int indexId) throws SQLException{
    	RadioactiveActivity activity = new RadioactiveActivity();
    	activity.setRadionuclideId(rs.getString("RADNUCLD_N"));
    	activity.setRadionuclideName(rs.getString("RADNUCLD_T"));
    	NumericalValue numericValue = new NumericalValue();
    	activity.setActivity(numericValue);
    	numericValue.setNotationType(NotationType.REAL_NUMBER_FORM);
    	UnitMsr activityUnit = new UnitMsr();
    	activity.setActivityUnit(activityUnit);
    	return activity;
    }
    
    
   
}