package sg.edu.nus.prs.dao;

import java.util.List;
import java.util.Map;

import sg.edu.nus.prs.domain.aorapprover.AorApprover;
import sg.edu.nus.prs.domain.user.AorApproverSearchForm;
import sg.edu.nus.prs.domain.util.PagedData;

public interface AorApproverDAO {

	public Map<String, String> saveAorApprover(AorApprover aorApprover, String currentLoggedInStaffNumber);
	public Map<String, String> checkExistenceByFacultyCodeDepartmentCode(String facultyCode, String departmentCode);
	public Map<String, String> deleteAorApprover(List<String> aorApproverIds);
	public PagedData<AorApprover> searchAorApprover(AorApproverSearchForm input);
	public AorApprover loadAorApprover(String aorApproverId);

    boolean isAorApproverSetForDepartment(String departmentCode);
}
