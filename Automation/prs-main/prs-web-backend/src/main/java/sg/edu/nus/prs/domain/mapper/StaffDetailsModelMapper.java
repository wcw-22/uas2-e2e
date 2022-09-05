package sg.edu.nus.prs.domain.mapper;

import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.StaffDetail;
import sg.edu.nus.prs.domain.user.StaffFaculty;
import sg.edu.nus.prs.http.sap.domain.StaffInfoData;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StaffDetailsModelMapper {
	public StaffDetail intObjectToDomainObject(StaffInfoData intObj) {
		Department department = new Department();
		department.setSapDepartment(intObj.getDepartmentCode());
		department.setDescription(intObj.getDepartment());

		Faculty faculty = new Faculty();
		faculty.setSapFaculty(intObj.getFacultyCode());
		faculty.setDescription(intObj.getFaculty());
		faculty.setDepartments(Collections.singletonList(department));

		StaffFaculty staffFaculty = new StaffFaculty(faculty, true); // Currently only pull primary.

		StaffDetail staff = new StaffDetail();
		staff.setStaff(true);
		staff.setTitle(intObj.getTitle());
		staff.setName(intObj.getName());
		staff.setStaffNo(intObj.getStaffSAPNum());
		staff.setEmployeeStatus(intObj.getEmpStatus());
		staff.setFacultyDepartments(Collections.singletonList(staffFaculty));

		return staff;
	}

	public List<StaffDetail> intObjectListToDomainObjectList(List<StaffInfoData> intObjList) {
		return intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
	}
}
