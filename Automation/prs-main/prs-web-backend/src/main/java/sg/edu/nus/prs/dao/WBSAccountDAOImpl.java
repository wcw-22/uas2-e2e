package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.SourceSystemCode;
import sg.edu.nus.prs.domain.common.WBSAccount;
import sg.edu.nus.prs.domain.common.WBSAccountSearchInput;
import sg.edu.nus.prs.domain.purchase.RequestType;
import sg.edu.nus.prs.domain.purchase.WBSType;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.util.Constants;

@Repository
public class WBSAccountDAOImpl extends BaseDAOImpl implements WBSAccountDAO {
	
	@Override
	public List<WBSAccount> getWBSAccount(String accountNumber, List<String> supplierCodes) {
		if (accountNumber == null) {
			throw new IllegalArgumentException("Account Number is required.");
		}

		WBSAccountSearchInput searchInput = new WBSAccountSearchInput();
		searchInput.setAccountNumber(accountNumber);
		searchInput.setSupplierCodes(supplierCodes);

		return searchWBSAccounts(searchInput);
	}


	@Override
	public List<WBSAccount> searchWBSAccounts(WBSAccountSearchInput searchInput) {
		StringBuilder sql = new StringBuilder();
		sql.append("select ")
				.append("pw.WBS_N, pw.WBS_AC_N, pw.WBS_DESC_T, pw.CTRL_AREA_T, pw.COST_CTR_T, ")
				.append("pw.PI1_STF_N, pw.OFN_DEPT_C, pw.WBS_USERSTS_C, pw.WBS_ACTIV_F, ")
				.append("d.DEPT_C, d.SAP_DEPT_C, INITCAP(d.DEPT_T2) AS DEPT_T2, pw.WBS_TP_C ")
			.append("from PRS_WBS pw ")
			.append("left join DEPARTMENT d on concat('0',pw.OFN_DEPT_C) = d.SAP_DEPT_C ")
			.append("where nvl(pw.DEFUNCT_F, 'N') <> 'Y' and nvl(d.DEFUNCT_F, 'N') <> 'Y' ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		
		if (StringUtils.isNotEmpty(searchInput.getRequestType())
				&& (searchInput.getRequestType().equals(RequestType.REQ_TYPE_AOR.getDescription()) ||
						searchInput.getRequestType().equals(RequestType.REQ_TYPE_SQRR.getDescription()))) {
			sql.append("AND pw.WBS_TP_C = :srceSysC ");
			params.addValue("srceSysC", SourceSystemCode.SOURCE_SYSTEM_CODE_PO.getDescription());
		} else if (StringUtils.isNotEmpty(searchInput.getRequestType())
				&& searchInput.getRequestType().equals(RequestType.REQ_TYPE_PR.getDescription())
				&& CollectionUtils.isNotEmpty(searchInput.getSupplierCodes())) {
			sql.append("AND ( ")
					.append("((:distSuppCount = (select count(distinct(pis.SUPP_C)) from PRS_INTERNAL_STORE pis JOIN ")
					.append("PRSSUPPLIER ps on pis.SUPP_C=ps.SUPP_C where pis.SUPP_C in (:suppCodeList) and nvl(pis.DEFUNCT_F, 'N') <> 'Y' ")
					.append("and nvl(ps.DEFUNCT_F, 'N') <> 'Y' )) ").append("and pw.WBS_TP_C = :srceSysCJL) ")
					.append("OR ")
					.append("((:distSuppCount != (select count(distinct(pis.SUPP_C)) from PRS_INTERNAL_STORE pis JOIN ")
					.append("PRSSUPPLIER ps on pis.SUPP_C=ps.SUPP_C where pis.SUPP_C in (:suppCodeList) and nvl(pis.DEFUNCT_F, 'N') <> 'Y' ")
					.append("and nvl(ps.DEFUNCT_F, 'N') <> 'Y' )) ").append("and pw.WBS_TP_C = :srceSysCPO) ")
					.append(") ");
			params.addValue("srceSysCPO", SourceSystemCode.SOURCE_SYSTEM_CODE_PO.getDescription());
			params.addValue("srceSysCJL", SourceSystemCode.SOURCE_SYSTEM_CODE_JL.getDescription());
			params.addValue("distSuppCount", searchInput.getSupplierCodes().size());
			params.addValue("suppCodeList", searchInput.getSupplierCodes());
		}

		if (StringUtils.isNotEmpty(searchInput.getAccountNumber())) {
			sql.append(" AND pw.WBS_AC_N = :accountNumber ");
			params.addValue("accountNumber", searchInput.getAccountNumber());
		}

		if (CollectionUtils.isNotEmpty(searchInput.getPrincipalInvestigators())) {
			sql.append(" AND pw.PI1_STF_N IN (:piList) ");
			params.addValue("piList", searchInput.getPrincipalInvestigators());
		}

		if (CollectionUtils.isNotEmpty(searchInput.getDepartments())) {
			sql.append(" AND d.DEPT_C IN (:deptList) ");
			params.addValue("deptList", searchInput.getDepartments());
		}

		return prsNamedJdbcTemplate.query(sql.toString(), params, this::wbsAccountRowMapper);
	}
	
	WBSAccount wbsAccountRowMapper(ResultSet rs, int i) throws SQLException {
		WBSAccount wbsAccount = new WBSAccount();
		wbsAccount.setWbsId(rs.getString("WBS_N"));
		wbsAccount.setAccountNumber(rs.getString("WBS_AC_N"));
		wbsAccount.setDescription(rs.getString("WBS_DESC_T"));
		wbsAccount.setControllingArea(rs.getString("CTRL_AREA_T"));
		wbsAccount.setCostCenter(rs.getString("COST_CTR_T"));

		if (wbsAccount.getWBSAccountType() != WBSType.E || wbsAccount.getWBSAccountType() != WBSType.H) {
			// Ignore PI if type is C account.
			// Other accounts, get the PI value.
			wbsAccount.setPi1Id(rs.getString("PI1_STF_N"));
		}

		wbsAccount.setUserStatus(rs.getString("WBS_USERSTS_C"));
		wbsAccount.setOfnDepartment(rs.getString("OFN_DEPT_C"));
		wbsAccount.setActiveStatus(rs.getString("WBS_ACTIV_F"));
		wbsAccount.setSourceSystemCode(SourceSystemCode.getSourceSystemCode(rs.getString("WBS_TP_C")));
		
		Department department = new Department();
		department.setDepartment(rs.getString("DEPT_C"));
		department.setSapDepartment(rs.getString("SAP_DEPT_C"));
		department.setDescription(rs.getString("DEPT_T2"));
		wbsAccount.setDepartment(department);
		
		return wbsAccount;
	}
	
	
	/*
	// remove once the old dept codes won't be used in wbs table
	// Temp solution - Starts
	@Override
	public List<WBSAccount> searchWBSAccounts(WBSAccountSearchInput searchInput) {
		StringBuilder sql = new StringBuilder();
		sql.append("select ")
				.append("pw.WBS_N, pw.WBS_AC_N, pw.WBS_DESC_T, pw.CTRL_AREA_T, pw.COST_CTR_T, ")
				.append("pw.PI1_STF_N, pw.OFN_DEPT_C, pw.WBS_USERSTS_C, pw.WBS_ACTIV_F, pw.WBS_TP_C ")
			.append("from PRS_WBS pw ")
			.append("where nvl(pw.DEFUNCT_F, 'N') <> 'Y' ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		
		if (StringUtils.isNotEmpty(searchInput.getRequestType())
				&& (searchInput.getRequestType().equals(RequestType.REQ_TYPE_AOR.getDescription()) ||
						searchInput.getRequestType().equals(RequestType.REQ_TYPE_SQRR.getDescription()))) {
			sql.append("AND pw.WBS_TP_C = :srceSysC ");
			params.addValue("srceSysC", SourceSystemCode.SOURCE_SYSTEM_CODE_PO.getDescription());
		} else if (StringUtils.isNotEmpty(searchInput.getRequestType())
				&& searchInput.getRequestType().equals(RequestType.REQ_TYPE_PR.getDescription())
				&& CollectionUtils.isNotEmpty(searchInput.getSupplierCodes())) {
			sql.append("AND ( ")
					.append("((:distSuppCount = (select count(distinct(pis.SUPP_C)) from PRS_INTERNAL_STORE pis JOIN ")
					.append("PRSSUPPLIER ps on pis.SUPP_C=ps.SUPP_C where pis.SUPP_C in (:suppCodeList) and nvl(pis.DEFUNCT_F, 'N') <> 'Y' ")
					.append("and nvl(ps.DEFUNCT_F, 'N') <> 'Y' )) ").append("and pw.WBS_TP_C = :srceSysCJL) ")
					.append("OR ")
					.append("((:distSuppCount != (select count(distinct(pis.SUPP_C)) from PRS_INTERNAL_STORE pis JOIN ")
					.append("PRSSUPPLIER ps on pis.SUPP_C=ps.SUPP_C where pis.SUPP_C in (:suppCodeList) and nvl(pis.DEFUNCT_F, 'N') <> 'Y' ")
					.append("and nvl(ps.DEFUNCT_F, 'N') <> 'Y' )) ").append("and pw.WBS_TP_C = :srceSysCPO) ")
					.append(") ");
			params.addValue("srceSysCPO", SourceSystemCode.SOURCE_SYSTEM_CODE_PO.getDescription());
			params.addValue("srceSysCJL", SourceSystemCode.SOURCE_SYSTEM_CODE_JL.getDescription());
			params.addValue("distSuppCount", searchInput.getSupplierCodes().size());
			params.addValue("suppCodeList", searchInput.getSupplierCodes());
		}

		if (StringUtils.isNotEmpty(searchInput.getAccountNumber())) {
			sql.append(" AND pw.WBS_AC_N = :accountNumber ");
			params.addValue("accountNumber", searchInput.getAccountNumber());
		}

		if (CollectionUtils.isNotEmpty(searchInput.getPrincipalInvestigators())) {
			sql.append(" AND pw.PI1_STF_N IN (:piList) ");
			params.addValue("piList", searchInput.getPrincipalInvestigators());
		}

		List<WBSAccount> wbsAccounts = prsNamedJdbcTemplate.query(sql.toString(), params, this::wbsAccountRowMapper);
		List<WBSAccount> results = new ArrayList<>();
		
		if (CollectionUtils.isNotEmpty(wbsAccounts)) {
			
			Map<String, String> oldNewDeptMap = getDeptCodeMapping();
			
			MapSqlParameterSource deptParams = new MapSqlParameterSource();
			Map<String, Department> sapDeptMap = new HashMap<>();
			
			Set<String> sapDeptSet = wbsAccounts.stream()
					.filter(e -> StringUtils.isNotBlank(e.getOfnDepartment()))
					.map(e -> oldNewDeptMap.containsKey(e.getOfnDepartment()) ? 
							oldNewDeptMap.get(e.getOfnDepartment()) : e.getOfnDepartment())
					.map(e -> e.length() == 3 ? "0"+e : e)
					.collect(Collectors.toSet());
			
			StringBuilder sb = new StringBuilder("select d.DEPT_C, d.SAP_DEPT_C, INITCAP(d.DEPT_T2) AS DEPT_T2 \n")
					.append("from department d \n")
					.append("where nvl(d.DEFUNCT_F, 'N') <> 'Y' ");
			
			if (sapDeptSet != null) {
				sb.append("and d.SAP_DEPT_C in (:sapDeptSet) ");
				deptParams.addValue("sapDeptSet", sapDeptSet);
			}
			
			boolean strictDeptFilter = false;
			if (CollectionUtils.isNotEmpty(searchInput.getDepartments())) {
				sql.append(" AND d.DEPT_C IN (:deptList) ");
				params.addValue("deptList", searchInput.getDepartments());
				strictDeptFilter = true;
			}
			
			prsNamedJdbcTemplate.query(sb.toString(), deptParams, (rs, i) -> departmentRowMapper(rs, i, sapDeptMap));
			
			
			for (WBSAccount act : wbsAccounts) {
				if (StringUtils.isNotEmpty(act.getOfnDepartment())) {
					String deptCode = act.getOfnDepartment();
					if (oldNewDeptMap.containsKey(act.getOfnDepartment())) {
						deptCode = oldNewDeptMap.get(act.getOfnDepartment());
					}
					deptCode = deptCode.length() == 3 ? "0"+deptCode : deptCode;
					Department dept = sapDeptMap.get(deptCode);
					act.setDepartment(dept);
					results.add(act);
					
				} else if (!strictDeptFilter) {
					results.add(act);
				}
			}
			
		}
		
		return results;
	}
	
	Department departmentRowMapper(ResultSet rs, int i, Map<String, Department> sapDeptMap) throws SQLException {
		
		Department department = new Department();
		department.setDepartment(rs.getString("DEPT_C"));
		department.setSapDepartment(rs.getString("SAP_DEPT_C"));
		department.setDescription(rs.getString("DEPT_T2"));
		sapDeptMap.put(rs.getString("SAP_DEPT_C"), department);
		return department;
	}
	
	WBSAccount wbsAccountRowMapper(ResultSet rs, int i) throws SQLException {
		WBSAccount wbsAccount = new WBSAccount();
		wbsAccount.setWbsId(rs.getString("WBS_N"));
		wbsAccount.setAccountNumber(rs.getString("WBS_AC_N"));
		wbsAccount.setDescription(rs.getString("WBS_DESC_T"));
		wbsAccount.setControllingArea(rs.getString("CTRL_AREA_T"));
		wbsAccount.setCostCenter(rs.getString("COST_CTR_T"));

		if (wbsAccount.getWBSAccountType() != WBSType.E) {
			// Ignore PI if type is C account.
			// Other accounts, get the PI value.
			wbsAccount.setPi1Id(rs.getString("PI1_STF_N"));
		}

		wbsAccount.setUserStatus(rs.getString("WBS_USERSTS_C"));
		wbsAccount.setOfnDepartment(rs.getString("OFN_DEPT_C"));
		wbsAccount.setActiveStatus(rs.getString("WBS_ACTIV_F"));
		wbsAccount.setSourceSystemCode(SourceSystemCode.getSourceSystemCode(rs.getString("WBS_TP_C")));
		
		return wbsAccount;
	}
	// Temp solution - Ends
	 * 
	 * */

	@Override
	public int insertWBSAccount(WBSAccount wbsAccount) {
		
		if (null == wbsAccount) {
			throw new IllegalArgumentException("Wbs List is required.");
		}

		StringBuilder sql = new StringBuilder();
		sql.append("insert into PRS_WBS ( ")
			.append("WBS_N, WBS_AC_N, WBS_DESC_T, CTRL_AREA_T, COST_CTR_T, ")
			.append("PI1_STF_N, OFN_DEPT_C, WBS_USERSTS_C, WBS_ACTIV_F, DEFUNCT_F, WBS_TP_C) ")
		.append("values ( ")
			.append("PRS_WBS_SEQ.NEXTVAL, :accountNumber, :description, :controllingArea, :costCenter, ")
			.append(":pi1Id, :ofnDepartment, :userStatus, :activeStatus, :defunctFlag, :srceSysC ) ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("accountNumber", wbsAccount.getAccountNumber());
		params.addValue("description", wbsAccount.getDescription());
		params.addValue("controllingArea", wbsAccount.getControllingArea());
		params.addValue("costCenter", wbsAccount.getCostCenter());
		params.addValue("pi1Id", wbsAccount.getPi1Id());
		params.addValue("ofnDepartment", wbsAccount.getOfnDepartment());
		params.addValue("userStatus", wbsAccount.getUserStatus());
		params.addValue("activeStatus", wbsAccount.getActiveStatus());
		params.addValue("defunctFlag", Constants.NO);
		params.addValue("srceSysC", wbsAccount.getSourceSystemCode().getDescription());
		
		return prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	@Override
	public int updateWBSAccount(WBSAccount wbsAccount) {
		
		if (null == wbsAccount) {
			throw new IllegalArgumentException("Wbs List is required.");
		}

		StringBuilder sql = new StringBuilder();
		sql.append("update PRS_WBS set ")
			.append("WBS_DESC_T= :description, CTRL_AREA_T = :controllingArea, COST_CTR_T = :costCenter, ")
			.append("PI1_STF_N = :pi1Id, OFN_DEPT_C = :ofnDepartment, WBS_USERSTS_C = :userStatus, ")
			.append("WBS_ACTIV_F = :activeStatus, DEFUNCT_F= 'N', WBS_TP_C = :srceSysC ")
		.append("where WBS_AC_N =:accountNumber AND WBS_TP_C=:srceSysC ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("accountNumber", wbsAccount.getAccountNumber());
		params.addValue("description", wbsAccount.getDescription());
		params.addValue("controllingArea", wbsAccount.getControllingArea());
		params.addValue("costCenter", wbsAccount.getCostCenter());
		params.addValue("pi1Id", wbsAccount.getPi1Id());
		params.addValue("ofnDepartment", wbsAccount.getOfnDepartment());
		params.addValue("userStatus", wbsAccount.getUserStatus());
		params.addValue("activeStatus", wbsAccount.getActiveStatus());
		params.addValue("defunctFlag", Constants.NO);
		params.addValue("srceSysC", wbsAccount.getSourceSystemCode().getDescription());
		
		return prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	@Override
	public int deleteWBSAccount(WBSAccount wbsAccount) {
		
		if (null == wbsAccount) {
			throw new IllegalArgumentException("Wbs is required.");
		}
		
		StringBuilder sql = new StringBuilder();
		sql.append("update PRS_WBS set DEFUNCT_F= :defunctFlag where WBS_AC_N =:accountNumber and nvl(DEFUNCT_F, 'N') <> 'Y' AND WBS_TP_C=:wbsTypeCode ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("accountNumber", wbsAccount.getAccountNumber());
		params.addValue("defunctFlag", Constants.YES);
		params.addValue("wbsTypeCode", wbsAccount.getSourceSystemCode().getDescription());
		
		return prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	@Override
	public boolean isExist(String wbsAccountNumber, String srceSysC) {
		
		if(StringUtils.isNotEmpty(wbsAccountNumber)) {
			StringBuilder sql = new StringBuilder();
			sql.append("select pw.WBS_AC_N from PRS_WBS pw where pw.WBS_AC_N = :accountNumber AND WBS_TP_C = :srceSysC");
			
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("accountNumber", wbsAccountNumber);
			params.addValue("srceSysC", srceSysC);
			
			List<String> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::wbsAccountNumberRowMapper);
			
			if(CollectionUtils.isNotEmpty(result)) {
				return true;
			}
		}
	
		return false;
	}
	
	String wbsAccountNumberRowMapper(ResultSet rs, int i) throws SQLException {
		return rs.getString("WBS_AC_N");
	}

}
