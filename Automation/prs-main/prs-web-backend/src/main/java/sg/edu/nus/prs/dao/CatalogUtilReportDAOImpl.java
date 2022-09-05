package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.internalproc.CollectionStatus;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractApplicableFor;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractLevel;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractStatus;
import sg.edu.nus.prs.domain.purchase.POStatus;
import sg.edu.nus.prs.domain.purchase.ProductTypeCode;
import sg.edu.nus.prs.domain.purchase.RequestAdditionalDetails;
import sg.edu.nus.prs.domain.purchase.RequestStatus;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.report.CatalogUtilisationDetail;
import sg.edu.nus.prs.domain.report.CatalogUtilisationSummary;
import sg.edu.nus.prs.domain.report.CatalogueUtilReportSearchForm;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Role;
import sg.edu.nus.prs.domain.user.UserAttributeType;
import sg.edu.nus.prs.util.CommonUtils;

@Repository
public class CatalogUtilReportDAOImpl extends BaseDAOImpl implements CatalogUtilReportDAO {

	
	public List<CatalogUtilisationSummary> getContractDetails(CatalogueUtilReportSearchForm search, String userNumber) {
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		
		StringBuilder query = new StringBuilder(
				"SELECT PP.PRDCON_SEQ_N, PP.CON_N, PP.CON_A, PP.CRCY_C, PP.CON_DESC_T, PP.CON_ST_D, \n"
				+ "PP.CON_END_D, PP.CON_LVL_C, PS.SUPP_C from PRS_PERIODCONTRACT_PARTICS PP LEFT OUTER JOIN "
				+ "PRS_PRDCONTRACT_SUPPLIER PS ON PP.PRDCON_SEQ_N = PS.PRDCON_SEQ_N \n"
				+ "WHERE PP.CON_STS_C IN (:contractStatus)\n");
		
		params.addValue("contractStatus", Arrays.asList(new String [] {
				PeriodContractStatus.PERIOD_CTRCT_STS_PUBLISH.toString(), 
				PeriodContractStatus.PERIOD_CTRCT_STS_UNPUBLISH.toString()
			}));
		
		if (StringUtils.isNotBlank(search.getContractNumber())) {
			
			if (search.getContractNumber().startsWith("\"") && search.getContractNumber().endsWith("\"")) {
				query.append(" AND (UPPER(PP.CON_N) = :contractNumber)");
				params.addValue("contractNumber", search.getContractNumber().trim().toUpperCase());
				
			} else {
				query.append(" AND (UPPER(PP.CON_N) LIKE :contractNumber)");
				params.addValue("contractNumber", "%" + search.getContractNumber().trim().toUpperCase() + "%");
			}
			
		}
		
		if (StringUtils.isNotBlank(search.getContractDescription())) {
			query.append(" AND (UPPER(PP.CON_DESC_T) LIKE :contractDescription)");
			
			params.addValue("contractDescription", "%"+search.getContractDescription().trim().toUpperCase()+"%");
		}
		
		if (search.getReportStartDate() != null) {
			query.append(" AND (PP.CON_ST_D >= :reportStartDate)");
			
			params.addValue("reportStartDate", search.getReportStartDate());
		}
		
		if (search.getReportEndDate() != null) {
			query.append(" AND (PP.CON_END_D < :reportEndDate)");
			
			params.addValue("reportEndDate", search.getReportEndDate());
		}
		
		
		if (CollectionUtils.isNotEmpty(search.getFaculties())) {
			Set<String> facs = search.getFaculties()
					.stream().map(f -> f.getFaculty())
					.collect(Collectors.toSet());
			
			params.addValue("facCodes", facs);
			
			query.append(" AND EXISTS (select PA.ACCESS_N from PRS_PRDCONTRACT_ACCESS PA \n"
					+ "WHERE PA.PRDCON_SEQ_N = PP.PRDCON_SEQ_N AND PA.FAC_C IN (:facCodes) \n");
			
			Set<String> depts = search.getFaculties()
					.stream()
					.flatMap(f -> f.getDepartments().stream())
					.map(d -> d.getDepartment())
					.collect(Collectors.toSet());
			
			if (CollectionUtils.isNotEmpty(depts)) {
				query.append("AND PA.DEPT_C IN (:deptCodes)) \n");
				params.addValue("deptCodes", depts);
			}
		}
		
		if (CollectionUtils.isNotEmpty(search.getSuppliers())) {
			query.append(" AND PS.SUPP_C IN (:supplierCode))");
			params.addValue("supplierCode", search.getSuppliers());
		}
		
		if (StringUtils.isNotBlank(userNumber)) {
			params.addValue("catalogueAdminRole", Role.ROLE_CATALOGUE_ADMIN.toString());
			params.addValue("restrictByUserNo", userNumber);

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
					"                AND ppa.prdcon_seq_n = PP.prdcon_seq_n)\n" +
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
					"                AND ppa.prdcon_seq_n = PP.prdcon_seq_n)\n" +
					")"
			);
		}
		
		
		List<CatalogUtilisationSummary> items = this.prsNamedJdbcTemplate.query(
				query.toString(),
                params,
                (rs, i) -> this.periodContractRowMapper(rs, i)
            );
		
