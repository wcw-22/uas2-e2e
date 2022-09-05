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

import sg.edu.nus.prs.domain.common.Json;
import sg.edu.nus.prs.domain.user.UserPreference;
import sg.edu.nus.prs.util.CommonUtils;

@Repository
public class UserPreferenceDAOImpl extends BaseDAOImpl implements UserPreferenceDAO {

	@Override
	public UserPreference save(UserPreference up) {
		
		if (up == null) return up;
		if (up.getUserNumber() == null) return null;
		if (up.getUserNumber().trim().isEmpty()) return null;
		
		if (isUserPreference(up.getUserNumber())) {
			return updateUserPreference(up);
		}
		else return insertUserPreference(up);
		
	}

	private UserPreference insertUserPreference(UserPreference up) {
		final String insertSql = "insert into PRS_USER_PREF(PREF_N, USER_I,USER_PREF_T) values "
				+ "(PRS_USER_PREF_SEQ.NEXTVAL, :userId,:userPreferenceJson)";

		String jsonUserPreference = new Json<>(up).getJsonString();

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("userId", up.getUserNumber())
		      .addValue("userPreferenceJson",jsonUserPreference);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql, params, keyHolder, new String[] { "PREF_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("PREF_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		up.setId(Integer.valueOf((keyHolderMap.get("PREF_N").toString())));
		return up;
	}
	
	private UserPreference updateUserPreference(UserPreference up) {
		final String updateSql = "update PRS_USER_PREF set USER_PREF_T = :userPreferenceJson "
				+ " where USER_I = :userId";

		MapSqlParameterSource namedParameters = new MapSqlParameterSource();
		namedParameters.addValue("userId", up.getUserNumber())
		      .addValue("userPreferenceJson",
					  new Json<>(up).getJsonString());
		
		this.prsNamedJdbcTemplate.update(updateSql, namedParameters); 
		return up;
	}

	@Override
	public UserPreference getUserPreference(String userStaffNo) {
		List<UserPreference> userPreferences = this.prsJdbcTemplate.query(
			"SELECT USER_I, USER_PREF_T FROM PRS_USER_PREF WHERE USER_I = ?",
			this::userPreferenceRowMapper,
			userStaffNo
		);

		if (CollectionUtils.isNotEmpty(userPreferences)) {
			return userPreferences.get(0);
		}

		return new UserPreference();
	}

	UserPreference userPreferenceRowMapper(ResultSet rs, int i) throws SQLException {
		String preferenceJson = rs.getString("USER_PREF_T");

		UserPreference userPreference;
		if (StringUtils.isNotEmpty(preferenceJson)) {
			userPreference = CommonUtils.fromJSON(preferenceJson, UserPreference.class);
		} else {
			userPreference = new UserPreference();
		}

		userPreference.setUserNumber(rs.getString("USER_I"));

		return userPreference;
	}

	private boolean isUserPreference(String userId) {
		if (null == userId) return false;
		if (userId.isEmpty()) return false;

		String sql = "SELECT count(1) FROM PRS_USER_PREF WHERE USER_I = ?";
		boolean result = false;
		Integer count; 
		count = this.prsJdbcTemplate.queryForObject(sql, new Object[] { userId }, Integer.class);
		
		if ( ((count!=null)?count.intValue():0) > 0) {
			result = true;
		}

		return result;
	}
	


}


