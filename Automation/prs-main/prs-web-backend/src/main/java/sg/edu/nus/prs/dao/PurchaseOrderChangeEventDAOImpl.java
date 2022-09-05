package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.purchase.PurchaseOderChangeEventType;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.PurchaseOrderChangeEvent;

@Repository
public class PurchaseOrderChangeEventDAOImpl extends BaseDAOImpl implements PurchaseOrderChangeEventDAO {

	private PurchaseOrderChangeEvent addPurchaseOrderChangeEvent(String poId, PurchaseOrderChangeEvent purchaseOrderChangeEvent) {
		StringBuilder insertSql = new StringBuilder();
		insertSql.append(
				"insert into PRS_PO_AUDTRAN (TRAN_N, PO_N, TRAN_TP_C, SIGNAUTHY_USER_I, SIGNAUTHY_EMAIL_T, TRAN_DTM, REC_CREATE_DTM) ")
				.append(" values ( PRS_PO_AUDTRAN_SEQ.NEXTVAL, :poId, :type, :signingAuthorityUserId, :signingAuthorityEmail, :eventDate, sysdate ) ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId)
				.addValue("type", purchaseOrderChangeEvent.getType().name())
				.addValue("signingAuthorityUserId", purchaseOrderChangeEvent.getSingingAuthorityUserId())
				.addValue("signingAuthorityEmail", purchaseOrderChangeEvent.getSigningAuthorifyEmail())
				.addValue("eventDate", purchaseOrderChangeEvent.getDate());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql.toString(), params, keyHolder, new String[] { "TRAN_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("TRAN_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		purchaseOrderChangeEvent.setId((keyHolderMap.get("TRAN_N").toString()));
		
		return purchaseOrderChangeEvent;
	}
	
	@Override
	public void addPurchaseOrderChangeEvents(PurchaseOrder po) {
		
		deletePurchaseOrderChangeEvent(po.getpId());
		
		if(CollectionUtils.isNotEmpty(po.getPurchaseOrderChangeEvents())) {
			po.getPurchaseOrderChangeEvents().forEach(pe -> {
				this.addPurchaseOrderChangeEvent(po.getpId(), pe);
			});
		}
	}

	private void deletePurchaseOrderChangeEvent(String poId) {
		
		if(StringUtils.isNotBlank(poId)) {
			MapSqlParameterSource poParams = new MapSqlParameterSource("poId", poId);
			this.prsNamedJdbcTemplate.update("delete from PRS_PO_AUDTRAN where PO_N in (:poId)", poParams);
		}
		
		
	}
	
	@Override
	public List<PurchaseOrderChangeEvent> getPurchaseOrderChangeEvents(String poId) {
		String sql = "select TRAN_N, TRAN_TP_C, SIGNAUTHY_USER_I, SIGNAUTHY_EMAIL_T, TRAN_DTM\n" + 
						"from PRS_PO_AUDTRAN\n" + 
						"where PO_N = :poId\n" +
						"order by TRAN_DTM";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("poId", poId);
		return prsNamedJdbcTemplate.query(sql, params, this::poChangeEventMapper);
	}

	PurchaseOrderChangeEvent poChangeEventMapper(ResultSet rs, int rowNum) throws SQLException {
		PurchaseOrderChangeEvent event = new PurchaseOrderChangeEvent();
		event.setId(rs.getString("TRAN_N"));
		event.setType(PurchaseOderChangeEventType.valueOf(rs.getString("TRAN_TP_C")));
		event.setDate(rs.getDate("TRAN_DTM"));
		event.setSingingAuthorityUserId(rs.getString("SIGNAUTHY_USER_I"));
		event.setSigningAuthorifyEmail(rs.getString("SIGNAUTHY_EMAIL_T"));
		return event;
}

}
