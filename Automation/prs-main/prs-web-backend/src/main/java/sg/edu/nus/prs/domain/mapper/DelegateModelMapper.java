package sg.edu.nus.prs.domain.mapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.PRSDomainObject;
import sg.edu.nus.prs.domain.common.PRSForm;
import sg.edu.nus.prs.domain.common.PRSModelMapper;
import sg.edu.nus.prs.domain.user.*;
import sg.edu.nus.prs.service.UserDetailService;

@Component
public class DelegateModelMapper implements PRSModelMapper {
	
	static public final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH);
	static public final DateTimeFormatter formatterForCompare = DateTimeFormatter.ofPattern("yyyy/MM/dd", Locale.ENGLISH);

	private UserDetailService userDetailService;

	@Autowired
	public DelegateModelMapper(UserDetailService userDetailService) {
		this.userDetailService = userDetailService;
	}

	@Override
	public PRSDomainObject formToDomainObject(PRSForm formObject) {
		Delegation delegation = null;
		if (null == formObject) return null;
				 
		DelegateForm form = ((DelegateForm) formObject).tighten();
		
		delegation = new Delegation();                                                                                                                                                         
		delegation.setId(form.getId());
		delegation.setDelegateId(form.getDelegateId());
		if (form.getDelegateStaffNumber() != null && !StringUtils.isEmpty(form.getDelegateStaffNumber()))delegation.setDelegateStaffNumber(form.getDelegateStaffNumber());
		else delegation.setDelegateStaffNumber(userDetailService.getUserNoByNUSNET(form.getDelegateId()));
		delegation.setApproverId(form.getApproverId());
		if (form.getApproverStaffNumber() != null && !StringUtils.isEmpty(form.getApproverStaffNumber()))delegation.setApproverStaffNumber(form.getApproverStaffNumber());
		else delegation.setApproverStaffNumber(userDetailService.getUserNoByNUSNET(form.getApproverId()));
		Faculty fac = new Faculty();
		fac.setFaculty(form.getFaculty());
		Department dept = new Department();
		dept.setDepartment(form.getDepartment());
		
		delegation.setFaculty(fac);
		delegation.setDepartment(dept);
		
		delegation.setRole(form.getDelegateRole());
		if (StringUtils.isNotEmpty(form.getDurationStartDate())) {
			delegation.setDurationStartDate(LocalDate.parse(form.getDurationStartDate(), formatter));
		}

		if (StringUtils.isNotEmpty(form.getDurationEndDate())) {
			delegation.setDurationEndDate(LocalDate.parse(form.getDurationEndDate(), formatter));
		}
		delegation.setDefunctFlag(form.getDefunctFlag());
		return delegation;
	}

	@Override
	public PRSForm domainObjectToForm(PRSDomainObject domainObject) {
		DelegateForm form = null;
		if (null == domainObject) return null;
		
		Delegation delegation = ((Delegation) domainObject).tighten();
		
		form = new DelegateForm();
		form.setId(delegation.getId());
		form.setDelegateId(delegation.getDelegateId());
		form.setDelegateStaffNumber(delegation.getDelegateStaffNumber());
		UserDetail delegateDetail = userDetailService.getUserByUserNo(delegation.getDelegateStaffNumber());
		form.setDelegateName(delegateDetail==null?"":delegateDetail.getName());
		form.setApproverId(delegation.getApproverId());
		form.setApproverStaffNumber(delegation.getApproverStaffNumber());
		UserDetail approverDetail = userDetailService.getUserByUserNo(delegation.getApproverStaffNumber());
		form.setApproverName(approverDetail==null?"":approverDetail.getName());
		form.setDelegateRole(delegation.getRole());
		form.setFaculty(delegation.getFaculty()==null?null:delegation.getFaculty().getFaculty());
		form.setDepartment(delegation.getDepartment()==null?null:delegation.getDepartment().getDepartment());
		form.setFacultyName(delegation.getFaculty()==null?null:delegation.getFaculty().getDescription());
		form.setDepartmentName(delegation.getDepartment()==null?null:delegation.getDepartment().getDescription());
		form.setDurationStartDate(delegation.getDurationStartDate().format(formatter));
		form.setDurationEndDate(delegation.getDurationEndDate().format(formatter));
		form.setId(delegation.getId());
		form.setDefunctFlag(delegation.getDefunctFlag());
		
		return form;
	}

}
