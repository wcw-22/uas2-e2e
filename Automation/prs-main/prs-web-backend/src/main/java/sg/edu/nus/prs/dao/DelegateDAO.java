package sg.edu.nus.prs.dao;

import java.util.List;
import java.util.Set;

import sg.edu.nus.prs.domain.user.*;
import sg.edu.nus.prs.domain.util.PagedData;

public interface DelegateDAO {
	Boolean create(UserDelegation userDelegation);
	UserDelegation update(UserDelegation userDelegation);
	UserDelegation getUserDelegations(String userId, List<String> faculties, List<String> departments, String currentUser, Role role);
	List<Delegation> getDelegationsBysIds(List<String> delegationIds);
	Delegation updateDelegation(Delegation delegation);
	Delegation deleteDelegation(Delegation delegation);
	List<Delegation> deleteDelegations(List<String> delegationIds, String currentUserId);
	Delegation getDelegation(String delegationId);
	PagedData<Delegation> searchDelegations(DelegationSearchForm input);
	PagedData<Delegation> searchDelegations(DelegationSearchForm input, List<String> faculties, List<String> departments, String currentUser, Role role);
	List<Delegation> getOverlappedExistingDelegation(Delegation delegation);
	boolean isDean(String userId);
	boolean isHoD(String userId);
	boolean isPI(String userId);
	boolean isVP(String userId);
	boolean isCompatibleForApprover(Delegation delegation);
	boolean isCompatibleForVP(Delegation delegation);
	boolean isDelegateEngaged(Set<String> userIds);
	Delegation getDelegateByApproverAndRole(String nusnetId, Role role);
	List<Delegation> getDelegatesOfApprover(String userId, String facultyCode, String departmentCode, Role role);

    List<User> getDelegatedUserAccessForUser(String staffNo);
	List<Delegation> getApproversOfDelegate(String userId, String facultyCode, String departmentCode, Role role);
}
