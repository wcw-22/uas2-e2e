package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.purchase.GRStatus;
import sg.edu.nus.prs.domain.purchase.GRType;
import sg.edu.nus.prs.domain.purchase.GoodsReceipt;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptFormLineItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptInventoryItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptLineItem;
import sg.edu.nus.prs.domain.purchase.InventoryReservationStatus;
import sg.edu.nus.prs.domain.purchase.POITemStatusType;

@Repository
public class GoodsReceiptDAOImpl extends BaseDAOImpl implements GoodsReceiptDAO {

	@Override
	public GoodsReceipt saveGoodsReceipt(GoodsReceipt gr) {
		return insertGoodsReceiptItems(saveNewGoodsReceiptSummary(gr));
	}
	
	private GoodsReceipt saveNewGoodsReceiptSummary(GoodsReceipt gr) {
		StringBuilder insertSql = new StringBuilder()
				.append("insert into PRS_PO_RECEIPT ")
				.append("(RT_N, PO_N, RT_TP_C, REC_RECD_DTM, DO_N, REC_CREATEUSER_I, REC_CREATE_DTM, REC_UPDUSER_I, REC_UPD_DTM) ")
				.append("values (PRS_PO_RECEIPT_SEQ.nextVal,:poId,:grType, :receivedDate, :deliveryOrderNo, :createUser, sysdate, :updateUser, sysdate) ");
		
		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("poId", gr.getPOId())
				.addValue("grType", gr.getType().name())
				.addValue("receivedDate", gr.getReceivedDate())
				.addValue("deliveryOrderNo", gr.getDeliveryOrderNo())
				.addValue("createUser", gr.getCreateUserNo())
				.addValue("updateUser", gr.getUpdateUserNo());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "RT_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("RT_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		gr.setId((keyHolderMap.get("RT_N").toString()));

		return gr;
	}

	private GoodsReceipt insertGoodsReceiptItems(GoodsReceipt gr) {
		if (CollectionUtils.isNotEmpty(gr.getLineItems())) {
			gr.getLineItems().stream().filter(l -> null != l.getQuantity()).forEach(l -> {
				l.setGrId(gr.getId());
				l.setId(insertGoodsReceiptItem(l).getId());
			});
		}
		return gr;
	}

	private GoodsReceiptLineItem insertGoodsReceiptItem(GoodsReceiptLineItem lineItem) {
		StringBuilder insertSql = new StringBuilder().append("insert into PRS_RECEIPT_LINEITEM ")
				.append("(RT_ITEM_N, RT_N, LINEITEM_N, QTY_Q, REMK_T, SAP_REMK_T) ")
				.append("values (PRS_RECEIPT_LINEITEM_SEQ.nextVal, :grId, :lineItemNo, :quantity, :remarks, :sapRemarks) ");
		
		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("grId", lineItem.getGrId())
				.addValue("lineItemNo", lineItem.getPOLineItemId())
				.addValue("quantity", lineItem.getQuantity().toPlainString())
				.addValue("remarks", lineItem.getRemarks())
				.addValue("sapRemarks", lineItem.getSapRemarks());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "RT_ITEM_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("RT_ITEM_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		lineItem.setId((keyHolderMap.get("RT_ITEM_N").toString()));

		return lineItem;
	}


	@Override	
	public GoodsReceipt getGoodsReceiptSummary(String grId) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder()
				.append("select ")
				.append("RT_N, PO_N, RT_TP_C, REC_CREATEUSER_I, REC_RECD_DTM, DO_N, RT_STS_C, REMK_T, SAP_REMK_T, SAP_RT_N, REC_CREATE_DTM, RT_SEND_DTM ")
				.append("from PRS_PO_RECEIPT ")
				.append("where RT_N = :id");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", grId);

