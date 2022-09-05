package sg.edu.nus.prs.domain.common;


import org.apache.commons.lang3.StringUtils;

import sg.edu.nus.prs.domain.purchase.WBSType;
import sg.edu.nus.prs.domain.user.Department;

public class WBSAccount {

	private String wbsId;

	private String ofnDepartment;

	private String description;

	private String costCenter;

	private String pi1Id;

	private String accountNumber;

	private String userStatus;

	private String controllingArea;

	private String activeStatus;
	
	private SourceSystemCode sourceSystemCode;
	
	private Department department;

	public String getWbsId() {
		return wbsId;
	}

	public void setWbsId(String wbsId) {
		this.wbsId = wbsId;
	}

	public String getOfnDepartment() {
		return ofnDepartment;
	}

	public void setOfnDepartment(String ofnDepartment) {
		this.ofnDepartment = ofnDepartment;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCostCenter() {
		return costCenter;
	}

	public void setCostCenter(String costCenter) {
		this.costCenter = costCenter;
	}

	public String getPi1Id() {
		return pi1Id;
	}

	public void setPi1Id(String pi1Id) {
		this.pi1Id = pi1Id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getControllingArea() {
		return controllingArea;
	}

	public void setControllingArea(String controllingArea) {
		this.controllingArea = controllingArea;
	}

	public String getActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(String activeStatus) {
		this.activeStatus = activeStatus;
	}

	public SourceSystemCode getSourceSystemCode() {
		return sourceSystemCode;
	}

	public void setSourceSystemCode(SourceSystemCode sourceSystemCode) {
		this.sourceSystemCode = sourceSystemCode;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	public WBSType getWBSAccountType() {
		if (StringUtils.startsWith(this.accountNumber, WBSType.A.getPrefix())) 
			return WBSType.A;
		else if (StringUtils.startsWith(this.accountNumber, WBSType.H.getPrefix())) 
			return WBSType.H;
		else if (StringUtils.startsWith(this.accountNumber, WBSType.E.getPrefix())) 
			return WBSType.E;
		else
			return null;
		
	}
	
}