package sg.edu.nus.prs.domain.common;

import sg.edu.nus.prs.domain.user.Faculty;

public class InternalStore {

	private String storeId;
	private Supplier supplier;
	private String wbsAccountNo;
	private String glAccount;
	private String chemicalLocationId;
	private Faculty faculty;

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public String getWbsAccountNo() {
		return wbsAccountNo;
	}

	public void setWbsAccountNo(String wbsAccountNo) {
		this.wbsAccountNo = wbsAccountNo;
	}

	public String getGlAccount() {
		return glAccount;
	}

	public void setGlAccount(String glAccount) {
		this.glAccount = glAccount;
	}

	public String getChemicalLocationId() {
		return chemicalLocationId;
	}

	public void setChemicalLocationId(String chemicalLocationId) {
		this.chemicalLocationId = chemicalLocationId;
	}

	public Faculty getFaculty() {
		return faculty;
	}

	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}

}
