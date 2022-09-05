package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.aorapprover.AorApprover;
import sg.edu.nus.prs.domain.user.AorApproverSearchForm;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.Constants;

@Repository
public class AorApproverDAOImpl extends BaseDAOImpl implements AorApproverDAO {

	private static final Logger logger = LoggerFactory.getLogger(AorApproverDAOImpl.class);
	
	@Override
	public Map<String, String> saveAorApprover(AorApprover aorApprover, String currentLoggedInStaffNumber) {
		if (null == aorApprover || null == aorApprover.getFaculty() || null == aorApprover.getFaculty().getFaculty()
			|| null == aorApprover.getDepartment() || null == aorApprover.getDepartment().getDepartment()
			|| null == currentLoggedInStaffNumber || StringUtils.isEmpty(currentLoggedInStaffNumber)) {
			return Map.of(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
		}

		Map<String, String> returnMap = new HashMap<>();

		try {
			String facultyCode = aorApprover.getFaculty().getFaculty();
			String departmentCode = aorApprover.getDepartment().getDepartment();

			String query = "INSERT INTO PRS_AOR_APPVR (\n" +
					"    AOR_APPVR_N, FAC_C, DEPT_C, REC_UPDUSER_I, REC_UPD_DTM\n" +
					")\n" +
					"VALUES (\n" +
					"    PRS_AOR_APPVR_SEQ.NEXTVAL,\n" +
					"    :facultyCode,\n" +
					"    :departmentCode,\n" +
					"    :recordUpdatedByUser,\n" +
					"    SYSDATE\n" +
					")";

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("facultyCode", facultyCode);
			params.addValue("departmentCode", departmentCode);
			params.addValue("recordUpdatedByUser", currentLoggedInStaffNumber);

			KeyHolder keyHolder = new GeneratedKeyHolder();
			prsNamedJdbcTemplate.update(query, params, keyHolder, new String[]{"AOR_APPVR_N"} );
			if (CollectionUtils.isNotEmpty(keyHolder.getKeyList())) {
				Map<String, Object>keyHolderMap = keyHolder.getKeyList().get(0);
				if (null != keyHolderMap && keyHolderMap.containsKey("AOR_APPVR_N")) {
					String aorAppvrN = keyHolderMap.get("AOR_APPVR_N").toString();
					returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
					returnMap.put(Constants.KEY_RESPONSE, aorAppvrN);
				}
			} else {
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			}

		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("AorApproverDAOImpl::saveAorApprover>> "+e.getMessage());
		}

		return returnMap;
	}

	@Override
	public Map<String, String> checkExistenceByFacultyCodeDepartmentCode(String facultyCode, String departmentCode) {
		Map<String, String> returnMap = new HashMap<>();

		try {
			if (StringUtils.isEmpty(facultyCode) || StringUtils.isEmpty(departmentCode)) {
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				StringBuilder query = new StringBuilder();
				MapSqlParameterSource params = new MapSqlParameterSource();

				query.append(" SELECT ");
					query.append(" COUNT(A1.AOR_APPVR_N) AS NUMBER_OF_ROWS ");
				query.append(" FROM ");
					query.append(" PRS_AOR_APPVR A1 ");
				query.append(" WHERE ");
					query.append(" 1 = 1 ");

				if (StringUtils.isNotEmpty(facultyCode)) {
					query.append(" AND A1.FAC_C = :facultyCode ");
					params.addValue("facultyCode", facultyCode);
				}
				if (StringUtils.isNotEmpty(departmentCode)) {
					query.append(" AND A1.DEPT_C = :departmentCode ");
					params.addValue("departmentCode", departmentCode);
				}
				
				Long numberOfRow = prsNamedJdbcTemplate.queryForObject(query.toString(), params,  Long.class);
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
				if (numberOfRow != null && numberOfRow > 0) {
					returnMap.put(Constants.KEY_RESPONSE, Constants.VALUE_CHECKEXISTENCE_PRESENT);
				} else {
					returnMap.put(Constants.KEY_RESPONSE, Constants.VALUE_CHECKEXISTENCE_ABSENT);
				}
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("AorApproverDAOImpl::checkExistenceByFacultyCodeDepartmentCode>> "+e.getMessage());
		}
		return returnMap;
	}

	@Override
	public Map<String, String> deleteAorApprover(List<String> aorApproverIds) {
		Map<String, String> returnMap = new HashMap<>();
		MapSqlParameterSource params = new MapSqlParameterSource();
		String queryStr = null;
		try {
			if (CollectionUtils.isEmpty(aorApproverIds)) {
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				queryStr = "DELETE FROM PRS_AOR_APPVR A1 WHERE A1.AOR_APPVR_N IN (:aorApproverIds ) ";
				params.addValue("aorApproverIds", aorApproverIds);
				prsNamedJdbcTemplate.update(queryStr, params);
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("AorApproverDAOImpl::deleteAorApprover>> "+e.getMessage());
		} finally {
			params = null;
			queryStr = null;
		}
		return returnMap;
	}

	@Override
	public PagedData<AorApprover> searchAorApprover(AorApproverSearchForm input) {
		PagedData<AorApprover> searchedAorApprovers = null;
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		try {
			if (null == input) {
				throw new IllegalArgumentException("Aor Approver Search Input is required.");
			} else {
				query.append(" SELECT ");
					query.append(" A1.AOR_APPVR_N, A1.FAC_C, A2.FAC_T, A1.DEPT_C, A3.DEPT_T2 ");
				query.append(" FROM ");
					query.append(" PRS_AOR_APPVR A1 ");
				query.append(" INNER JOIN ");
					query.append(" IISDBM.FACULTY A2 ON A1.FAC_C = A2.FAC_C ");
				query.append(" INNER JOIN ");
					query.append(" IISDBM.DEPARTMENT A3 ON A1.DEPT_C = A3.DEPT_C ");
				query.append(" WHERE ");
					query.append(" 1 = 1 ");
				
				if (StringUtils.isNotEmpty(input.getFaculty())) {
					query.append(" AND A1.FAC_C = :facultyCode ");
					params.addValue("facultyCode", input.getFaculty());
				}
				if (CollectionUtils.isNotEmpty(input.getDepartments())) {
					query.append(" AND A1.DEPT_C IN (:departmentCode) ");
					params.addValue("departmentCode", input.getDepartments());
				}
				searchedAorApprovers = applyWithPagingAndSorting(input, query.toString(), params, this::aorApproverRowMapper);
			}
		} catch (Exception e) {
			logger.error("AorApproverDAOImpl::searchAorApprover>> "+e.getMessage());
			throw new RuntimeException("AorApproverDAOImpl::searchAorApprover.");
		} finally {
			params = null;
			query = null;
		}
		return searchedAorApprovers;
	}

	public AorApprover aorApproverRowMapper (ResultSet rs, int i) throws SQLException {
		AorApprover aorApprover = new AorApprover();
		
		aorApprover.setAorApproverId(rs.getString("AOR_APPVR_N"));
		
		Faculty faculty = new Faculty();
		faculty.setFaculty(rs.getString("FAC_C"));
		faculty.setDescription(rs.getString("FAC_T"));
		aorApprover.setFaculty(faculty);
		
		Department department = new Department();
		department.setDepartment(rs.getString("DEPT_C"));
		department.setDescription(rs.getString("DEPT_T2"));
		aorApprover.setDepartment(department);
		
		return aorApprover;
	}

	@Override
	public AorApprover loadAorApprover(String aorApproverId) {
		AorApprover aorApprover = new AorApprover();
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		try {
			if (StringUtils.isEmpty(aorApproverId)) {
				throw new IllegalArgumentException("Aor Approver id is required.");
			} else {
				query.append(" SELECT ");
					query.append(" A1.AOR_APPVR_N, A1.FAC_C, A1.DEPT_C, F.FAC_T, D.DEPT_T2 ");
				query.append(" FROM ");
					query.append(" PRS_AOR_APPVR A1 ");
					query.append(" LEFT JOIN FACULTY F ON F.FAC_C = A1.FAC_C ");
					query.append(" LEFT JOIN DEPARTMENT D ON D.DEPT_C = A1.DEPT_C ");
				query.append(" WHERE ");
					query.append(" A1.AOR_APPVR_N = :aorApproverId ");
					query.append(" AND (D.DEFUNCT_F IS NULL OR D.DEFUNCT_F <> 'Y') ");
					query.append(" AND (F.DEFUNCT_F IS NULL OR F.DEFUNCT_F <> 'Y') ");
					

				params.addValue("aorApproverId", aorApproverId);
				
				aorApprover = this.prsNamedJdbcTemplate.queryForObject(query.toString(), params,  new RowMapper<AorApprover>() {
					@Override
					public AorApprover mapRow(ResultSet rs, int rowNum) throws SQLException {
						AorApprover mapperAorApprover = new AorApprover();
						mapperAorApprover.setAorApproverId(rs.getString("AOR_APPVR_N"));
						
						Faculty faculty = new Faculty();
						faculty.setFaculty(rs.getString("FAC_C"));
						faculty.setDescription(rs.getString("FAC_T"));
						mapperAorApprover.setFaculty(faculty);
						
						Department department = new Department();
						department.setDepartment(rs.getString("DEPT_C"));
						department.setDescription(rs.getString("DEPT_T2"));
						mapperAorApprover.setDepartment(department);
						
						return mapperAorApprover;
					}
				});
			}
		} catch (EmptyResultDataAccessException  e) {
			aorApprover = null;
		} catch (Exception e) {
			logger.error("AorApproverDAOImpl::loadAorApprover>> "+e.getMessage());
			throw new RuntimeException("AorApproverDAOImpl::loadAorApprover.");
		} finally {
			params = null;
			query = null;
		}
		return aorApprover;
	}

	@Override
	public boolean isAorApproverSetForDepartment(String departmentCode) {
		Integer count = this.prsJdbcTemplate.queryForObject(
				"SELECT COUNT(AOR_APPVR_N) FROM PRS_AOR_APPVR WHERE DEPT_C = ? ",
				Integer.class,
				departmentCode
		);

		return (count != null) && count > 0;
	}
}
