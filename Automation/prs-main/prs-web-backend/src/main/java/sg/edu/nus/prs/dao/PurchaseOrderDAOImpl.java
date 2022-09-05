package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.purchase.GRStatus;
import sg.edu.nus.prs.domain.purchase.POITemStatusType;
import sg.edu.nus.prs.domain.purchase.POLineItem;
import sg.edu.nus.prs.domain.purchase.POStatus;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.Unit;
import sg.edu.nus.prs.util.Constants;

@Repository
public class PurchaseOrderDAOImpl extends BaseDAOImpl implements PurchaseOrderDAO {

	@Override
	public PurchaseOrder addPurchaseOrder(PurchaseOrder po) {
		if (po == null) {
			throw new IllegalArgumentException("Purchase Order is required.");
		}

		insertPurchaseOrder(po);
		insertPOLineItems(po);

		return po;

	}

	private PurchaseOrder insertPurchaseOrder(PurchaseOrder po) {

		StringBuilder insertSql = new StringBuilder();
		insertSql.append(
				"insert into PRS_PURCHASE_ORDER (PO_N, PR_N, REMK_T, REC_CREATE_DTM, REC_UPD_DTM, PO_BILLADDR_T, PO_DELVADDR_T, SAP_PO_N, CRCY_C ) ")
				.append(" values ( PRS_PURCHASE_ORDER_SEQ.NEXTVAL, :prNumber, :remarks, sysdate, sysdate, ")
				.append(":billingAddress,:deliveryAddress,:sapPONumber, :currencyCode ) ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("prNumber", po.getRequestId())
				.addValue("remarks", po.getRemarks())
				.addValue("billingAddress", po.getBillingAddress())
				.addValue("deliveryAddress", po.getDeliveryAddress())
				.addValue("sapPONumber", po.getSapPONumber())
				.addValue("currencyCode", po.getCurrency().getCode());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "PO_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("PO_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		po.setpId((keyHolderMap.get("PO_N").toString()));

		return po;
	}

	private void insertPOLineItems(PurchaseOrder po) {
		if (po == null || StringUtils.isEmpty(po.getpId())) {
			throw new IllegalArgumentException("Purchase Order is required. ");
		}

		if (CollectionUtils.isNotEmpty(po.getPoLineItems())) {
			po.getPoLineItems().forEach(l -> {
				l.setPoId(po.getpId());
				insertPOLineItem(l);
			});
		}
	}

	private void insertPOLineItem(POLineItem poLineItem) {
		StringBuilder insertSql = new StringBuilder();
		insertSql.append(
				"insert into PRS_PO_LINEITEM (LINEITEM_N, PO_N, PO_LINEITEM_N, MSR_UNIT_C, UPRICE_A, QTY_Q, REC_CREATE_DTM, ITEM_DESC_T, TOT_AMT_A, PR_LINEITEM_N, ")
				.append(" DOWNPAYMT_P, DOWNPAYMT_A, DOWNPAYMT_DUE_D ) \n")
				.append("values (PRS_PO_LINEITEM_SEQ.NEXTVAL, :poNumber, :poLineNumber, :unitCode, :unitPrice, :quantity, sysdate, :itemDescription, :totalAmount, :prLineItemId, \n")
					.append(":downpaymentPercentage, :downpaymentAmount, :downpaymentDueDate ) ");

		String unitCode = null;
		if (poLineItem.getUnit() != null) {
			unitCode = prsJdbcTemplate.queryForObject(
					"SELECT MSRUNIT_C FROM MSRUNIT WHERE UPPER(MSRUNIT_T) = UPPER(?) ",
					String.class,
					poLineItem.getUnit().toString());
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poNumber", poLineItem.getPoId())
				.addValue("poLineNumber", poLineItem.getLineNo())
				.addValue("unitCode", unitCode)
				.addValue("unitPrice", poLineItem.getUnitPrice().toPlainString())
				.addValue("quantity", poLineItem.getQuantity().toPlainString())
				.addValue("itemDescription", poLineItem.getItemDescription())
				.addValue("totalAmount", poLineItem.getTotalAmount().toPlainString())
				.addValue("prLineItemId", poLineItem.getPrLineitemId())
				.addValue("downpaymentPercentage", poLineItem.getDownpaymentPercentage())
				.addValue("downpaymentAmount", poLineItem.getDownpaymentAmount())
				.addValue("downpaymentDueDate", poLineItem.getDownpaymentDueDate());
		
		

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "LINEITEM_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("LINEITEM_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		poLineItem.setId((keyHolderMap.get("LINEITEM_N").toString()));
	}

	@Override
	public PurchaseOrder savePurchaseOrderAck(PurchaseOrder po) {

		StringBuilder updateSql = new StringBuilder();

		updateSql.append("update PRS_PURCHASE_ORDER ")
				.append("set PO_STS_C=:poStatus, REMK_T=:remarks, SAP_PO_N=:sapPONumber, REC_UPD_DTM=sysdate ")
				.append("where PO_N=:poId ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poStatus", po.getStatusCode().name())
				.addValue("remarks", po.getRemarks())
				.addValue("sapPONumber", po.getSapPONumber())
				.addValue("poId", po.getpId());

		this.prsNamedJdbcTemplate.update(updateSql.toString(), params);

		if (CollectionUtils.isNotEmpty(po.getPoLineItems())) {
			for (POLineItem poLineItem : po.getPoLineItems()) {
				poLineItem.setPoId(po.getpId());
				updatePOLineItemRemarks(poLineItem);
			};
		}

		return po;
	}


	private void updatePOLineItemRemarks(POLineItem poLineItem) {
		StringBuilder updateSql = new StringBuilder();
		updateSql.append("update PRS_PO_LINEITEM ")
				.append("set REMK_T=:remarks, REC_CREATE_DTM = sysdate ")
				.append("where PO_LINEITEM_N=:lineNo and PO_N = :poId ");

		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("remarks", poLineItem.getRemarks())
				.addValue("lineNo", poLineItem.getLineNo())
				.addValue("poId", poLineItem.getPoId());

		prsNamedJdbcTemplate.update(updateSql.toString(), params);
	}
	
	@Override
	public PurchaseOrder updatePurchaseOrder(PurchaseOrder po) {
		
		updatePOSummary(po);
		
		if (CollectionUtils.isNotEmpty(po.getPoLineItems())) {
			for (POLineItem poLineItem : po.getPoLineItems()) {
				poLineItem.setPoId(po.getpId());
				updatePOLineItem(poLineItem);
			};
		}
		
		return po;
	}
	
	private void updatePOSummary(PurchaseOrder po) {
		StringBuilder updateSql = new StringBuilder();

		updateSql.append("update PRS_PURCHASE_ORDER ")
				.append("set PO_BILLADDR_T=:billingAddress, PO_DELVADDR_T=:deliveryAddress, SAP_PO_N=:sapPONumber, REC_UPD_DTM=sysdate ")
				.append("where PO_N=:poId ");

		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("billingAddress", po.getBillingAddress())
				.addValue("deliveryAddress", po.getDeliveryAddress())
				.addValue("sapPONumber", po.getSapPONumber())
				.addValue("poId", po.getpId());

		this.prsNamedJdbcTemplate.update(updateSql.toString(), params);
	}

	private void updatePOLineItem(POLineItem poLineItem) {
		StringBuilder updateSql = new StringBuilder();
		updateSql.append("update PRS_PO_LINEITEM set ITEM_STS_C=:status, QTY_Q=:quantity, MSR_UNIT_C=:unit, UPRICE_A=:unitPrice, TOT_AMT_A=:totalAmount , DOWNPAYMT_P=:downpaymtP, DOWNPAYMT_A=:downpaymtA, DOWNPAYMT_DUE_D=:downpaymtDueD, DELV_F=:deliveryF, REC_CREATE_DTM = sysdate ")
				.append("where PO_LINEITEM_N=:lineNo and PO_N=:poId ");

		String unitCode = null;
		if (poLineItem.getUnit() != null) {
			unitCode = prsJdbcTemplate.queryForObject(
					"SELECT MSRUNIT_C FROM MSRUNIT WHERE UPPER(MSRUNIT_T) = UPPER(?) ",
					String.class,
					poLineItem.getUnit().toString());
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("status", poLineItem.getItemStatus());
		params.addValue("quantity", poLineItem.getQuantity());
		params.addValue("lineNo", poLineItem.getLineNo());
		params.addValue("poId", poLineItem.getPoId());
		params.addValue("unit", unitCode);
		params.addValue("unitPrice", poLineItem.getUnitPrice().toPlainString());
		params.addValue("totalAmount", poLineItem.getTotalAmount().toPlainString());
		params.addValue("downpaymtP", poLineItem.getDownpaymentPercentage());
		params.addValue("downpaymtA", poLineItem.getDownpaymentAmount());
		params.addValue("downpaymtDueD", poLineItem.getDownpaymentDueDate());
		params.addValue("deliveryF", poLineItem.getDeliveryCompleted());
		
		prsNamedJdbcTemplate.update(updateSql.toString(), params);
	}
	
	@Override
	public PurchaseOrder updatePurchaseOrderStatus(PurchaseOrder po) {
		StringBuilder updateSql = new StringBuilder();

		updateSql.append("update PRS_PURCHASE_ORDER ")
				.append("set PO_STS_C=:poStatus, REC_UPD_DTM=sysdate ")
				.append("where PO_N=:poId ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poStatus", po.getStatusCode().name());
		params.addValue("poId", po.getpId());

		prsNamedJdbcTemplate.update(updateSql.toString(), params);
		
		return po;
	}
	
	@Override
	public List<PurchaseOrder> getPurchaseOrderSummaryByRequestNo(String requestNo) {
		StringBuilder sql = new StringBuilder()
				.append("select po.PO_N, po.PR_N, po.PO_STS_C, po.REMK_T, po.REC_CREATE_DTM, ")
					.append("po.REC_UPD_DTM , po.PO_BILLADDR_T, po.PO_DELVADDR_T, po.SAP_PO_N ")
				.append("from PRS_PURCHASE_ORDER po, PRS_PURCHASE_REQ pr ")
				.append("where po.PR_N = pr.PR_N and pr.REQ_N = :requestNo ");
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("requestNo", requestNo);
		
		List<PurchaseOrder> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::purchaseOrderMapper);
		return CollectionUtils.isNotEmpty(result) ? result: null;
	}
	
	
	@Override
	public PurchaseOrder getPurchaseOrderSummary(String poId) {
		StringBuilder sql = new StringBuilder()
				.append("select PO_N, PR_N, PO_STS_C, REMK_T, REC_CREATE_DTM, REC_UPD_DTM, PO_BILLADDR_T, PO_DELVADDR_T, SAP_PO_N ")
				.append(" from PRS_PURCHASE_ORDER where PO_N = :poId ");
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId);
		
		List<PurchaseOrder> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::purchaseOrderMapper);
		return CollectionUtils.isNotEmpty(result) ? result.get(0) : null;
	}
	
	
	@Override
	public List<POLineItem> getPOLineItems(String poId) {
		
		String sql = "select \n" +
				"pol.LINEITEM_N, pol.PO_N, pol.PO_LINEITEM_N, MU.MSRUNIT_T, pol.UPRICE_A, \n" +
				"pol.QTY_Q, pol.REC_CREATE_DTM, pol.ITEM_DESC_T, pol.TOT_AMT_A, pol.ITEM_STS_C, pol.REMK_T, pol.DELV_F, \n" +
				"pol.PR_LINEITEM_N, pol.DOWNPAYMT_P, pol.DOWNPAYMT_A, pol.DOWNPAYMT_DUE_D \n" +
				"from \n" +
				"PRS_PO_LINEITEM pol\n" +
				"LEFT JOIN MSRUNIT MU ON pol.msr_unit_c = MU.msrunit_c\n" +
				"where \n" +
				"pol.PO_N = :poId and (pol.ITEM_STS_C is null or pol.ITEM_STS_C <> :status ) \n" + 
				"order by pol.LINEITEM_N ";
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId);
		params.addValue("status", POITemStatusType.PO_ITEM_CANCELLED.name());

