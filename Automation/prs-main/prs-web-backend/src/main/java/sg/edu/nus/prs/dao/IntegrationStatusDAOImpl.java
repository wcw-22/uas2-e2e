package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.logging.IntegrationStatusLog;

@Repository
public class IntegrationStatusDAOImpl extends BaseDAOImpl implements IntegrationStatusDAO {
    private static final Logger logger = LoggerFactory.getLogger(IntegrationStatusDAOImpl.class);

	@Override
	public String addIntegrationStatusLog(IntegrationStatusLog log) {
		if (log == null) {
            throw new IllegalArgumentException("Integration Status log is required.");
        }

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("integrationDirection", log.getIntegrationDirection().toString());
		params.addValue("endPointUrl", log.getEndPointUrl());
        params.addValue("hostName", log.getHostName());
        params.addValue("httpStatus", log.getHttpStatus());
        params.addValue("duration", log.getDuration());
        params.addValue("requestPayload", log.getRequestPayload());
        params.addValue("transactionDate", log.getTransactionDate());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.prsNamedJdbcTemplate.update(
               "INSERT INTO PRS_INTGR_STATUS (\n" +
                   "    INTGR_TRAN_N,\n" +
                   "    CHNL_C, WS_URL_T,\n" +
                   "    HOST_SERVER_T,\n" +
                   "    HTTP_STS_C, \n" +
                   "    INTGR_DUR_N, REQ_PAYLOAD_T, \n" +
                   "    INTGR_TRAN_DTM \n" +
                   ") VALUES (\n" +
                   "    PRS_INTGR_STS_SEQ.NEXTVAL,\n" +
                   "    :integrationDirection, :endPointUrl,\n" +
                   "    :hostName, \n" +
                   "    :httpStatus, \n" +
                   "    :duration, :requestPayload, \n" +
                   "    :transactionDate\n" +
                   ")",
                params,
                keyHolder,
                new String[]{"INTGR_TRAN_N"}
        );

        if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
            throw new IllegalStateException("No Keyholder value returned for APPV_N");
        }

        Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
        log.setId(keyHolderMap.get("INTGR_TRAN_N").toString());

        return log.getId();
    }

    @Override
    public void updateIntegrationStatusLog(IntegrationStatusLog log) {
        if (log == null) {
            throw new IllegalArgumentException("Integration Status log is required.");
        }

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("logId", log.getId());
        params.addValue("httpStatus", log.getHttpStatus());
        params.addValue("duration", log.getDuration());
        params.addValue("responsePayload", log.getResponsePayload());

        this.prsNamedJdbcTemplate.update(
                "UPDATE PRS_INTGR_STATUS SET\n" +
                    "    HTTP_STS_C = :httpStatus,\n" +
                    "    RESP_PAYLOAD_T = :responsePayload,\n" +
                    "    INTGR_DUR_N = :duration\n" +
                    "WHERE\n" +
                    "    INTGR_TRAN_N = :logId",
                params
        );
    }

	@Override
	public String getIntegrationStatusLog(String logId) {

		StringBuilder sql = new StringBuilder("select REQ_PAYLOAD_T from PRS_INTGR_STATUS where INTGR_TRAN_N = :logId");
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("logId", logId);
		
		List<String> result = this.prsNamedJdbcTemplate.query(sql.toString(), params, this::integrationStatusPayloadRowMapper); 
		
		if(CollectionUtils.isNotEmpty(result)) {
			return result.get(0);
		}
		
		return null;
	}
    
	String integrationStatusPayloadRowMapper(ResultSet rs, int i) throws SQLException {
		return rs.getString("REQ_PAYLOAD_T");
	}
    
}