		return items;
	}
	
	
	private CatalogUtilisationSummary periodContractRowMapper(ResultSet rs, int rownum) throws SQLException {
		
		CatalogUtilisationSummary util = new CatalogUtilisationSummary();
		util.setContractSequenceNumber(rs.getString("PRDCON_SEQ_N"));
		util.setContractNumber(rs.getString("CON_N"));
		util.setContractDescription(rs.getString("CON_DESC_T"));
		util.setContractStartDate(rs.getDate("CON_ST_D"));
		util.setContractEndDate(rs.getDate("CON_END_D"));
		util.setMasterContractAmount(rs.getBigDecimal("CON_A"));
		util.setContractCurrency(rs.getString("CRCY_C"));
		util.setContractApplicableFor(PeriodContractApplicableFor.valueOf(rs.getString("CON_LVL_C")));

		util.setSupplierCode(rs.getString("SUPP_C"));
		util.setSupplierUtilAmount(BigDecimal.valueOf(0));
		return util;
	}
	
	public List<CatalogUtilisationDetail> getCatalogUtilisationDetail(Set<String> pcPartySeqNums) {
		StringBuilder query = new StringBuilder(
				  "SELECT PL.LINEITEM_N AS LINEITEM_N, PCPT.CON_N AS CONTRACT_NU, PCPT.CON_DESC_T AS CONTRACT_DESC, "
				  + "PCPT.CON_ST_D AS CONTRACT_START_D, PCPT.CON_END_D AS CONTRACT_END_D,\n"
				  + "PR.REQ_STFSTD_N AS REQUESTOR_ID, \n"
				  + "PCPT.CON_A AS CONTRACT_AMT, PCPT.CRCY_C AS CONTRACT_CURRENCY, \n"
				  + "PQ.SUPP_C AS SUPPLIER_CODE, con_prd.SUPP_PART_N AS SUPP_PART_N, \n"
				  + "CASE "
				  + "WHEN CHMPRD.CAS_N IS NOT NULL THEN CHMPRD.CAS_N \n"
				  + "ELSE CTG.CAS_N "
				  + "END AS CAS_N,\n"
				  + "CASE WHEN CHMPRD.CHM_NM_T IS NOT NULL THEN CHMPRD.CHM_NM_T \n"
				  + "ELSE CTG.CHM_NM_T "
				  + "END AS CHM_NAME, \n"
				  + "CASE "
				  + "WHEN CHMPRD.CHM_PRDCMFR_N IS NOT NULL THEN CHMPRD.CHM_PRDCMFR_N "
				  + "ELSE Json_value(PLP.PRDC_DETL_T, '$.productManufacturerNumber') "
				  + "END AS PRODMFR_N, "
				  + "PLP.CAT_C, \n"
				  + "NULL AS MANUFACTURER_PART_NU, PL.QTY_Q AS ORDER_QUANTITY, PL.QTY_PERUNIT_N AS ORDER_QTY_PERUNIT,\n"
				  + "PL.SUBTOT_A AS ORDER_AMT, PO.SAP_PO_N AS PO_NUMBER, PO.PO_STS_C AS PO_STS_CODE, \n"
				  + "PR.PR_N as PR_ID, PR.REQ_N AS PR_NUMBER, \n"
				  + "NULL AS ITEMS, PL.CRCY_C AS CURRENCY_C, PL.UPRICE_A AS UNIT_PRICE, \n"
				  + "PR.FAC_C AS FACULTY, PR.DEPT_C AS DEPARTMENT \n"
				  + "FROM \n"
				  + "PRS_PURCHASE_LINEITEM PL JOIN \n"
				  + "PRS_QUOTATION PQ ON PL.QT_N = PQ.QT_N JOIN \n"
				  + "PRS_PURCHASE_REQ PR ON PL.PR_N = PR.PR_N JOIN \n"
				  + "PRS_PURCHASE_LINEITEMPRDC PLP ON PL.LINEITEM_N = PLP.LINEITEM_N LEFT OUTER JOIN \n"
				  + "HMMS_PRS_CHM_PRD CHMPRD ON PLP.PRDC_REF_N = CHMPRD.CHM_PRDC_N LEFT OUTER JOIN \n"
				  + "hmms_prs_chm_ctg CTG ON Json_value(PLP.PRDC_DETL_T, '$.chemicalNumber') = CTG.CHM_N  INNER JOIN \n"
				  + "PRS_PERIODCONTRACT_partics PCPT ON PL.CON_N = PCPT.CON_N LEFT OUTER JOIN \n"
				  + "(SELECT PS.PRDCON_SEQ_N, PS.SUPP_C, PCP.SUPP_PART_N, PCP.PRDC_REF_N FROM PRS_PRDCONTRACT_SUPPLIER PS \n"
				  + "JOIN PRS_PRDCONTRACT_PRODUCT PCP ON PCP.SUPP_N = PS.SUPP_N) con_prd \n"
				  + "ON PCPT.PRDCON_SEQ_N = con_prd.PRDCON_SEQ_N AND PQ.SUPP_C = con_prd.SUPP_C AND PLP.PRDC_REF_N = con_prd.PRDC_REF_N LEFT OUTER JOIN \n"
				  + "PRS_PO_LINEITEM POL ON PL.LINEITEM_N = POL.PR_LINEITEM_N LEFT OUTER JOIN \n"
				  + "PRS_PURCHASE_ORDER PO ON POL.PO_N = PO.PO_N LEFT OUTER JOIN \n"
				  + "PRS_COLLECTION PC ON PC.PR_N = PR.PR_N \n"
				  + "WHERE PR.REQ_STS_C NOT IN (:requestStatus) AND \n"
				  + "(PO.PO_STS_C IS NULL OR PO.PO_STS_C IN (:poStatus)) AND \n"
				  + "(PC.COLLECT_STS_C IS NULL OR PC.COLLECT_STS_C in (:collectStatus)) AND \n"
				  + "PCPT.PRDCON_SEQ_N in (:pcPartySeqNum)"
				);
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		
		params.addValue("requestStatus", Arrays.asList(new String [] {
				RequestStatus.REQ_STS_CANCELLED.toString(),
				RequestStatus.REQ_STS_REJECTED.toString(),
				RequestStatus.REQ_STS_DRAFT.toString()
		}));
		
		params.addValue("poStatus", Arrays.asList(new String [] {
				POStatus.PO_GR_COMPLETED.toString(),
				POStatus.PO_ISSUED_AOR_MORE_15K.toString(),
				POStatus.PO_PENDING_APPROVAL.toString()
		}));
		
		params.addValue("collectStatus", Arrays.asList(new String [] {
				CollectionStatus.COLL_STS_PENDING_VERIFICATION.toString(),
				CollectionStatus.COLL_STS_PENDING_COLLECTION.toString(),
				CollectionStatus.COLL_STS_COLLECTED.toString()
		}));
		
		params.addValue("pcPartySeqNum", pcPartySeqNums);
		
		
		query.append(" ORDER BY PCPT.CON_N, PR.PR_N");
		
		
		List<CatalogUtilisationDetail> items = this.prsNamedJdbcTemplate.query(
				 query.toString(),
                 params,
                 (rs, i) -> this.catalogUtilDetailItemRowMapper(rs, i)
             );
		
		return items;
	}
	
	
	
	CatalogUtilisationDetail catalogUtilDetailItemRowMapper(ResultSet rs, int rowIdx) throws SQLException {
		
		CatalogUtilisationDetail util = new CatalogUtilisationDetail();
		util.setRequestorStaffNo(null);
		util.setLineitemNumber(rs.getString("LINEITEM_N"));
		util.setContractNumber(rs.getString("CONTRACT_NU"));
		util.setContractDescription(rs.getString("CONTRACT_DESC"));
		util.setContractStartDate(rs.getDate("CONTRACT_START_D"));
		util.setContractEndDate(rs.getDate("CONTRACT_END_D"));
		util.setMastertContractAmount(rs.getBigDecimal("CONTRACT_AMT"));
		util.setRequestorStaffNo(rs.getString("REQUESTOR_ID"));
		util.setContractCurrency(rs.getString("CONTRACT_CURRENCY"));
		util.setSupplierPartNumber(rs.getString("SUPP_PART_N"));
		util.setSupplierCode(rs.getString("SUPPLIER_CODE"));
		
		ProductTypeCode productTypeCode = ProductTypeCode.valueOf(rs.getString("CAT_C"));
		if (ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE == productTypeCode) {
			util.setProductDescription(ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE.getDescription());
			
		} else {
			if (rs.getString("CHM_NAME") != null && rs.getString("CAS_N") != null) {
				util.setProductDescription(rs.getString("CHM_NAME") + ", " + rs.getString("CAS_N"));
			}
		}
		
//		if (rs.getString("CHM_NAME") == null && rs.getString("CAS_N") == null) {
//			ProductTypeCode productTypeCode = ProductTypeCode.valueOf(rs.getString("CAT_C"));
//			if (ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE == productTypeCode) {
//				util.setProductDescription(ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE.getDescription());
//			} else {
//				ChemicalProductDetail cpd = CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), ChemicalProductDetail.class);
//				System.out.println(cpd);
//			}
//			
//		} else {
//			util.setProductDescription(rs.getString("CHM_NAME") + ", " + rs.getString("CAS_N"));
//		}
		
		util.setManufacturerPartNumber(rs.getString("PRODMFR_N"));
		BigDecimal qtyPerUnit = rs.getBigDecimal("ORDER_QTY_PERUNIT");
		BigDecimal orderqty = rs.getBigDecimal("ORDER_QUANTITY");
		orderqty = (orderqty == null) ? BigDecimal.valueOf(1) : orderqty;
		BigDecimal qty = qtyPerUnit != null ? qtyPerUnit.multiply(orderqty) : rs.getBigDecimal("ORDER_QUANTITY");
		util.setQuantity(qty);
		util.setAmount(rs.getBigDecimal("ORDER_AMT"));
		util.setPoNumber(rs.getString("PO_NUMBER"));
		util.setPrId(rs.getString("PR_ID"));
		util.setPrNumber(rs.getString("PR_NUMBER"));
		util.setCurrency(rs.getString("CURRENCY_C"));
		util.setUnitPrice(rs.getBigDecimal("UNIT_PRICE"));
		util.setFaculty(rs.getString("FACULTY"));
		util.setDepartment(rs.getString("DEPARTMENT"));
		
		if (StringUtils.isNotBlank(rs.getString("PO_STS_CODE"))) {
			util.setPoStatusCode(POStatus.valueOf(rs.getString("PO_STS_CODE")));
		}
		
		return util;
	}
	
	
	
	
	
	public List<CatalogUtilisationDetail> getContractLineItemUtilisation(Set<String> pcPartySeqNums) {
		StringBuilder query = new StringBuilder(
				  "SELECT PL.LINEITEM_N AS LINEITEM_N, POL.PR_LINEITEM_N AS POLINEITEM_N, PC.COLLECT_N AS COLLECT_N, \n"
				  + "PCPT.PRDCON_SEQ_N, PCPT.CON_N AS CONTRACT_NU, PCPT.CON_DESC_T AS CONTRACT_DESC, \n"
				  + "PCPT.CON_ST_D AS CONTRACT_START_D, PCPT.CON_END_D AS CONTRACT_END_D,\n"
				  + "PCPT.CON_A AS CONTRACT_AMT, PCPT.CRCY_C AS CONTRACT_CURRENCY, \n"
				  + "PQ.SUPP_C AS SUPPLIER_CODE, \n"
				  + "PL.QTY_Q AS ORDER_QUANTITY, PL.QTY_PERUNIT_N AS ORDER_QTY_PERUNIT,\n"
				  + "PL.SUBTOT_A AS ORDER_AMT, PO.PO_STS_C AS PO_STS_CODE, \n"
				  + "PR.PR_N as PR_ID, PR.REQ_N AS PR_NUMBER, PR.PRDC_DETL_T, \n"
				  + "PL.CRCY_C AS CURRENCY_C, PL.UPRICE_A AS UNIT_PRICE, \n"
				  + "lineitem_util_amt, polineitem_util_amt, collect_util_amt \n"
				  + "FROM \n"
				  + "PRS_PURCHASE_LINEITEM PL JOIN \n"
				  + "PRS_QUOTATION PQ ON PL.QT_N = PQ.QT_N JOIN \n"
				  + "PRS_PURCHASE_REQ PR ON PL.PR_N = PR.PR_N JOIN \n"
				  + "PRS_PERIODCONTRACT_PARTICS PCPT ON PL.CON_N = PCPT.CON_N LEFT OUTER JOIN \n"
				  + "PRS_PO_LINEITEM POL ON PL.LINEITEM_N = POL.PR_LINEITEM_N LEFT OUTER JOIN \n"
				  + "PRS_PURCHASE_ORDER PO ON POL.PO_N = PO.PO_N LEFT OUTER JOIN \n"
				  + "PRS_COLLECTION PC ON PC.PR_N = PR.PR_N LEFT OUTER JOIN \n"
				  
				  + "(select sum(cu.con_util_a) as lineitem_util_amt, lcu.lineitem_n as lineitem_n from prs_lineitem_contractutil lcu join prs_contract_utilisation cu on\n"
				  + "lcu.con_util_n = cu.con_util_n group by lcu.lineitem_n) \n"
				  + "LIUTIL ON PL.LINEITEM_N = LIUTIL.LINEITEM_N LEFT OUTER JOIN \n"
				  
				  + "(select sum(cu1.con_util_a) as polineitem_util_amt, plcu.lineitem_n as polineitem_n \n "
				  + "from prs_polineitem_contractutil plcu join prs_contract_utilisation cu1 on \n"
				  + "plcu.con_util_n = cu1.con_util_n group by plcu.lineitem_n) "
				  + "POLIUTIL ON POL.LINEITEM_N = POLIUTIL.polineitem_n LEFT OUTER JOIN \n"

				  + "(select sum(cu2.con_util_a) as collect_util_amt, pccu.collect_n as collect_n from prs_collect_contractutil pccu join prs_contract_utilisation cu2 on \n"
				  + "pccu.con_util_n = cu2.con_util_n group by pccu.collect_n) "
				  + "COLUTIL ON PC.COLLECT_N = COLUTIL.COLLECT_N \n"
				  
				  + "WHERE PR.REQ_STS_C NOT IN (:requestStatus) AND \n"
				  + "(PO.PO_STS_C IS NULL OR PO.PO_STS_C IN (:poStatus)) AND \n"
				  + "(PC.COLLECT_STS_C IS NULL OR PC.COLLECT_STS_C in (:collectStatus)) AND \n"
				  + "PCPT.PRDCON_SEQ_N in (:pcPartySeqNum)"
				);
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		
		params.addValue("requestStatus", Arrays.asList(new String [] {
				RequestStatus.REQ_STS_CANCELLED.toString(),
				RequestStatus.REQ_STS_REJECTED.toString(),
				RequestStatus.REQ_STS_DRAFT.toString()
		}));
		
		params.addValue("poStatus", Arrays.asList(new String [] {
				POStatus.PO_GR_COMPLETED.toString(),
				POStatus.PO_ISSUED_AOR_MORE_15K.toString(),
				POStatus.PO_PENDING_APPROVAL.toString()
		}));
		
		params.addValue("collectStatus", Arrays.asList(new String [] {
				CollectionStatus.COLL_STS_PENDING_VERIFICATION.toString(),
				CollectionStatus.COLL_STS_PENDING_COLLECTION.toString(),
				CollectionStatus.COLL_STS_COLLECTED.toString()
		}));
		
		params.addValue("pcPartySeqNum", pcPartySeqNums);
		
		
		query.append(" ORDER BY PCPT.CON_N");
		
		
		List<CatalogUtilisationDetail> items = this.prsNamedJdbcTemplate.query(
				 query.toString(),
                 params,
                 (rs, i) -> this.contractLineitemDetailItemRowMapper(rs, i)
             );
		
		return items;
	}
	
	
	CatalogUtilisationDetail contractLineitemDetailItemRowMapper(ResultSet rs, int rowIdx) throws SQLException {
		
		CatalogUtilisationDetail util = new CatalogUtilisationDetail();
		util.setContractSequenceNumber(rs.getString("PRDCON_SEQ_N"));
		util.setLineitemNumber(rs.getString("LINEITEM_N"));
		util.setContractNumber(rs.getString("CONTRACT_NU"));
		util.setContractStartDate(rs.getDate("CONTRACT_START_D"));
		util.setContractEndDate(rs.getDate("CONTRACT_END_D"));
		util.setMastertContractAmount(rs.getBigDecimal("CONTRACT_AMT"));
		util.setContractCurrency(rs.getString("CONTRACT_CURRENCY"));
		util.setSupplierCode(rs.getString("SUPPLIER_CODE"));
		util.setCurrency(rs.getString("CURRENCY_C"));
		util.setPoLineitemNumber(rs.getString("POLINEITEM_N"));
		util.setCollectionNumber(rs.getString("COLLECT_N"));
		
		BigDecimal lineitemUtilAmt = rs.getBigDecimal("lineitem_util_amt");
		BigDecimal polineitemUtilAmt = rs.getBigDecimal("polineitem_util_amt");
		BigDecimal collectUtilAmt = rs.getBigDecimal("collect_util_amt");
		
		
		BigDecimal total = BigDecimal.valueOf(0);
		if (lineitemUtilAmt != null) {
			total = total.add(lineitemUtilAmt);
		}
		if (polineitemUtilAmt != null) {
			total = total.add(polineitemUtilAmt);
		}
		if (collectUtilAmt != null) {
			total = total.add(collectUtilAmt);
		}
		
		util.setItemContractUtilAmount(total);
		
		RequestAdditionalDetails reqDtl = CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), RequestAdditionalDetails.class);
		
		if (reqDtl != null) {
			util.setExchangeRates(reqDtl.getExchangeRates());
		}
		
		return util;
	}
	

	
	private BigDecimal lineItemUtilisedAmtMapper(ResultSet rs, int rowNum) throws SQLException {
		return rs.getBigDecimal("con_util_a");
	}
}
