package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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

import sg.edu.nus.prs.domain.fixeddeliveryaddress.FixedDeliveryAddress;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.FixedDeliveryAddressSearchForm;
import sg.edu.nus.prs.domain.util.PagedData;
import sg.edu.nus.prs.util.Constants;

@Repository
public class FixedDeliveryAddressDAOImpl extends BaseDAOImpl implements FixedDeliveryAddressDAO {

	private static final Logger logger = LoggerFactory.getLogger(FixedDeliveryAddressDAOImpl.class);
	
	@Override
	public Map<String, String> saveFixedDeliveryAddress(FixedDeliveryAddress fixedDeliveryAddress, String currentLoggedInStaffNumber) {
		Map<String, String> returnMap = new HashMap<>();
		String fixDelvAddrN = null;
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		KeyHolder keyHolder = new GeneratedKeyHolder();
		Map<String, Object> keyHolderMap = null;
		String facultyCode = null;
		String departmentCode = null;
		String deliveryAddress = null;
		Map<String, String> checkExistence = null;
		try {
			if (null == fixedDeliveryAddress || null == fixedDeliveryAddress.getFaculty() || null == fixedDeliveryAddress.getFaculty().getFaculty()
				|| null == fixedDeliveryAddress || null == fixedDeliveryAddress.getDepartment() || null == fixedDeliveryAddress.getDepartment().getDepartment()
				|| StringUtils.isEmpty(fixedDeliveryAddress.getDeliveryAddress())
				|| null == currentLoggedInStaffNumber || StringUtils.isEmpty(currentLoggedInStaffNumber)) {
				
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				facultyCode = fixedDeliveryAddress.getFaculty().getFaculty();
				departmentCode = fixedDeliveryAddress.getDepartment().getDepartment();
				deliveryAddress = fixedDeliveryAddress.getDeliveryAddress().trim();
				checkExistence = checkExistenceByFacultyCodeDepartmentCode(facultyCode, departmentCode);
				if ( null != checkExistence ) {
					if (checkExistence.containsKey(Constants.KEY_STATUS) && checkExistence.get(Constants.KEY_STATUS).equals(Constants.VALUE_STATUS_SUCCESS)) {
						if (checkExistence.containsKey(Constants.KEY_RESPONSE) && checkExistence.get(Constants.KEY_RESPONSE).equals(Constants.VALUE_CHECKEXISTENCE_ABSENT)) {
							query.append(" INSERT INTO PRS_DELVADDR_CONFIG ");
								query.append(" ( ");
									query.append(" DELVADDR_CONFIG_N, FAC_C, DEPT_C, DELV_ADDR_T, REC_UPDUSER_I, REC_UPD_DTM ");
								query.append(" ) ");
							query.append(" VALUES ");
								query.append(" ( ");
									query.append(" PRS_DELVADDR_CONFIG_SEQ.NEXTVAL, ");
									query.append(" :facultyCode, ");
									query.append(" :departmentCode, ");
									query.append(" :deliveryAddress, ");
									query.append(" :recordUpdatedByUser, ");
									query.append(" SYSDATE ");
								query.append(" ) ");
							
							params.addValue("facultyCode", facultyCode);
							params.addValue("departmentCode", departmentCode);
							params.addValue("deliveryAddress", deliveryAddress );
							params.addValue("recordUpdatedByUser", currentLoggedInStaffNumber);
							
							keyHolder = new GeneratedKeyHolder();
							prsNamedJdbcTemplate.update( query.toString(), params, keyHolder, new String[]{"DELVADDR_CONFIG_N"} );
							if (null != keyHolder && CollectionUtils.isNotEmpty(keyHolder.getKeyList())) {
								keyHolderMap = keyHolder.getKeyList().get(0);
								if (null != keyHolderMap && keyHolderMap.containsKey("DELVADDR_CONFIG_N")) {
									fixDelvAddrN = keyHolderMap.get("DELVADDR_CONFIG_N").toString();
									returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
									returnMap.put(Constants.KEY_RESPONSE, fixDelvAddrN);
								}
							} else {
								returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
							}
						} else if (checkExistence.containsKey(Constants.KEY_RESPONSE) && checkExistence.get(Constants.KEY_RESPONSE).equals(Constants.VALUE_CHECKEXISTENCE_PRESENT)) {
							returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_BUSINESS_ERROR);
						}
					} else {
						returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
					}
				} else {
					returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
				}
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("FixedDeliveryAddressDAOImpl::saveFixedDeliveryAddress>> "+e.getMessage());
		} finally {
			fixDelvAddrN = null;
			params = null;
			query = null;
			keyHolder = null;
			keyHolderMap = null;
			facultyCode = null;
			departmentCode = null;
			checkExistence = null;
		}
		return returnMap;
	}

