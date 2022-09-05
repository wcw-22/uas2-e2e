package sg.edu.nus.prs.domain.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.aorapprover.AorApprover;
import sg.edu.nus.prs.domain.user.AorApproverForm;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;

@Component
public class AorApproverModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(AorApproverModelMapper.class);
	
	public List<AorApprover> fromToDomainObjectList (AorApproverForm aorApproverForm) {
		List<AorApprover> aorApprovers = new ArrayList<>();
		try {
			if (null == aorApproverForm || CollectionUtils.isEmpty(aorApproverForm.getDepartments())) {
				throw new IllegalArgumentException("Aor Approver Form details is required.");
			} else {
				aorApproverForm.getDepartments().forEach(departmentStr -> {
					AorApprover aorApprover = new AorApprover();
					Faculty faculty = new Faculty();
					faculty.setFaculty(aorApproverForm.getFaculty());
					
					Department department = new Department();
					department.setDepartment(departmentStr);
					
					aorApprover.setDepartment(department);
					aorApprover.setFaculty(faculty);
					
					aorApprovers.add(aorApprover);
				});
			}
		} catch (Exception e) {
			logger.error("AorApproverModelMapper::fromToDomainObjectList>>"+e.getMessage());
			throw new RuntimeException("AorApproverModelMapper::fromToDomainObjectList.");
		}
		return aorApprovers;
	}

	public AorApproverForm domainToFormObject(AorApprover aorApprover) {
		AorApproverForm aorApproverForm = null;
		List<String> departments = null;
		try {
			if (null == aorApprover) {
				throw new IllegalArgumentException("AOR Approver details is required.");
			} else {
				aorApproverForm = new AorApproverForm();
				aorApproverForm.setAorApproverId(aorApprover.getAorApproverId());
				aorApproverForm.setFaculty(aorApprover.getFaculty().getFaculty());
				departments = new ArrayList<>();
				departments.add(aorApprover.getDepartment().getDepartment());
				aorApproverForm.setDepartments(departments);
			}
		} catch (Exception e) {
			logger.error("AorApproverModelMapper::domainToFormObject>>"+e.getMessage());
			throw new RuntimeException("AorApproverModelMapper::domainToFormObject.");
		} finally {
			departments = null;
		}
		return aorApproverForm;
	} 
}
