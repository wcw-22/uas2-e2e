package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.common.Location;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.internalproc.CollectionStatus;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractLevel;
import sg.edu.nus.prs.domain.purchase.*;
import sg.edu.nus.prs.domain.purchase.productdetails.AdditionalChargeProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.BiologicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.RadioactiveProductDetail;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.Role;
import sg.edu.nus.prs.domain.user.UserAttributeType;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.CommonUtils;
import sg.edu.nus.prs.util.Constants;

@SuppressWarnings("Duplicates")
@Repository
public class RequestDaoImpl extends BaseDAOImpl implements RequestDao {
	
	private static final Logger logger = LoggerFactory.getLogger(RequestDaoImpl.class);

	@Override
	public boolean updateRequestStatus(Request request, String updateUserNo) {
		return this.prsJdbcTemplate.update(
				"UPDATE PRS_PURCHASE_REQ SET REQ_STS_C = ?, REC_UPD_DTM = SYSDATE, REC_UPDUSER_I = ? WHERE PR_N = ?",
				request.getStatusCode().toString(),
				updateUserNo,
				request.getId()
		) == 1;
	}
	
	@Override
	public boolean updateRequestSubmittedDate(Request request, String updateUserNo) {
		return this.prsJdbcTemplate.update(
				"UPDATE PRS_PURCHASE_REQ SET REQ_SUBM_DTM = SYSDATE, REC_UPDUSER_I = ? WHERE PR_N = ?",
				updateUserNo,
				request.getId()
		) == 1;
	}

	@Override
	public Request save(Request pr) {
		if (null == pr) return null;
		if (null != pr.getId()) {
			// Preload any quotation document data.
			pr = loadRequestDocuments(pr);

			// Remove the request data.
			deleteRequestContent(pr.getId());
		}
		
		Request prNew = saveRequestSummary(pr);
		saveLocation(prNew);
		saveQuotations(prNew);
		saveLineitems(prNew);
		saveSystemChecks(prNew);
		saveDeliveryInfo(prNew);
		saveApprovalStatus(prNew);
		saveApprovedAccountLimits(prNew);
		saveRequestDocuments(prNew);

		return prNew;
	}

	@Override
	public Request loadRequestDocuments(Request request) {
		if (request != null && null != request.getId()) {
			// Preload any quotation document data.
			if (CollectionUtils.isNotEmpty(request.getQuotations())) {
				for (Quotation q: request.getQuotations()) {
					if (CollectionUtils.isNotEmpty(q.getDocuments())) {
						for (Document d: q.getDocuments()) {
							if (StringUtils.isNotEmpty(d.getId())) {
								Document dbDocument = getDocumentById(d.getId());
								if (dbDocument != null) {
									d.setData(dbDocument.getData());
								}
							}
						}
					}
				}
			}

			// Preload any request documents.
			if (CollectionUtils.isNotEmpty(request.getRequestDocuments())) {
				for (Document d: request.getRequestDocuments()) {
					if (StringUtils.isNotEmpty(d.getId())) {
						Document dbDocument = getDocumentById(d.getId());
						if (dbDocument != null) {
							d.setData(dbDocument.getData());
						}
					}
				}
			}
		}

		return request;
	}

	private Request saveRequestSummary(Request pr) {
		if (pr == null) return null;
		if (StringUtils.isNotEmpty(pr.getId())) {
			return updateRequestSummary(pr);
		} 
		else {
			pr.setId(null);
			return insertRequestSummary(pr);	
		} 
	}

	private void saveLineitems(Request pr) {
		if (pr == null) return;
		if (pr.getLineItems() == null ) return;
		if (pr.getLineItems().size() < 1 ) return;
		for (LineItem li : pr.getLineItems()) {
			li.setRequestId(pr.getId());
			saveLineitem(li);
		}		
	}	

	private void saveLineitem(LineItem li) {
		insertLineitem(li);
	}

	private void saveSystemChecks(Request pr) {
		if (pr == null) return;
		List<SystemCheck> systemChecks = pr.getSystemChecks();
		if(CollectionUtils.isEmpty(systemChecks)) {
			return;
		}

		for (SystemCheck sc : systemChecks) {
			sc.setRequestId(pr.getId());
			saveSystemCheck(sc);
		}

	}	
	private void saveSystemCheck(SystemCheck sc) {
		insertSystemCheck(sc);
	}

	private void saveQuotations(Request pr) {
		if (pr == null) return;
		if (pr.getQuotations() == null) return;
		if (pr.getQuotations().size() < 1) return;

		Map<String, String> quotationIdMap = new HashMap<>();
		for (Quotation qt : pr.getQuotations()) {
			if (qt != null) {
				String oldId = qt.getId();

				qt.setRequestId(pr.getId());
				saveQuotation(qt);
				String newId = qt.getId();

				quotationIdMap.put(oldId, newId);
			}
		}

		// Go through line items and remap the quotation ids.
		if (CollectionUtils.isNotEmpty(pr.getLineItems())) {
			for (LineItem li: pr.getLineItems()) {
				li.setQuotationId(quotationIdMap.get(li.getQuotationId()));
			}
		}
	}	
	private void saveQuotation(Quotation qt) {
		if (qt == null) return;

		insertQuotation(qt);

		saveDocuments(qt);
		saveAward(qt);

		if (qt.getDeliveryInfo() != null) {
			qt.getDeliveryInfo().setRequestId(qt.getRequestId());
			insertDeliveryInfo(qt.getDeliveryInfo(), qt.getId());
		}
	}

	private void saveDocuments(Quotation qt) {
		if (null == qt) return;

		List<Document> documents = qt.getDocuments();
		if (documents == null) return;
		if (documents.size() < 1) return;

		for (Document doc : qt.getDocuments()) {
			if (null != doc) {
				doc.setQuotationId(qt.getId());
				saveDocument(doc);
			}
		}
	}	

	private void saveDocument(Document doc) {
		if (null == doc) return;

		insertQuotationDocument(doc);
			    
	}

	private void saveAward(Quotation qt) {
		if (null == qt) return;

		QuotationAward award = qt.getAward();
		if (null == award) return;
		if (null == qt.getAwardFlag()) return;
		if (!qt.getAwardFlag()) return;
		
		award.setQuotationId(qt.getId());
		award.setRequestId(qt.getRequestId());
		insertAward(award);
		
	}

	private void saveDeliveryInfo(Request pr) {
		if (pr == null) return;
		DeliveryInfo di = pr.getDeliveryInfo();
		if (di == null) return;

		di.setRequestId(pr.getId());

		insertDeliveryInfo(di, null);
	}