	@Override
	public Map<String, String> checkExistenceByFacultyCodeDepartmentCode(String facultyCode, String departmentCode) {
		Map<String, String> returnMap = new HashMap<>();
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		Long numberOfRow = null;
		try {
			if (StringUtils.isEmpty(facultyCode) || StringUtils.isEmpty(departmentCode)) {
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				query.append(" SELECT ");
					query.append(" COUNT(A1.DELVADDR_CONFIG_N) AS NUMBER_OF_ROWS ");
				query.append(" FROM ");
					query.append(" PRS_DELVADDR_CONFIG A1 ");
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
				
				numberOfRow = this.prsNamedJdbcTemplate.queryForObject(query.toString(), params,  new RowMapper<Long>() {
					@Override
					public Long mapRow(ResultSet rs, int rowNum) throws SQLException {
						return rs.getLong("NUMBER_OF_ROWS");
					}
				});
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
				if (numberOfRow > 0) {
					returnMap.put(Constants.KEY_RESPONSE, Constants.VALUE_CHECKEXISTENCE_PRESENT);
				} else {
					returnMap.put(Constants.KEY_RESPONSE, Constants.VALUE_CHECKEXISTENCE_ABSENT);
				}
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("FixedDeliveryAddressDAOImpl::checkExistenceByFacultyCodeDepartmentCode>> "+e.getMessage());
		} finally {
			params = null;
			query = null;
		}
		return returnMap;
	}

	@Override
	public Map<String, String> deleteFixedDeliveryAddress(List<String> fixedDeliveryAddressIds) {
		Map<String, String> returnMap = new HashMap<>();
		MapSqlParameterSource params = new MapSqlParameterSource();
		String queryStr = null;
		try {
			if (CollectionUtils.isEmpty(fixedDeliveryAddressIds)) {
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				queryStr = "DELETE FROM PRS_DELVADDR_CONFIG A1 WHERE A1.DELVADDR_CONFIG_N IN (:fixedDeliveryAddressIds ) ";
				params.addValue("fixedDeliveryAddressIds", fixedDeliveryAddressIds);
				this.prsNamedJdbcTemplate.update(queryStr, params);
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("FixedDeliveryAddressDAOImpl::deleteFixedDeliveryAddress>> "+e.getMessage());
		} finally {
			params = null;
			queryStr = null;
		}
		return returnMap;
	}

	@Override
	public PagedData<FixedDeliveryAddress> searchFixedDeliveryAddress(FixedDeliveryAddressSearchForm input) {
		PagedData<FixedDeliveryAddress> searchedFixedDeliveryAddress = null;
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		try {
			if (null == input) {
				throw new IllegalArgumentException("Fixed Delivery Address Search Input is required.");
			} else {
				query.append(" SELECT ");
					query.append(" A1.DELVADDR_CONFIG_N, A1.FAC_C, A2.FAC_T, A1.DEPT_C, A3.DEPT_T2, A1.DELV_ADDR_T ");
				query.append(" FROM ");
					query.append(" PRS_DELVADDR_CONFIG A1 ");
				query.append(" INNER JOIN ");
					query.append(" IISDBM.FACULTY A2 ON A1.FAC_C = A2.FAC_C ");
				query.append(" INNER JOIN ");
					query.append(" IISDBM.DEPARTMENT A3 ON A1.DEPT_C = A3.DEPT_C ");
				query.append(" WHERE ");
					query.append(" 1 = 1 ");
				
				if (CollectionUtils.isNotEmpty(input.getFaculties())) {
					query.append(" AND A1.FAC_C IN (:facultyCodes) ");
					params.addValue("facultyCodes", input.getFaculties());
				}
				if (CollectionUtils.isNotEmpty(input.getDepartments())) {
					query.append(" AND A1.DEPT_C IN (:departmentCode) ");
					params.addValue("departmentCode", input.getDepartments());
				}
				
				if (StringUtils.isNotEmpty(input.getDeliveryAddress())) {
					query.append(" AND UPPER(A1.DELV_ADDR_T) LIKE :address ");
					params.addValue("address", "%" + input.getDeliveryAddress().toUpperCase() + "%");
				}
				searchedFixedDeliveryAddress = applyWithPagingAndSorting(input, query.toString(), params, this::fixedDeliveryAddressRowMapper);
			}
		} catch (Exception e) {
			logger.error("FixedDeliveryAddressDAOImpl::searchFixedDeliveryAddress>> "+e.getMessage());
			throw new RuntimeException("FixedDeliveryAddressDAOImpl::searchFixedDeliveryAddress.");
		} finally {
			params = null;
			query = null;
		}
		return searchedFixedDeliveryAddress;
	}

	private FixedDeliveryAddress fixedDeliveryAddressRowMapper (ResultSet rs, int i) throws SQLException {
		FixedDeliveryAddress fixedDeliveryAddress = new FixedDeliveryAddress();
		
		fixedDeliveryAddress.setFixedDeliveryAddressId(rs.getString("DELVADDR_CONFIG_N"));
		
		Faculty faculty = new Faculty();
		faculty.setFaculty(rs.getString("FAC_C"));
		faculty.setDescription(rs.getString("FAC_T"));
		fixedDeliveryAddress.setFaculty(faculty);
		
		Department department = new Department();
		department.setDepartment(rs.getString("DEPT_C"));
		department.setDescription(rs.getString("DEPT_T2"));
		fixedDeliveryAddress.setDepartment(department);
		
		fixedDeliveryAddress.setDeliveryAddress(rs.getString("DELV_ADDR_T"));
		
		return fixedDeliveryAddress;
	}

	@Override
	public FixedDeliveryAddress loadFixedDeliveryAddress(String fixedDeliveryAddressId) {
		FixedDeliveryAddress fixedDeliveryAddress = new FixedDeliveryAddress();
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		try {
			if (StringUtils.isEmpty(fixedDeliveryAddressId)) {
				throw new IllegalArgumentException("Fixed Delivery Address id is required.");
			} else {
				query.append(" SELECT ");
					query.append(" A1.DELVADDR_CONFIG_N, A1.FAC_C, A1.DEPT_C, F.FAC_T, D.DEPT_T2, A1.DELV_ADDR_T ");
				query.append(" FROM ");
					query.append(" PRS_DELVADDR_CONFIG A1 ");
					query.append(" INNER JOIN FACULTY F ON F.FAC_C = A1.FAC_C ");
					query.append(" INNER JOIN DEPARTMENT D ON D.DEPT_C = A1.DEPT_C ");
				query.append(" WHERE ");
					query.append(" A1.DELVADDR_CONFIG_N = :fixedDeliveryAddressId ");
					query.append(" AND (D.DEFUNCT_F IS NULL OR D.DEFUNCT_F <> 'Y') ");
					query.append(" AND (F.DEFUNCT_F IS NULL OR F.DEFUNCT_F <> 'Y') ");
					

				params.addValue("fixedDeliveryAddressId", fixedDeliveryAddressId);
				
				fixedDeliveryAddress = this.prsNamedJdbcTemplate.queryForObject(query.toString(), params,  new RowMapper<FixedDeliveryAddress>() {
					@Override
					public FixedDeliveryAddress mapRow(ResultSet rs, int rowNum) throws SQLException {
						FixedDeliveryAddress mapperObject = new FixedDeliveryAddress();
						mapperObject.setFixedDeliveryAddressId(rs.getString("DELVADDR_CONFIG_N"));
						
						Faculty faculty = new Faculty();
						faculty.setFaculty(rs.getString("FAC_C"));
						faculty.setDescription(rs.getString("FAC_T"));
						mapperObject.setFaculty(faculty);
						
						Department department = new Department();
						department.setDepartment(rs.getString("DEPT_C"));
						department.setDescription(rs.getString("DEPT_T2"));
						mapperObject.setDepartment(department);
						
						mapperObject.setDeliveryAddress(rs.getString("DELV_ADDR_T"));
						
						return mapperObject;
					}
				});
			}
		} catch (EmptyResultDataAccessException  e) {
			fixedDeliveryAddress = null;
		} catch (Exception e) {
			logger.error("FixedDeliveryAddressDAOImpl::loadFixedDeliveryAddress>> "+e.getMessage());
			throw new RuntimeException("FixedDeliveryAddressDAOImpl::loadFixedDeliveryAddress.");
		} finally {
			params = null;
			query = null;
		}
		return fixedDeliveryAddress;
	}

	@Override
	public Map<String, String> editFixedDeliveryAddress(FixedDeliveryAddress fixedDeliveryAddress, String currentLoggedInStaffNumber) {
		Map<String, String> returnMap = new HashMap<>();
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		String fixedDeliveryAddressId = null;
		String deliveryAddress = null;
		int status = 0;
		try {
			if (null == fixedDeliveryAddress 
				|| StringUtils.isEmpty(fixedDeliveryAddress.getFixedDeliveryAddressId())
				|| StringUtils.isEmpty(fixedDeliveryAddress.getDeliveryAddress())
				|| null == currentLoggedInStaffNumber || StringUtils.isEmpty(currentLoggedInStaffNumber)) {
				
				returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			} else {
				fixedDeliveryAddressId = fixedDeliveryAddress.getFixedDeliveryAddressId();
				deliveryAddress = fixedDeliveryAddress.getDeliveryAddress().trim();
				query.append(" UPDATE ");
					query.append(" PRS_DELVADDR_CONFIG A1 ");
				query.append(" SET ");
					query.append(" A1.DELV_ADDR_T = :deliveryAddress, ");
					query.append(" A1.REC_UPDUSER_I = :currentLoggedInStaffNumber, ");
					query.append(" A1.REC_UPD_DTM = SYSDATE ");
				query.append(" WHERE ");
					query.append(" A1.DELVADDR_CONFIG_N = :fixedDeliveryAddressId ");
				
				params.addValue("deliveryAddress", deliveryAddress );
				params.addValue("currentLoggedInStaffNumber", currentLoggedInStaffNumber);
				params.addValue("fixedDeliveryAddressId", fixedDeliveryAddressId);
				status = prsNamedJdbcTemplate.update(query.toString(), params);
				
				if(status <= 0){
					returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
		        } else {
		        	returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_SUCCESS);
		        }
			}
		} catch (Exception e) {
			returnMap.put(Constants.KEY_STATUS, Constants.VALUE_STATUS_ERROR);
			logger.error("FixedDeliveryAddressDAOImpl::editFixedDeliveryAddress>> "+e.getMessage());
		} finally {
			params = null;
			query = null;
			fixedDeliveryAddressId = null;
			deliveryAddress = null;
		}
		return returnMap;
	}

	@Override
	public List<String> getExistingDepartments(String faculty, List<String> departments) {
		List<String> returnDepartmentNames = new ArrayList<>();
		MapSqlParameterSource params = new MapSqlParameterSource();
		StringBuilder query = new StringBuilder();
		try {
			if (StringUtils.isEmpty(faculty) || CollectionUtils.isEmpty(departments)) {
				throw new IllegalArgumentException("Fixed Delivery Address id is required.");
			} else {
				query.append(" SELECT ");
					query.append(" D.DEPT_T2 ");
				query.append(" FROM ");
					query.append(" PRS_DELVADDR_CONFIG A1 ");
					query.append(" INNER JOIN FACULTY F ON F.FAC_C = A1.FAC_C ");
					query.append(" INNER JOIN DEPARTMENT D ON D.DEPT_C = A1.DEPT_C ");
				query.append(" WHERE ");
					query.append(" A1.FAC_C = :faculty ");
					query.append(" AND A1.DEPT_C IN ( :departments ) ");
					query.append(" AND (D.DEFUNCT_F IS NULL OR D.DEFUNCT_F <> 'Y') ");
					query.append(" AND (F.DEFUNCT_F IS NULL OR F.DEFUNCT_F <> 'Y') ");
				
				params.addValue("faculty", faculty);
				params.addValue("departments", departments);
					
				returnDepartmentNames = this.prsNamedJdbcTemplate.query(query.toString(), params,  new RowMapper<String>() {
					@Override
					public String mapRow(ResultSet rs, int rowNum) throws SQLException {
						return rs.getString("DEPT_T2");
					}
				});
				
			}
		} catch (Exception e) {
			logger.error("FixedDeliveryAddressDAOImpl::getExistingDepartments>> "+e.getMessage());
			throw new RuntimeException("FixedDeliveryAddressDAOImpl::getExistingDepartments.");
		} finally {
			params = null;
			query = null;
		}
		return returnDepartmentNames;
	}
}
