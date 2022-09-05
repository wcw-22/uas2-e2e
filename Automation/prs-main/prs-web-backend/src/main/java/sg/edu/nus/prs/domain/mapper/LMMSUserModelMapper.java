package sg.edu.nus.prs.domain.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.user.LMMSOwner;
import sg.edu.nus.prs.domain.user.LMMSUser;
import sg.edu.nus.prs.domain.user.LMMSUserRole;
import sg.edu.nus.prs.domain.user.LMMSUserStatus;
import sg.edu.nus.prs.domain.user.LMMSUserType;
import sg.edu.nus.prs.http.lmms.domain.LMMSOwnerData;
import sg.edu.nus.prs.http.lmms.domain.LMMSUserData;


import java.util.List;
import java.util.stream.Collectors;

@Component
public class LMMSUserModelMapper {

	private ModelMapper modelMapper;
	
	@Autowired
	public LMMSUserModelMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}
	
	public LMMSUser intObjectToDomainObject(LMMSUserData intObj) {
		LMMSUser user = modelMapper.map(intObj, LMMSUser.class);
		user.setLmmsStatus(LMMSUserStatus.fromDescription(intObj.getUserStatus()));
		user.setLmmsUserType(LMMSUserType.fromDescription(intObj.getUserType()));
		user.setLmmsUserRole(LMMSUserRole.fromDescription(intObj.getUserRole()));
		
		return user;
	}
	
	public List<LMMSUser> intObjectListToDomainObjectList(List<LMMSUserData> intObjList) {
		List<LMMSUser> users = intObjList.stream()
				.map(this::intObjectToDomainObject)
				.collect(Collectors.toList());
		
		return users;
	}
	
	
	public LMMSOwner intObjectToDomainObjectForUserLocation(LMMSOwnerData intObj) {
		LMMSOwner user = modelMapper.map(intObj, LMMSOwner.class);
		user.setLmmsStatus(LMMSUserStatus.fromDescription(intObj.getUserStatus()));
		user.setLmmsUserType(LMMSUserType.fromDescription(intObj.getUserType()));
		user.setLmmsUserRole(LMMSUserRole.fromDescription(intObj.getUserRole()));
		
		return user;
	}
	
	public List<LMMSOwner> intObjectListToDomainObjectForUserLocationList(List<LMMSOwnerData> intObjList) {
		List<LMMSOwner> users = intObjList.stream()
				.map(this::intObjectToDomainObjectForUserLocation)
				.collect(Collectors.toList());
		
		return users;
	}
}
