package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.inbound.InboundRequest;
import sg.edu.nus.prs.domain.inbound.InboundRequestStatus;
import sg.edu.nus.prs.domain.inbound.InboundRequestType;

@Repository
public class InboundStagingDAOImpl implements InboundStagingDAO {

	@Autowired
	@Qualifier("prsNamedJdbcTemplate")
	protected NamedParameterJdbcTemplate prsNamedJdbcTemplate;

	public void setPrsNamedJdbcTemplate(NamedParameterJdbcTemplate prsNamedJdbcTemplate) {
		this.prsNamedJdbcTemplate = prsNamedJdbcTemplate;
	}

	@Override
	public void addStagingRequest(InboundRequest request) {
		
		if (request == null) {
			throw new IllegalArgumentException("InboundRequest is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("inboundType", request.getInboundType().toString());
		params.addValue("integrationStatusId", request.getIntegrationStatusId());
		params.addValue("status", request.getInboundProccessStatus().toString());
		params.addValue("date", request.getDate());

		StringBuilder sql = new StringBuilder().append(
				"insert into PRS_INBOUND_STG (INBOUND_N, INBOUND_TP_C, INTGR_TRAN_N, REC_CREATE_DTM, INBOUND_PROCSTS_C) ")
				.append("values (PRS_INBOUND_STG_SEQ.NEXTVAL, :inboundType, :integrationStatusId, :date, :status) ");

		this.prsNamedJdbcTemplate.update(sql.toString(), params);
	}

	@Override
	public void updateStagingRequeststatus(InboundRequest request) {
		
		if (request == null) {
			throw new IllegalArgumentException("InboundRequest is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", request.getInboundId());
		params.addValue("status", request.getInboundProccessStatus().toString());

		StringBuilder sql = new StringBuilder(
				"update PRS_INBOUND_STG set INBOUND_PROCSTS_C = :status where INBOUND_N = :id ");

		this.prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	@Override
	public InboundRequest getInboundRequestsForImport(InboundRequestType inboundRequestType) {
		
		if (inboundRequestType == null) {
			throw new IllegalArgumentException("InboundRequest is required.");
		}
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("inboundType", inboundRequestType.toString());
		params.addValue("inboundStatus", InboundRequestStatus.INBOUND_STS_NEW.toString());
		StringBuilder sql = new StringBuilder()
				.append("select INBOUND_N,INBOUND_TP_C,INTGR_TRAN_N,REC_CREATE_DTM,INBOUND_PROCSTS_C ")
				.append("from PRS_INBOUND_STG ")
				.append( "where INBOUND_N in ( ")
					.append("select INBOUND_N from ( ")
						.append("select * ")
						.append("from PRS_INBOUND_STG ")
						.append("where INBOUND_TP_C = :inboundType and INBOUND_PROCSTS_C = :inboundStatus ")
						.append("order by rec_create_dtm ")
					.append(") where rownum = 1 ")
				.append(") for update ");
		List<InboundRequest> result = this.prsNamedJdbcTemplate.query(sql.toString(), params, this::inboundRequestMapper);
		
		if(CollectionUtils.isNotEmpty(result)) {
			return result.get(0);
		}
		
		return null;
	}
	
	InboundRequest inboundRequestMapper(ResultSet rs, int rowNum) throws SQLException {
		InboundRequest request = new InboundRequest();
		request.setInboundId(rs.getString("INBOUND_N"));
		request.setInboundType(InboundRequestType.valueOf(rs.getString("INBOUND_TP_C")));
		request.setIntegrationStatusId(rs.getString("INTGR_TRAN_N"));
		request.setInboundProccessStatus(InboundRequestStatus.valueOf(rs.getString("INBOUND_PROCSTS_C")));

		return request;
	}
	
	

}
