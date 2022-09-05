package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.SiteLocation;
import sg.edu.nus.prs.domain.user.InventoryOwner;
import sg.edu.nus.prs.domain.user.LMMSOwnerLocation;
import sg.edu.nus.prs.http.lmms.domain.LMMSLocationOccupantData;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LMMSUserLocationModelMapper {
	
	public SiteLocation intObjectToDomainObject(LMMSOwnerLocation intObj) {
		SiteLocation location = new SiteLocation();
		location.setLocationId(intObj.getLocationId());
		location.setDescription(intObj.getLocationName());
		location.setFacultyCode(intObj.getFacultyCode());
		location.setDeptCode(intObj.getDepartmentCode());
		List<InventoryOwner> userDetailList = new ArrayList<InventoryOwner>();
		List<LMMSLocationOccupantData>  lmmsLocationOccupantDataList= intObj.getLocationOccupantData();
		if (CollectionUtils.isNotEmpty(lmmsLocationOccupantDataList)) {
			for(LMMSLocationOccupantData occupantdata:lmmsLocationOccupantDataList) {
				if(StringUtils.isNotEmpty(occupantdata.getNusnetId())) {
					InventoryOwner inventoryOwner = new InventoryOwner();
					inventoryOwner.setUserId(occupantdata.getNusnetId());
					inventoryOwner.setUserName(occupantdata.getUserName());
					userDetailList.add(inventoryOwner);
				}
			}
		}
		
		location.setUserDetailList(userDetailList);
		
		return location;
	}
	
	public List<SiteLocation> intObjectListToDomainObjectList(List<LMMSOwnerLocation> intObjList) {
		List<SiteLocation> locations = intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
		
		return locations;
	}
}