		return prsNamedJdbcTemplate.query(sql, params, this::poLineItemMapper);

	}
	
	@Override
	public HashMap<String, List<POLineItem>> getPOLineItemsWithSupplier(String poId) {
		String sql = "select \n" +
				"pol.LINEITEM_N, pol.PO_N, pol.PO_LINEITEM_N, MU.MSRUNIT_T, pol.UPRICE_A, \n" +
				"pol.QTY_Q, pol.REC_CREATE_DTM, pol.ITEM_DESC_T, pol.TOT_AMT_A, pol.ITEM_STS_C, pol.REMK_T, pol.DELV_F, \n" +
				"pol.PR_LINEITEM_N, pol.DOWNPAYMT_P, pol.DOWNPAYMT_A, pol.DOWNPAYMT_DUE_D, pq.SUPP_C \n" +
				"from \n" +
				"PRS_PO_LINEITEM pol " +
				"LEFT JOIN PRS_PURCHASE_LINEITEM prl ON pol.PR_LINEITEM_N = prl.LINEITEM_N \n" +
				"LEFT JOIN PRS_QUOTATION pq on prl.QT_N = pq.QT_N \n" + 
				"LEFT JOIN MSRUNIT MU ON pol.msr_unit_c = MU.msrunit_c\n" +
				"where \n" +
				"pol.PO_N = :poId and (pol.ITEM_STS_C is null or pol.ITEM_STS_C <> :status ) \n" + 
				"order by pol.LINEITEM_N ";
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId);
		params.addValue("status", POITemStatusType.PO_ITEM_CANCELLED.name());

		return prsNamedJdbcTemplate.query(sql, params, (ResultSet rs) -> {
			HashMap<String,List<POLineItem>> results = new HashMap<>(); 
			 while(rs.next()){
				 POLineItem li = new POLineItem();
					li.setPoId(rs.getString("PO_N"));
					li.setId(rs.getString("LINEITEM_N"));
					li.setLineNo(rs.getString("PO_LINEITEM_N"));
					li.setUnit(Unit.valueOf(rs.getString("MSRUNIT_T")));
					li.setUnitPrice(rs.getBigDecimal("UPRICE_A"));
					li.setQuantity(rs.getBigDecimal("QTY_Q"));
					li.setTotalAmount(rs.getBigDecimal("TOT_AMT_A"));
					li.setItemDescription(rs.getString("ITEM_DESC_T"));
					li.setItemStatus(rs.getString("ITEM_STS_C"));
					li.setRemarks(rs.getString("REMK_T"));
					li.setPrLineitemId(rs.getString("PR_LINEITEM_N"));
					li.setDownpaymentPercentage(null != rs.getBigDecimal("DOWNPAYMT_P") ? rs.getBigDecimal("DOWNPAYMT_P") : BigDecimal.ZERO);
					li.setDownpaymentAmount(null != rs.getBigDecimal("DOWNPAYMT_A") ? rs.getBigDecimal("DOWNPAYMT_A") : BigDecimal.ZERO);
					li.setDownpaymentDueDate(rs.getDate("DOWNPAYMT_DUE_D"));
					li.setDeliveryCompleted(rs.getString("DELV_F"));
					
					List<POLineItem> poLineItemList = new ArrayList<POLineItem>();
					if(null == results.get(rs.getString("SUPP_C"))) {
						poLineItemList.add(li);
						results.put(rs.getString("SUPP_C"), poLineItemList);
					} else {
						poLineItemList = results.get(rs.getString("SUPP_C")); 
						poLineItemList.add(li);
						results.put(rs.getString("SUPP_C"), poLineItemList);
					}
					
			 }
			
			return results;
		});
	}

	POLineItem poLineItemMapper(ResultSet rs, int rowNum) throws SQLException {
		POLineItem li = new POLineItem();
		li.setPoId(rs.getString("PO_N"));
		li.setId(rs.getString("LINEITEM_N"));
		li.setLineNo(rs.getString("PO_LINEITEM_N"));
		li.setUnit(Unit.valueOf(rs.getString("MSRUNIT_T")));
		li.setUnitPrice(rs.getBigDecimal("UPRICE_A"));
		li.setQuantity(rs.getBigDecimal("QTY_Q"));
		li.setTotalAmount(rs.getBigDecimal("TOT_AMT_A"));
		li.setItemDescription(rs.getString("ITEM_DESC_T"));
		li.setItemStatus(rs.getString("ITEM_STS_C"));
		li.setRemarks(rs.getString("REMK_T"));
		li.setPrLineitemId(rs.getString("PR_LINEITEM_N"));
		li.setDownpaymentPercentage(null != rs.getBigDecimal("DOWNPAYMT_P") ? rs.getBigDecimal("DOWNPAYMT_P") : BigDecimal.ZERO);
		li.setDownpaymentAmount(null != rs.getBigDecimal("DOWNPAYMT_A") ? rs.getBigDecimal("DOWNPAYMT_A") : BigDecimal.ZERO);
		li.setDownpaymentDueDate(rs.getDate("DOWNPAYMT_DUE_D"));
		li.setDeliveryCompleted(rs.getString("DELV_F"));
		
		return li;
	}

	
	PurchaseOrder purchaseOrderMapper(ResultSet rs, int rowNum) throws SQLException {
		PurchaseOrder po = new PurchaseOrder();
		po.setpId(rs.getString("PO_N"));
		po.setRequestId(rs.getString("PR_N"));
		if(StringUtils.isNotEmpty(rs.getString("PO_STS_C"))) {
			po.setStatusCode(POStatus.valueOf(rs.getString("PO_STS_C")));
		}
		po.setRemarks(rs.getString("REMK_T"));
		po.setBillingAddress(rs.getString("PO_BILLADDR_T"));
		po.setDeliveryAddress(rs.getString("PO_DELVADDR_T"));
		po.setSapPONumber(rs.getString("SAP_PO_N"));
		po.setCreatedDate(rs.getDate("REC_CREATE_DTM"));
		return po;
	}
	
	@Override
	public void updateDeliveryComplete(String poId, List<String> lineItemIDs, GRStatus gRStatus) {
		for (String lineItemID : lineItemIDs) {
			updateLineItemDeliveryComplete(poId, lineItemID, gRStatus);
		}
	}

	private void updateLineItemDeliveryComplete(String poId, String lineItemID, GRStatus gRStatus) {
		StringBuilder updateSql = new StringBuilder();
		updateSql.append("update PRS_PO_LINEITEM set DELV_F=:deliveryF, REC_CREATE_DTM = sysdate ")
				.append("where PO_LINEITEM_N=:poLineItemN and PO_N=:poId ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId);
		params.addValue("poLineItemN", lineItemID);
		params.addValue("deliveryF", GRStatus.GRS_APPROVED == gRStatus ? Constants.YES : Constants.NO);

		prsNamedJdbcTemplate.update(updateSql.toString(), params);
	}
}
