package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import sg.edu.nus.prs.domain.mapper.DelegateModelMapper;
import sg.edu.nus.prs.domain.user.*;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.exception.PRSExceptionCode;
import sg.edu.nus.prs.exception.PRSRuntimException;
import sg.edu.nus.prs.util.Constants;

@Repository
public class DelegateDAOImpl extends BaseDAOImpl implements DelegateDAO {

	private static final Logger logger = LoggerFactory.getLogger(BaseDAOImpl.class);

	@Override
	public Boolean create(UserDelegation userDelegation) {
		if (null == userDelegation)
			return false;
		if (null == userDelegation.getUserId())
			return false;

		for (Delegation item : userDelegation.getDelegations()) {
			insertDelegation(item);
		}
		return true;
	}

	@Override
	public UserDelegation update(UserDelegation userDelegation) {
		if (null == userDelegation)
			return null;
		if (null == userDelegation.getUserId())
			return null;

		this.deleteDelegationsByUserId(userDelegation.getUserId());

		UserDelegation updatedUserDelegation = new UserDelegation(userDelegation.getUserId());
		for (Delegation item : userDelegation.getDelegations()) {
			updatedUserDelegation.getDelegations().add(insertDelegation(item));
		}
		return updatedUserDelegation;
	}

	public Boolean updateDelegationWithoutDefunct(Delegation d) {
        final String updateSql= new StringBuilder().append("UPDATE PRS_NOMINEE SET ")
        		.append(" NOM_USER_I = :delegateId ,")
        		.append(" PER_AUTHRUSER_I = :delegatorId ,")
        		.append(" NOM_ACCESSTP_C = :role ,")
        		.append(" ST_DTM = TO_DATE(:startDate,'dd/mm/yyyy') ,")
        		.append(" END_DTM = TO_DATE(:endDate,'dd/mm/yyyy'),")
        		.append(" REC_UPDUSER_I = :updateUser ,")
        		.append(" REC_UPD_DTM = SYSDATE ,")
        		.append(" FAC_C = :fac ,")
        		.append(" DEPT_C = :dept ")
        		.append(" WHERE NOM_N = :id")
        		.toString();
        
        SqlParameterSource params = new MapSqlParameterSource()
        		.addValue("delegateId", d.getDelegateStaffNumber().trim().toUpperCase())
				.addValue("delegatorId", d.getApproverStaffNumber().trim().toUpperCase())
				.addValue("role", d.getRole().name())
				.addValue("startDate", d.getDurationStartDate().format(DelegateModelMapper.formatter))
				.addValue("endDate", d.getDurationEndDate().format(DelegateModelMapper.formatter))
				.addValue("updateUser", d.getUpdateUserId()).addValue("fac", d.getFaculty().getFaculty())
				.addValue("dept", d.getDepartment().getDepartment())
				.addValue("id", d.getId())
				;
        
        int status =this.prsNamedJdbcTemplate.update(updateSql, params); 
        if(status != 0){
            return true;
        }else{
            return false;
        }
	}

	@Override
	public Delegation updateDelegation(Delegation d) {
        this.deleteDelegation(d);
        Delegation newDelegation = this.insertDelegation(d);
        if (null != newDelegation) {
        	return newDelegation;
        } else {
        	return null;
        }
	}

	@Override
	public Delegation deleteDelegation(Delegation d) {
		if (null == d) return null;
        final String updateSql= new StringBuilder().append("UPDATE PRS_NOMINEE SET DEFUNCT_F = 'Y', REC_UPDUSER_I = :updateUser, REC_UPD_DTM = SYSDATE ")
        		.append(" WHERE NOM_N = :id")
        		.toString();
        		
        SqlParameterSource params = new MapSqlParameterSource()
				.addValue("updateUser", d.getUpdateUserId())
				.addValue("id", d.getId());
        
        int status =this.prsNamedJdbcTemplate.update(updateSql, params); 
        if(status != 0){
        	return this.getDelegation(d.getId());
        }else{
            return d; //Return the original record which has defunct_f = 'N' 
        }
	}
	
	@Override
	public List<Delegation> deleteDelegations(List<String> keys, String currentUserId) {
		if (null == keys) return Collections.emptyList();
		if (CollectionUtils.isEmpty(keys)) return Collections.emptyList();
		int status = this.prsNamedJdbcTemplate.update("UPDATE PRS_NOMINEE SET DEFUNCT_F = 'Y', REC_UPDUSER_I = :updateUser, REC_UPD_DTM = SYSDATE WHERE NOM_N IN (:keys)",
				new MapSqlParameterSource().addValue("updateUser", currentUserId).addValue("keys", keys));
		
        if(status <= 0){
			throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_DAO_FAIL); 
        }
        
