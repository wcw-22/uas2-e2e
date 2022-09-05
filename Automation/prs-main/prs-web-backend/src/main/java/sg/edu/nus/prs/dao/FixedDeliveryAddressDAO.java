package sg.edu.nus.prs.dao;

import java.util.List;
import java.util.Map;

import sg.edu.nus.prs.domain.fixeddeliveryaddress.FixedDeliveryAddress;
import sg.edu.nus.prs.domain.user.FixedDeliveryAddressSearchForm;
import sg.edu.nus.prs.domain.util.PagedData;

public interface FixedDeliveryAddressDAO {

	public Map<String, String> saveFixedDeliveryAddress(FixedDeliveryAddress fixedDeliveryAddress, String currentLoggedInStaffNumber);
	public Map<String, String> checkExistenceByFacultyCodeDepartmentCode(String facultyCode, String departmentCode);
	public Map<String, String> deleteFixedDeliveryAddress(List<String> fixedDeliveryAddressIds);
	public PagedData<FixedDeliveryAddress> searchFixedDeliveryAddress(FixedDeliveryAddressSearchForm input);
	public FixedDeliveryAddress loadFixedDeliveryAddress(String fixedDeliveryAddressId);
	public Map<String, String> editFixedDeliveryAddress(FixedDeliveryAddress fixedDeliveryAddress, String currentLoggedInStaffNumber);
	public List<String> getExistingDepartments(String faculty, List<String> departments);
}
