package sg.edu.nus.prs.domain.common;

import java.util.List;

public class WBSAccountSearchInput {
    private String accountNumber;
    private List<String> principalInvestigators;
    private List<String> departments;
    private List<String> supplierCodes;
    private String requestType;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public List<String> getPrincipalInvestigators() {
        return principalInvestigators;
    }

    public void setPrincipalInvestigators(List<String> principalInvestigators) {
        this.principalInvestigators = principalInvestigators;
    }

    public List<String> getDepartments() {
        return departments;
    }

    public void setDepartments(List<String> departments) {
        this.departments = departments;
    }

	public List<String> getSupplierCodes() {
		return supplierCodes;
	}

	public void setSupplierCodes(List<String> supplierCodes) {
		this.supplierCodes = supplierCodes;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
}
