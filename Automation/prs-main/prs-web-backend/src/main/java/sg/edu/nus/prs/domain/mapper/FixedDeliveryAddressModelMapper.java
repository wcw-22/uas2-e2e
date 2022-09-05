package sg.edu.nus.prs.domain.mapper;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.fixeddeliveryaddress.FixedDeliveryAddress;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.FixedDeliveryAddressForm;

@Component
public class FixedDeliveryAddressModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(FixedDeliveryAddressModelMapper.class);
	
	public List<FixedDeliveryAddress> fromToDomainObjectList (FixedDeliveryAddressForm fixedDeliveryAddressForm) {
		List<FixedDeliveryAddress> fixedDeliveryAddresses = new ArrayList<>();
		try {
			if (null == fixedDeliveryAddressForm || CollectionUtils.isEmpty(fixedDeliveryAddressForm.getDepartments())) {
				throw new IllegalArgumentException("Aor Approver Form details is required.");
			} else {
				fixedDeliveryAddressForm.getDepartments().forEach(departmentStr -> {
					FixedDeliveryAddress fixedDeliveryAddress = new FixedDeliveryAddress();
					Faculty faculty = new Faculty();
					faculty.setFaculty(fixedDeliveryAddressForm.getFaculty());
					
					Department department = new Department();
					department.setDepartment(departmentStr);
					
					fixedDeliveryAddress.setDepartment(department);
					fixedDeliveryAddress.setFaculty(faculty);
					fixedDeliveryAddress.setDeliveryAddress(fixedDeliveryAddressForm.getDeliveryAddress().trim());
					
					fixedDeliveryAddresses.add(fixedDeliveryAddress);
				});
			}
		} catch (Exception e) {
			logger.error("AorApproverModelMapper::fromToDomainObjectList>>"+e.getMessage());
			throw new RuntimeException("AorApproverModelMapper::fromToDomainObjectList.");
		}
		return fixedDeliveryAddresses;
	}

	public FixedDeliveryAddressForm domainToFormObject(FixedDeliveryAddress fixedDeliveryAddress) {
		FixedDeliveryAddressForm fixedDeliveryAddressForm = null;
		List<String> departments = null;
		try {
			if (null == fixedDeliveryAddress) {
				throw new IllegalArgumentException("AOR Approver details is required.");
			} else {
				fixedDeliveryAddressForm = new FixedDeliveryAddressForm();
				fixedDeliveryAddressForm.setFixedDeliveryAddressId(fixedDeliveryAddress.getFixedDeliveryAddressId());
				fixedDeliveryAddressForm.setFaculty(fixedDeliveryAddress.getFaculty().getFaculty());
				departments = new ArrayList<>();
				departments.add(fixedDeliveryAddress.getDepartment().getDepartment());
				fixedDeliveryAddressForm.setDepartments(departments);
				fixedDeliveryAddressForm.setDeliveryAddress(fixedDeliveryAddress.getDeliveryAddress());
			}
		} catch (Exception e) {
			logger.error("AorApproverModelMapper::domainToFormObject>>"+e.getMessage());
			throw new RuntimeException("AorApproverModelMapper::domainToFormObject.");
		} finally {
			departments = null;
		}
		return fixedDeliveryAddressForm;
	}

	public FixedDeliveryAddress fromToDomainObject(@Valid FixedDeliveryAddressForm fixedDeliveryAddressForm) {
		// TODO Auto-generated method stub
		return null;
	} 
}