		List<GoodsReceipt> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::grRowMapper);

		if (CollectionUtils.isNotEmpty(result)) {
			return result.get(0);
		}

		return null;
	}
	
	@Override
	public List<GoodsReceiptLineItem> getGoodsReceiptLineItems(String grId) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder()
				.append("select li.RT_ITEM_N, li.RT_N, li.LINEITEM_N, li.QTY_Q, li.REMK_T, li.SAP_REMK_T ")
				.append("from PRS_PO_RECEIPT gr, PRS_RECEIPT_LINEITEM li ")
				.append("where gr.RT_N = :id and gr.RT_N = li.RT_N ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", grId);

		return prsNamedJdbcTemplate.query(sql.toString(), params, this::grLineItemRowMapper);
	}
		
	
	GoodsReceipt grRowMapper(ResultSet rs, int rowNum) throws SQLException {
		GoodsReceipt gr = new GoodsReceipt();
		String typeCode = rs.getString("RT_TP_C");
		if(StringUtils.isNotEmpty(typeCode)) {
			gr.setType(GRType.valueOf(typeCode));
		}
		gr.setId(rs.getString("RT_N"));
		gr.setPOId(rs.getString("PO_N"));
		gr.setReceivedDate(rs.getDate("REC_RECD_DTM"));
		gr.setStatus(StringUtils.isNotBlank(rs.getString("RT_STS_C")) ? GRStatus.valueOf(rs.getString("RT_STS_C")) : null);
		gr.setRemarks(rs.getString("REMK_T"));
		gr.setSapRemarks(rs.getString("SAP_REMK_T"));
		gr.setSapGRNo(rs.getString("SAP_RT_N"));
		gr.setCreateUserNo(rs.getString("REC_CREATEUSER_I"));
		gr.setCreateDate(rs.getDate("REC_CREATE_DTM"));
		gr.setSendDate(rs.getDate("RT_SEND_DTM"));
		gr.setDeliveryOrderNo(rs.getString("DO_N"));
		
		return gr;
		
	}
	
	GoodsReceiptLineItem grLineItemRowMapper(ResultSet rs, int rowNum) throws SQLException {
		GoodsReceiptLineItem lineItem = new GoodsReceiptLineItem();
		lineItem.setGrId(rs.getString("RT_N"));
		lineItem.setId(rs.getString("RT_ITEM_N"));
		lineItem.setPOLineItemId(rs.getString("LINEITEM_N"));
		lineItem.setQuantity(rs.getBigDecimal("QTY_Q"));
		lineItem.setRemarks(rs.getString("REMK_T"));
		lineItem.setSapRemarks(rs.getString("SAP_REMK_T"));
		return lineItem;
		
	}

	@Override
	public GoodsReceipt saveGoodsReceiptAck(GoodsReceipt gr) {
		int result = this.updateGoodsReceiptSummary(gr);
		if(result > 0) {
			if(CollectionUtils.isNotEmpty(gr.getLineItems())) {
				for (GoodsReceiptLineItem lineItem : gr.getLineItems()) {
					updateGoodsReceiptLineItem(lineItem);
				}
			}
		}
		
		return gr;
	}
	
	@Override
	public List<GoodsReceiptFormLineItem> getGoodsReceiptLineItemsByPONumber(String poNo) {
		StringBuilder sql = new StringBuilder()
				.append("SELECT GR.RT_TP_C, POLI.PO_N AS PO_N, LI.LINEITEM_N AS LINEITEM_N, POLI.PO_LINEITEM_N, ")
				.append(" GR.DO_N, GR.REC_RECD_DTM, LI.QTY_Q, LI.REMK_T, GR.RT_STS_C, GR.SAP_REMK_T, ")
				.append(" LI.SAP_REMK_T as LI_SAP_REMK_T, POLI.QTY_Q AS ORDERED_QTY, POLI.PR_LINEITEM_N ")
				.append(" FROM PRS_PO_RECEIPT GR, PRS_RECEIPT_LINEITEM LI, PRS_PO_LINEITEM POLI ")
				.append(" WHERE GR.RT_N = LI.RT_N AND GR.PO_N = POLI.PO_N AND LI.LINEITEM_N = POLI.LINEITEM_N ")
				.append(" AND POLI.PO_N = :poNo ")
				.append(" AND (POLI.ITEM_STS_C is null OR POLI.ITEM_STS_C <> :itemStatusCancelled ) ")
				.append(" ORDER BY GR.REC_RECD_DTM DESC, GR.REC_CREATE_DTM DESC ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poNo", poNo);
		params.addValue("itemStatusCancelled", POITemStatusType.PO_ITEM_CANCELLED.name());

		return prsNamedJdbcTemplate.query(sql.toString(), params, this::grLineHistoryRowMapper);
	}
	
	@Override
	public List<GoodsReceiptInventoryItem> getGRInventoryItems(String grId) {
		return prsJdbcTemplate.query(
				"SELECT I.LMMS_INVNT_N, I.RT_ITEM_N, I.SAP_PO_N, I.CONTNR_N, I.INVNT_STS_C, I.REC_UPDUSER_I, I.REC_UPD_DTM, GRI.LINEITEM_N\r\n" + 
				"FROM PRS_PO_LMMSINVENTORY I, PRS_RECEIPT_LINEITEM GRI, PRS_PO_RECEIPT GR \r\n" + 
				"WHERE \r\n" + 
				"    I.RT_ITEM_N = GRI.RT_ITEM_N \r\n" + 
				"    AND GRI.RT_N = GR.RT_N\r\n" + 
				"    AND GR.RT_N = ? ",
				this::grInventoryItemRowMapper, grId);
	}

	GoodsReceiptInventoryItem grInventoryItemRowMapper(ResultSet rs, int rowNum) throws SQLException {
		GoodsReceiptInventoryItem grInventoryItem = new GoodsReceiptInventoryItem();
		grInventoryItem.setId(rs.getString("LMMS_INVNT_N"));
		grInventoryItem.setItemNumber(rs.getString("RT_ITEM_N"));
		grInventoryItem.setSapPONumber(rs.getString("SAP_PO_N"));
		grInventoryItem.setContainerId(rs.getString("CONTNR_N"));
		String inventoryStatus = rs.getString("INVNT_STS_C");
		grInventoryItem.setInventoryStatus(StringUtils.isEmpty(inventoryStatus) ? null : InventoryReservationStatus.valueOf(inventoryStatus));
		grInventoryItem.setUpdateUser(rs.getString("REC_UPDUSER_I"));
		grInventoryItem.setLineItemNumber(rs.getString("LINEITEM_N"));
		return grInventoryItem;
	}

	@Override
	public int updateGoodsReceiptSummary(GoodsReceipt gr) {

		StringBuilder sql = new StringBuilder();
		sql.append("update PRS_PO_RECEIPT set ");
		sql.append(
				"RT_STS_C = :status, SAP_REMK_T = :sapRemarks, SAP_RT_N = :sapGRNo, REC_UPDUSER_I = :userId, REC_UPD_DTM = sysdate, RT_SEND_DTM = :sentDate ");
		sql.append("where RT_N = :id ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("status", null != gr.getStatus() ? gr.getStatus().name() : null);
		params.addValue("sapRemarks", gr.getSapRemarks());
		params.addValue("sapGRNo", gr.getSapGRNo());
		params.addValue("id", gr.getId());
		params.addValue("userId", gr.getUpdateUserNo());
		params.addValue("sentDate", gr.getSendDate());

		return prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	private void updateGoodsReceiptLineItem(GoodsReceiptLineItem lineItem) {

		StringBuilder sql = new StringBuilder();
		sql.append("update PRS_RECEIPT_LINEITEM set ");
		sql.append("SAP_REMK_T = :sapRemarks ");
		sql.append("where RT_ITEM_N = :id  ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("sapRemarks", lineItem.getSapRemarks());
		params.addValue("id", lineItem.getId());

		prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	GoodsReceiptFormLineItem grLineHistoryRowMapper(ResultSet rs, int rowNum) throws SQLException {
		GoodsReceiptFormLineItem lineHistory = new GoodsReceiptFormLineItem();
		String typeCode = rs.getString("RT_TP_C");
		if (StringUtils.isNotEmpty(typeCode)) {
			lineHistory.setType(GRType.valueOf(typeCode));
		}
		lineHistory.setPoId(rs.getString("PO_N"));
		lineHistory.setId(rs.getString("LINEITEM_N"));
		lineHistory.setLineNo(rs.getString("PO_LINEITEM_N"));
		lineHistory.setDeliveryOrderNo(rs.getString("DO_N"));
		lineHistory.setReceivedDate(rs.getDate("REC_RECD_DTM"));
		lineHistory.setReceivedQuantity(rs.getBigDecimal("QTY_Q"));
		lineHistory.setComment(rs.getString("REMK_T"));
		lineHistory.setStatus(
				StringUtils.isEmpty(rs.getString("RT_STS_C")) ? null : GRStatus.valueOf(rs.getString("RT_STS_C")));
		lineHistory.setSapRemarks(rs.getString("SAP_REMK_T"));
		lineHistory.setItemSAPRemarks(rs.getString("LI_SAP_REMK_T"));
		lineHistory.setQuantityOrdered(rs.getBigDecimal("ORDERED_QTY"));
		lineHistory.setPrLineitemId(rs.getString("PR_LINEITEM_N"));
		return lineHistory;
	}
	
	@Override
	public GoodsReceiptInventoryItem saveLMMSInventoryContainers(GoodsReceiptInventoryItem invntItem) {

		StringBuilder insertSql = new StringBuilder()
				.append("INSERT INTO PRS_PO_LMMSINVENTORY ")
				.append("(LMMS_INVNT_N, RT_ITEM_N, SAP_PO_N, CONTNR_N, INVNT_STS_C, REC_UPDUSER_I, REC_UPD_DTM) ")
				.append("VALUES (PRS_PO_LMMSINVENTORY_SEQ.nextVal, :rt_item_n, :sap_po_n, :contnr_n, :invnt_sts_c, :rec_upduser_i, SYSDATE) ");
		
		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("sap_po_n", invntItem.getSapPONumber())
				.addValue("rt_item_n", invntItem.getItemNumber())
				.addValue("contnr_n", invntItem.getContainerId())
				.addValue("invnt_sts_c", invntItem.getInventoryStatus().name())
				.addValue("rec_upduser_i", invntItem.getUpdateUser());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "LMMS_INVNT_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("LMMS_INVNT_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		invntItem.setId((keyHolderMap.get("LMMS_INVNT_N").toString()));

		return invntItem;
	
	}

	@Override
	public int updateGRInventoryItemStatus(List<GoodsReceiptInventoryItem> items) {
		
		if (CollectionUtils.isEmpty(items)) {
			throw new IllegalArgumentException("GoodsReceiptInventoryItem List is required.");
		}
		int count = 0;
		
		for (GoodsReceiptInventoryItem grInventoryItem : items) {
			StringBuilder sql = new StringBuilder()
					.append("UPDATE PRS_PO_LMMSINVENTORY ")
					.append("SET INVNT_STS_C = :inventoryStatus, REC_UPDUSER_I = :updateUser, REC_UPD_DTM = sysdate ")
					.append("WHERE LMMS_INVNT_N = :id ");
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("inventoryStatus", grInventoryItem.getInventoryStatus().name());
			params.addValue("updateUser", grInventoryItem.getUpdateUser());
			params.addValue("id", grInventoryItem.getId());
			int result = prsNamedJdbcTemplate.update(sql.toString(), params);
			count = count + result;
		}
		
		return count;
		
	}

	@Override
	public GoodsReceipt getToBeCreatedGoodsReceipt(String poId) {
		
		if(StringUtils.isNotEmpty(poId)) {
			StringBuilder sql = new StringBuilder()
					.append("select * from ( ")
						.append("select gr.RT_N, gr.PO_N, gr.RT_TP_C, gr.REC_CREATEUSER_I, gr.REC_RECD_DTM, gr.DO_N, ")
						.append("gr.RT_STS_C, gr.REMK_T, gr.SAP_REMK_T, gr.SAP_RT_N, gr.REC_CREATE_DTM, RT_SEND_DTM ")
						.append("from PRS_PO_RECEIPT gr join PRS_PURCHASE_ORDER po on gr.PO_N = po.PO_N ")
						.append("where po.PO_N = :id and gr.RT_SEND_DTM is null ")
						.append("order by gr.REC_CREATE_DTM ")
					.append(") where rownum = 1 " );

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("id", poId);

			List<GoodsReceipt> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::grRowMapper);

			if (CollectionUtils.isNotEmpty(result)) {
				GoodsReceipt gr = result.get(0);
				if(null != gr) {
					List<GoodsReceiptLineItem> grLineItems = getGoodsReceiptLineItems(gr.getId());
					if(CollectionUtils.isNotEmpty(grLineItems)) {
						gr.setLineItems(grLineItems);
					}
				}
				return gr;
			}
		}
		
		return null;
	}

	@Override
	public boolean hasPendingGoodsReceipt(String poId) {
		StringBuilder sql = new StringBuilder()
					.append("select count(*) ")
					.append("from PRS_PO_RECEIPT gr join PRS_PURCHASE_ORDER po on gr.PO_N = po.PO_N ")
					.append("where po.PO_N = :id and (gr.RT_STS_C is null or gr.RT_STS_C in ( :pendingStatusList )) ")
					.append("and RT_SEND_DTM is not null ")
					.append("order by gr.REC_CREATE_DTM ");
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", poId);
		params.addValue("pendingStatusList", 
				Arrays.asList(GRStatus.GRN_PENDING_APPROVAL.name(), GRStatus.GRS_PENDING_APPROVAL.name()));

		Integer result = prsNamedJdbcTemplate.queryForObject(sql.toString(), params, Integer.class);
		
		if(null != result && result > 0) {
			return true;
		}
		
		return false;
	};
	
	@Override
	public BigDecimal getTotalGRQuantityByPOLineitem(String poLineitemId) {
		StringBuilder sql = new StringBuilder()
					.append("SELECT  SUM(PRL.QTY_Q)  ")
					.append("FROM PRS_RECEIPT_LINEITEM PRL, PRS_PO_RECEIPT PPR ")
					.append("WHERE PPR.RT_TP_C = :grType AND PRL.RT_N = PPR.RT_N AND NVL(RT_STS_C, '*') NOT IN ('GRS_REJECTED_PS','GRN_REJECTED_PS','GRS_CREATION_FAILED','GRN_CREATION_FAILED') ")
					.append("AND PRL.LINEITEM_N = :poLineitemId ");
		BigDecimal resultGRS = null, resultGRN = null;
		MapSqlParameterSource paramsGRS = new MapSqlParameterSource();
		paramsGRS.addValue("poLineitemId", poLineitemId);		
		paramsGRS.addValue("grType", "GR_GRS");	
		try {
		resultGRS = prsNamedJdbcTemplate.queryForObject(sql.toString(), paramsGRS, BigDecimal.class);
		} catch (EmptyResultDataAccessException e ) {
			resultGRS = BigDecimal.ZERO;
		}

		MapSqlParameterSource paramsGRN = new MapSqlParameterSource();
		paramsGRN.addValue("poLineitemId", poLineitemId);		
		paramsGRN.addValue("grType", "GR_GRN");	
		resultGRN = prsNamedJdbcTemplate.queryForObject(sql.toString(), paramsGRN, BigDecimal.class);

		if (null != resultGRS && null != resultGRN)
		return resultGRS.subtract(resultGRN);
		else if (null == resultGRS) return BigDecimal.ZERO;
		else return resultGRS;
	};
	
	@Override
	public Optional<BigDecimal> getInventoryQuantityByPOLineitem(String poLineitemId) {
		StringBuilder sql = new StringBuilder().append(
				"SELECT SUM(INVNT_QTY_Q) FROM PRS_PO_INVENTORY WHERE LINEITEM_N = :poLineitemId ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poLineitemId", poLineitemId);

		BigDecimal result = null;
		
		result = prsNamedJdbcTemplate.queryForObject(sql.toString(), params, BigDecimal.class);
		
		if (null != result)
		return Optional.of(result);
		else return Optional.of(BigDecimal.ZERO);
	};

	public void addInventoryQuantity(BigDecimal quantity, String poLineitemId, String grLineitemId) {

		StringBuilder insertSql = new StringBuilder()
				.append("INSERT INTO PRS_PO_INVENTORY (LINEITEM_INVNT_N, INVNT_QTY_Q, LINEITEM_N, RT_ITEM_N)  ")
				.append("VALUES (PRS_PO_INVENTORY_SEQ.NEXTVAL, :quantity,:poLineitemId,:grLineitemId) ");
		
		MapSqlParameterSource params = new MapSqlParameterSource()
				.addValue("quantity", quantity.toPlainString())
				.addValue("poLineitemId", poLineitemId)
				.addValue("grLineitemId", grLineitemId);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "LINEITEM_INVNT_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("LINEITEM_INVNT_N not returned in KeyHolder");
		}
	}

	@Override
	public String getRecentGROBySAPPONumber(String sapPoNumber) {
		String gro = null;
		if (StringUtils.isNotEmpty(sapPoNumber)) {
			try {
				StringBuilder sql = new StringBuilder();
				sql.append(" SELECT ");
					sql.append(" GR.REC_CREATEUSER_I ");
				sql.append(" FROM ");
					sql.append(" PRS_PO_RECEIPT GR ");
					sql.append(" INNER JOIN PRS_PURCHASE_ORDER PO ON PO.PO_N = GR.PO_N ");
					sql.append(" AND PO.SAP_PO_N = :sapPoNumber ");
				sql.append(" ORDER BY ");
					sql.append(" GR.REC_CREATE_DTM DESC ");
				sql.append(" FETCH FIRST 1 ROWS ONLY ");
				
				MapSqlParameterSource params = new MapSqlParameterSource();
				params.addValue("sapPoNumber", sapPoNumber);
				gro = prsNamedJdbcTemplate.queryForObject(sql.toString(), params, new RowMapper<String>() {
					@Override
					public String mapRow(ResultSet rs, int rowNum) throws SQLException {
						return rs.getString("REC_CREATEUSER_I");
					}
				});
			} catch (EmptyResultDataAccessException  e) {
				return null;
			} 
		}
		return gro;
	}
}
