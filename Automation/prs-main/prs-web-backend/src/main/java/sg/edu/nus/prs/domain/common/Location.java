package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Location {
	@JsonIgnore
	private String id;
    private String locationId;
    private String description;
    @JsonIgnore
    private Integer requestId;
    private String facultyCode;
    private String deptCode;
	
	public Location() {
		
	}
	
	public Location(String locationId, String description, String facultyCode, String deptCode) {
		this.locationId = locationId;
		this.description = description;
		this.facultyCode = facultyCode;
		this.deptCode = deptCode;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public Integer getRequestId() {
		return requestId;
	}

	public void setRequestId(Integer requestId) {
		this.requestId = requestId;
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

}
