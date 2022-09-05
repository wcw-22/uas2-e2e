package sg.edu.nus.prs.domain.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.internalproc.Collection;
import sg.edu.nus.prs.domain.internalproc.CollectionRemark;
import sg.edu.nus.prs.domain.internalproc.CollectionUpdate;
import sg.edu.nus.prs.domain.internalproc.CollectionUpdateForm;
import sg.edu.nus.prs.domain.internalproc.PurchaseCollection;
import sg.edu.nus.prs.domain.internalproc.PurchaseCollectionRemark;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.service.CurrentUserService;
import sg.edu.nus.prs.service.UserDetailService;

@Component
public class CollectionMapper {
	
	private CurrentUserService currentUserService;
	private UserDetailService userDetailService;
	
	@Autowired
	public CollectionMapper(CurrentUserService currentUserService,
			UserDetailService userDetailService) {
		this.currentUserService = currentUserService;
		this.userDetailService = userDetailService;
	}
	
	public CollectionUpdate fromToDomainObject(CollectionUpdateForm collectionUpdateForm) {
		CollectionUpdate collectionUpdate = new CollectionUpdate();
		collectionUpdate.setRequestId(collectionUpdateForm.getRequestId());
		collectionUpdate.setEvent(collectionUpdateForm.getEvent());
		collectionUpdate.setRemark(collectionUpdateForm.getRemark());
		collectionUpdate.setUserNo(currentUserService.currentLoggedInUserNo());
		
		return collectionUpdate;
	}
	
	public CollectionUpdateForm domainToFormObject(CollectionUpdate collectionUpdate) {
		CollectionUpdateForm collectionUpdateForm = new CollectionUpdateForm();
		collectionUpdateForm.setRequestId(collectionUpdate.getRequestId());
		collectionUpdateForm.setEvent(collectionUpdate.getEvent());
		collectionUpdateForm.setRemark(collectionUpdate.getRemark());
		
		return collectionUpdateForm;
	}

	public PurchaseCollection collectionToPurchaseCollection(Collection collection) {
		PurchaseCollection purchaseCollection = new PurchaseCollection();
		purchaseCollection.setCollectionStatus(collection.getCollectionStatus());
		purchaseCollection.setCreated(collection.getCreated());
		purchaseCollection.setId(collection.getId());
		purchaseCollection.setLastModified(collection.getLastModified());
		purchaseCollection.setRequestId(collection.getRequestId());
		purchaseCollection.setRemarks(collectionRemarksToPurchaseCollectionRemark(collection.getRemarks()));
		return purchaseCollection;
	}
	
	public List<PurchaseCollectionRemark> collectionRemarksToPurchaseCollectionRemark (List<CollectionRemark> collectionRemarks) {
		List<PurchaseCollectionRemark> purchaseCollectionRemarks = new ArrayList<>();
		collectionRemarks.forEach(collectionRemark -> {
			PurchaseCollectionRemark purchaseCollectionRemark = new PurchaseCollectionRemark();
			purchaseCollectionRemark.setCollectionId(collectionRemark.getCollectionId());
			purchaseCollectionRemark.setCreated(collectionRemark.getCreated());
			purchaseCollectionRemark.setId(collectionRemark.getId());
			purchaseCollectionRemark.setRemark(collectionRemark.getRemark());
			purchaseCollectionRemark.setStatus(collectionRemark.getStatus());
			
			UserDetail userDetail = userDetailService.getUserByUserNo(collectionRemark.getUserNo());
			if (null != userDetail) {
				purchaseCollectionRemark.setUserName(userDetail.getName());
			}
			purchaseCollectionRemarks.add(purchaseCollectionRemark);
		});
		return purchaseCollectionRemarks;
	}
}
