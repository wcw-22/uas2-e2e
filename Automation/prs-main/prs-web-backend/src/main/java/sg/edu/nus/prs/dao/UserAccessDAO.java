
package sg.edu.nus.prs.dao;


import sg.edu.nus.prs.domain.user.User;
import sg.edu.nus.prs.domain.user.UserAccess;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.domain.user.UserSearchForm;
import sg.edu.nus.prs.domain.util.PagedData;

import java.util.List;

public interface UserAccessDAO {

	List<String> addUserAccess(User user, String updaterUserId);

	int deleteUserAccessByAccessId(String accessId);

    PagedData<User> searchUserAccess(UserSearchForm input);
    
    List<String> getHeadOfDepartment(String department);

    List<UserAccess> getVUAAccesses(List<String> userIds);

	List<String> getFacultyDeanByDepartment(String department);
	
	List<String> getFacultyVPByDepartment(String department);

    boolean isUserHoDOrDelegate(UserDetail userdetail, String departmentCode);

	List<User> getLabSupplyOfficers(String internalSupplierCode);
}
