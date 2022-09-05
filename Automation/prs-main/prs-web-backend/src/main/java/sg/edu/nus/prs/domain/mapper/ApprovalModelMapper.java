package sg.edu.nus.prs.domain.mapper;


import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.purchase.PurchaseApproval;
import sg.edu.nus.prs.domain.purchase.PurchaseApprovalForm;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.service.UserDetailService;

@Component
public class ApprovalModelMapper {
	
	private static final Logger logger = LoggerFactory.getLogger(ApprovalModelMapper.class);

	private UserDetailService userDetailService;

	@Autowired
	public ApprovalModelMapper(UserDetailService userDetailService) {
		this.userDetailService = userDetailService;
	}
	
	public PurchaseApprovalForm domainObjectToForm(PurchaseApproval approvalObj) {
		
		if (approvalObj == null) { return null;}
		
		PurchaseApprovalForm approvalForm = new PurchaseApprovalForm();
		approvalForm.setId(approvalObj.getId());

		if (StringUtils.isNotEmpty(approvalObj.getApproverStaffNo())) {
			UserDetail approver = userDetailService.getUserByUserNo(approvalObj.getApproverStaffNo());

			if (approver != null) {
				approvalForm.setApproverName(approver.getName());

				if (CollectionUtils.isNotEmpty(approver.getNusnetDetails())) {
					approvalForm.setApprover(approver.getNusnetDetails().get(0).getUserId());
				}
			}
		}

		if (StringUtils.isNotEmpty(approvalObj.getAuthorizingStaffNo())) {
			UserDetail authorizer = userDetailService.getUserByUserNo(approvalObj.getAuthorizingStaffNo());

			if (authorizer != null) {
				approvalForm.setAuthorizingUserName(authorizer.getName());

				if (CollectionUtils.isNotEmpty(authorizer.getNusnetDetails())) {
					approvalForm.setAuthorizingUser(authorizer.getNusnetDetails().get(0).getUserId());
				}
			}
		}

		approvalForm.setApproverType(approvalObj.getApproverType());
		approvalForm.setRequestId(approvalObj.getRequestId());
		approvalForm.setStatus(approvalObj.getStatus());
		approvalForm.setComments(approvalObj.getRemarks());
		approvalForm.setDecisionTime(approvalObj.getLastUpdated());
		approvalForm.setAutoApprove(approvalObj.getAutoApprove());
		approvalForm.setApproverRole(approvalObj.getApproverRole());

		if (StringUtils.isNotEmpty(approvalObj.getLastUpdatedBy())) {
			UserDetail lastUpdater = userDetailService.getUserByUserNo(approvalObj.getLastUpdatedBy());

			if (lastUpdater != null) {
				approvalForm.setDecisionByName(lastUpdater.getName());

				if (CollectionUtils.isNotEmpty(lastUpdater.getNusnetDetails())) {
					approvalForm.setDecisionBy(lastUpdater.getNusnetDetails().get(0).getUserId());
				}
			}
		}
		
		return approvalForm;
				
	}

}
