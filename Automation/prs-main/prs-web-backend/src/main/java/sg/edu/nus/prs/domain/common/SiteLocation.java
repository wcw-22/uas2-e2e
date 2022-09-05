package sg.edu.nus.prs.domain.common;

import java.util.List;

import sg.edu.nus.prs.domain.user.InventoryOwner;

public class SiteLocation {
    private String locationId;
    private String description;
    private String facultyCode;
    private String deptCode;
    private String longDescription;
    private boolean displayLongDescription;
    private List<InventoryOwner> userDetailList;


	public SiteLocation() {

	}

	public SiteLocation(String locationId, String description, String facultyCode, String deptCode) {
		this.locationId = locationId;
		this.description = description;
		this.facultyCode = facultyCode;
		this.deptCode = deptCode;
	}

	public String getLocationId() {
		return locationId;
	}

	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFacultyCode() {
		return facultyCode;
	}

	public void setFacultyCode(String facultyCode) {
		this.facultyCode = facultyCode;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getLongDescription() {
		return longDescription;
	}

	public void setLongDescription(String longDescription) {
		this.longDescription = longDescription;
	}

	public boolean isDisplayLongDescription() {
		return displayLongDescription;
	}

	public void setDisplayLongDescription(boolean displayLongDescription) {
		this.displayLongDescription = displayLongDescription;
	}

	public List<InventoryOwner> getUserDetailList() {
		return userDetailList;
	}

	public void setUserDetailList(List<InventoryOwner> userDetailList) {
		this.userDetailList = userDetailList;
	}

	
}
