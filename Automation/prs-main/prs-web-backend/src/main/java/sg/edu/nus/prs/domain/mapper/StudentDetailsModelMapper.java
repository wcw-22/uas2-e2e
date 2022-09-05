package sg.edu.nus.prs.domain.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.user.NUSNETDetail;
import sg.edu.nus.prs.domain.user.StudentDetail;
import sg.edu.nus.prs.http.edurec.domain.StudentInfoData;
import sg.edu.nus.prs.util.Constants;

@Component
public class StudentDetailsModelMapper {
	public StudentDetail intObjectToDomainObject(StudentInfoData intObj) {
		StudentDetail student = new StudentDetail();
		student.setStaff(false);
		student.setMatricNo(intObj.getId());
		student.setName(intObj.getFullName());
		student.setEmail(intObj.getOfficialEmail());

		NUSNETDetail nn = new NUSNETDetail();
		nn.setActiveFlag((student.isActive()) ? Constants.YES : Constants.NO);
		nn.setEmplId(student.getMatricNo());
		nn.setSapEmplId(student.getMatricNo());
		nn.setEmail(student.getEmail());

		int endIndex = nn.getEmail().indexOf("@");
		if (endIndex == -1) {
			endIndex = nn.getEmail().length();
		}
		nn.setUserId(nn.getEmail().substring(0, endIndex).toUpperCase(Locale.getDefault()));

		student.setNusnetDetails(Collections.singletonList(nn));

		return student;
	}

	public List<StudentDetail> intObjectListToDomainObjectList(List<StudentInfoData> intObjList) {
		List<StudentDetail> students = intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
		
		return students;
	}
}
