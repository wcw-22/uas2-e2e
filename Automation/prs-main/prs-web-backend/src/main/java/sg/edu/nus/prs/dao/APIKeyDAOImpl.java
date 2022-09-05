package sg.edu.nus.prs.dao;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;
import sg.edu.nus.prs.domain.security.APIKey;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Repository
public class APIKeyDAOImpl extends BaseDAOImpl implements APIKeyDAO {
    @Override
    public List<APIKey> getAPIKeysForAppId(String appId, Date currentDate) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("appId", appId);
        params.addValue("currentDate", currentDate);

        return prsNamedJdbcTemplate.query(
            "SELECT\n" +
                "    API_N,\n" +
                "    APPL_T, KEY_T,\n" +
                "    URL_T,\n" +
                "    REMK_T,\n" +
                "    VLD_ST_DTM, VLD_END_DTM,\n" +
                "    REC_UPDUSER_I, REC_UPD_DTM\n" +
                "FROM\n" +
                "    PRS_API_CONFIG\n" +
                "WHERE\n" +
                "    APPL_T = :appId\n" +
                "    AND VLD_ST_DTM <= :currentDate\n" +
                "    AND VLD_END_DTM > :currentDate",
                params,
                this::apiKeyRowMapper
        );
    }

    APIKey apiKeyRowMapper(ResultSet rs, int i) throws SQLException {
        APIKey apiKey = new APIKey();
        apiKey.setApiKeyId(rs.getString("API_N"));
        apiKey.setApplicationId(rs.getString("APPL_T"));
        apiKey.setHashedKey(rs.getString("KEY_T"));
        apiKey.setUrlPrefix(rs.getString("URL_T"));
        apiKey.setRemarks(rs.getString("REMK_T"));
        apiKey.setValidityStart(rs.getTimestamp("VLD_ST_DTM"));
        apiKey.setValidityEnd(rs.getTimestamp("VLD_END_DTM"));
        apiKey.setLastUpdatedUser(rs.getString("REC_UPDUSER_I"));
        apiKey.setLastUpdatedDate(rs.getTimestamp("REC_UPD_DTM"));

        return apiKey;
    }
}
