package sg.edu.nus.prs.domain.mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.WBSAccount;
import sg.edu.nus.prs.domain.purchase.FundCheckResult;
import sg.edu.nus.prs.domain.purchase.PurchaseFundCheck;
import sg.edu.nus.prs.domain.purchase.SystemCheckOutcomeCode;
import sg.edu.nus.prs.http.sap.domain.FundCheckResponseData;
import sg.edu.nus.prs.service.APIErrorConfigService;
import sg.edu.nus.prs.service.WBSAccountService;



@Component
public class FundCheckDetailModelMapper {
	
	private WBSAccountService wbsAccountService;
	
	private APIErrorConfigService errorMessageService;

	@Autowired
	public FundCheckDetailModelMapper(WBSAccountService wbsAccountService,
			APIErrorConfigService errorMessageService) {
		this.wbsAccountService = wbsAccountService;
		this.errorMessageService = errorMessageService;
	}

	public FundCheckResult intObjectToDomainObject(FundCheckResponseData intObj) {
		FundCheckResult checkDetail = new FundCheckResult();
		checkDetail.setWbs(intObj.getWbs());
		checkDetail.setGl(intObj.getGl());
		checkDetail.setAmount(intObj.getAmount());
		
		
		if (null != intObj.getFundCheckStatus() && intObj.getFundCheckStatus().equalsIgnoreCase("X")) {
			checkDetail.setStatus(SystemCheckOutcomeCode.SYSCHK_SUCCESS.getDescription());
			
		} else {
			checkDetail.setStatus(SystemCheckOutcomeCode.SYSCHK_FAILURE.getDescription());
			
			String msgCode = (StringUtils.isNotBlank(intObj.getMessageID()) ? intObj.getMessageID() : "") +
					(StringUtils.isNotBlank(intObj.getMessageNo()) ? intObj.getMessageNo() : "");
			
			String message = null;
			if (StringUtils.isNotBlank(msgCode)) {
				message = errorMessageService.findMessageByCode(msgCode);
			}
			
			if (StringUtils.isNotBlank(message)) {
				checkDetail.setError(message);
			} else if (StringUtils.isNotBlank(intObj.getMessageText())) {
				checkDetail.setError(intObj.getMessageText());
			}
		}
//		checkDetail.setStatus(null != intObj.getFundCheckStatus() && intObj.getFundCheckStatus().equalsIgnoreCase("X")
//				? SystemCheckOutcomeCode.SYSCHK_SUCCESS.getDescription()
//				: SystemCheckOutcomeCode.SYSCHK_FAILURE.getDescription());
		
		return checkDetail;
	}

	public List<FundCheckResult> intObjectListToDomainObjectList(List<FundCheckResponseData> intObjList) {
		List<FundCheckResult> checkDetails = intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
		return checkDetails;
	}
	
	public PurchaseFundCheck domainObjectToFormObject(FundCheckResult domainObj) {
		PurchaseFundCheck purchaseFundCheck = new PurchaseFundCheck();
		purchaseFundCheck.setWbs(domainObj.getWbs());
		purchaseFundCheck.setGlAccount(domainObj.getGl());
		purchaseFundCheck.setStatus(domainObj.getStatus());
		purchaseFundCheck.setEpv(new BigDecimal(domainObj.getAmount().trim()));
		purchaseFundCheck.setDate(domainObj.getDate());
		WBSAccount wbsAccount = wbsAccountService.getWBSAccount(domainObj.getWbs());
		if(null != wbsAccount) {
			purchaseFundCheck.setCostCenter(wbsAccount.getCostCenter());
			purchaseFundCheck.setDepartment(wbsAccount.getDepartment());
		}
		return purchaseFundCheck;
	}
	
	public List<PurchaseFundCheck> domainObjectListToFormObjectList(List<FundCheckResult> domainObjList) {
		List<PurchaseFundCheck> purchaseFundChecks = domainObjList.stream()
				.map(this::domainObjectToFormObject)
				.collect(Collectors.toList());
		return purchaseFundChecks;
	}
}
