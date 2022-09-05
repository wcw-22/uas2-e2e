package sg.edu.nus.prs.dao;

import java.text.ParseException;
import java.util.List;

import sg.edu.nus.prs.domain.common.Location;
import sg.edu.nus.prs.domain.purchase.*;
import sg.edu.nus.prs.domain.user.Role;
import sg.edu.nus.prs.domain.util.PagedData;


public interface RequestDao {
	
    boolean updateRequestStatus(Request request, String updateUserNo);
    
    boolean updateRequestSubmittedDate(Request request, String updateUserNo);

	Request save(Request pr);

	List<LineItem> getPurchaseLineItems(String prId) throws Exception;

	Request getRequest(RequestSearchInput input);

	List<Quotation> getPurchaseQuotations(String prId) throws Exception;

	List<SystemCheck> getPurchaseSystemChecks(String prId) throws Exception;
	
	Document getDocumentById(String id);

    String getRequestForDocumentId(String documentId);

    Location getPurchaseRequestLocation(String requestId);

    Request loadRequestDocuments(Request request);

    PagedData<PurchaseRequest> searchRequest(PurchaseRequestSearchForm input, List<String> faculties, List<String> department, String requestorNo, Role role) throws ParseException;

    boolean lockRequest(String requestId);
    
    List<PurchaseApproval> getApprovalsForRequestIds(List<String> requestIds);
	
    PurchaseApproval insertApprovalStatus(PurchaseApproval purchaseApproval);
	
	PurchaseApproval updateApprovalStatus(PurchaseApproval purchaseApproval);

	int deletePurchaseRequest(String requestNumber, String updateUserId);
	
	List<PurchaseRequest> getPendingItems(String roUserNo, String goUserNo,  String requestorUserNo, String approverStaffNo, Role currentRole);
	
	List<PurchaseRequest> getPendingItemsOfLabSupplyOfficer(String goUserNo, Role currentRole);

    List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfo(List<String> chemicalNames, String locationId, String inventoryOwnerStaffNo);
    
    List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfoRadio(String radionuclides, String sourceTypes, String locationId, String inventoryOwnerStaffNo);
    
    List<PendingGoodsReceiptInfo> getPendingGoodsReceiptInfoBio(String biologicalMatName, String scientificName, String strain, String locationId, String inventoryOwnerStaffNo);

	List<Request> fetchPendingPRList(String todaysDateStr, long reminderemailWaitingdays);

	List<Document> getRequestDocuments(String prId);

	List<ApprovedAccountLimit> getApprovedAccountLimits(String prId);

	void updateProductRefId(Product prod);

    List<Request> getSQRRForAOR(String aorRequestId);

    String getAORIdForSQRR(String sqrrRequestNo);

	int reRoute(String id, String newApproverId, String authorizingId, String remarks, String updateId);

	void deleteDraft(String requestId);

    boolean isRequestInternalProcurement(Request request);
}