	private void saveApprovedAccountLimits(Request pr) {
		if (pr == null) return;

		if (CollectionUtils.isEmpty(pr.getAccountLimits())) {
			return;
		}

		for (ApprovedAccountLimit aal: pr.getAccountLimits()) {
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("prN", pr.getId());
			params.addValue("wbs", aal.getWbs());
			params.addValue("gl", aal.getGlAccount());
			params.addValue("amt", aal.getLimit());

			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.prsNamedJdbcTemplate.update(
					"INSERT INTO PRS_APPV_LMT ( \n" +
						"    APPV_LMT_N, PR_N, WBS_AC_N, GL_AC_N, AMT_A \n" +
						") VALUES ( \n" +
						"    PRS_APPV_LMT_SEQ.NEXTVAL, :prN, :wbs, :gl, :amt \n" +
						")",
					params,
					keyHolder,
					new String[]{"APPV_LMT_N"}
			);

			if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
				throw new IllegalStateException("APPV_LMT_N not returned in KeyHolder");
			}

			Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
			aal.setId(keyHolderMap.get("APPV_LMT_N").toString());
		}
	}

	private void saveRequestDocuments(Request pr) {
		if (pr == null) return;

		if (CollectionUtils.isEmpty(pr.getRequestDocuments())) {
			return;
		}

		for (Document d: pr.getRequestDocuments()) {
			insertDocument(d);

			// Update linkage table.
			this.prsJdbcTemplate.update(
				"INSERT INTO PRS_REQ_DOCUMENT (PR_N, DOCU_N) VALUES (?, ?)",
				pr.getId(),
				d.getId()
			);
		}
	}

	private Request insertRequestSummary(Request pr) {
		if (pr.getRequestType() != RequestType.REQ_TYPE_SQRR || StringUtils.isEmpty(pr.getRequestNo())) {
			String prefix = "PRS-";
			Calendar cal = Calendar.getInstance();
			String year = cal.get(Calendar.YEAR) + "-";

			final String sequenceSql = "SELECT LPAD(PRS_PR_PURCHASE_REQ_REQN_SEQ.NEXTVAL,7,'0') FROM dual ";

			String requestNo = this.prsJdbcTemplate.queryForObject(sequenceSql, String.class);
			pr.setRequestNo(prefix + year + requestNo);
		}
		 
		final String insertSql = "INSERT INTO PRS_PURCHASE_REQ(\n" +
				"    PR_N, REQ_N, \n" +
				"    FAC_C, DEPT_C, \n" +
				"    REQ_STFSTD_N, CRCY_C, TOT_AMT_A, \n" +
				"    ESTM_PURCHVAL_C, PRDC_DETL_T, REQ_STS_C, \n" +
				"    QT_RSNRMK_T, \n" +
				"    REC_CREATE_DTM, REC_UPD_DTM, \n" +
				"    REC_CREATEUSER_I, REC_UPDUSER_I, \n" +
				"    PURCH_PPOSE_T, INVNT_OWNERSTF_N, \n" +
				"    REQ_TP_C, PER_AUTHUSER_I, REQ_ACCESSTP_C \n" +
				") VALUES (\n" +
				"    PRS_PR_PURCHASE_REQ_SEQ.NEXTVAL, :requestNo,\n" +
				"    :fac,:dept,\n" +
				"    :requestorNo,:currency,:totalAmt,\n" +
				"    :epv,:prDetail,:status,\n" +
				"    :justificationRemark,\n" +
				"    SYSDATE,SYSDATE,\n" +
				"    :createUser,:updateUser, \n" +
				"    :purposeOfPurchase, :inventoryOwner,\n" +
				"    :requestType, :authorizingUser, :reqRole \n" +
				")";

		String facultyCode = null;
		String departmentCode = null;

		if (pr.getFacultyDepartment() != null) {
			Faculty faculty = pr.getFacultyDepartment();
			facultyCode = faculty.getFaculty();

			if (CollectionUtils.isNotEmpty(faculty.getDepartments())) {
				Department department = faculty.getDepartments().get(0);
				departmentCode = department.getDepartment();
			}
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("fac", facultyCode)
		.addValue("requestNo", pr.getRequestNo())
		.addValue("dept", departmentCode)
		.addValue("requestorNo", pr.getRequestorStaffNo())
		.addValue("currency", (pr.getCurrency()!=null)?pr.getCurrency().getCode():null)
		.addValue("totalAmt", pr.getTotalAmount())
		.addValue("epv", (pr.getEpv()!=null)?pr.getEpv().name():null)
		.addValue("prDetail", CommonUtils.toJson(pr.getRequestDetail()))
		.addValue("status", (pr.getStatusCode() == null) ? null : pr.getStatusCode().toString())
		.addValue("justificationRemark", pr.getQuotationJustification())
		.addValue("createUser", pr.getCreateUserNo())
		.addValue("updateUser", pr.getUpdateUserNo())
		.addValue("purposeOfPurchase", pr.getPurposeOfPurchase())
		.addValue("inventoryOwner", pr.getInventoryOwnerStaffNo())
		.addValue("requestType", (pr.getRequestType() != null) ? pr.getRequestType().toString(): null)
		.addValue("authorizingUser", pr.getAuthorizingStaffNo())
        .addValue("reqRole", (pr.getRequestorRole() != null) ? pr.getRequestorRole().toString(): null)
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"PR_N", "REQ_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("PR_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		pr.setId(keyHolderMap.get("PR_N").toString());
		pr.setRequestNo((keyHolderMap.get("REQ_N").toString()));

		return pr;
	}
	
	private Request updateRequestSummary(Request pr) {
		final String updateSql = "UPDATE PRS_PURCHASE_REQ SET \n" +
				"    FAC_C = :fac, \n" +
				"    DEPT_C = :dept, \n" +
				"    REQ_STFSTD_N = :requestorNo, \n" +
				"    CRCY_C=:currency, \n" +
				"    TOT_AMT_A=:totalAmt, \n" +
				"    ESTM_PURCHVAL_C=:epv, \n" +
				"    PRDC_DETL_T=:prDetail, \n" +
				"    REQ_STS_C=:status, \n" +
				"    QT_RSNRMK_T=:justificationRemark, \n" +
				"    REC_UPD_DTM = SYSDATE, \n" +
				"    REC_UPDUSER_I = :updateUserId, \n" +
				"    PURCH_PPOSE_T = :purposeOfPurchase, \n" +
				"    INVNT_OWNERSTF_N = :inventoryOwner, \n" +
				"    REQ_TP_C = :requestType, \n" +
				"    PER_AUTHUSER_I = :authorizingUser, \n" +
                "    REQ_ACCESSTP_C = :reqRole \n" +
				"WHERE \n" +
				"    PR_N = :id";

		String facultyCode = null;
		String departmentCode = null;

		if (pr.getFacultyDepartment() != null) {
			Faculty faculty = pr.getFacultyDepartment();
			facultyCode = faculty.getFaculty();

			if (CollectionUtils.isNotEmpty(faculty.getDepartments())) {
				Department department = faculty.getDepartments().get(0);
				departmentCode = department.getDepartment();
			}
		}

		MapSqlParameterSource namedParameters = new MapSqlParameterSource()
				.addValue("id", pr.getId())
				.addValue("fac", facultyCode)
				.addValue("dept", departmentCode)
				.addValue("requestorNo", pr.getRequestorStaffNo())
				.addValue("currency", (pr.getCurrency()!=null)?pr.getCurrency().getCode():null)
				.addValue("totalAmt", pr.getTotalAmount())
				.addValue("epv", (pr.getEpv()!=null)?pr.getEpv().name():null)
				.addValue("prDetail", CommonUtils.toJson(pr.getRequestDetail()))
				.addValue("status", (pr.getStatusCode() == null) ? null : pr.getStatusCode().toString())
				.addValue("justificationRemark", pr.getQuotationJustification())		      
				.addValue("updateUserId", pr.getUpdateUserNo())
				.addValue("inventoryOwner", pr.getInventoryOwnerStaffNo())
				.addValue("purposeOfPurchase", pr.getPurposeOfPurchase())
				.addValue("requestType", (pr.getRequestType() != null) ? pr.getRequestType().toString(): null)
				.addValue("authorizingUser", pr.getAuthorizingStaffNo())
                .addValue("reqRole", (pr.getRequestorRole() != null) ? pr.getRequestorRole().toString(): null)
                ;

		this.prsNamedJdbcTemplate.update(updateSql, namedParameters); 
		return pr;
	}

	private void insertLineitem(LineItem li) {
		final String insertSql =
				"INSERT INTO PRS_PURCHASE_LINEITEM ( \n" +
				"    LINEITEM_N, \n" +
				"    PR_N, \n" +
				"    ITEM_N, \n" +
				"    MSR_UNIT_C,\n" +
				"    QTY_Q, \n" +
				"    UPRICE_A, \n" +
				"    QTY_PERUNIT_N,\n" +
				"    SUBTOT_A, \n" +
				"    CRCY_C,\n" +
				"    QT_N,\n" +
				"    CON_N,\n" +
				"    DOWNPAYMT_P,\n" +
				"    DOWNPAYMT_A,\n" +
				"    DOWNPAYMT_DUE_D\n" +
				") VALUES (\n" +
				"    PRS_PURCHASE_LINEITEM_SEQ.NEXTVAL, \n" +
				"    :PR_N, \n" +
				"    :ITEM_N, \n" +
				"    :MSR_UNIT_C,\n" +
				"    :QTY_Q, \n" +
				"    :UPRICE_A, \n" +
				"    :QTY_PERUNIT_N,\n" +
				"    :SUBTOT_A, \n" +
				"    :CRCY_C,\n" +
				"    :QT_N,\n" +
				"    :CON_N,\n" +
				"    :DOWNPAYMT_P,\n" +
				"    :DOWNPAYMT_A,\n" +
				"    :DOWNPAYMT_DUE_D\n" +
				")";

		String unitCode = null;
		if (li.getUnit() != null) {
			unitCode = prsJdbcTemplate.queryForObject(
					"SELECT MSRUNIT_C FROM MSRUNIT WHERE UPPER(MSRUNIT_T) = UPPER(?) ",
					String.class,
					li.getUnit().toString());
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("PR_N", li.getRequestId());
		params.addValue("ITEM_N", li.getLineitemNo());
		params.addValue("MSR_UNIT_C", unitCode);
		params.addValue("QTY_Q", li.getQuantity());
		params.addValue("UPRICE_A", li.getUnitPrice());
		params.addValue("QTY_PERUNIT_N", li.getQuantityPerUnit());
		params.addValue("SUBTOT_A", li.getSubTotal());
		params.addValue("CRCY_C", (li.getCurrency() != null) ? li.getCurrency().getCode() : null);
		params.addValue("QT_N", li.getQuotationId());
		params.addValue("CON_N", li.getContractNumber());
		params.addValue("DOWNPAYMT_P", li.getDownpaymentPercentage());
		params.addValue("DOWNPAYMT_A", li.getDownpaymentAmount());
		params.addValue("DOWNPAYMT_DUE_D", li.getDownpaymentDueDate());


		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"LINEITEM_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("LINEITEM_N not returned in KeyHolder");
		}


		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		li.setId(keyHolderMap.get("LINEITEM_N").toString());

		Product prod = li.getProduct();
		if (prod != null) {
			li.getProduct().setLineitemId(li.getId());
			saveProduct(prod);
		}
		saveAccountAssignments(li);
	}

	private void saveProduct(Product prod) {
		if (null == prod) return;

		final String insertSql = "INSERT INTO PRS_PURCHASE_LINEITEMPRDC ( \n" +
				"    PRDC_N, PRDC_DETL_T, \n" +
				"    PRDC_REF_N, CAT_C, \n" +
				"    LINEITEM_N\n" +
				") VALUES (\n" +
				"    PRS_PURCHASE_LINEITEMPRDC_SEQ.NEXTVAL, :productDetail,\n" +
				"    :productRefNo, :category,\n" +
				"    :lineitemId\n" +
				")";

		String jsonProductDetail = CommonUtils.toJson(prod.getProductDetail());

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("productDetail", jsonProductDetail)
				.addValue("productRefNo", prod.getProductRefId())
				.addValue("category", prod.getCategoryCode().toString())
				.addValue("lineitemId", prod.getLineitemId())
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"PRDC_N"}
		);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("PRDC_N not returned in KeyHolder");
		}


		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		prod.setId(keyHolderMap.get("PRDC_N").toString());
	}

	private void insertSystemCheck(SystemCheck sc) {
		final String insertSql = "INSERT INTO PRS_APPL_SYSCHECK (\n" +
				"     SYSCHK_N, PR_N, \n" +
				"     SYSCHK_TP_C, SYSCHK_RSLT_C, \n" +
				"     SYSCHK_RSLT_T\n" +
				") VALUES (\n" +
				"    PRS_APPL_SYSCHECK_SEQ.NEXTVAL, :requestId,\n" +
				"    :checkType, :checkOutcome,\n" +
				"    :checkResult\n" +
				")";

		ObjectMapper mapper = new ObjectMapper();
		
		String strResult = "";
		try {
			strResult = mapper.writeValueAsString(sc.getResultDetail());
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			logger.error("Error saving system check. ", e);
			//throw e;
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestId", sc.getRequestId())
		.addValue("checkType", (sc.getCheckType()!=null)?sc.getCheckType().name():null)
		.addValue("checkOutcome", (sc.getOutcomeCode()!=null?sc.getOutcomeCode().name():null))
		.addValue("checkResult", strResult)
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"SYSCHK_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("SYSCHK_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		sc.setId(keyHolderMap.get("SYSCHK_N").toString());
	}

	private void saveAccountAssignments(LineItem li) {
		if (li == null) return;
		List<AccountAssignment> aaList = li.getAccountAssignments();
		if (aaList == null ) return;
		if (aaList.size() < 1 ) return;

		for (AccountAssignment aa : li.getAccountAssignments()) {
			aa.setLineitemId(li.getId());
			insertAccountAssignment(aa);
		}

	}

	private void insertAccountAssignment(AccountAssignment aa) {
		final String insertSql = "INSERT INTO PRS_ACCOUNT_ASSIGN (\n" +
				"    AC_N, LINEITEM_N, \n" +
				"    WBS_AC_N, GL_AC_N, QTY_Q, \n" +
				"    AMT_A, SG_AMT_A\n" +
				") VALUES (\n" +
				"    PRS_ACCOUNT_ASSIGN_SEQ.NEXTVAL, :lineitemId, \n" +
				"    :wbsAccount, :glAccount, :quantity, \n" +
				"    :amount,  :sgdAmount\n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("lineitemId", aa.getLineitemId())
		.addValue("wbsAccount", aa.getWbs())
		.addValue("glAccount", aa.getGlAccount())
		.addValue("quantity", aa.getQuantity())
		.addValue("amount",aa.getSubTotal())	  
		.addValue("sgdAmount", aa.getSgdSubtotal())	 	      
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"AC_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("AC_N not returned in KeyHolder");
		}


		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		aa.setId(keyHolderMap.get("AC_N").toString());
	}

	private void insertQuotation(Quotation qt) {
		String supplierCode = null;
		String supplierName = null;
		if (qt.getSupplier() != null) {
			if (StringUtils.isNotBlank(qt.getSupplier().getSupplierCode())) {
				supplierCode = qt.getSupplier().getSupplierCode();
			} else {
				supplierName = qt.getSupplier().getSupplierName();
			}
		}

		final String insertSql = "INSERT INTO PRS_QUOTATION(\n" +
				"    QT_N,PR_N, \n" +
				"    SUPP_C, SUPP_OTH_T, QT_AMT_A\n" +
				") VALUES (\n" +
				"    PRS_QUOTATION_SEQ.NEXTVAL, :requestId,\n" +
				"    :supplier, :supplierName,:amount\n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestId", qt.getRequestId())
		.addValue("supplier", supplierCode)
		.addValue("supplierName", supplierName)
		.addValue("amount", qt.getQuotationAmount())
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"QT_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("QT_N not returned in KeyHolder");
		}


		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		qt.setId(keyHolderMap.get("QT_N").toString());
	}

	private void insertDocument(Document doc) {
		final String insertSql = "INSERT INTO PRS_DOCUMENT(\n" +
				"    DOCU_N, \n" +
				"    DOCU_DESC_T, DOCU_NM_T, \n" +
				"    DOCU_TP_C,DOCU_CONT_IM\n" +
				") VALUES (\n" +
				"    PRS_DOCUMENT_SEQ.NEXTVAL, \n" +
				"    :docDesc,:docName,\n" +
				"    :docType,:docContent\n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("quotationId",doc.getQuotationId())
				.addValue("docDesc", doc.getDescription())
				.addValue("docName", doc.getFilename())
				.addValue("docType", (doc.getDocumentType() != null) ? doc.getDocumentType().toString() : null)
				.addValue("docContent", doc.getData())
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		//KeyHolder keyHolder = factory.newKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"DOCU_N"}
		);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("DOCU_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		doc.setId(keyHolderMap.get("DOCU_N").toString());
	}

	private void insertQuotationDocument(Document doc) {
		insertDocument(doc);

		// Update linkage table.
		this.prsJdbcTemplate.update(
				"INSERT INTO PRS_QUOTATION_DOCUMENT (QT_N, DOCU_N) VALUES (?, ?)",
				doc.getQuotationId(),
				doc.getId()
		);
	}

	private void insertAward(QuotationAward award) {
		if (award == null) return;

		final String insertSql = "INSERT INTO PRS_PURCHASE_AWARD(\n" +
				"    AWD_N, PR_N, \n" +
				"    QT_N,AWD_RSN_C, \n" +
				"    AWD_RSNREMK_T\n" +
				") VALUES (\n" +
				"    PRS_PURCHASE_AWARD_SEQ.NEXTVAL, :requestId, \n" +
				"    :quotationId,:justificationCode,\n" +
				"    :justificationRemark\n" +
				")";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("quotationId",award.getQuotationId())
		.addValue("requestId", award.getRequestId())
		.addValue("justificationCode", (award.getAwardJustification() != null) ? award.getAwardJustification().toString() : null)
		.addValue("justificationRemark", award.getJustificationRemark())
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"AWD_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("AWD_N not returned in KeyHolder");
		}


		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		award.setId(keyHolderMap.get("AWD_N").toString());
	}

	private void insertDeliveryInfo(DeliveryInfo di, String quotationId) {
		final String insertSql = "INSERT INTO PRS_DELVORDER_INFO(\n" +
				"    DO_INFO_N,PR_N, PAYMT_TERM_C, \n" +
				"    DO_ADDR_T, DO_BILLADDR_T, \n" +
				"    REQ_EMAIL_T, REQ_PHONE_T, \n" +
				"    INSTRN_SUPP_T, DO_EXP_DTM, \n" +
				"    QT_REF_N, QT_N \n" +
				") VALUES (\n" +
				"    PRS_DELVORDER_INFO_SEQ.NEXTVAL, :requestId,:paymentTerm,\n" +
				"    :deliveryAddr,:BillingAddr,\n" +
				"    :requestorEmail,:requestorPhone,\n" +
				"    :instructionToSupplier, :expectedDeliveryDate,\n" +
				"    :quotationReferenceNumber, :quotationId \n" +
				")\n";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestId", di.getRequestId())
		.addValue("paymentTerm", (di.getPaymentTerm() != null) ? di.getPaymentTerm().toString() : null)
		.addValue("deliveryAddr", di.getDeliveryAddress())
		.addValue("BillingAddr", di.getBillingAddress())
		.addValue("requestorEmail", di.getRequestorEmail())
		.addValue("requestorPhone", di.getRequestorPhone())
		.addValue("instructionToSupplier", di.getInstructionToSupplier())
		.addValue("expectedDeliveryDate", di.getExpectedDeliveryDate())
		.addValue("quotationReferenceNumber", di.getQuotationReferenceNumber())
		.addValue("quotationId", quotationId)
		;

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSql,
				params,
				keyHolder,
				new String[]{"DO_INFO_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("DO_INFO_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		di.setId(keyHolderMap.get("DO_INFO_N").toString());
	}

    private void deleteRequestContent(String id) {
		MapSqlParameterSource params = new MapSqlParameterSource("id", id);

		List<String> documentIds = new ArrayList<>();
		documentIds.addAll(this.prsNamedJdbcTemplate.queryForList(
				"select DOCU_N from PRS_QUOTATION_DOCUMENT where QT_N IN (select QT_N from PRS_QUOTATION where PR_N = :id)",
				params,
				String.class
		));
		documentIds.addAll(this.prsNamedJdbcTemplate.queryForList(
				"select DOCU_N from PRS_REQ_DOCUMENT where PR_N = :id",
				params,
				String.class
		));

		if (CollectionUtils.isNotEmpty(documentIds)) {
			MapSqlParameterSource documentParams = new MapSqlParameterSource("documentIds", documentIds);

			this.prsNamedJdbcTemplate.update("delete from PRS_QUOTATION_DOCUMENT where DOCU_N in (:documentIds)", documentParams);
			this.prsNamedJdbcTemplate.update("delete from PRS_REQ_DOCUMENT where DOCU_N in (:documentIds)", documentParams);
			this.prsNamedJdbcTemplate.update("delete from PRS_DOCUMENT where DOCU_N in (:documentIds)", documentParams);
		}

		this.prsNamedJdbcTemplate.update("DELETE FROM PRS_APPV_STS where PR_N = :id", params);
		this.prsNamedJdbcTemplate.update("DELETE FROM PRS_LOCATION where PR_N = :id", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_APPL_SYSCHECK where PR_N = :id", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_DELVORDER_INFO where PR_N = :id", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_PURCHASE_AWARD where PR_N = :id", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_ACCOUNT_ASSIGN where LINEITEM_N in (select LINEITEM_N from PRS_PURCHASE_LINEITEM where PR_N = :id)", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_PURCHASE_LINEITEMPRDC where LINEITEM_N in (select LINEITEM_N from PRS_PURCHASE_LINEITEM where PR_N = :id)", params);
		this.prsNamedJdbcTemplate.update("delete from PRS_APPV_LMT where PR_N = :id", params);
		this.prsNamedJdbcTemplate.update("delete from PRS_PURCHASE_LINEITEM where PR_N = :id", params);
        this.prsNamedJdbcTemplate.update("delete from PRS_QUOTATION where PR_N = :id", params);
    }

    @Override
	public PagedData<PurchaseRequest> searchRequest(PurchaseRequestSearchForm input, List<String> faculties, List<String> departments, String requestorNo, Role role) throws ParseException {
		if (input == null) {
			throw new IllegalArgumentException("User Search Input is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		
		ProductTypeCode productType = input.getProductType();
		
		String chemical_material_desc    = "    DECODE(chm_material.material_t, null, null, chm_material.material_t)";
		String radioactive_material_desc = "    DECODE(radnucld_material.material_t, null, null, radnucld_material.material_t)";
		String biological_material_desc  = "    DECODE(bio_material.material_t, null, null, bio_material.material_t)";
		
		final String CHEMICAL_MATERIAL_QUERY = "        (SELECT pr_n, LISTAGG(chm_nm_t, ';') \n" + 
				"        WITHIN GROUP (ORDER BY pr_n, lineitem_n, chm_nm_t) as material_t \n" + 
				"        FROM ( \n" + 
				"            SELECT ctg.chm_nm_t, item.lineitem_n, item.pr_n from HMMS_PRS_CHM_CTG ctg \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON json_value(itemprdc.PRDC_DETL_T , '$.chemicalNumber') = ctg.chm_n \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"            UNION \n" + 
				"            SELECT prd.chm_nm_t, item.lineitem_n, item.pr_n from HMMS_PRS_CHM_PRD prd \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON itemprdc.PRDC_REF_N = prd.CHM_PRDC_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"             ) \n" + 
				"        GROUP BY pr_n) chm_material ON chm_material.pr_n = prs.pr_n \n";
		
		final String CHEMICAL_CAS_QUERY = "        (SELECT pr_n, LISTAGG(cas_n, ';') \n" + 
				"        WITHIN GROUP (ORDER BY lineitem_n, cas_n) cas_n FROM ( \n" + 
				"            SELECT ctg.cas_n, item.lineitem_n, item.pr_n from HMMS_PRS_CHM_CTG ctg \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON json_value(itemprdc.prdc_detl_t , '$.chemicalNumber') = ctg.chm_n \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"        UNION \n" + 
				"            SELECT prd.cas_n, item.lineitem_n, item.pr_n from HMMS_PRS_CHM_PRD prd \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON itemprdc.PRDC_REF_N = prd.CHM_PRDC_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N) \n" + 
				"        GROUP BY pr_n) cas ON cas.pr_n = prs.pr_n \n";

		final String RADIOACTIVE_MATERIAL_QUERY = "        (SELECT pr_n, LISTAGG(radnucld_t, ';') \n" + 
				"        WITHIN GROUP (ORDER BY pr_n, lineitem_n, radnucld_t) as material_t \n" + 
				"        FROM ( \n" + 
				"            SELECT ctg.radnucld_t, item.lineitem_n, item.pr_n from HMMS_PRS_RADNUCLD_CATALOG ctg \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON json_value(itemprdc.PRDC_DETL_T , '$.radionuclideId') = ctg.radnucld_n \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"            UNION \n" + 
				"            SELECT prd.radnucld_t, item.lineitem_n, item.pr_n from HMMS_PRS_RADNUCLD_PRODUCT prd \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON itemprdc.PRDC_REF_N = prd.RADNUCLD_PRDC_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"             ) \n" + 
				"        GROUP BY pr_n) radnucld_material ON radnucld_material.pr_n = prs.pr_n \n";
		
		final String RADIOACTIVE_PRODUCT_QUERY = "        (SELECT pr_n, LISTAGG(radnucld_prdcdesc_t, ';') \n" + 
				"        WITHIN GROUP (ORDER BY lineitem_n, radnucld_prdcdesc_t) material_name FROM ( \n" + 
				"            SELECT prd.radnucld_prdcdesc_t, item.lineitem_n, item.pr_n \n" +
				"                from HMMS_PRS_RADNUCLD_PRODUCT prd \n" +
				"                INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" +
				"                    ON itemprdc.PRDC_REF_N = prd.RADNUCLD_PRDC_N \n" +
				"                INNER JOIN PRS_PURCHASE_LINEITEM item \n" +
				"                    ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" +
				"            UNION \n" +
				"            SELECT json_value(itemprdc.PRDC_DETL_T , '$.productDescription') AS radnucld_prdcdesc_t, \n" +
				"                    item.lineitem_n, item.pr_n \n" +
				"            from PRS_PURCHASE_LINEITEM item\n" +
				"                JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc ON itemprdc.lineitem_n = item.lineitem_n \n" +
				"            where\n" +
				"                itemprdc.cat_c = :radioactiveCategory\n" +
				"                AND itemprdc.PRDC_REF_N IS NULL" +
				") \n" +
				"        GROUP BY pr_n) products ON products.pr_n = prs.pr_n \n";

		final String BIOLOGICAL_MATERIAL_QUERY = "        (SELECT pr_n, LISTAGG(bio_t, ';') \n" + 
				"        WITHIN GROUP (ORDER BY pr_n, lineitem_n, bio_t) as material_t \n" + 
				"        FROM ( \n" + 
				"            SELECT nvl(agent.bio_t, nvl(ctg.bio_t, agent.bio_sci_t)) as bio_t, item.lineitem_n, item.pr_n from HMMS_PRS_BIO_CTG ctg \n" + 
				"            LEFT JOIN HMMS_PRS_BIOAGENT agent \n" + 
				"            ON agent.BIO_N = ctg.BIO_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON json_value(itemprdc.PRDC_DETL_T , '$.biologicalId') = ctg.bio_n \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"            APPEND-CAUSE \n" +
				"            UNION \n" + 
				"            SELECT nvl(agent.bio_t, nvl(prd.bio_t, agent.bio_sci_t)) as bio_t, item.lineitem_n, item.pr_n from HMMS_PRS_BIO_PRD prd \n" + 
				"            LEFT JOIN HMMS_PRS_BIOAGENT agent \n" + 
				"            ON agent.BIO_N = prd.BIO_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEMPRDC itemprdc \n" + 
				"            ON itemprdc.PRDC_REF_N = prd.BIO_PRDC_N \n" + 
				"            INNER JOIN PRS_PURCHASE_LINEITEM item \n" + 
				"            ON item.LINEITEM_N = itemprdc.LINEITEM_N \n" + 
				"            APPEND-CAUSE \n" +
				"             ) \n" + 
				"        GROUP BY pr_n) bio_material ON bio_material.pr_n = prs.pr_n \n";

		String material_desc = "";
		
		if(productType != null) {
			switch (productType) {
				case PRODUCT_CHEMICAL:
					material_desc = chemical_material_desc + " as material_t, \n";
					break;
				case PRODUCT_BIOLOGICAL:
					material_desc = biological_material_desc + " as material_t, \n";
					break;
				case PRODUCT_RADIOACTIVE:
					material_desc = radioactive_material_desc + " as material_t, \n";
					break;
				default:
					break;
			}
		} else {
			material_desc = chemical_material_desc + " || \n" + 
							radioactive_material_desc + " || \n" +
							biological_material_desc + " as material_t, \n";
		}
		
		StringBuilder query = new StringBuilder("SELECT \n" +
				"distinct prs.pr_n,\n"+
				"    prs.req_n, \n" +
				"    prs.req_stfstd_n, \n" + material_desc +
				"    suppl.supp_t,\n"+
				"    TO_CHAR(prs.req_subm_dtm, 'DD/MM/YYYY') req_subm_dtm_str, \n" +
				"    appv.appv_user_i,\n"+
				"    prs.req_sts_c, \n" +
				"    prs.req_subm_dtm, \n"+
				"    prs.req_tp_c, \n"+
				"    po.po_n, \n" +
				"    po.sap_po_n, \n" +
				"    po.po_sts_c, \n" +
				"    pco.collect_sts_c \n" +
				"FROM PRS_PURCHASE_REQ prs \n" +
				"    LEFT JOIN PRS_PURCHASE_LINEITEM line \n"+
				"        ON prs.pr_n = line.pr_n \n"+
				"    LEFT JOIN PRS_PERIODCONTRACT_PARTICS period \n" +
				"        ON period.con_n = line.con_n \n" +
				"    LEFT JOIN PRS_PURCHASE_LINEITEMPRDC prdc \n"+
				"        ON line.LINEITEM_N = prdc.LINEITEM_N \n"+
				"    LEFT JOIN PRS_LOCATION pl ON pl.pr_n = prs.pr_n \n" +
				"    LEFT JOIN (SELECT quot.pr_n, LISTAGG(supp.supp_t, ';') \n"+
				"        WITHIN GROUP (ORDER BY supp.supp_t) supp_t \n" +
				"            FROM PRSSUPPLIER supp \n" +
				"            INNER JOIN PRS_QUOTATION quot \n"+
				"            ON supp.supp_c = quot.supp_c \n" +
				"            GROUP BY quot.pr_n) suppl \n"+
				"        ON prs.pr_n = suppl.pr_n \n"+
				"    LEFT JOIN PRS_PURCHASE_ORDER po \n"+
				"        ON po.pr_n = prs.pr_n \n"+
				"    LEFT JOIN PRS_COLLECTION col \n"+
				"        ON col.pr_n = prs.pr_n \n"+
				"    LEFT JOIN \n"+
				"        (SELECT pr_n, LISTAGG(wbs_ac_n, ';') \n"+
				"            WITHIN GROUP (ORDER BY pr_n, wbs_ac_n) wbs_ac_n FROM ( \n"+
				"                SELECT distinct item.pr_n, assign.wbs_ac_n FROM PRS_ACCOUNT_ASSIGN assign \n"+
				"                INNER JOIN PRS_PURCHASE_LINEITEM item \n"+
				"                ON assign.LINEITEM_N = item.LINEITEM_N) GROUP BY pr_n \n"+
				"        UNION \n" +
				"        SELECT pr_n, LISTAGG(wbs_ac_n, ';') \n"+
				"            WITHIN GROUP (ORDER BY pr_n, wbs_ac_n) wbs_ac_n FROM ( \n"+
				"                SELECT distinct ppr.pr_n, lmt.wbs_ac_n FROM PRS_APPV_LMT lmt \n"+
				"                INNER JOIN PRS_PURCHASE_REQ ppr \n"+
				"                ON lmt.pr_n = ppr.pr_n) GROUP BY pr_n \n"+
				"        ) wbs ON wbs.pr_n = prs.pr_n \n"+
				"    LEFT JOIN \n"+
				"        (SELECT pr_n, LISTAGG(appv_user_i, ';') \n"+
				"        WITHIN GROUP (ORDER BY pr_n, appv_user_i) appv_user_i \n"+
				"            FROM PRS_APPV_STS \n"+
				"            GROUP BY pr_n) appv \n"+
				"        ON appv.pr_n = prs.pr_n \n"+
				"    LEFT JOIN PRS_COLLECTION pco on prs.pr_n = pco.pr_n \n");
		
		// for different tabs --- product type
		if(productType != null) {
			switch (input.getProductType()) {
				case PRODUCT_CHEMICAL:
					query.append("    JOIN \n" + CHEMICAL_MATERIAL_QUERY);
					
					if (StringUtils.isNotBlank(input.getCasNumber())) {
						query.append("    LEFT JOIN \n" + CHEMICAL_CAS_QUERY);
					}
					query.append(" WHERE 1=1 \n");
					
					if (StringUtils.isNotBlank(input.getChemicalName())) {
						query.append(" AND UPPER(chm_material.material_t) LIKE :material_t ");
						params.addValue("material_t", "%" + input.getChemicalName().trim().toUpperCase() + "%");
					}
					
					if (StringUtils.isNotBlank(input.getCasNumber())) {
						query.append(" AND UPPER(cas.cas_n) LIKE :cas_n ");
						params.addValue("cas_n", "%" + input.getCasNumber().trim().toUpperCase() + "%");
					}
					break;
				case PRODUCT_RADIOACTIVE:
					query.append("    JOIN \n" + RADIOACTIVE_MATERIAL_QUERY);
					
					if (StringUtils.isNotBlank(input.getRadioactiveMaterialName())) {
						query.append("    LEFT JOIN \n" + RADIOACTIVE_PRODUCT_QUERY);
						params.addValue("radioactiveCategory", ProductTypeCode.PRODUCT_RADIOACTIVE.toString());
					}
					query.append(" WHERE 1=1 \n");
					
					if (StringUtils.isNotBlank(input.getRadionuclide())) {
						query.append(" AND UPPER(radnucld_material.material_t) LIKE :material_t ");
						params.addValue("material_t", "%" + input.getRadionuclide().trim().toUpperCase() + "%");
					}
					
					if (StringUtils.isNotBlank(input.getRadioactiveMaterialName())) {
						query.append(" AND UPPER(products.material_name) LIKE :material_name ");
						params.addValue("material_name", "%" + input.getRadioactiveMaterialName().trim().toUpperCase() + "%");
					}
					break;
				case PRODUCT_BIOLOGICAL:
					StringBuffer appendQuery = new StringBuffer("WHERE 1=1 ");
					
					if(StringUtils.isNotBlank(input.getScientificName()) || StringUtils.isNotBlank(input.getStrain())) {
						if (StringUtils.isNotBlank(input.getScientificName())) {
							appendQuery.append(" AND (UPPER(agent.bio_sci_t) LIKE :bio_sci_t OR UPPER(agent.common_name) LIKE :bio_sci_t) ");
							params.addValue("bio_sci_t", "%" + input.getScientificName().trim().toUpperCase() + "%");
						}
						
						if (StringUtils.isNotBlank(input.getStrain())) {
							appendQuery.append(" AND UPPER(agent.bio_strain_t) LIKE :bio_strain_t ");
							params.addValue("bio_strain_t", "%" + input.getStrain().trim().toUpperCase() + "%");
						}
					}

					query.append("    JOIN \n" + BIOLOGICAL_MATERIAL_QUERY.replace("APPEND-CAUSE", appendQuery));
					query.append(" WHERE 1=1 \n");
					
					if (StringUtils.isNotBlank(input.getBiologicalMaterialName())) {
						query.append(" AND UPPER(bio_material.material_t) LIKE :material_t ");
						params.addValue("material_t", "%" + input.getBiologicalMaterialName().trim().toUpperCase() + "%");
					}
					
					break;
				default:
					break;
			}
		} else {
			query.append("    LEFT JOIN \n" + CHEMICAL_MATERIAL_QUERY);
			query.append("    LEFT JOIN \n" + RADIOACTIVE_MATERIAL_QUERY);
			query.append("    LEFT JOIN \n" + BIOLOGICAL_MATERIAL_QUERY.replace("APPEND-CAUSE", ""));
			query.append(" WHERE 1 = 1 \n ");
		}

		if (StringUtils.isNotEmpty(input.getRequestId())) {
			query.append(" AND prs.pr_n = :pr_n ");
			params.addValue("pr_n", input.getRequestId());
		}
		
		if (StringUtils.isNotBlank(input.getPurchaseRequestNumber())) {
			query.append(" AND UPPER(prs.req_n) LIKE :req_n ");
			params.addValue("req_n", "%" + input.getPurchaseRequestNumber().trim().toUpperCase()+ "%");
		}

		if (StringUtils.isNotBlank(input.getPurchaseOrderNumber())) {
			query.append(" AND UPPER(po.sap_po_n) LIKE :po_n ");
			params.addValue("po_n", "%" + input.getPurchaseOrderNumber().trim().toUpperCase()+ "%");
		}

		if (CollectionUtils.isNotEmpty(input.getRequestorList())) {
			query.append(" AND prs.req_stfstd_n in (:requestor_n)");
			params.addValue("requestor_n", input.getRequestorList());
		}

		if (CollectionUtils.isNotEmpty(input.getApproverList())) {
			query.append(" AND ( ");

			final int maxSize = 50;
			final AtomicInteger ctr = new AtomicInteger();
			input.getApproverList().stream()
					.collect(Collectors.groupingBy(iteration -> ctr.getAndIncrement() / maxSize))
					.forEach((k, v) -> {
						query.append(k > 0 ? "OR " : "");
						query.append(" regexp_like (appv.appv_user_i , :approverList"+k+") ");
						params.addValue("approverList"+k, String.join("|", v.stream().collect(Collectors.toList())));
					});
			query.append(" )");
		}

		SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
		if (StringUtils.isNotEmpty(input.getStartDate()) && StringUtils.isNotEmpty(input.getEndDate())) {
			query.append(" AND trunc(prs.req_subm_dtm) between :start_d and :end_d ");

			params.addValue("start_d", sdf.parse(input.getStartDate()));
			params.addValue("end_d", sdf.parse(input.getEndDate()));
		}

		if (StringUtils.isNotBlank(input.getSupplier())) {
			query.append(" AND UPPER(suppl.supp_t) LIKE :supp_t ");
			params.addValue("supp_t", "%" + input.getSupplier().trim().toUpperCase() + "%");
		}

		if (StringUtils.isNotBlank(input.getWbsElement())) {
			query.append(" AND UPPER(wbs.wbs_ac_n) LIKE :wbs_n ");
			params.addValue("wbs_n", "%" + input.getWbsElement().trim().toUpperCase() + "%");
		}

		if (input.getRequestType() != null) {
			query.append(" AND prs.req_tp_c = :requestType ");
			params.addValue("requestType", input.getRequestType().toString());
		}
		
		if(StringUtils.isNotBlank(input.getContractNumber())) {
			query.append(" AND line.con_n = :con_n");
			params.addValue("con_n", input.getContractNumber().trim());
		}

		//noinspection SwitchStatementWithTooFewBranches
		switch (role) {
			case ROLE_REGULATORY:
				if (CollectionUtils.isNotEmpty(input.getFaculty())) {
					query.append(" AND pl.fac_c IN (:faculty) ");
					params.addValue("faculty", input.getFaculty());
				}
		
				if (CollectionUtils.isNotEmpty(input.getDepartment())) {
					query.append(" AND pl.dept_c IN (:departments) ");
					params.addValue("departments", input.getDepartment());
				}
				break;
				
			default:
				if (CollectionUtils.isNotEmpty(input.getFaculty())) {
					query.append(" AND prs.fac_c IN (:faculty) ");
					params.addValue("faculty", input.getFaculty());
				}
		
				if (CollectionUtils.isNotEmpty(input.getDepartment())) {
					query.append(" AND prs.dept_c IN (:departments) ");
					params.addValue("departments", input.getDepartment());
				}
		}
		
		if (input.getStatus() != null) {
			query.append(" AND prs.req_sts_c = :status ");
			params.addValue("status", input.getStatus().toString());
		}
		
		if (input.getPoStatus() != null) {
			query.append(" AND po.po_sts_c = :poStatus ");
			params.addValue("poStatus", input.getPoStatus().toString());
		}
		
		if (input.getCollectionStatus() != null) {
			query.append(" AND col.collect_sts_c = :collectionStatus ");
			params.addValue("collectionStatus", input.getCollectionStatus().toString());
		}
		
		// Apply user access rules.
		params.addValue("role", role.toString());
		params.addValue("requestorNo", requestorNo);
		switch (role) {
			case ROLE_NUS_ADMIN:
				// Can see everything.
				query.append(" AND prs.req_sts_c <> 'REQ_STS_DRAFT' \n");
				query.append(" AND EXISTS (SELECT pua.access_n FROM prs_user_access pua WHERE pua.access_tp_c = :role \n");
				query.append(" AND pua.user_i = :requestorNo) \n");
				break;

			case ROLE_FAC_ADMIN:
				// Can only see requests belonging to faculty.
				query.append(" AND prs.req_sts_c <> 'REQ_STS_DRAFT' \n");
				query.append(" AND EXISTS (SELECT pua.access_n FROM prs_user_access pua WHERE pua.access_tp_c = :role \n");
				query.append("    AND pua.user_i = :requestorNo \n");
				query.append("    AND pua.fac_c = prs.fac_c ) \n");
				break;

			case ROLE_GOODS_RECEIPT:
			case ROLE_DEPT_ADMIN:
				// Can only see requests belonging to faculty and department.
				query.append(" AND prs.req_sts_c <> 'REQ_STS_DRAFT' \n");
				query.append(" AND EXISTS (SELECT pua.access_n FROM prs_user_access pua WHERE pua.access_tp_c = :role \n");
				query.append("    AND pua.user_i = :requestorNo \n");
				query.append("    AND pua.fac_c = prs.fac_c AND pua.dept_c = prs.dept_c) \n");
				break;

			case ROLE_VIEWER:
			case ROLE_CATALOGUE_ADMIN:
				// Can only see the requests based on NUS/Faculty/Dept level access
				params.addValue("periodContractLevel", UserAttributeType.USER_ATTR_PERIOD_CONTRACT_LEVEL.toString());

				params.addValue("nusLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_NUS.toString());
				params.addValue("facultyLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_FAC.toString());
				params.addValue("departmentLevel", PeriodContractLevel.PERIOD_CONTRACT_LEVEL_DEPT.toString());
				
				query.append(" AND prs.req_sts_c <> 'REQ_STS_DRAFT' \n");
				query.append(" AND ( \n" +
						"    -- NUS Level access, can search all.\n" +
						"    EXISTS (SELECT atp.accesstp_n \n" +
						"            FROM prs_user_access pua \n" +
						"                JOIN prs_user_accesstp atp ON atp.access_n = pua.access_n and atp.defunct_f <> 'Y' \n" +
						"            WHERE pua.access_tp_c = :role \n" + 
						"                AND pua.user_i = :requestorNo \n" + 
						"                AND atp.accesstp_c = :periodContractLevel \n" +
						"                AND atp.accesstp_t = :nusLevel) \n" +
						"    -- Fac level access, only fac level.\n" +
						"    OR EXISTS (SELECT atp.accesstp_n \n" +
						"            FROM prs_user_access pua \n" +
						"                JOIN prs_user_accesstp atp ON atp.access_n = pua.access_n and atp.defunct_f <> 'Y' \n" +
						"            WHERE pua.access_tp_c = :role \n" +
						"                AND pua.user_i = :requestorNo \n" + 
						"                AND prs.fac_c = pua.fac_c \n" + 
						"                AND atp.accesstp_c = :periodContractLevel \n" +
						"                AND atp.accesstp_t = :facultyLevel) \n" +
						"    -- Dept level access, only dept level.\n" +
						"    OR EXISTS (SELECT atp.accesstp_n \n" +
						"            FROM prs_user_access pua \n" +
						"                JOIN prs_user_accesstp atp ON atp.access_n = pua.access_n and atp.defunct_f <> 'Y' \n" +
						"            WHERE pua.access_tp_c = :role \n"+ 
						"                AND pua.user_i = :requestorNo \n" +
						"                AND pua.fac_c = prs.fac_c AND pua.dept_c = prs.dept_c \n" + 
						"                AND atp.accesstp_c = :periodContractLevel \n" +
						"                AND atp.accesstp_t = :departmentLevel) \n" +
						") \n");
				break;

			case ROLE_RESEARCHER:
			case ROLE_LAB_ADMIN:
				// Can only see the requests they raised.
				query.append(" AND prs.req_stfstd_n = :requestorNo \n");
				params.addValue("requestorNo", requestorNo);
				break;

			case ROLE_REGULATORY:
				// Can only see the request (storage location) they can approve that belongs to their department.
				query.append(" AND prs.req_sts_c <> 'REQ_STS_DRAFT' \n");
				query.append(" AND EXISTS (SELECT pua.access_n FROM prs_user_access pua WHERE pua.access_tp_c = :role \n");
				query.append("    AND pua.user_i = :requestorNo \n");
				query.append("    AND pua.fac_c = pl.fac_c AND pua.dept_c = pl.dept_c) \n");
				break;

			case ROLE_DEAN:
			case ROLE_HEAD_OF_DEPARTMENT:
			case ROLE_VICE_PRESIDENT:
				// Can only see the request they can approve.
				query.append(" AND prs.pr_n IN (" +
							"    SELECT\n" +
							"        apr.pr_n\n" +
							"    FROM\n" +
							"        PRS_PURCHASE_REQ apr\n" +
							"        JOIN prs_appv_sts apa ON apr.pr_n = apa.pr_n\n" +
							"    WHERE\n" +
							"        ((apa.appv_tp_c = 'APPV_TP_APPROVER_1' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_1')\n" +
							"         OR (apa.appv_tp_c = 'APPV_TP_APPROVER_2' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_2')\n" +
							"         OR (apr.req_sts_c IN ('REQ_STS_APPROVED','REQ_STS_REJECTED'))) \n" +
							"        AND apa.appv_user_i = :requestorNo) \n");
				break;

			case ROLE_QUOTATION_APPV_AUTH:
				// Can only see the request they can approve (SQRR only).
				query.append(" AND prs.req_tp_c = :qaaRequestType ");
				params.addValue("qaaRequestType", RequestType.REQ_TYPE_SQRR.toString());

				query.append(" AND prs.pr_n IN (" +
						"    SELECT\n" +
						"        apr.pr_n\n" +
						"    FROM\n" +
						"        PRS_PURCHASE_REQ apr\n" +
						"        JOIN prs_appv_sts apa ON apr.pr_n = apa.pr_n\n" +
						"    WHERE\n" +
						"        ((apa.appv_tp_c = 'APPV_TP_APPROVER_1' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_1')\n" +
						"         OR (apa.appv_tp_c = 'APPV_TP_APPROVER_2' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_2')\n" +
						"         OR (apr.req_sts_c IN ('REQ_STS_APPROVED','REQ_STS_REJECTED'))) \n" +
						"        AND apa.appv_user_i = :requestorNo) \n");
				break;

			case ROLE_PRINCIPAL_INVESTIGATOR:
				// Can only see the requests they raised and can approve.
				query.append(" AND (prs.pr_n IN (" +
							"    SELECT\n" +
							"        apr.pr_n\n" +
							"    FROM\n" +
							"        PRS_PURCHASE_REQ apr\n" +
							"        JOIN prs_appv_sts apa ON apr.pr_n = apa.pr_n\n" +
							"    WHERE\n" +
							"        ((apa.appv_tp_c = 'APPV_TP_APPROVER_1' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_1')\n" +
							"         OR (apa.appv_tp_c = 'APPV_TP_APPROVER_2' AND apr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_2')\n" +
							"         OR (apr.req_sts_c IN ('REQ_STS_APPROVED','REQ_STS_REJECTED'))) \n" +
							"        AND apa.appv_user_i = :requestorNo) \n" +
							"    OR prs.req_stfstd_n = :requestorNo \n"+
							"  OR prs.per_authuser_i = :requestorNo) \n"
							);
				break;
			case ROLE_LABORATORY_SUPPLY:
				
				query.append(" AND prs.pr_n IN (\n"+
							"	SELECT pc.pr_n \n"+
							"	FROM \n"+
							"	prs_collection pc \n"+
							"	JOIN prs_purchase_req pr ON pc.pr_n = pr.pr_n \n"+
							"	JOIN prs_quotation pq ON pr.pr_n = pq.pr_n \n"+
							"	JOIN prs_internal_store pis ON pis.supp_c = pq.supp_c \n"+
							"	JOIN prs_user_accesstp puat ON pis.INTL_STORE_N = puat.accesstp_t \n"+
							"	JOIN prs_user_access pua ON puat.access_n = pua.access_n \n"+
							"	AND puat.accesstp_c = 'USER_ATTR_INTERNAL_STORE' and puat.defunct_f = 'N'\n"+ 
							"	AND pua.user_i = :requestorNo \n"+
							"	AND pua.access_tp_c = :role ) \n"
							);
				break;
			default:
				// Role does not have a configured matrix. Disallow any result.
				query.append(" AND 0=1 ");
				break;
		}

		logger.debug("query: " + query);
		return applyWithPagingAndSorting(
				input,
				query.toString(),
				params,
				(rs, i) -> {
					PurchaseRequest request = new PurchaseRequest();

					request.setPurchaseRequestNumber(rs.getString("req_n"));
					request.setRequestorId(rs.getString("req_stfstd_n"));
					request.setDateOfRequest(rs.getString("req_subm_dtm_str"));
					request.setSupplier(rs.getString("supp_t"));
					request.setMaterialName(rs.getString("material_t"));
					request.setApprover(rs.getString("appv_user_i"));
					request.setStatus(RequestStatus.valueOf(rs.getString("req_sts_c")));
					request.setRequestType(RequestType.valueOf(rs.getString("req_tp_c")));
					request.setRequestId(rs.getString("pr_n"));
					request.setPurchaseOrderNumber(rs.getString("sap_po_n"));
					if (StringUtils.isNotEmpty(rs.getString("po_sts_c"))) {
						request.setPoStatus(POStatus.valueOf(rs.getString("po_sts_c")));
					}
					
					if (StringUtils.isNotEmpty(rs.getString("collect_sts_c"))) {
						request.setCollectionStatus(CollectionStatus.valueOf(rs.getString("collect_sts_c")));
					}
					
					return request;
				});
	}

	@Override
	public Request getRequest(RequestSearchInput input) {
		if (input == null) {
			throw new IllegalArgumentException("Request search input is required.");
		}

		if (StringUtils.isEmpty(input.getRequestId()) && StringUtils.isEmpty(input.getRequestNo())) {
			throw new IllegalArgumentException("Either request number or requuest ID is required.");
		}

		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			StringBuilder query = new StringBuilder("SELECT \n" +
					"    T1.PR_N, T1.REQ_N, T1.REQ_TP_C, \n" +
					"    F.FAC_C, INITCAP(F.FAC_T) AS FAC_T, D.DEPT_C, INITCAP(D.DEPT_T2) AS DEPT_T2, \n" +
					"    D.SAP_DEPT_C, \n" +
					"    T1.REQ_STFSTD_N, ICC.CRCY_C, ICC.CRCY_T, T1.TOT_AMT_A, \n" +
					"    T1.ESTM_PURCHVAL_C, T1.REQ_STS_C, T1.QT_RSNRMK_T, \n" +
					"    T1.REC_CREATEUSER_I, T1.REC_UPDUSER_I, T1.REC_UPD_DTM, T1.PRDC_DETL_T, T1.REQ_SUBM_DTM, \n" +
					"    T2.DO_INFO_N, T2.PAYMT_TERM_C, T2.DO_EXP_DTM , \n" +
					"    T2.DO_ADDR_T, T2.DO_BILLADDR_T, \n" +
					"    T2.REQ_EMAIL_T, T2.REQ_PHONE_T, T2.INSTRN_SUPP_T, T2.QT_REF_N, \n" +
					"    T1.PURCH_PPOSE_T, T1.INVNT_OWNERSTF_N, T1.PER_AUTHUSER_I, T1.REQ_ACCESSTP_C \n" +
					"FROM \n" +
					"    PRS_PURCHASE_REQ T1 \n" +
					"    LEFT OUTER JOIN PRS_DELVORDER_INFO T2 ON T2.PR_N = T1.PR_N AND T2.QT_N IS NULL \n" +
					"    LEFT JOIN PRSCURRENCY ICC ON ICC.CRCY_C = T1.CRCY_C \n" +
					"    LEFT JOIN FACULTY F ON F.FAC_C = T1.FAC_C \n" +
					"    LEFT JOIN DEPARTMENT D ON D.DEPT_C = T1.DEPT_C \n" +
					"WHERE \n" +
					"    1=1 ");

			if (StringUtils.isNotEmpty(input.getRequestNo())) {
				query.append(" AND T1.REQ_N = :requestNo ");
				params.addValue("requestNo", input.getRequestNo());
			}

			if (StringUtils.isNotEmpty(input.getRequestId())) {
				query.append(" AND T1.PR_N = :requestId ");
				params.addValue("requestId", input.getRequestId());
			}

			if (input.getRequestType() != null) {
				query.append(" AND T1.REQ_TP_C = :requestType ");
				params.addValue("requestType", input.getRequestType().toString());
			}

			List<Request> requests = this.prsNamedJdbcTemplate.query(
					query.toString(), params,
					this::requestRowMapper
			);

			if (CollectionUtils.isNotEmpty(requests)) {
				return requests.get(0);
			}

		} catch (Exception e) {
			logger.error("Could not get purchase request.", e);
		}

		return null;
	}

	Request requestRowMapper(ResultSet rs, int i) throws SQLException {
		Request request = new Request();
		request.setId(rs.getString("PR_N"));
		request.setCreateUserNo(rs.getString("REC_CREATEUSER_I"));
		request.setEpv(EPVType.valueOf(rs.getString("ESTM_PURCHVAL_C")));
		request.setPurposeOfPurchase(rs.getString("PURCH_PPOSE_T"));
		request.setInventoryOwnerStaffNo(rs.getString("INVNT_OWNERSTF_N"));
		request.setQuotationJustification(rs.getString("QT_RSNRMK_T"));
		request.setRequestNo(rs.getString("REQ_N"));
		request.setRequestorStaffNo(rs.getString("REQ_STFSTD_N"));
		request.setDateOfRequest(rs.getDate("REQ_SUBM_DTM"));
		request.setAuthorizingStaffNo(rs.getString("PER_AUTHUSER_I"));

		String reqRoleStr = rs.getString("REQ_ACCESSTP_C");
		if (StringUtils.isNotEmpty(reqRoleStr)) {
		    request.setRequestorRole(Role.valueOf(reqRoleStr));
        }

		String requestTypeStr = rs.getString("REQ_TP_C");
		if (StringUtils.isNotEmpty(requestTypeStr)) {
			request.setRequestType(RequestType.valueOf(requestTypeStr));
		}

		String requestStatusStr = rs.getString("REQ_STS_C");
		if (StringUtils.isNotEmpty(requestStatusStr)) {
			request.setStatusCode(RequestStatus.valueOf(requestStatusStr));
		}

		String currencyCode = rs.getString("CRCY_C");
		if (StringUtils.isNotEmpty(currencyCode)) {
			Currency currency = new Currency();
			currency.setCode(currencyCode);
			currency.setDescription(rs.getString("CRCY_T"));

			request.setCurrency(currency);
		}

		String facultyCode = rs.getString("FAC_C");
		if (StringUtils.isNotEmpty(facultyCode)) {
			Faculty faculty = new Faculty();
			faculty.setFaculty(facultyCode);
			faculty.setDescription(rs.getString("FAC_T"));

			String departmentCode = rs.getString("DEPT_C");
			if (StringUtils.isNotEmpty(departmentCode)) {
				Department department = new Department();
				department.setDepartment(departmentCode);
				department.setSapDepartment(rs.getString("SAP_DEPT_C"));
				department.setDescription(rs.getString("DEPT_T2"));

				faculty.setDepartments(Collections.singletonList(department));
			}

			request.setFacultyDepartment(faculty);
		}

		request.setRequestDetail(CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), RequestAdditionalDetails.class));

		String requestStatusCodeStr = rs.getString("REQ_STS_C");
		if (!StringUtils.isNotEmpty(requestStatusCodeStr)) {
			request.setStatusCode(RequestStatus.valueOf(requestStatusCodeStr));
		}

		request.setTotalAmount(rs.getBigDecimal("TOT_AMT_A"));
		request.setUpdateUserNo(rs.getString("REC_UPDUSER_I"));
		request.setUpdateDateTime(rs.getDate("REC_UPD_DTM"));

		DeliveryInfo deliveryInfo = new DeliveryInfo();
		deliveryInfo.setBillingAddress(rs.getString("DO_BILLADDR_T"));
		deliveryInfo.setDeliveryAddress(rs.getString("DO_ADDR_T"));
		deliveryInfo.setId(rs.getString("DO_INFO_N"));
		deliveryInfo.setInstructionToSupplier(rs.getString("INSTRN_SUPP_T"));
		deliveryInfo.setPaymentTerm(StringUtils.isNotBlank(rs.getString("PAYMT_TERM_C")) ? PaymentTerm.valueOf(rs.getString("PAYMT_TERM_C")) : null);
		deliveryInfo.setExpectedDeliveryDate(rs.getDate("DO_EXP_DTM"));
		deliveryInfo.setRequestId(rs.getString("PR_N"));
		deliveryInfo.setRequestorEmail(rs.getString("REQ_EMAIL_T"));
		deliveryInfo.setRequestorPhone(rs.getString("REQ_PHONE_T"));
		deliveryInfo.setQuotationReferenceNumber(rs.getString("QT_REF_N"));
		request.setDeliveryInfo(deliveryInfo);


		return request;
	}

	@Override
	public List<LineItem> getPurchaseLineItems(String prId) {
		if (null == prId) {
			throw new IllegalArgumentException("Purchase Request number is required.");
		}
		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("prId", prId);

			String query =
				"SELECT\n" +
				"    LI.LINEITEM_N, LI.PR_N, LI.ITEM_N, LI.QTY_Q, LI.UPRICE_A, LI.SUBTOT_A, MU.MSRUNIT_T, LI.QTY_PERUNIT_N, \n" +
				"    LI.CRCY_C, LI.QT_N, LI.CON_N, LI.DOWNPAYMT_P, LI.DOWNPAYMT_A, LI.DOWNPAYMT_DUE_D, \n" +
				"    LD.PRDC_N, LD.PRDC_REF_N, LD.CAT_C, LD.PRDC_DETL_T, \n" +
				"    AA.AC_N, AA.WBS_AC_N, AA.GL_AC_N, AA.QTY_Q AS AA_QUANTITY_Q, AA.AMT_A, AA.SG_AMT_A, \n" +
				"    PD.CHM_NM_T, PD.REGL_C, PD.REGL_T, PD.CAS_N \n" +
				"FROM\n" +
				"    PRS_PURCHASE_LINEITEM LI \n" +
				"    LEFT OUTER JOIN PRS_PURCHASE_LINEITEMPRDC LD ON LI.LINEITEM_N = LD.LINEITEM_N \n" +
				"    FULL OUTER JOIN PRS_ACCOUNT_ASSIGN AA ON LI.LINEITEM_N = AA.LINEITEM_N \n" +
				"    LEFT JOIN HMMS_PRS_CHM_CTG PD ON PD.CHM_N = LD.PRDC_REF_N \n" +
				"    LEFT JOIN MSRUNIT MU ON MU.MSRUNIT_C = LI.MSR_UNIT_C " +
				"WHERE\n" +
				"    1=1 \n" +
				"    AND LI.PR_N = :prId \n" +
				"ORDER BY \n" +
				"    LI.LINEITEM_N, AA.AC_N ";

			Map<String, LineItem> lineItemMap = new HashMap<>();
			this.prsNamedJdbcTemplate.query(
				query,
				params,
				(rs, i) -> prepareLineItem(lineItemMap, rs)
			);

			return lineItemMap.values().stream()
					.sorted(Comparator.comparing(LineItem::getLineitemNo))
					.collect(Collectors.toList());

		} catch (Exception e) {
			logger.error("Could not retrieve line items.", e);
		}

		return Collections.emptyList();
	}

	LineItem prepareLineItem(Map<String, LineItem> lineItemMap, ResultSet rs) throws SQLException {
		String lineItemId = rs.getString("LINEITEM_N");
		LineItem lineItem = lineItemMap.get(lineItemId);
		if (lineItem == null) {
			lineItem = new LineItem();
			lineItem.setId(rs.getString("LINEITEM_N"));
			lineItem.setRequestId(rs.getString("PR_N"));
			lineItem.setLineitemNo(rs.getString("ITEM_N"));
			lineItem.setQuantity(rs.getBigDecimal("QTY_Q"));
			lineItem.setUnitPrice(rs.getBigDecimal("UPRICE_A"));
			lineItem.setSubTotal(rs.getBigDecimal("SUBTOT_A"));
			lineItem.setQuantityPerUnit(rs.getBigDecimal("QTY_PERUNIT_N"));

			String unitCode = rs.getString("MSRUNIT_T");
			if (StringUtils.isNotEmpty(unitCode)) {
				lineItem.setUnit(Unit.valueOf(unitCode));
			}

			Product product = new Product();
			product.setProductRefId(rs.getString("PRDC_REF_N"));
			product.setLineitemId(rs.getString("LINEITEM_N"));
			lineItem.setProduct(product);

			String productCategoryCode = rs.getString("CAT_C");
			if (StringUtils.isNotEmpty(productCategoryCode)) {
				product.setCategoryCode(ProductTypeCode.valueOf(productCategoryCode));
			}

			if (product.getCategoryCode() != null) {
				if (product.getCategoryCode() == ProductTypeCode.PRODUCT_CHEMICAL) {
					ChemicalProductDetail cpd = CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), ChemicalProductDetail.class);
					if (cpd != null) {
						cpd.setProductId(product.getProductRefId());
					}
					product.setProductDetail(cpd);
				}
				else if (product.getCategoryCode() == ProductTypeCode.PRODUCT_BIOLOGICAL) {
					BiologicalProductDetail bpd = CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), BiologicalProductDetail.class);
					if (bpd != null) {
						bpd.setProductId(product.getProductRefId());
					}
					product.setProductDetail(bpd);
				}
				else if (product.getCategoryCode() == ProductTypeCode.PRODUCT_RADIOACTIVE) {
					RadioactiveProductDetail rpd = CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), RadioactiveProductDetail.class);
					if (rpd != null) {
						rpd.setProductId(product.getProductRefId());
					}
					product.setProductDetail(rpd);
				}
				else if (product.getCategoryCode() == ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE) {
					product.setProductDetail(CommonUtils.fromJSON(rs.getString("PRDC_DETL_T"), AdditionalChargeProductDetail.class));
				}
			}

			lineItem.setAccountAssignments(new ArrayList<>());

			String currencyCode = rs.getString("CRCY_C");
			if (StringUtils.isNotBlank(currencyCode)) {
				Currency c = new Currency();
				c.setCode(currencyCode);
				lineItem.setCurrency(c);
			}

			lineItem.setQuotationId(rs.getString("QT_N"));
			lineItem.setContractNumber(rs.getString("CON_N"));

			lineItem.setDownpaymentPercentage(rs.getBigDecimal("DOWNPAYMT_P"));
			lineItem.setDownpaymentAmount(rs.getBigDecimal("DOWNPAYMT_A"));
			lineItem.setDownpaymentDueDate(rs.getDate("DOWNPAYMT_DUE_D"));

			lineItemMap.put(lineItem.getId(), lineItem);
		}

		// Set up account assignment.
		AccountAssignment aa = prepareAccountAssignment(rs);
		lineItem.getAccountAssignments().add(aa);
		
		return lineItem;
	}

	private AccountAssignment prepareAccountAssignment (ResultSet rs) throws SQLException {
		AccountAssignment accountAssignment = new AccountAssignment();
		accountAssignment.setId(rs.getString("AC_N"));
		accountAssignment.setGlAccount(rs.getString("GL_AC_N"));
		accountAssignment.setWbs(rs.getString("WBS_AC_N"));
		accountAssignment.setQuantity(rs.getBigDecimal("AA_QUANTITY_Q"));
		accountAssignment.setSubTotal(rs.getBigDecimal("AMT_A"));
		accountAssignment.setSgdAmount(rs.getBigDecimal("SG_AMT_A"));
		accountAssignment.setLineitemId(rs.getString("LINEITEM_N"));

		return accountAssignment;
	}
	

	@Override
	public List<Quotation> getPurchaseQuotations(String prId) {
		if (null == prId) {
			throw new IllegalArgumentException("Purchase Request number is required.");
		}

		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("prId", prId);

			StringBuilder query = new StringBuilder("SELECT \n" +
					"    T1.QT_N, T1.PR_N, T1.SUPP_C, T1.SUPP_OTH_T, T1.QT_AMT_A, \n" +
					"    T2.AWD_N, T2.AWD_RSN_C, T2.AWD_RSNREMK_T, \n" +
					"    T3.SUPP_T, T3.CTRY_C, \n" +
					"    T4.DOCU_N, T4.DOCU_DESC_T, T4.DOCU_NM_T, T4.DOCU_TP_C, \n" +
					"    DO.DO_INFO_N, DO.PAYMT_TERM_C, DO.DO_EXP_DTM , \n" +
					"    DO.DO_ADDR_T, DO.DO_BILLADDR_T, \n" +
					"    DO.REQ_EMAIL_T, DO.REQ_PHONE_T, DO.INSTRN_SUPP_T, DO.QT_REF_N \n" +
					"FROM \n" +
					"    PRS_QUOTATION T1 \n" +
					"    LEFT OUTER JOIN PRS_DELVORDER_INFO DO ON T1.QT_N = DO.QT_N " +
					"    LEFT OUTER JOIN PRS_PURCHASE_AWARD T2 ON T2.QT_N = T1.QT_N \n" +
					"    LEFT OUTER JOIN PRSSUPPLIER T3 ON T3.SUPP_C = T1.SUPP_C \n" +
					"    LEFT OUTER JOIN PRS_QUOTATION_DOCUMENT QD ON QD.QT_N = T1.QT_N \n" +
					"    FULL OUTER JOIN PRS_DOCUMENT T4 ON T4.DOCU_N = QD.DOCU_N \n" +
					"WHERE \n" +
					"    T1.PR_N = :prId ");

			Map<String, Quotation> quotationMap = new HashMap<>();

			this.prsNamedJdbcTemplate.query(
					query.toString(),
					params,
					(rs, rowNum) -> {
						String quotationId = rs.getString("QT_N");

						Quotation quotation = quotationMap.get(quotationId);
						if (quotation == null) {
							quotation = prepareQuotation(rs);
							quotationMap.put(quotationId, quotation);
						}

						if (quotation != null && StringUtils.isNotEmpty(rs.getString("DOCU_N"))) {
							Document document = prepareQuotationDocument(rs);
							if (quotation.getDocuments() == null) {
								quotation.setDocuments(new ArrayList<>());
							}
							quotation.getDocuments().add(document);
						}

						return null;
					});

			return quotationMap.values().stream()
					.sorted(Comparator.comparingInt(a -> Integer.valueOf(a.getId())))
					.collect(Collectors.toList());

		} catch (Exception e) {
			logger.error("Could not retrieve quotations.", e);
		}

		return Collections.emptyList();
	}

	Quotation prepareQuotation(ResultSet rs) throws SQLException {
		String quotationId = rs.getString("QT_N");

		Quotation quotation = new Quotation();

		quotation.setId(quotationId);
		quotation.setQuotationAmount(rs.getBigDecimal("QT_AMT_A"));
		quotation.setRequestId(rs.getString("PR_N"));

		QuotationAward quotationAward = new QuotationAward();
		quotationAward.setId(rs.getString("AWD_N"));
		quotationAward.setJustificationRemark(rs.getString("AWD_RSNREMK_T"));
		quotationAward.setQuotationId(quotationId);
		quotationAward.setRequestId(rs.getString("PR_N"));
		quotation.setAward(quotationAward);

		String awardJustificationStr = rs.getString("AWD_RSN_C");
		if (StringUtils.isNotEmpty(awardJustificationStr)) {
			quotationAward.setAwardJustification(AwardJustification.valueOf(awardJustificationStr));
		}

		quotation.setAwardFlag(quotationAward.getId() != null);

		Supplier supplier = new Supplier();

		String supplierCode = rs.getString("SUPP_C");
		if (StringUtils.isNotBlank(supplierCode)) {
			supplier.setCountryCode(rs.getString("CTRY_C"));
			supplier.setSupplierCode(supplierCode);
			supplier.setSupplierName(rs.getString("SUPP_T"));
		} else {
			supplier.setSupplierName(rs.getString("SUPP_OTH_T"));
		}
		quotation.setSupplier(supplier);

		String deliveryOrderId = rs.getString("DO_INFO_N");
		if (StringUtils.isNotBlank(deliveryOrderId)) {
			DeliveryInfo deliveryInfo = new DeliveryInfo();

			deliveryInfo.setId(deliveryOrderId);
			deliveryInfo.setBillingAddress(rs.getString("DO_BILLADDR_T"));
			deliveryInfo.setDeliveryAddress(rs.getString("DO_ADDR_T"));
			deliveryInfo.setInstructionToSupplier(rs.getString("INSTRN_SUPP_T"));
			deliveryInfo.setPaymentTerm(StringUtils.isNotBlank(rs.getString("PAYMT_TERM_C")) ? PaymentTerm.valueOf(rs.getString("PAYMT_TERM_C")) : null);
			deliveryInfo.setExpectedDeliveryDate(rs.getDate("DO_EXP_DTM"));
			deliveryInfo.setRequestId(rs.getString("PR_N"));
			deliveryInfo.setRequestorEmail(rs.getString("REQ_EMAIL_T"));
			deliveryInfo.setRequestorPhone(rs.getString("REQ_PHONE_T"));
			deliveryInfo.setQuotationReferenceNumber(rs.getString("QT_REF_N"));

			quotation.setDeliveryInfo(deliveryInfo);
		}

		return quotation;
	}

	Document prepareQuotationDocument(ResultSet rs) throws SQLException {
		Document document = new Document();
		document.setId(rs.getString("DOCU_N"));
		document.setDescription(rs.getString("DOCU_DESC_T"));
		document.setFilename(rs.getString("DOCU_NM_T"));
		document.setQuotationId(rs.getString("QT_N"));

		String documentTypeStr = rs.getString("DOCU_TP_C");
		if (StringUtils.isNotBlank(documentTypeStr)) {
			document.setDocumentType(DocumentType.valueOf(documentTypeStr));
		}

		return document;
	}

	@Override
	public List<SystemCheck> getPurchaseSystemChecks(String prId) {
		if (null == prId) {
			throw new IllegalArgumentException("Purchase Request number is required.");
		}

		try {
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("prId", prId);

			String query = "SELECT \n" +
					"    SYSCHK_N, PR_N, SYSCHK_TP_C, \n" +
					"    SYSCHK_RSLT_C, SYSCHK_RSLT_T \n" +
					"FROM \n" +
					"    PRS_APPL_SYSCHECK \n" +
					"WHERE \n" +
					"    PR_N = :prId ";

			return this.prsNamedJdbcTemplate.query(query, params, this::systemCheckRowMapper);
		} catch (Exception  e) {
			logger.error("Could not retrieve system checks.", e);
		}

		return Collections.emptyList();
	}

	@SuppressWarnings("unchecked")
	SystemCheck systemCheckRowMapper(ResultSet rs, int rowNum) throws SQLException  {
		SystemCheck systemCheck = new SystemCheck();
		systemCheck.setCheckType(SystemCheckType.valueOf(rs.getString("SYSCHK_TP_C")));
		systemCheck.setId(rs.getString("SYSCHK_N"));
		systemCheck.setOutcomeCode(SystemCheckOutcomeCode.valueOf(rs.getString("SYSCHK_RSLT_C")));
		systemCheck.setRequestId(rs.getString("PR_N"));
		try {
			switch (systemCheck.getCheckType()) {
			case SYSCHK_FUND:
				systemCheck.setResultDetail(new ObjectMapper().readValue(rs.getString("SYSCHK_RSLT_T"),
						new TypeReference<List<FundCheckResult>>() {
						}));
				break;
			case SYSCHK_LICENCE:
				systemCheck.setResultDetail(new ObjectMapper().readValue(rs.getString("SYSCHK_RSLT_T"),
						new TypeReference<List<ChemicalLicenseCheckResult>>() {
						}));
				break;
			case SYSCHK_LICENCE_BIOLOGICAL:
				systemCheck.setResultDetail(new ObjectMapper().readValue(rs.getString("SYSCHK_RSLT_T"),
						new TypeReference<List<BiologicalLicenceCheckResult>>() {
						}));
				break;
			case SYSCHK_LICENCE_RADIOACTIVE:
				systemCheck.setResultDetail(new ObjectMapper().readValue(rs.getString("SYSCHK_RSLT_T"),
						new TypeReference<List<RadioactiveLicenceCheckResult>>() {
						}));
				break;

			default:
				break;
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return systemCheck;
	}

	@Override
	public Document getDocumentById(String id) {
		if (null == id) {
			throw new IllegalArgumentException("Document id is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", id);

		StringBuilder sql = new StringBuilder()
		.append("SELECT DOCU_N, DOCU_DESC_T, DOCU_NM_T, DOCU_TP_C, DOCU_CONT_IM ")
		.append("FROM PRS_DOCUMENT ")
		.append("WHERE DOCU_N = :id ");

		List<Document> documents = this.prsNamedJdbcTemplate.query(sql.toString(), params, this::documentRowMapper);

		if(CollectionUtils.isNotEmpty(documents)) {
			return documents.get(0);
		}

		return null;
	}

	@Override
	public String getRequestForDocumentId(String documentId) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("docuN", documentId);

		List<String> requestIds = this.prsNamedJdbcTemplate.queryForList(
			"SELECT DISTINCT pr_n FROM (\n" +
			"    SELECT\n" +
			"        pr.pr_n\n" +
			"    FROM\n" +
			"        prs_document pd\n" +
			"        JOIN prs_quotation_document qd ON pd.docu_n = qd.docu_n\n" +
			"        JOIN prs_quotation q ON qd.qt_n = q.qt_n\n" +
			"        JOIN prs_purchase_req pr ON q.pr_n = pr.pr_n\n" +
			"    WHERE\n" +
			"        pd.docu_n = :docuN\n" +
			"    UNION ALL\n" +
			"    SELECT\n" +
			"        pr.pr_n\n" +
			"    FROM\n" +
			"        prs_document pd\n" +
			"        JOIN prs_req_document rd ON pd.docu_n = rd.docu_n\n" +
			"        JOIN prs_purchase_req pr ON rd.pr_n = pr.pr_n\n" +
			"    WHERE\n" +
			"        pd.docu_n = :docuN\n" +
			")",
			params,
			String.class
		);

		return (CollectionUtils.isNotEmpty(requestIds)) ? requestIds.get(0): null;
	}

	Document documentRowMapper(ResultSet rs, int rowNum) throws SQLException {
		Document document = new Document();
		document.setId(rs.getString("DOCU_N"));
		document.setDescription(rs.getString("DOCU_DESC_T"));
		document.setFilename(rs.getString("DOCU_NM_T"));
		document.setData(rs.getBytes("DOCU_CONT_IM"));

		String documentTypeStr = rs.getString("DOCU_TP_C");
		if (StringUtils.isNotBlank(documentTypeStr)) {
			document.setDocumentType(DocumentType.valueOf(documentTypeStr));
		}

		return document;
	}

	private void saveLocation(Request pr) {
		if (pr == null) return;
		if (pr.getLocation() == null ) return;

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("locationId", pr.getLocation().getLocationId());
		params.addValue("description", pr.getLocation().getDescription());
		params.addValue("requestId", pr.getId());
		params.addValue("facultyCode", pr.getLocation().getFacultyCode());
		params.addValue("deptCode", pr.getLocation().getDeptCode());

		String sql = "INSERT INTO PRS_LOCATION (\n" +
				"    LOC_N,CHM_LOC_N, CHM_LOC_T, PR_N, FAC_C, DEPT_C\n" +
				") VALUES (\n" +
				"    PRS_LOCATION_SEQ.NEXTVAL, :locationId, :description, :requestId, :facultyCode, :deptCode\n" +
				")  ";
		prsNamedJdbcTemplate.update(sql, params);
	}
	
	@Override
	public Location getPurchaseRequestLocation(String requestId) {
		List<Location> requestLocations = this.prsJdbcTemplate.query(
				"SELECT LOC_N,CHM_LOC_N, CHM_LOC_T, PR_N, FAC_C, DEPT_C FROM PRS_LOCATION\n" +
					" WHERE PR_N = ? ",
				this::locationRowMapper,
				requestId
		);

		if (CollectionUtils.isNotEmpty(requestLocations)) {
			return requestLocations.get(0);
		}

		return null;
	}

	Location locationRowMapper(ResultSet rs, int i) throws SQLException {
		Location location = new Location();
		location.setId(rs.getString("LOC_N"));
		location.setLocationId(rs.getString("CHM_LOC_N"));
		location.setDescription(rs.getString("CHM_LOC_T"));
		location.setRequestId(rs.getInt("PR_N"));
		location.setFacultyCode(rs.getString("FAC_C"));
		location.setDeptCode(rs.getString("DEPT_C"));

		return location;
	}

	@Override
	public boolean lockRequest(String requestId) {
		List<String> locked = this.prsJdbcTemplate.queryForList(
				"SELECT\n" +
						"    PR_N \n" +
						"FROM\n" +
						"    PRS_PURCHASE_REQ\n" +
						"WHERE\n" +
						"    PR_N = ? \n" +
						"FOR UPDATE",
				String.class,
				requestId
		);

		return CollectionUtils.isNotEmpty(locked);
	}

	@Override
	public List<PurchaseApproval> getApprovalsForRequestIds(List<String> requestIds) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestIds", requestIds);

		return this.prsNamedJdbcTemplate.query(
				"SELECT\n" +
					"    APPV_N, APPV_USER_I,\n" +
					"    PR_N, APPV_TP_C,\n" +
					"    APPV_STS_C,\n" +
					"    REMK_T,\n" +
					"    REC_UPDUSER_I, REC_UPD_DTM, \n" +
					"    PER_AUTHUSER_I, APPVR_ACCESSTP_C, AUTOAPPV_F \n" +
					"FROM\n" +
					"    PRS_APPV_STS\n" +
					"WHERE\n" +
					"    PR_N IN (:requestIds)",
				params,
				this::purchaseApprovalRowMapper
		);
	}

	PurchaseApproval purchaseApprovalRowMapper(ResultSet rs, int i) throws SQLException {
		PurchaseApproval pa = new PurchaseApproval();
		pa.setId(rs.getString("APPV_N"));
		pa.setApproverStaffNo(rs.getString("APPV_USER_I"));
		pa.setRequestId(rs.getString("PR_N"));
		pa.setApproverType(ApproverType.valueOf(rs.getString("APPV_TP_C")));
		pa.setStatus(ApprovalStatus.valueOf(rs.getString("APPV_STS_C")));
		pa.setRemarks(rs.getString("REMK_T"));
		pa.setLastUpdatedBy(rs.getString("REC_UPDUSER_I"));
		pa.setLastUpdated(rs.getTimestamp("REC_UPD_DTM"));
		pa.setAuthorizingStaffNo(rs.getString("PER_AUTHUSER_I"));

		String roleStr = rs.getString("APPVR_ACCESSTP_C");
		if (StringUtils.isNotEmpty(roleStr)) {
			pa.setApproverRole(Role.valueOf(roleStr));
		}

		String autoApprove = rs.getString("AUTOAPPV_F");
		pa.setAutoApprove(StringUtils.equals(Constants.YES, autoApprove));

		return pa;
	}

	private void saveApprovalStatus(Request request) {
		if (request == null) return;

		if (CollectionUtils.isNotEmpty(request.getApprovals())) {
			for (PurchaseApproval approval: request.getApprovals()) {
				approval.setRequestId(request.getId());
				insertApprovalStatus(approval);
			}
		}
	}

	@Override
	public PurchaseApproval insertApprovalStatus(PurchaseApproval purchaseApproval) {

		String autoApprove = Constants.NO;
		if (purchaseApproval.getAutoApprove() != null && purchaseApproval.getAutoApprove()) {
			autoApprove = Constants.YES;
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestNo", purchaseApproval.getRequestId());
		params.addValue("approverId", purchaseApproval.getApproverStaffNo());
		params.addValue("approverType", (purchaseApproval.getApproverType() != null) ? purchaseApproval.getApproverType().toString() : null);
		params.addValue("approvalStatus", (purchaseApproval.getStatus() != null) ? purchaseApproval.getStatus().toString() : null);
		params.addValue("remarks", purchaseApproval.getRemarks());
		params.addValue("approvedBy", purchaseApproval.getLastUpdatedBy());
		params.addValue("authorizingUser", purchaseApproval.getAuthorizingStaffNo());
		params.addValue("approverRole", (purchaseApproval.getApproverRole() != null) ? purchaseApproval.getApproverRole().toString() : null);
		params.addValue("autoApprove", autoApprove);

		final String insertSqlStmt = "INSERT INTO PRS_APPV_STS (\n" +
				"    APPV_N, PR_N, APPV_USER_I, \n" +
				"    APPV_TP_C, APPV_STS_C ,REMK_T, \n" +
				"    REC_UPDUSER_I, REC_UPD_DTM, \n" +
				"    PER_AUTHUSER_I, APPVR_ACCESSTP_C, AUTOAPPV_F  \n" +
				") VALUES (\n" +
				"    PRS_APPV_STS_SEQ.NEXTVAL, :requestNo, :approverId, \n" +
				"    :approverType, :approvalStatus, :remarks, \n" +
				"    :approvedBy, SYSDATE,\n " +
				"    :authorizingUser, :approverRole, :autoApprove \n" +
				")";


		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(
				insertSqlStmt,
				params,
				keyHolder,
				new String[]{"APPV_N"}
				);

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("No Keyholder value returned for APPV_N");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		purchaseApproval.setId(keyHolderMap.get("APPV_N").toString());

		return purchaseApproval;

	}

	@Override
	public PurchaseApproval updateApprovalStatus(PurchaseApproval purchaseApproval) {
		try {
			StringBuilder updateSqlStmt = new StringBuilder();
			updateSqlStmt.append("UPDATE PRS_APPV_STS set APPV_STS_C = :status, REC_UPDUSER_I = :approvedBy, REMK_T = :remarks, REC_UPD_DTM = SYSDATE ");

			if (purchaseApproval.getApproverType() == ApproverType.APPV_TP_REGULATORY_OFFICER) {
				updateSqlStmt.append(", APPV_USER_I = :approvedBy ");
			}

			updateSqlStmt.append("WHERE APPV_N = :id AND APPV_TP_C = :approverType ");

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("id", purchaseApproval.getId());
			params.addValue("approverType", purchaseApproval.getApproverType().toString().trim());
			params.addValue("status", purchaseApproval.getStatus().toString().trim());
			params.addValue("remarks", purchaseApproval.getRemarks());
			params.addValue("approvedBy", purchaseApproval.getLastUpdatedBy());

			if (purchaseApproval.getApproverType() != ApproverType.APPV_TP_REGULATORY_OFFICER) {
				updateSqlStmt.append(" AND APPV_USER_I = :approverId ");
				params.addValue("approverId", purchaseApproval.getApproverStaffNo().trim());
			}

			this.prsNamedJdbcTemplate.update(updateSqlStmt.toString(), params);
		}catch(Exception e) {
			logger.error(e.getMessage());
		}
		return purchaseApproval;
	}
	
	@Override
	public int reRoute(String id, String newApproverId, String authorizingId, String remarks, String updateId) {

		try {
			StringBuilder updateSqlStmt = new StringBuilder();
			updateSqlStmt.append("UPDATE "
					+ "PRS_APPV_STS "
					+ "SET "
					+ "APPV_USER_I = :newApproverId, "
					+ "REC_UPDUSER_I = :updateId, "
					+ "REMK_T = :remarks, "
					+ "PER_AUTHUSER_I = :authorizingId, "
					+ "REC_UPD_DTM = SYSDATE "
					+ "WHERE APPV_N = :id ");
	
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("newApproverId", newApproverId);
			params.addValue("updateId", updateId);
			params.addValue("remarks", remarks);
			params.addValue("authorizingId", authorizingId);
			params.addValue("id", id);
	
			return this.prsNamedJdbcTemplate.update(updateSqlStmt.toString(), params);
		
		}catch(Exception e) {
			logger.error(e.getMessage());
		}
		
		return 0;
	}

	@Override
	public int deletePurchaseRequest(String requestNumber, String updateUserId) {
		final String updateSql = "update PRS_PURCHASE_REQ set REQ_STS_C = :status, REC_UPD_DTM = SYSDATE, REC_UPDUSER_I = :updateUserId "
				+ "where REQ_N = :requestNumber";

		logger.debug(updateSql);
		MapSqlParameterSource namedParameters = new MapSqlParameterSource()
				.addValue("status", RequestStatus.REQ_STS_CANCELLED.toString())
				.addValue("updateUserId", updateUserId)
				.addValue("requestNumber", requestNumber);
		return this.prsNamedJdbcTemplate.update(updateSql, namedParameters);

	}

	@Override
	public List<PurchaseRequest> getPendingItems(String roUserNo, String goUserNo, String requestorUserNo, String approverStaffNo, Role currentRole) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("roUserNo", roUserNo);
		params.addValue("goUserNo", goUserNo);
		params.addValue("requestorUserNo", requestorUserNo);
		params.addValue("approverStaffNo", approverStaffNo);
		params.addValue("currentRole", currentRole.toString());
		params.addValue("epv15kLimit", Constants.EPV_15K_LIMIT);

		return this.prsNamedJdbcTemplate.query(
				"SELECT\n" +
				"    pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, null as po_sts_c \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    JOIN prs_location l ON pr.pr_n = l.pr_n\n" +
				"    JOIN prs_appv_sts pa ON pr.pr_n = pa.pr_n\n" +
				"    JOIN prs_user_access ua ON ua.fac_c = l.fac_c AND ua.dept_c = l.dept_c AND ua.access_tp_c = 'ROLE_REGULATORY'\n" +
				"WHERE\n" +
				"    pa.appv_tp_c = 'APPV_TP_REGULATORY_OFFICER'\n" +
				"    AND pr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_RO'\n" +
				"    AND ua.user_i = :roUserNo\n" +
				"    AND 'ROLE_REGULATORY' = :currentRole\n" +
				"UNION ALL \n" +
				"SELECT\n" +
				"    DISTINCT pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, po.po_sts_c  \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    JOIN prs_purchase_order po ON pr.pr_n = po.pr_n\n" +
				"    JOIN prs_user_access ua ON ua.fac_c = pr.fac_c AND ua.dept_c = pr.dept_c AND ua.access_tp_c = 'ROLE_GOODS_RECEIPT'\n" +
				"WHERE\n" +
				"    po.po_sts_c = 'PO_ISSUED' \n" +
				"    AND ua.user_i = :goUserNo \n" +
				"    AND 'ROLE_GOODS_RECEIPT' = :currentRole\n" +
				"UNION ALL\n" +
				"SELECT\n" +
				"    pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, null as po_sts_c \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"WHERE\n" +
				"    pr.req_sts_c = 'REQ_STS_DRAFT'\n" +
				"    AND pr.req_stfstd_n = :requestorUserNo\n" +
				"    AND pr.req_accesstp_c = :currentRole\n" +
				"UNION ALL\n" +
				"SELECT\n" +
				"    pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, null as po_sts_c \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    LEFT JOIN prs_purchase_req pr2 ON pr2.req_n = pr.req_n AND pr2.req_tp_c = 'REQ_TYPE_SQRR'\n" +
				"WHERE\n" +
				"    pr.req_sts_c = 'REQ_STS_APPROVED'\n" +
				"    AND pr.REQ_TP_C = 'REQ_TYPE_AOR'\n" +
                "    AND pr.TOT_AMT_A <= :epv15kLimit \n" +
				"    AND NVL(pr2.req_sts_c, '*') IN ('*', 'REQ_STS_DRAFT')\n" +
				"    AND pr.req_stfstd_n = :requestorUserNo\n" +
				"    AND pr.req_accesstp_c = :currentRole\n" +
				"UNION ALL\n" +
				"SELECT\n" +
				"    DISTINCT pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, po.po_sts_c as po_sts_c \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    JOIN prs_purchase_order po ON pr.pr_n = po.pr_n and po.po_sts_c = 'PO_ISSUED' \n" +
				"WHERE\n" +
				"    pr.req_stfstd_n = :requestorUserNo\n" +
				"    AND pr.req_accesstp_c = :currentRole\n" +
				"    AND NOT EXISTS (select ua.user_i from prs_user_access ua where ua.fac_c = pr.fac_c AND ua.dept_c = pr.dept_c AND ua.access_tp_c = 'ROLE_GOODS_RECEIPT')\n" +
				"UNION ALL\n" +
				"SELECT\n" +
				"    pr.pr_n, pr.req_n, pr.rec_upd_dtm, pr.req_sts_c, pr.req_tp_c, null as po_sts_c \n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    JOIN prs_location l ON pr.pr_n = l.pr_n\n" +
				"    JOIN prs_appv_sts pa ON pr.pr_n = pa.pr_n\n" +
				"WHERE\n" +
				"    ((pa.appv_tp_c = 'APPV_TP_APPROVER_1' AND pr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_1')\n" +
				"     OR (pa.appv_tp_c = 'APPV_TP_APPROVER_2' AND pr.req_sts_c = 'REQ_STS_PENDING_APPROVAL_2'))\n" +
				"    AND pa.appv_user_i = :approverStaffNo \n" +
				"    AND pr.req_tp_c IN ('REQ_TYPE_PR', 'REQ_TYPE_AOR', 'REQ_TYPE_SQRR')\n" +
				"    AND pa.appvr_accesstp_c = :currentRole \n" +
				"ORDER BY 3 DESC ",
				params,
				this::purchaseRequestRowMapper
		);
	}

	PurchaseRequest purchaseRequestRowMapper(ResultSet rs, int rowNum) throws SQLException {
		PurchaseRequest purchaseRequest=new PurchaseRequest();
		purchaseRequest.setRequestId(rs.getString("pr_n"));
		purchaseRequest.setPurchaseRequestNumber(rs.getString("REQ_N"));
		purchaseRequest.setStatus(RequestStatus.valueOf(rs.getString("REQ_STS_C")));		
		purchaseRequest.setRequestType(RequestType.valueOf(rs.getString("REQ_TP_C")));

		String poStatusStr = rs.getString("PO_STS_C");
		if (StringUtils.isNotEmpty(poStatusStr)) {
			purchaseRequest.setPoStatus(POStatus.valueOf(poStatusStr));
		}

		Date date = rs.getDate("REC_UPD_DTM");
		purchaseRequest.setDateOfRequest(DateFormatUtils.format(date, "dd/MM/yyyy HH:mm:ss"));

		return purchaseRequest;

	}
	
	@Override
	public List<PurchaseRequest> getPendingItemsOfLabSupplyOfficer(String goUserNo, Role currentRole) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("goUserNo", goUserNo);
		params.addValue("currentRole", currentRole.toString());
		
		StringBuilder strBuilder = new StringBuilder();
		strBuilder.append("SELECT ");
			strBuilder.append("pr.pr_n, pr.req_n, pr.rec_upd_dtm, pc.collect_sts_c, pr.req_tp_c, null as po_sts_c ");
		strBuilder.append("FROM ");
			strBuilder.append("prs_collection pc ");
			strBuilder.append("JOIN prs_purchase_req pr ON pc.pr_n = pr.pr_n ");
			strBuilder.append("JOIN prs_quotation pq ON pr.pr_n = pq.pr_n ");
			strBuilder.append("JOIN prs_internal_store pis ON pis.supp_c = pq.supp_c ");
			strBuilder.append("JOIN prs_user_accesstp puat ON pis.INTL_STORE_N = puat.accesstp_t ");
			strBuilder.append("JOIN prs_user_access pua ON puat.access_n = pua.access_n ");
		strBuilder.append("AND puat.accesstp_c = 'USER_ATTR_INTERNAL_STORE' and puat.defunct_f = 'N' ");
		strBuilder.append("AND pua.user_i = :goUserNo ");
		strBuilder.append("AND pua.access_tp_c = :currentRole ");
		strBuilder.append("AND pc.collect_sts_c IN ('COLL_STS_PENDING_VERIFICATION', 'COLL_STS_PENDING_COLLECTION') ");
		strBuilder.append("ORDER BY pr.rec_upd_dtm DESC");

		return this.prsNamedJdbcTemplate.query(
				strBuilder.toString(),
				params,
				this::purchaseRequestRowMapperForCollection
		);
	}
	
	PurchaseRequest purchaseRequestRowMapperForCollection(ResultSet rs, int rowNum) throws SQLException {
		PurchaseRequest purchaseRequest=new PurchaseRequest();
		purchaseRequest.setRequestId(rs.getString("pr_n"));
		purchaseRequest.setPurchaseRequestNumber(rs.getString("REQ_N"));
		purchaseRequest.setCollectionStatus(CollectionStatus.valueOf(rs.getString("COLLECT_STS_C")));
		purchaseRequest.setRequestType(RequestType.valueOf(rs.getString("REQ_TP_C")));

		String poStatusStr = rs.getString("PO_STS_C");
		if (StringUtils.isNotEmpty(poStatusStr)) {
			purchaseRequest.setPoStatus(POStatus.valueOf(poStatusStr));
		}

		Date date = rs.getDate("REC_UPD_DTM");
		purchaseRequest.setDateOfRequest(DateFormatUtils.format(date, "dd/MM/yyyy HH:mm:ss"));

		return purchaseRequest;

	}

	@Override
	public List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfo(List<String> chemicalNames, String locationId, String inventoryOwnerStaffNo) {

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("chemicalNames", chemicalNames);
		params.addValue("poStatus", POStatus.PO_ISSUED.name());
		params.addValue("grs", GRType.GR_GRS.name());
		params.addValue("grn", GRType.GR_GRN.name());
		params.addValue("location", locationId);
		params.addValue("inventoryOwner", inventoryOwnerStaffNo);
		params.addValue("grApprovedStatus", Arrays.asList(GRStatus.GRS_APPROVED.name(), GRStatus.GRN_APPROVED.name()));

		return this.prsNamedJdbcTemplate.query(
				"SELECT pr.req_n, poli.item_desc_t, pr.req_stfstd_n, poli.qty_q, chemicals.msrunit_t, TO_CHAR(pr.REQ_SUBM_DTM, 'DD/MM/YYYY') REQ_SUBM_DTM, " +
				"       case when grgr.grQty is not null then grgr.grQty else 0 end as received_todate_qty " +
				"FROM   (SELECT ctg.chm_nm_t, item.item_n, item.lineitem_n, item.pr_n, item.qty_q, mu.msrunit_t " +
				"        FROM   hmms_prs_chm_ctg ctg " +
				"               INNER JOIN prs_purchase_lineitemprdc itemprdc " +
				"                       ON Json_value(itemprdc.prdc_detl_t, '$.chemicalNumber') = ctg.chm_n " +
				"               INNER JOIN prs_purchase_lineitem item " +
				"                       ON item.lineitem_n = itemprdc.lineitem_n " +
				"               LEFT JOIN MSRUNIT MU ON item.msr_unit_c = MU.msrunit_c " +	
				"        ) chemicals " +
				"       INNER JOIN prs_purchase_req pr ON pr.pr_n = chemicals.pr_n " +
				"       INNER JOIN prs_location loc on pr.pr_n = loc.pr_n " +
				"       INNER JOIN prs_po_lineitem poli ON chemicals.lineitem_n = poli.pr_lineitem_n " +
				"       INNER JOIN prs_purchase_order po ON po.po_n = poli.po_n AND po.pr_n = pr.pr_n AND po.po_sts_c = :poStatus  " +
				"       LEFT JOIN (SELECT ( Sum(CASE WHEN gr.rt_tp_c = :grs THEN grli.qty_q ELSE 0 END) " +
				"                          - Sum(CASE WHEN gr.rt_tp_c = :grn THEN grli.qty_q ELSE 0 END) ) AS grQty, grli.lineitem_n " +
				"                  FROM prs_receipt_lineitem grli INNER JOIN prs_po_receipt gr ON gr.rt_n = grli.rt_n and gr.rt_sts_c in ( :grApprovedStatus )  " +
				"                  GROUP BY grli.lineitem_n) grgr " +
				"              ON poli.lineitem_n = grgr.lineitem_n " +
				"      WHERE chemicals.chm_nm_t in (:chemicalNames) AND (grgr.grQty is null OR grgr.grQty <> chemicals.qty_q) AND pr.invnt_ownerstf_n = :inventoryOwner and loc.chm_loc_n = :location " +
				"ORDER  BY poli.item_desc_t, pr.pr_n, poli.po_lineitem_n ", params, this::pendingGoodsReceiptInfoRowMapper
				);
	}
	
	@Override
	public List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfoRadio(String radionuclide, String sourceType, String locationId, String inventoryOwnerStaffNo) {

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("radionuclide", radionuclide);
		params.addValue("sourceType", sourceType);
		params.addValue("poStatus", POStatus.PO_ISSUED.name());
		params.addValue("grs", GRType.GR_GRS.name());
		params.addValue("grn", GRType.GR_GRN.name());
		params.addValue("location", locationId);
		params.addValue("inventoryOwner", inventoryOwnerStaffNo);
		params.addValue("grApprovedStatus", Arrays.asList(GRStatus.GRS_APPROVED.name(), GRStatus.GRN_APPROVED.name()));

		return this.prsNamedJdbcTemplate.query(
				"SELECT pr.req_n, poli.item_desc_t, pr.req_stfstd_n, poli.qty_q, radioactive.msrunit_t, TO_CHAR(pr.REQ_SUBM_DTM, 'DD/MM/YYYY') REQ_SUBM_DTM, " +
				"       case when grgr.grQty is not null then grgr.grQty else 0 end as received_todate_qty " +
				"FROM   (SELECT ctg.radnucld_t, item.item_n, item.lineitem_n, item.pr_n, item.qty_q, mu.msrunit_t, Json_value(itemprdc.prdc_detl_t, '$.sourceType') as sourceType " +
				"        FROM   hmms_prs_radnucld_catalog ctg " +
				"               INNER JOIN prs_purchase_lineitemprdc itemprdc " +
				"                        ON Json_value(itemprdc.prdc_detl_t, '$.radionuclideId') = ctg.radnucld_n " +
				"               INNER JOIN prs_purchase_lineitem item " +
				"                       ON item.lineitem_n = itemprdc.lineitem_n " +
				"               LEFT JOIN MSRUNIT MU ON item.msr_unit_c = MU.msrunit_c " +	
				"        ) radioactive " +
				"       INNER JOIN prs_purchase_req pr ON pr.pr_n = radioactive.pr_n " +
				"       INNER JOIN prs_location loc on pr.pr_n = loc.pr_n " +
				"       INNER JOIN prs_po_lineitem poli ON radioactive.lineitem_n = poli.pr_lineitem_n " +
				"       INNER JOIN prs_purchase_order po ON po.po_n = poli.po_n AND po.pr_n = pr.pr_n AND po.po_sts_c = :poStatus  " +
				"       LEFT JOIN (SELECT ( Sum(CASE WHEN gr.rt_tp_c = :grs THEN grli.qty_q ELSE 0 END) " +
				"                          - Sum(CASE WHEN gr.rt_tp_c = :grn THEN grli.qty_q ELSE 0 END) ) AS grQty, grli.lineitem_n " +
				"                  FROM prs_receipt_lineitem grli INNER JOIN prs_po_receipt gr ON gr.rt_n = grli.rt_n and gr.rt_sts_c in ( :grApprovedStatus )  " +
				"                  GROUP BY grli.lineitem_n) grgr " +
				"              ON poli.lineitem_n = grgr.lineitem_n " +
				"      WHERE radioactive.radnucld_t = :radionuclide AND radioactive.sourceType = :sourceType AND (grgr.grQty is null OR grgr.grQty <> radioactive.qty_q) AND pr.invnt_ownerstf_n = :inventoryOwner and loc.chm_loc_n = :location " +
				" ORDER  BY poli.item_desc_t, pr.pr_n, poli.po_lineitem_n ", params, this::pendingGoodsReceiptInfoRowMapper );
	}
	
	@Override
	public List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfoBio(String biologicalMatName, String scientificName, String strain, String locationId, String inventoryOwnerStaffNo) {

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("biologicalMatName", biologicalMatName);
		params.addValue("scientificName", scientificName);
		params.addValue("strain", strain);
		params.addValue("poStatus", POStatus.PO_ISSUED.name());
		params.addValue("grs", GRType.GR_GRS.name());
		params.addValue("grn", GRType.GR_GRN.name());
		params.addValue("location", locationId);
		params.addValue("inventoryOwner", inventoryOwnerStaffNo);
		params.addValue("grApprovedStatus", Arrays.asList(GRStatus.GRS_APPROVED.name(), GRStatus.GRN_APPROVED.name()));

		return this.prsNamedJdbcTemplate.query(
				"SELECT pr.req_n, poli.item_desc_t, pr.req_stfstd_n, poli.qty_q, biological.msrunit_t, TO_CHAR(pr.REQ_SUBM_DTM, 'DD/MM/YYYY') REQ_SUBM_DTM, " +
				"       case when grgr.grQty is not null then grgr.grQty else 0 end as received_todate_qty " +
				"FROM   (SELECT ctg.bio_cat_t, item.item_n, item.lineitem_n, item.pr_n, item.qty_q, mu.msrunit_t, " +
				" 				Json_value(itemprdc.prdc_detl_t, '$.biologicalMaterialName') as biologicalMatName, " +
				" 				Json_value(itemprdc.prdc_detl_t, '$.agents.scientificName') as scientificName, " +
				" 				Json_value(itemprdc.prdc_detl_t, '$.agents.strain') as strain " +
				"        FROM   hmms_prs_bio_ctg ctg " +
				"               INNER JOIN prs_purchase_lineitemprdc itemprdc " +
				"                        ON Json_value(itemprdc.prdc_detl_t, '$.biologicalId') = ctg.bio_n " +
				"               INNER JOIN prs_purchase_lineitem item " +
				"                       ON item.lineitem_n = itemprdc.lineitem_n " +
				"               LEFT JOIN MSRUNIT MU ON item.msr_unit_c = MU.msrunit_c " +	
				"        ) biological " +
				"       INNER JOIN prs_purchase_req pr ON pr.pr_n = biological.pr_n " +
				"       INNER JOIN prs_location loc on pr.pr_n = loc.pr_n " +
				"       INNER JOIN prs_po_lineitem poli ON biological.lineitem_n = poli.pr_lineitem_n " +
				"       INNER JOIN prs_purchase_order po ON po.po_n = poli.po_n AND po.pr_n = pr.pr_n AND po.po_sts_c = :poStatus  " +
				"       LEFT JOIN (SELECT ( Sum(CASE WHEN gr.rt_tp_c = :grs THEN grli.qty_q ELSE 0 END) " +
				"                          - Sum(CASE WHEN gr.rt_tp_c = :grn THEN grli.qty_q ELSE 0 END) ) AS grQty, grli.lineitem_n " +
				"                  FROM prs_receipt_lineitem grli INNER JOIN prs_po_receipt gr ON gr.rt_n = grli.rt_n and gr.rt_sts_c in ( :grApprovedStatus )  " +
				"                  GROUP BY grli.lineitem_n) grgr " +
				"              ON poli.lineitem_n = grgr.lineitem_n " +
				"      WHERE ((:biologicalMatName) is null OR biological.biologicalMatName in (:biologicalMatName)) AND ((:scientificName) IS NULL OR biological.scientificName in (:scientificName)) "
				+ "     AND ((:strain) IS NULL OR biological.strain in (:strain)) " +
				"       AND (grgr.grQty is null OR grgr.grQty <> biological.qty_q) AND pr.invnt_ownerstf_n = :inventoryOwner and loc.chm_loc_n = :location " +
				" ORDER  BY poli.item_desc_t, pr.pr_n, poli.po_lineitem_n ", params, this::pendingGoodsReceiptInfoRowMapper );
	
	}


	PendingGoodsReceiptInfo pendingGoodsReceiptInfoRowMapper(ResultSet rs, int rowNum) throws SQLException {

		PendingGoodsReceiptInfo item = new PendingGoodsReceiptInfo();
		item.setPurchaseRequestNumber(rs.getString("REQ_N"));
		item.setItemDescription(rs.getString("ITEM_DESC_T"));
		item.setRequestorId(rs.getString("REQ_STFSTD_N"));
		item.setDateOfRequest(rs.getString("REQ_SUBM_DTM"));
		item.setQuantity(rs.getBigDecimal("QTY_Q"));
		item.setUnit(Unit.valueOf(rs.getString("MSRUNIT_T")));
		item.setReceivedToDateQuantity(rs.getBigDecimal("RECEIVED_TODATE_QTY"));

		return item;

	}

	@Override
	public List<Request> fetchPendingPRList(String todaysDateStr, long reminderemailWaitingdays) {
		MapSqlParameterSource params = null;
		StringBuilder query = null;
		List<Request> requestList = null;
		if (StringUtils.isEmpty(todaysDateStr)) {
			throw new IllegalArgumentException("Input Date is required.");
		}
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append("SELECT ");
				query.append("T1.PR_N, T1.REQ_N, T1.REQ_TP_C ");
			query.append("FROM ");
				query.append("PRS_PURCHASE_REQ T1 ");
			query.append("WHERE ");
				query.append("1=1 ");
			if (StringUtils.isNotEmpty(todaysDateStr)) {
				query.append(" AND TO_DATE(TO_CHAR(TO_DATE(:todaysDateStr, 'yyyy-MM-dd HH24:MI:SS'), 'yyyy-MM-dd'), 'yyyy-MM-dd') - TO_DATE(TO_CHAR(T1.REC_UPD_DTM, 'yyyy-MM-dd'), 'yyyy-MM-dd') = ");
				query.append( reminderemailWaitingdays );
				params.addValue("todaysDateStr", todaysDateStr);
			}
				query.append(" AND T1.REQ_STS_C IN ('REQ_STS_PENDING_APPROVAL_RO', 'REQ_STS_PENDING_APPROVAL_1', 'REQ_STS_PENDING_APPROVAL_2')");
			
			requestList = this.prsNamedJdbcTemplate.query(query.toString(), params,  new RowMapper<Request>() {
				@Override
				public Request mapRow(ResultSet rs, int rowNum) throws SQLException {
					Request request = new Request();
					request.setId(rs.getString("PR_N"));
					request.setRequestNo(rs.getString("REQ_N"));
					request.setRequestType(RequestType.valueOf(rs.getString("REQ_TP_C")));
					
					return request;
				}
			});
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			params = null;
			query = null;
		}
		return requestList;
	}

	@Override
	public List<Document> getRequestDocuments(String prId) {
		return this.prsJdbcTemplate.query(
				"SELECT\n" +
				"\td.docu_n, d.docu_desc_t, d.docu_nm_t, d.docu_tp_c, null as docu_cont_im\n" +
				"FROM\n" +
				"\tprs_req_document rd\n" +
				"\tJOIN prs_document d ON rd.docu_n = d.docu_n\n" +
				"WHERE\n" +
				"\trd.pr_n = ?",
				this::documentRowMapper,
				prId
		);
	}

	@Override
	public List<ApprovedAccountLimit> getApprovedAccountLimits(String prId) {
		return this.prsJdbcTemplate.query(
				"SELECT\n" +
				"\tal.appv_lmt_n, al.wbs_ac_n, al.gl_ac_n, al.amt_a\n" +
				"FROM\n" +
				"\tprs_appv_lmt al\n" +
				"WHERE\n" +
				"\tal.pr_n = ?",
				this::approvedAccountLimitRowMapper,
				prId
		);
	}

	ApprovedAccountLimit approvedAccountLimitRowMapper(ResultSet rs, int i) throws SQLException {
		ApprovedAccountLimit aal = new ApprovedAccountLimit();
		aal.setId(rs.getString("appv_lmt_n"));
		aal.setWbs(rs.getString("wbs_ac_n"));
		aal.setGlAccount(rs.getString("gl_ac_n"));
		aal.setLimit(rs.getBigDecimal("amt_a"));

		return aal;
	}

	@Override
	public void updateProductRefId(Product prod) {
        if (null == prod) return;
        if (StringUtils.isEmpty(prod.getLineitemId()) || StringUtils.isEmpty(prod.getProductRefId())) return;
		
		try {
		StringBuilder updateSqlStmt = new StringBuilder();
		updateSqlStmt.append("UPDATE PRS_PURCHASE_LINEITEMPRDC set PRDC_REF_N = :refId ")
                     .append("WHERE LINEITEM_N = :id ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", prod.getLineitemId());
		params.addValue("refId", prod.getProductRefId());


		this.prsNamedJdbcTemplate.update(updateSqlStmt.toString(), params);
		}catch(Exception e) {
			logger.error(e.getMessage());
		}

	}

	@Override
    public List<Request> getSQRRForAOR(String aorRequestId) {
	    // Retrieve the SQRRs for the given AOR.
		// This returns some
		return this.prsJdbcTemplate.query(
				"SELECT\n" +
				"    pr2.pr_n, pr2.req_n, pr2.req_tp_c, pr2.req_sts_c, pr2.rec_upd_dtm\n" +
				"FROM\n" +
				"    prs_purchase_req pr1\n" +
				"    JOIN prs_purchase_req pr2 ON pr1.req_n = pr2.req_n AND pr1.pr_n <> pr2.pr_n\n" +
				"WHERE\n" +
				"    pr1.req_tp_c = 'REQ_TYPE_AOR'\n" +
				"    and pr1.pr_n = ? \n" +
				"ORDER BY pr2.rec_upd_dtm DESC ",
				this::sqrrForAorRowMapper,
				aorRequestId
		);
    }

    Request sqrrForAorRowMapper(ResultSet rs, int i) throws SQLException {
		Request request = new Request();
		request.setId(rs.getString("PR_N"));
		request.setRequestNo(rs.getString("REQ_N"));
		request.setRequestType(RequestType.valueOf(rs.getString("REQ_TP_C")));
		request.setStatusCode(RequestStatus.valueOf(rs.getString("REQ_STS_C")));

		return request;
	}

	@Override
	public String getAORIdForSQRR(String sqrrRequestNo) {
		return this.prsJdbcTemplate.queryForObject(
				"SELECT\n" +
					"    aor.pr_n\n" +
					"FROM\n" +
					"    prs_purchase_req aor\n" +
					"WHERE\n" +
					"    aor.req_tp_c = 'REQ_TYPE_AOR'\n" +
					"    AND aor.req_n = ? ",
				String.class,
				sqrrRequestNo
		);
	}

	@Override
	public void deleteDraft(String requestId) {
		try {
			this.deleteRequestContent(requestId);
			this.deletePurchaseRequestRecord(requestId);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	private void deletePurchaseRequestRecord(String requestId) {
		try {
			MapSqlParameterSource params = new MapSqlParameterSource("id", requestId);
			if (StringUtils.isNotEmpty(requestId)) {
				this.prsNamedJdbcTemplate.update("DELETE FROM PRS_PURCHASE_REQ WHERE PR_N = :id", params);
			} else {
				throw new IllegalArgumentException("Purchase Request number is required.");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	@Override
	public boolean isRequestInternalProcurement(Request request) {
		String querySql = "SELECT\n" +
				"    COUNT(pr.pr_n)\n" +
				"FROM\n" +
				"    prs_purchase_req pr\n" +
				"    JOIN prs_purchase_award pa ON pa.pr_n = pr.pr_n\n" +
				"    JOIN prs_quotation q ON pa.qt_n = q.qt_n\n" +
				"    JOIN prs_internal_store ints ON ints.supp_c = q.supp_c\n" +
				"WHERE\n" +
				"    pr.pr_n = ? ";

		Integer count = this.prsJdbcTemplate.queryForObject(querySql, Integer.class, request.getId());

		return count != null && count > 0;
	}
}
