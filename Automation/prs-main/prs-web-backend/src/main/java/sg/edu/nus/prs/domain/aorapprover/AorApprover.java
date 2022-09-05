package sg.edu.nus.prs.domain.aorapprover;

import java.util.Date;

import sg.edu.nus.prs.domain.common.PRSAuditedDomainObject;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;

public class AorApprover extends PRSAuditedDomainObject {

	private String aorApproverId;
	private Faculty faculty;
	private Department department;
	
	public AorApprover() {
		super();
	}
	
	public AorApprover(String aorApproverId, String facultyCode, String departmentCode, String updatedUserId, Date updatedDtm) {
		super();
		this.updatedUserId = updatedUserId;
		this.updatedDtm = updatedDtm;

		this.faculty = new Faculty(facultyCode, null);
		this.department = new Department(departmentCode, null);
	}

	public String getAorApproverId() {
		return aorApproverId;
	}

	public void setAorApproverId(String aorApproverId) {
		this.aorApproverId = aorApproverId;
	}

	public Faculty getFaculty() {
		return faculty;
	}

	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Override
	public String toString() {
		return "AorApprover [aorApproverId=" + aorApproverId + ", faculty=" + faculty + ", department=" + department
				+ "]";
	}
}
