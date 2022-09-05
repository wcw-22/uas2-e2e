
package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.InternalStore;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractLevel;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.NUSNETDetail;
import sg.edu.nus.prs.domain.user.Role;
import sg.edu.nus.prs.domain.user.User;
import sg.edu.nus.prs.domain.user.UserAccess;
import sg.edu.nus.prs.domain.user.UserAttributeType;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.domain.user.UserSearchForm;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.Constants;

@Repository
public class UserAccessDAOImpl extends BaseDAOImpl implements UserAccessDAO {
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserAccessDAOImpl.class);

	/**
	 * Add new user for user access 
	 */
	@Override
	public List<String> addUserAccess(User user, String updaterUserId) {
		if (user == null) {
			throw new IllegalArgumentException("User is required.");
		}

		if (StringUtils.isEmpty(updaterUserId)) {
			throw new IllegalArgumentException("Updater user id is required.");
		}

		if (StringUtils.isEmpty(user.getUserId())) {
			throw new IllegalArgumentException("User ID is required.");
		}

		if (CollectionUtils.isEmpty(user.getUserAccesses())) {
			throw new IllegalArgumentException("User accesses are required.");
		}

		List<String> accessIds = new ArrayList<>(user.getUserAccesses().size());
		for (UserAccess userAccess: user.getUserAccesses()) {
			String facultyCode = null;
			String departmentCode = null;

			if (userAccess.getFaculty() != null) {
				Faculty faculty = userAccess.getFaculty();
				facultyCode = faculty.getFaculty();

				if (faculty.getDepartments() != null) {
					List<Department> departments = faculty.getDepartments();
					if (departments.size() > 1) {
						throw new IllegalArgumentException(
								"Expected to have only 1 department per faculty when adding user access."
						);
					} else if (departments.size() == 1) {
						departmentCode = departments.get(0).getDepartment();
					}
				}
			}

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("userId", user.getUserNo());
			params.addValue("role", userAccess.getRole().toString());
			params.addValue("faculty", facultyCode);
			params.addValue("department", departmentCode);
			params.addValue("updater", updaterUserId);			

			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.prsNamedJdbcTemplate.update(
					"INSERT INTO PRS_USER_ACCESS (ACCESS_N, USER_I,ACCESS_TP_C,FAC_C,DEPT_C,REC_UPDUSER_I,REC_UPD_DTM) VALUES "
							+ "(PRS_USER_ACCESS_SEQ.NEXTVAL, :userId, :role, :faculty, :department, :updater, SYSDATE)",
					params,
					keyHolder,
					new String[]{"ACCESS_N"}
			);

			if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() != 1) {
				throw new IllegalStateException("ACCESS_N not returned in KeyHolder");
			}

			Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);

			userAccess.setAccessId((String) keyHolderMap.get("ACCESS_N"));
			accessIds.add(userAccess.getAccessId());

			if (null != userAccess.getInternalStore()) {
				this.prsJdbcTemplate.update(
						"INSERT INTO PRS_USER_ACCESSTP (ACCESSTP_N, ACCESS_N, ACCESSTP_C, ACCESSTP_T, DEFUNCT_F) VALUES "
								+ "(PRS_USER_ACCESSTP_SEQ.NEXTVAL, ?, ?, ?, ?)",
						userAccess.getAccessId(), UserAttributeType.USER_ATTR_INTERNAL_STORE.name(),
						userAccess.getInternalStore().getStoreId(), Constants.NO);
			}

			if (userAccess.getPeriodContractLevel() != null) {
				this.prsJdbcTemplate.update(
						"INSERT INTO PRS_USER_ACCESSTP (ACCESSTP_N, ACCESS_N, ACCESSTP_C, ACCESSTP_T, DEFUNCT_F) VALUES "
								+ "(PRS_USER_ACCESSTP_SEQ.NEXTVAL, ?, ?, ?, ?)",
						userAccess.getAccessId(), UserAttributeType.USER_ATTR_PERIOD_CONTRACT_LEVEL.toString(),
						userAccess.getPeriodContractLevel().toString(), Constants.NO);
			}
		}

		return accessIds;
	}

	/**
	 * Delete user access record
	 */
	@Override
	public int deleteUserAccessByAccessId(String accessId) {
		if (accessId == null) {
			throw new IllegalArgumentException("User Access Id is required.");
		}

		this.prsJdbcTemplate.update(
			"DELETE FROM PRS_USER_ACCESSTP WHERE ACCESS_N = ?",
			accessId
		);
		
		return this.prsJdbcTemplate.update(
		"DELETE FROM PRS_USER_ACCESS WHERE ACCESS_N = ?",
			accessId
		);
	}

	/**
	 * Search user record
	 */
	@Override
	public PagedData<User> searchUserAccess(UserSearchForm input) {
		if (input == null) {
			throw new IllegalArgumentException("User Search Input is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("internalStoreAttr", UserAttributeType.USER_ATTR_INTERNAL_STORE.name());

		StringBuilder query = new StringBuilder("SELECT \n" + 
				"  ua.access_n, \n" + 
				"  ua.user_i, \n" + 
				"  ua.ACCESS_TP_C, \n" + 
				"  case when uattr.ACCESSTP_C = :internalStoreAttr then INITCAP(f1.fac_t) else INITCAP(f.fac_t) end as fac_t, \n" +
				"  case when uattr.ACCESSTP_C = :internalStoreAttr then f1.fac_c else f.fac_c end as fac_c, \n" +
				"  case when uattr.ACCESSTP_C = :internalStoreAttr then d1.dept_c else d.dept_c end as dept_c, \n" +
				"  case when uattr.ACCESSTP_C = :internalStoreAttr then INITCAP(d1.dept_t2) else INITCAP(d.dept_t2) end as dept_t2, \n" +
				"  ua.rec_upduser_i, \n" + 
				"  ua.rec_upd_dtm, \n" +
				"  r.code_t role_tp_t, str.INTL_STORE_N, uattr.ACCESSTP_N, s.SUPP_C, s.SUPP_T, \n" +
				"  uattr.accesstp_c, uattr.accesstp_t \n" +
				"FROM \n" + 
				"  prs_user_access ua  \n" + 
				"  LEFT JOIN department d ON d.dept_c = ua.dept_c  \n" + 
				"  LEFT JOIN faculty f ON f.fac_c = ua.fac_c  \n" + 
				"  LEFT JOIN prsctable r ON r.code_c = ua.ACCESS_TP_C  \n" + 
				"  LEFT JOIN PRS_USER_ACCESSTP uattr on uattr.access_n = ua.access_n \n" +
				"  LEFT JOIN PRS_INTERNAL_STORE str on uattr.ACCESSTP_C = :internalStoreAttr and uattr.ACCESSTP_T = str.INTL_STORE_N  \n" +
				"  LEFT JOIN PRSSUPPLIER s ON  str.SUPP_C = s.SUPP_C \n" + 
				"  LEFT JOIN department d1 ON d1.dept_c = str.dept_c  \n" + 
				"  LEFT JOIN faculty f1 ON f1.fac_c = str.fac_c  \n" + 
				"WHERE 1=1 ");

		if (StringUtils.isNotEmpty(input.getAccessId())) {
			query.append(" AND ua.access_n = :accessN ");
			params.addValue("accessN", input.getAccessId());
		}

		if (CollectionUtils.isNotEmpty(input.getUserNo()) || CollectionUtils.isNotEmpty(input.getUserId())) {

			query.append(" AND (ua.user_i IN (:userId) OR ua.user_i IN (:userNo))");
			params.addValue("userNo", input.getUserNo());
			params.addValue("userId", input.getUserId());
		}

		if (StringUtils.isNotEmpty(input.getRole())) {
			Role role = Role.fromDescription(input.getRole());
			if (role != null) {
				query.append(" AND ua.ACCESS_TP_C = :role ");
				params.addValue("role", role.toString());
			}
		}

		if (CollectionUtils.isNotEmpty(input.getFilteredRoles())) {
			List<String> rolesStr = input.getFilteredRoles().stream()
					.map(Role::toString)
					.collect(Collectors.toList());

			query.append(" AND ua.ACCESS_TP_C IN (:filteredRoles) ");
			params.addValue("filteredRoles", rolesStr);
		}

		if (CollectionUtils.isNotEmpty(input.getFaculty())) {
			query.append(" AND ( ua.fac_c IN (:faculty) OR str.fac_c IN (:faculty) ) ");
			params.addValue("faculty", input.getFaculty());
		}

		if (CollectionUtils.isNotEmpty(input.getDepartment())) {
			query.append(" AND ( ua.dept_c IN (:department) OR str.dept_c IN (:department) ) ");
			params.addValue("department", input.getDepartment());
		}

		return applyWithPagingAndSorting(
				input,
				query.toString(),
				params,
				this::userAccessRowMapper);
	}

	User userAccessRowMapper(ResultSet rs, int i) throws SQLException {
		UserAccess userAccess = new UserAccess();

		userAccess.setAccessId(rs.getString("access_n"));
		userAccess.setRole(Role.valueOf(rs.getString("ACCESS_TP_C")));
		userAccess.setUpdatedUserId(rs.getString("rec_upduser_i"));
		userAccess.setUpdatedDtm(rs.getTimestamp("rec_upd_dtm"));

		facultyDepartmentMapper(rs, userAccess);
		InternalStore internalStore = new InternalStore();
		internalStore.setFaculty(userAccess.getFaculty());
		internalStore.setStoreId(rs.getString("INTL_STORE_N") );
		Supplier supplier = new Supplier();
		supplier.setSupplierCode(rs.getString("SUPP_C"));
		supplier.setSupplierName(rs.getString("SUPP_T"));
		internalStore.setSupplier(supplier);
		userAccess.setInternalStore(internalStore);

		String attributeCode = rs.getString("ACCESSTP_C");
		String attributeValue = rs.getString("ACCESSTP_T");

		if (StringUtils.isNotBlank(attributeCode)) {
			UserAttributeType attr = UserAttributeType.valueOf(attributeCode);

			if (attr == UserAttributeType.USER_ATTR_PERIOD_CONTRACT_LEVEL) {
				userAccess.setPeriodContractLevel(PeriodContractLevel.valueOf(attributeValue));
			}
		}

		User user = new User();
		user.setUserNo(rs.getString("user_i"));
		user.setUserAccesses(Collections.singletonList(userAccess));

		return user;
	}
	
	@Override
	public List<String> getHeadOfDepartment(String department) {
		return this.prsJdbcTemplate.query(
				"SELECT user_i, stf_maindept_c, stf_workdept_c, fac_c, userid_tp_c "+
				"FROM vua_cov_uid_upa "+
				"WHERE userid_tp_c IN (?) "+
				"AND stf_workdept_c IN (?)"
				,
            this::headOfDepartmentRowMapper,
            Constants.HEAD_OF_DEPARTMENT_TYPE,
            department
        );
	}

	String headOfDepartmentRowMapper(ResultSet rs, int i) throws SQLException {

        return rs.getString("user_i");
    }
	
	
	@Override
	public List<String> getFacultyDeanByDepartment(String department) {

		return this.prsJdbcTemplate.query(
				"SELECT upa.user_i, upa.stf_maindept_c, upa.stf_workdept_c, upa.fac_c, upa.userid_tp_c "+
				"FROM vua_cov_uid_upa upa JOIN department d ON upa.stf_workdept_c = d.dept_c JOIN department d2 ON d.fac_c = d2.fac_c "+
				"WHERE upa.userid_tp_c = ? AND d2.dept_c = ? "
				,
            this::facultyDeanRowMapper,
            Constants.DEAN_TYPE,
            department
        );
	}
	
	@Override
	public List<String> getFacultyVPByDepartment(String department) {

		return this.prsJdbcTemplate.query(
				"SELECT upa.user_i, upa.stf_maindept_c, upa.stf_workdept_c, upa.fac_c, upa.userid_tp_c "+
				"FROM vua_cov_uid_upa upa JOIN department d ON upa.stf_workdept_c = d.dept_c JOIN department d2 ON d.fac_c = d2.fac_c "+
				"WHERE upa.userid_tp_c = ? AND d2.dept_c = ? "
				,
            this::facultyDeanRowMapper,
            Constants.VICE_PRESIDENT_TYPE,
            department
        );
	}
	
	String facultyDeanRowMapper(ResultSet rs, int i) throws SQLException {

        return rs.getString("user_i");
    }

    @Override
	public List<UserAccess> getVUAAccesses(List<String> userIds) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("userIds", userIds);
		params.addValue("userIdTypes", Arrays.asList(
				Constants.HEAD_OF_DEPARTMENT_TYPE,
				Constants.DEAN_TYPE,
				Constants.VICE_PRESIDENT_TYPE));

		return this.prsNamedJdbcTemplate.query(
				"SELECT \n" +
					"    upa.user_i, upa.userid_tp_c,\n" +
					"    d.dept_c, INITCAP(d.dept_t2) as dept_t2, \n" +
					"    f.fac_c, INITCAP(fac_t) as fac_t\n" +
					"FROM \n" +
					"    vua_cov_uid_upa upa\n" +
					"    JOIN department d ON upa.stf_workdept_c = d.dept_c\n" +
					"    JOIN faculty f ON d.fac_c = f.fac_c\n" +
					"WHERE\n" +
					"    upa.user_i IN (:userIds)\n" +
					"    AND userid_tp_c IN (:userIdTypes)"
				//+ " UNION  select 'YNCTANTY', '30', '607', 'Dean''S Office (Yale-Nus College)', '3H', 'Yale-Nus College' from vua_cov_uid_upa "	
				,
				params,
				this::vuaAccessesRowMapper
		);
	}
    
    
	UserAccess vuaAccessesRowMapper(ResultSet rs, int i) throws SQLException {
		UserAccess ua = new UserAccess();

		String userTypeCode = rs.getString("userid_tp_c");
		if (StringUtils.equals(Constants.DEAN_TYPE, userTypeCode)) {
			ua.setRole(Role.ROLE_DEAN);
		} else if (StringUtils.equals(Constants.HEAD_OF_DEPARTMENT_TYPE, userTypeCode)) {
			ua.setRole(Role.ROLE_HEAD_OF_DEPARTMENT);
		} else if (StringUtils.equals(Constants.VICE_PRESIDENT_TYPE, userTypeCode)) {
			ua.setRole(Role.ROLE_VICE_PRESIDENT);
		}

		facultyDepartmentMapper(rs, ua);

		return ua;
	}

	void facultyDepartmentMapper(ResultSet rs, UserAccess ua) throws SQLException {
		String facultyCode = rs.getString("fac_c");
		if (StringUtils.isNotEmpty(facultyCode)) {
			Faculty faculty = new Faculty(facultyCode, rs.getString("fac_t"));
			ua.setFaculty(faculty);

			String departmentCode = rs.getString("dept_c");
			if (StringUtils.isNotEmpty(departmentCode)) {
				faculty.setDepartments(Collections.singletonList(
						new Department(departmentCode, rs.getString("dept_t2"))
				));
			}
		}
	}

	@Override
	public boolean isUserHoDOrDelegate(UserDetail userdetail, String departmentCode) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("deptC", departmentCode);
		params.addValue("userIds", userdetail.getNusnetDetails().stream()
			.map(NUSNETDetail::getUserId)
			.collect(Collectors.toSet()));
		params.addValue("hodType", Constants.HEAD_OF_DEPARTMENT_TYPE);

		Integer count = prsNamedJdbcTemplate.queryForObject(
			"SELECT count(*) FROM (\n" +
				"    SELECT\n" +
				"        user_i\n" +
				"    FROM\n" +
				"        VUA_COV_UID_UPA v\n" +
				"    WHERE\n" +
				"        v.user_i IN (:userIds) \n" +
				"        AND v.userid_tp_c = :hodType \n" +
				"        AND v.stf_workdept_c = :deptC \n" +
				") a ",
				params,
				Integer.class
		);

		return count != null && count > 0;
	}

	@Override
	public List<User> getLabSupplyOfficers(String internalSupplierCode) {
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("internalSupplierCode", internalSupplierCode);

		return this.prsNamedJdbcTemplate.query(
				"SELECT\r\n" + 
				"    pua.access_n, pua.user_i, pua.access_tp_c, pua.fac_c, pua.dept_c\r\n" + 
				"FROM\r\n" + 
				"    prs_user_access pua\r\n" + 
				"    JOIN prs_user_accesstp puat ON puat.access_n = pua.access_n\r\n" +
				"    JOIN prs_internal_store pis ON pis.INTL_STORE_N = puat.accesstp_t\r\n" +
				"AND pis.supp_c = :internalSupplierCode "
				,
				params,
				this::labSupplyOfficerAccessesRowMapper
		);
	}
	
	User labSupplyOfficerAccessesRowMapper(ResultSet rs, int i) throws SQLException {
		User user  = new User();
		user.setUserNo(rs.getString("user_i"));
		
		UserAccess userAccesses = new UserAccess();
		userAccesses.setInternalStore(null);
		userAccesses.setAccessId(rs.getString("access_n"));
		String userTypeCode = rs.getString("access_tp_c");
		userAccesses.setRole(Role.valueOf(userTypeCode));
		facultyDepartmentMapper(rs, userAccesses);
		
		user.setUserAccesses(Collections.singletonList(userAccesses));
		return user;
    }

}
