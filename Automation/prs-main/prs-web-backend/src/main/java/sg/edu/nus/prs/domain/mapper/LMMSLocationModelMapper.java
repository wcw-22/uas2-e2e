package sg.edu.nus.prs.domain.mapper;

import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.SiteLocation;
import sg.edu.nus.prs.domain.user.LMMSLocation;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LMMSLocationModelMapper {
	
	public SiteLocation intObjectToDomainObject(LMMSLocation intObj) {
        SiteLocation location = new SiteLocation();
		location.setLocationId(intObj.getLocationId());
		location.setDescription(intObj.getLocationName());
		location.setFacultyCode(intObj.getFacultyCode());
		location.setDeptCode(intObj.getDepartmentCode());

		return location;
	}
	
	public List<SiteLocation> intObjectListToDomainObjectList(List<LMMSLocation> intObjList) {
		List<SiteLocation> locations = intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
		
		return locations;
	}
}