        if(status != 0){
        	List<Delegation> deletedDelegations = new ArrayList<Delegation>();
        	keys.forEach(key -> {
        		deletedDelegations.add(this.getDelegation(key));
        	});
        	return deletedDelegations;
        }
        
        return Collections.emptyList();
	}
	
	private Delegation insertDelegation(Delegation d) {
		if (null == d) return null;
		final String insertSql = "insert into PRS_NOMINEE (NOM_N ,NOM_USER_I ,PER_AUTHRUSER_I ,NOM_ACCESSTP_C ,ST_DTM ,END_DTM ,REC_UPDUSER_I ,REC_UPD_DTM ,FAC_C ,DEPT_C) values(PRS_NOMINEE_SEQ.NEXTVAL,"
				+ ":delegateId,:delegatorId,:role,TO_DATE(:startDate,'dd/mm/yyyy'),TO_DATE(:endDate,'dd/mm/yyyy'),:updateUser,SYSDATE,:fac,:dept)";

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("delegateId", d.getDelegateStaffNumber().trim().toUpperCase())
				.addValue("delegatorId", d.getApproverStaffNumber().trim().toUpperCase())
				.addValue("role", d.getRole().name())
				.addValue("startDate", d.getDurationStartDate().format(DelegateModelMapper.formatter))
				.addValue("endDate", d.getDurationEndDate().format(DelegateModelMapper.formatter))
				.addValue("updateUser", d.getUpdateUserId())
				.addValue("fac", d.getFaculty().getFaculty())
				.addValue("dept", d.getDepartment().getDepartment());

		KeyHolder keyHolder = new GeneratedKeyHolder();
		this.prsNamedJdbcTemplate.update(insertSql, params, keyHolder, new String[] { "NOM_N" });

		if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
			throw new IllegalStateException("NOM_N not returned in KeyHolder");
		}

		Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
		d.setId((keyHolderMap.get("NOM_N").toString()));

		return d;
	}

	@Override
	public UserDelegation getUserDelegations(String userId, List<String> faculties, List<String> departments, String currentUser, Role role) {
		MapSqlParameterSource params = null;
		List<Delegation> delegaionList = Collections.emptyList();
		StringBuilder query = null;
		if (null == userId) {
			throw new IllegalArgumentException("Delegate user id is required.");
		}
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append(
					"SELECT NOM_N,NOM_USER_I,PER_AUTHRUSER_I,NOM_ACCESSTP_C,TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM ,TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,D.FAC_C,INITCAP(FAC.FAC_T) AS FAC_NAME,D.DEPT_C,INITCAP(DEPT.DEPT_T2) AS DEPT_NAME ")
					.append("FROM PRS_NOMINEE D ").append("LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C ")
					.append("LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C ").append("WHERE 1=1 AND D.DEFUNCT_F != 'Y' ");
			// NUS Admin can see everything, hence no restriction
			if (Role.ROLE_FAC_ADMIN.equals(role)) {
				query.append(" AND D.fac_c IN (:faculties) ");
				params.addValue("faculties", faculties);
			} else if (Role.ROLE_DEPT_ADMIN.equals(role)) {
				query.append(" AND D.dept_c IN (:departments) ");
				params.addValue("departments", departments);
			}

			if (null != userId) {
				query.append("AND D.NOM_USER_I = :userId ");
				params.addValue("userId", userId.trim().toUpperCase());
			}
			
			query.append(" ORDER BY FAC_NAME, DEPT_NAME  ");

			delegaionList = this.prsNamedJdbcTemplate.query(query.toString(), params, new RowMapper<Delegation>() {
				@Override
				public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					Delegation delegation = null;

					delegation = new Delegation();

					delegation.setId(rs.getString("NOM_N"));
					delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
					delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

					delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
					Faculty fac = new Faculty();
					fac.setFaculty(rs.getString("FAC_C"));
					fac.setDescription(rs.getString("FAC_NAME"));
					delegation.setFaculty(fac);
					Department dept = new Department();
					dept.setDepartment(rs.getString("DEPT_C"));
					dept.setDescription(rs.getString("DEPT_NAME"));
					delegation.setDepartment(dept);

					delegation.setDurationStartDate(
							LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
					delegation.setDurationEndDate(
							LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

					return delegation;
				}
			});
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			params = null;
			query = null;
		}
		if (CollectionUtils.isNotEmpty(delegaionList)) {
			delegaionList = delegaionList.stream()
					.filter(delegation -> null != delegation && null != delegation.getId())
					.collect(Collectors.toList());
		}

		UserDelegation ud = new UserDelegation(userId);
		ud.setUserId(null);
		ud.setDelegations(delegaionList);
		return ud;
	}

	/*
	 * This method return a record as long as its primary key matched. No matter the de-funct status.
	 */
	@Override
	public Delegation getDelegation(String delegationId) {
		MapSqlParameterSource params = null;
		List<Delegation> delegaionList = Collections.emptyList();
		Delegation result = null;
		StringBuilder query = null;
		if (null == delegationId) {
			throw new IllegalArgumentException("Delegation key is required.");
		}
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append(
					"SELECT NOM_N,NOM_USER_I,PER_AUTHRUSER_I,NOM_ACCESSTP_C,TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM ,TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,D.FAC_C,INITCAP(FAC.FAC_T) AS FAC_NAME,D.DEPT_C,INITCAP(DEPT.DEPT_T2) AS DEPT_NAME, D.DEFUNCT_F ")
					.append("FROM PRS_NOMINEE D ").append("LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C ")
					.append("LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C ").append("WHERE 1=1 ");

			query.append("AND D.NOM_N = :delegationId ");
			params.addValue("delegationId", delegationId.trim().toUpperCase());

			delegaionList = this.prsNamedJdbcTemplate.query(query.toString(), params, new RowMapper<Delegation>() {
				@Override
				public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					Delegation delegation = null;

					delegation = new Delegation();

					delegation.setId(rs.getString("NOM_N"));
					delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
					delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

					delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
					Faculty fac = new Faculty();
					fac.setFaculty(rs.getString("FAC_C"));
					fac.setDescription(rs.getString("FAC_NAME"));
					delegation.setFaculty(fac);
					Department dept = new Department();
					dept.setDepartment(rs.getString("DEPT_C"));
					dept.setDescription(rs.getString("DEPT_NAME"));
					delegation.setDepartment(dept);

					delegation.setDurationStartDate(
							LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
					delegation.setDurationEndDate(
							LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));
                    delegation.setDefunctFlag(rs.getString("DEFUNCT_F"));
					return delegation;
				}
			});

			if (null != delegaionList && !delegaionList.isEmpty())
				result = delegaionList.get(0);

		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			params = null;
			query = null;
		}

		return result;
	}
	
	@Override
	public Delegation getDelegateByApproverAndRole(String nusnetId, Role role) {
		MapSqlParameterSource params = null;
		List<Delegation> delegaionList = Collections.emptyList();
		Delegation result = null;
		StringBuilder query = null;
		if (null == nusnetId) {
			throw new IllegalArgumentException("NUSNETID is required.");
		}
		
		if (null == role) {
			throw new IllegalArgumentException("Role is required.");
		}
		
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append(
					"SELECT "
					+ "NOM_N,"
					+ "NOM_USER_I,"
					+ "PER_AUTHRUSER_I,"
					+ "NOM_ACCESSTP_C,"
					+ "TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM,"
					+ "TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,"
					+ "D.FAC_C,"
					+ "INITCAP(FAC.FAC_T) AS FAC_NAME,"
					+ "D.DEPT_C,"
					+ "INITCAP(DEPT.DEPT_T2) AS DEPT_NAME,"
					+ "D.DEFUNCT_F "
					+ "FROM PRS_NOMINEE D "
					+ "LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C "
					+ "LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C "
					+ "WHERE 1=1 "
					+ "AND TRUNC(nm.st_dtm) <= TRUNC(SYSDATE) \n"
					+ "AND TRUNC(nm.end_dtm) >= TRUNC(SYSDATE)");

			query.append("AND D.PER_AUTHRUSER_I = :delegationId ");
			params.addValue("delegationId", nusnetId.trim().toUpperCase());
			
			query.append("AND D.NOM_ACCESSTP_C = :role ");
			params.addValue("role", role.toString());

			delegaionList = this.prsNamedJdbcTemplate.query(query.toString(), params, new RowMapper<Delegation>() {
				@Override
				public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					Delegation delegation = null;

					delegation = new Delegation();

					delegation.setId(rs.getString("NOM_N"));
					delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
					delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

					delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
					Faculty fac = new Faculty();
					fac.setFaculty(rs.getString("FAC_C"));
					fac.setDescription(rs.getString("FAC_NAME"));
					delegation.setFaculty(fac);
					Department dept = new Department();
					dept.setDepartment(rs.getString("DEPT_C"));
					dept.setDescription(rs.getString("DEPT_NAME"));
					delegation.setDepartment(dept);

					delegation.setDurationStartDate(
							LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
					delegation.setDurationEndDate(
							LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));
                    delegation.setDefunctFlag(rs.getString("DEFUNCT_F"));
					return delegation;
				}
			});

			if (null != delegaionList && !delegaionList.isEmpty())
				result = delegaionList.get(0);

		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			params = null;
			query = null;
		}

		return result;
	}

	private void deleteDelegationsByUserId(String userId) {
		this.prsNamedJdbcTemplate.update("delete from PRS_NOMINEE where NOM_USER_I = :id",
				new MapSqlParameterSource("id", userId));
	}

	@Override
	public boolean isDean(String userId) {
		if (null == userId)
			return false;

		return isRole(userId, Constants.DEAN_TYPE);
	}

	@Override
	public boolean isHoD(String userId) {
		if (null == userId)
			return false;

		return isRole(userId, Constants.HEAD_OF_DEPARTMENT_TYPE);
	}

	private boolean isRole(String userId, String roleTypes) {
		if (userId == null || roleTypes == null)
			return false;
		String sql = "SELECT COUNT(1) FROM VUA_COV_UID_UPA WHERE USERID_TP_C in ? AND USER_I =  ?";
		boolean result = false;
		int count = this.prsJdbcTemplate.queryForObject(sql,
				new Object[] { roleTypes.trim().toUpperCase(), userId.trim().toUpperCase() }, Integer.class);
		if (count > 0) {
			result = true;
		}
		return result;
	}

	@Override
	public boolean isPI(String userId) {
		return true;
	}
	
	@Override
	public boolean isVP(String userId) {
		if (null == userId)
			return false;

		return isRole(userId, Constants.VICE_PRESIDENT_TYPE);
	}

	@Override
	public boolean isCompatibleForApprover(Delegation df) {
		String sql = "SELECT count(1) FROM VUA_COV_UID_UPA V, DEPARTMENT D  "
				+ " WHERE V.STF_WORKDEPT_C = D.DEPT_C  AND UPPER(D.FAC_C)=?  AND UPPER(V.STF_WORKDEPT_C)=?  AND UPPER(V.USER_I) =?  AND UPPER(V.USERID_TP_C)=?";

		boolean result = false;
		int count = this.prsJdbcTemplate.queryForObject(sql,
				new Object[] { df.getFaculty().getFaculty().toUpperCase(),
						df.getDepartment().getDepartment().toUpperCase(), df.getApproverId().toUpperCase(),
						df.getRoleHRCode().toUpperCase() },
				Integer.class);
		if (count > 0) {
			result = true;
		}
		return result;
	}
	
	@Override
	public boolean isCompatibleForVP(Delegation df) {
		String sql = "SELECT count(1) FROM VUA_COV_UID_UPA V, DEPARTMENT D  "
				+ " WHERE V.STF_WORKDEPT_C = D.DEPT_C  AND UPPER(D.FAC_C)=? OR UPPER(D.FAC_C) IS NULL AND UPPER(V.STF_WORKDEPT_C)=?  AND UPPER(V.USER_I) =?  AND UPPER(V.USERID_TP_C)=?";

		boolean result = false;
		int count = this.prsJdbcTemplate.queryForObject(sql,
				new Object[] { df.getFaculty().getFaculty().toUpperCase(),
						df.getDepartment().getDepartment().toUpperCase(), df.getApproverId().toUpperCase(),
						df.getRoleHRCode().toUpperCase() },
				Integer.class);
		if (count > 0) {
			result = true;
		}
		return result;
	}

	@Override
	public PagedData<Delegation> searchDelegations(DelegationSearchForm input) {
		return this.searchDelegations(input, null, null, null, null);
	}

	@Override
	public PagedData<Delegation> searchDelegations(DelegationSearchForm input, List<String> faculties, List<String> departments,
			String currentUser, Role role) {
		if (input == null) {
			throw new IllegalArgumentException("User Search Input is required.");
		}

		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		query.append(
				"SELECT NOM_N,NOM_USER_I,PER_AUTHRUSER_I,NOM_ACCESSTP_C,TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM ,"
				+ "TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM, D.FAC_C, INITCAP(FAC.FAC_T) AS FAC_NAME, D.DEPT_C, INITCAP(DEPT.DEPT_T2) AS DEPT_NAME ")
				.append("FROM PRS_NOMINEE D ").append("LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C ")
				.append("LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C ").append("WHERE 1=1 AND D.DEFUNCT_F != 'Y' ");

		String who = null;
		if (StringUtils.isNotEmpty(input.getWho()) && StringUtils.isNotEmpty(input.getUserId())) {
			who = input.getWho();

			if (who.equalsIgnoreCase("DELEGATE")) {
				query.append("AND D.NOM_USER_I = :userId ");
				params.addValue("userId", input.getStaffNumber().trim().toUpperCase());
			} else if (who.equalsIgnoreCase("DELEGATOR")) {
				query.append("AND D.PER_AUTHRUSER_I = :userId ");
				params.addValue("userId", input.getStaffNumber().trim().toUpperCase());
			}
		}else if(StringUtils.isNotEmpty(input.getUserId())){
			query.append("AND (D.NOM_USER_I = :userId  OR  D.PER_AUTHRUSER_I = :userId )");
			params.addValue("userId", input.getStaffNumber().trim().toUpperCase());
		}

		if (StringUtils.isNotEmpty(input.getDurationStartDate())) {
			query.append(
					" AND D.ST_DTM >= TO_DATE(:start_d,'dd/mm/yyyy') ");
			params.addValue("start_d", input.getDurationStartDate());
		}

		if (StringUtils.isNotEmpty(input.getDurationEndDate())) {
			query.append(" AND D.END_DTM <=TO_DATE(:end_d,'dd/mm/yyyy') ");
			params.addValue("end_d", input.getDurationEndDate());
		}

		// NUS Admin can see everything, hence no restriction
		if (Role.ROLE_FAC_ADMIN.equals(role)) {
			query.append(" AND D.fac_c IN (:faculties) ");
			params.addValue("faculties", faculties);
		} else if (Role.ROLE_DEPT_ADMIN.equals(role)) {
			query.append(" AND D.dept_c IN (:departments) ");
			params.addValue("departments", departments);
		}

		if (!(Role.ROLE_NUS_ADMIN.equals(role) || Role.ROLE_FAC_ADMIN.equals(role) || Role.ROLE_DEPT_ADMIN.equals(role))
				&& !ObjectUtils.isEmpty(currentUser)) {
			query.append(" AND UPPER(D.UPDUSER_I) = :userId ");
			params.addValue("userId", currentUser);
		}

		return applyWithPagingAndSorting(input, query.toString(), params, (rs, i) -> {
			Delegation delegation = new Delegation();

			delegation.setId(rs.getString("NOM_N"));
			delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
			delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));
			delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
			Faculty fac = new Faculty();
			fac.setFaculty(rs.getString("FAC_C"));
			fac.setDescription(rs.getString("FAC_NAME"));
			delegation.setFaculty(fac);
			Department dept = new Department();
			dept.setDepartment(rs.getString("DEPT_C"));
			dept.setDescription(rs.getString("DEPT_NAME"));
			delegation.setDepartment(dept);
			delegation.setDurationStartDate(LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
			delegation.setDurationEndDate(LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

			return delegation;
		});

	}
	

	@Override
	public List<Delegation> getOverlappedExistingDelegation(Delegation delegation) {
		MapSqlParameterSource params = null;
		List<Delegation> delegaionList = Collections.emptyList();
		StringBuilder query = null;
		if (null == delegation) return null;
		if (null == delegation.getDelegateStaffNumber()) {
			throw new IllegalArgumentException("Delegate user id is required.");
		}
		try {
			params = new MapSqlParameterSource();
			query = new StringBuilder();
			query.append(
					"SELECT NOM_N,NOM_USER_I,PER_AUTHRUSER_I,NOM_ACCESSTP_C,TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM ,TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,D.FAC_C,INITCAP(FAC.FAC_T) AS FAC_NAME,D.DEPT_C,INITCAP(DEPT.DEPT_T2) AS DEPT_NAME ")
					.append("FROM PRS_NOMINEE D ").append("LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C ")
					.append("LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C ")
					.append("WHERE 1=1 AND D.DEFUNCT_F='N' ")
					.append("AND D.FAC_C = :fac AND D.DEPT_C= :dept ")
					.append("AND D.END_DTM >= TO_DATE(:start_d,'dd/mm/yyyy') AND D.ST_DTM <=TO_DATE(:end_d,'dd/mm/yyyy') ")
					.append("AND D.NOM_USER_I = :userId ")
					.append("AND D.PER_AUTHRUSER_I = :approverId ")
					.append("AND D.NOM_N != :id ");
			
		    params.addValue("fac", delegation.getFaculty().getFaculty());
		    params.addValue("dept", delegation.getDepartment().getDepartment());
			params.addValue("start_d",  delegation.getDurationStartDate().format(DelegateModelMapper.formatter));
			params.addValue("end_d",delegation.getDurationEndDate().format(DelegateModelMapper.formatter));
			params.addValue("userId", delegation.getDelegateStaffNumber().trim().toUpperCase());
			params.addValue("approverId", delegation.getApproverStaffNumber().trim().toUpperCase());
			params.addValue("id", delegation.getId().trim().toUpperCase());
			  	
			delegaionList = this.prsNamedJdbcTemplate.query(query.toString(), params, new RowMapper<Delegation>() {
				@Override
				public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					Delegation delegation = null;

					delegation = new Delegation();

					delegation.setId(rs.getString("NOM_N"));
					delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
					delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

					delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
					Faculty fac = new Faculty();
					fac.setFaculty(rs.getString("FAC_C"));
					fac.setDescription(rs.getString("FAC_NAME"));
					delegation.setFaculty(fac);
					Department dept = new Department();
					dept.setDepartment(rs.getString("DEPT_C"));
					dept.setDescription(rs.getString("DEPT_NAME"));
					delegation.setDepartment(dept);

					delegation.setDurationStartDate(
							LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
					delegation.setDurationEndDate(
							LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

					return delegation;
				}
			});
		} catch (Exception e) {
			throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_DAO_FAIL);
		} finally {
			params = null;
			query = null;
		}
		if (CollectionUtils.isNotEmpty(delegaionList)) {
			delegaionList = delegaionList.stream()
					.filter(item -> null != item && null != item.getId())
					.collect(Collectors.toList());
		}

		return delegaionList;
	}
	
	@Override
	public List<Delegation> getDelegationsBysIds(List<String> delegationIds) {
		MapSqlParameterSource params = null;
		List<Delegation> delegaionList = Collections.emptyList();
		StringBuilder query = null;
		if (null == delegationIds) return null;

		try {
			query = new StringBuilder().append(
					"SELECT NOM_N,NOM_USER_I,PER_AUTHRUSER_I,NOM_ACCESSTP_C,TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM ,TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,D.FAC_C,INITCAP(FAC.FAC_T) AS FAC_NAME,D.DEPT_C,INITCAP(DEPT.DEPT_T2) AS DEPT_NAME ")
					.append("FROM PRS_NOMINEE D ")
					.append("LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C ")
					.append("LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C ")
					.append("WHERE 1=1 ")
					.append("AND D.DEFUNCT_F != 'Y' ")
					.append("AND D.NOM_N IN (:delegationIds) ");

			params = new MapSqlParameterSource().addValue("delegationIds", delegationIds);
 	
			delegaionList = this.prsNamedJdbcTemplate.query(query.toString(), params, new RowMapper<Delegation>() {
				@Override
				public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					Delegation delegation = null;

					delegation = new Delegation();

					delegation.setId(rs.getString("NOM_N"));
					delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
					delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

					delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
					Faculty fac = new Faculty();
					fac.setFaculty(rs.getString("FAC_C"));
					fac.setDescription(rs.getString("FAC_NAME"));
					delegation.setFaculty(fac);
					Department dept = new Department();
					dept.setDepartment(rs.getString("DEPT_C"));
					dept.setDescription(rs.getString("DEPT_NAME"));
					delegation.setDepartment(dept);

					delegation.setDurationStartDate(
							LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
					delegation.setDurationEndDate(
							LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

					return delegation;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_DAO_FAIL);
		} finally {
			params = null;
			query = null;
		}
		if (CollectionUtils.isNotEmpty(delegaionList)) {
			delegaionList = delegaionList.stream()
					.filter(item -> null != item && null != item.getId())
					.collect(Collectors.toList());
		}

		return delegaionList;
	}
	
	@Override
	public boolean isDelegateEngaged(Set<String> userIds) {
		if (CollectionUtils.isEmpty(userIds)) {
			return false;
		}

		String sql = "SELECT COUNT(1) AS CNT FROM PRS_APPV_STS, PRS_PURCHASE_REQ WHERE PRS_APPV_STS.PR_N = PRS_PURCHASE_REQ.PR_N " + 
				"AND PRS_PURCHASE_REQ.REQ_STS_C IN ('REQ_STS_PENDING_APPROVAL_RO','REQ_STS_PENDING_APPROVAL_1','REQ_STS_PENDING_APPROVAL_2') " + 
				"AND APPV_USER_I IN (:userId) AND APPV_STS_C IN ('APPV_STS_PENDING')";
		Integer cnt = this.prsNamedJdbcTemplate.queryForObject(sql, new MapSqlParameterSource(
				"userId", userIds), Integer.class);

		return cnt != null && cnt > 0;
	}
	
	@Override
	public List<Delegation> getDelegatesOfApprover(String staffNo, String facultyCode, String departmentCode, Role role) {
		logger.info("getDelegatesOfApprover");
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		
		StringBuilder query = new StringBuilder( 
				"SELECT NOM_N, \n"+
						"NOM_USER_I, \n"+
						"PER_AUTHRUSER_I, \n"+
						"NOM_ACCESSTP_C, \n"+
						"TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM, \n"+
						"TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM, \n"+
						"D.FAC_C, \n"+
						"INITCAP(FAC.FAC_T) AS FAC_NAME, \n"+
						"D.DEPT_C, \n"+
						"INITCAP(DEPT.DEPT_T2) AS DEPT_NAME \n"+
						"FROM PRS_NOMINEE D \n"+
						"LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C \n"+
						"LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C \n"+
						"WHERE 1=1 \n"+
						"AND D.DEFUNCT_F != 'Y' \n"+
						"AND PER_AUTHRUSER_I = :userId  \n"+
						"AND NOM_ACCESSTP_C = :roleCode \n"+
						"AND TRUNC(D.ST_DTM) <= TRUNC(SYSDATE) \n"+
						"AND TRUNC(D.END_DTM) >= TRUNC(SYSDATE)"
					);

				params.addValue("userId", staffNo);
				params.addValue("roleCode", role != null ? role.toString() : null);
				
		
				switch(role) {
					case ROLE_DEAN:
						query.append("AND D.FAC_C = :facultyCode \n ");
						params.addValue("facultyCode", facultyCode);
						break;
					case ROLE_VICE_PRESIDENT:
						query.append("AND D.DEPT_C = :departmentCode ");
						params.addValue("departmentCode", departmentCode);
						break;
					default:
						query.append("AND D.FAC_C = :facultyCode \n ");
						query.append("AND D.DEPT_C = :departmentCode ");
						params.addValue("facultyCode", facultyCode);
						params.addValue("departmentCode", departmentCode);
						break;
				}
				
				return this.prsNamedJdbcTemplate.query(
				query.toString(),
				params,
				new RowMapper<Delegation>() {
					@Override
					public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					
						Delegation delegation = new Delegation();

						delegation.setId(rs.getString("NOM_N"));
						delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
						delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

						delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
						Faculty fac = new Faculty();
						fac.setFaculty(rs.getString("FAC_C"));
						fac.setDescription(rs.getString("FAC_NAME"));
						delegation.setFaculty(fac);
						Department dept = new Department();
						dept.setDepartment(rs.getString("DEPT_C"));
						dept.setDescription(rs.getString("DEPT_NAME"));
						delegation.setDepartment(dept);

						delegation.setDurationStartDate(
								LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
						delegation.setDurationEndDate(
								LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

						logger.info(delegation.toString());
						return delegation;
					}
				}
				
        );
		
	}

	@Override
	public List<User> getDelegatedUserAccessForUser(String staffNo) {
		return this.prsJdbcTemplate.query(
				"SELECT\n" +
					"    DISTINCT nm.nom_accesstp_c, nm.per_authruser_i, \n" +
					"    d.dept_c, INITCAP(d.dept_t2) AS dept_t2,\n" +
					"    f.fac_c, INITCAP(f.fac_t) AS fac_t\n" +
					"FROM\n" +
					"    prs_nominee nm\n" +
					"    JOIN faculty f ON nm.fac_c = f.fac_c\n" +
					"    JOIN department d ON nm.dept_c = d.dept_c\n" +
					"WHERE\n" +
					"    nm.nom_user_i = ?\n" +
					"    AND nm.defunct_f = 'N'\n" +
					"    AND TRUNC(nm.st_dtm) <= TRUNC(SYSDATE) \n" +
					"    AND TRUNC(nm.end_dtm) >= TRUNC(SYSDATE)",
				this::delegatedUserAccessRowMapper,
				staffNo
		);
	}

	User delegatedUserAccessRowMapper(ResultSet rs, int i) throws SQLException {
		Department d = new Department();
		d.setDepartment(rs.getString("dept_c"));
		d.setDescription(rs.getString("dept_t2"));

		Faculty f = new Faculty();
		f.setFaculty(rs.getString("fac_c"));
		f.setDescription(rs.getString("fac_t"));
		f.setDepartments(Collections.singletonList(d));

		UserAccess ua = new UserAccess();
		ua.setRole(Role.valueOf(rs.getString("nom_accesstp_c")));
		ua.setFaculty(f);

		User user = new User();
		user.setUserNo(rs.getString("per_authruser_i"));
		user.setUserAccesses(Collections.singletonList(ua));

		return user;
	}

	@Override
	public List<Delegation> getApproversOfDelegate(String userId, String facultyCode, String departmentCode,
			Role role) {
		
		logger.info("getApproversOfDelegate");
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("userId", userId);
		params.addValue("roleCode", role != null ? role.toString() : null);
		params.addValue("facultyCode", facultyCode);
		params.addValue("departmentCode", departmentCode);
		
		return this.prsNamedJdbcTemplate.query(
				"SELECT NOM_N, "
				+ "NOM_USER_I,"
				+ "PER_AUTHRUSER_I,"
				+ "NOM_ACCESSTP_C,"
				+ "TO_CHAR(ST_DTM, 'dd/mm/yyyy') AS ST_DTM,"
				+ "TO_CHAR(END_DTM, 'dd/mm/yyyy') AS END_DTM,"
				+ "D.FAC_C,"
				+ "INITCAP(FAC.FAC_T) AS FAC_NAME,"
				+ "D.DEPT_C,"
				+ "INITCAP(DEPT.DEPT_T2) AS DEPT_NAME "+
				"FROM PRS_NOMINEE D \n"+
				"LEFT JOIN FACULTY FAC ON D.FAC_C = FAC.FAC_C \n"+
				"LEFT JOIN DEPARTMENT DEPT ON D.DEPT_C = DEPT.DEPT_C \n"+
				"WHERE 1=1 \n"+
				"AND D.DEFUNCT_F != 'Y' \n"+
				"AND NOM_USER_I = :userId  \n"+
				"AND NOM_ACCESSTP_C = :roleCode \n"+
				"AND D.FAC_C = :facultyCode \n"+
				"AND D.DEPT_C = :departmentCode",
				params,
				new RowMapper<Delegation>() {
					@Override
					public Delegation mapRow(ResultSet rs, int rowNum) throws SQLException {
					
						Delegation delegation = new Delegation();

						delegation.setId(rs.getString("NOM_N"));
						delegation.setDelegateStaffNumber(rs.getString("NOM_USER_I"));
						delegation.setApproverStaffNumber(rs.getString("PER_AUTHRUSER_I"));

						delegation.setRole(Role.valueOf(rs.getString("NOM_ACCESSTP_C")));
						Faculty fac = new Faculty();
						fac.setFaculty(rs.getString("FAC_C"));
						fac.setDescription(rs.getString("FAC_NAME"));
						delegation.setFaculty(fac);
						Department dept = new Department();
						dept.setDepartment(rs.getString("DEPT_C"));
						dept.setDescription(rs.getString("DEPT_NAME"));
						delegation.setDepartment(dept);

						delegation.setDurationStartDate(
								LocalDate.parse(rs.getString("ST_DTM"), DelegateModelMapper.formatter));
						delegation.setDurationEndDate(
								LocalDate.parse(rs.getString("END_DTM"), DelegateModelMapper.formatter));

						logger.info(delegation.toString());
						return delegation;
					}
				}
				
        );
		
	}
}
