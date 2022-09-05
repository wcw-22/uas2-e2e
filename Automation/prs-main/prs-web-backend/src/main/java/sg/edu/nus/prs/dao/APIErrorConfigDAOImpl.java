package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.util.Constants;


@Repository
public class APIErrorConfigDAOImpl extends BaseDAOImpl implements APIErrorConfigDAO {

	@Override
	public String findMessageByCode(String code) {
		
		if (StringUtils.isBlank(code)) 
            throw new IllegalArgumentException("Code is required.");
            
            
		StringBuilder sql = new StringBuilder()
				.append("select ec.ERR_MSG_T ")
				.append("from PRS_APIERROR_CONFIG ec ")
				.append("where ec.ERR_MSG_C = :code and ec.DEFUNCT_F = :defunct ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("code", code);
		params.addValue("defunct", Constants.NO);
		
		List<String> results = prsNamedJdbcTemplate.query(sql.toString(), params, this::apiErrorConfigMessageMapper);
		
		if (CollectionUtils.isNotEmpty(results)) {
			return results.get(0);
		}
		
		return null;
	}
	
	public String apiErrorConfigMessageMapper(ResultSet rs, int i) throws SQLException {
		return rs.getString("ERR_MSG_T");
	}

}
