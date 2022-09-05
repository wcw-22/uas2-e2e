package sg.edu.nus.prs.domain.fixeddeliveryaddress;

import java.util.Date;

import sg.edu.nus.prs.domain.common.PRSAuditedDomainObject;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;

public class FixedDeliveryAddress extends PRSAuditedDomainObject {
	private String fixedDeliveryAddressId;
	private Faculty faculty;
	private Department department;
	private String deliveryAddress;
	
	public FixedDeliveryAddress() {
		super();
	}
	
	public FixedDeliveryAddress(String fixedDeliveryAddressId, String facultyCode, String departmentCode, String deliveryAddress, String updatedUserId, Date updatedDtm) {
		super();
		this.updatedUserId = updatedUserId;
		this.updatedDtm = updatedDtm;

		this.faculty = new Faculty(facultyCode, null);
		this.department = new Department(departmentCode, null);
		this.deliveryAddress = deliveryAddress;
	}

	public String getFixedDeliveryAddressId() {
		return fixedDeliveryAddressId;
	}

	public void setFixedDeliveryAddressId(String fixedDeliveryAddressId) {
		this.fixedDeliveryAddressId = fixedDeliveryAddressId;
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

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	@Override
	public String toString() {
		return "FixedDeliveryAddress [fixedDeliveryAddressId=" + fixedDeliveryAddressId + ", faculty=" + faculty
				+ ", department=" + department + ", deliveryAddress=" + deliveryAddress + "]";
	}
}
