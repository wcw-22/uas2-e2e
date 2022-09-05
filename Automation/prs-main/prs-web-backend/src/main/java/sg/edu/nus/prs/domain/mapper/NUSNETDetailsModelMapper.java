package sg.edu.nus.prs.domain.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.user.NUSNETDetail;
import sg.edu.nus.prs.http.sap.domain.StaffParticsData;
import sg.edu.nus.prs.util.Constants;

import java.util.Locale;

@Component
public class NUSNETDetailsModelMapper {

    private ModelMapper modelMapper;

	@Autowired
	public NUSNETDetailsModelMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	public NUSNETDetail intObjectToDomainObject(StaffParticsData intObj) {
		NUSNETDetail detail = modelMapper.map(intObj, NUSNETDetail.class);
		detail.setUserIdTypeCode(intObj.getUserIdType());
		detail.setDepartmentCode(intObj.getDept());
		detail.setEmail(intObj.getEmail().toLowerCase(Locale.getDefault()) + Constants.STAFF_EMAIL_POSTFIX);
		
		return detail;
	}

}
