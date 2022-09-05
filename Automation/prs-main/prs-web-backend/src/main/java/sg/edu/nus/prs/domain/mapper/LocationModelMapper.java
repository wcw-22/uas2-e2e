package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.Location;
import sg.edu.nus.prs.domain.common.SiteLocation;

@Component
public class LocationModelMapper {
	
	public Location toLocation(SiteLocation formObj) {
		if (StringUtils.isEmpty(formObj.getLocationId())) {
			return null;
		}

		Location location = new Location();
		location.setLocationId(formObj.getLocationId());
		location.setDescription(formObj.getDescription());
		location.setFacultyCode(formObj.getFacultyCode());
		location.setDeptCode(formObj.getDeptCode());

		return location;
	}

	public SiteLocation domainToFormObject(Location formObj) {
		SiteLocation location = new SiteLocation();
		location.setLocationId(formObj.getLocationId());
		location.setDescription(formObj.getDescription());
		location.setFacultyCode(formObj.getFacultyCode());
		location.setDeptCode(formObj.getDeptCode());

		return location;
	}
}
