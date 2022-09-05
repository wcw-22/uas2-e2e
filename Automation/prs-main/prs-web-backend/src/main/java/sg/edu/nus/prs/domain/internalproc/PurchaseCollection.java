package sg.edu.nus.prs.domain.internalproc;

import java.util.Date;
import java.util.List;

public class PurchaseCollection {

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public CollectionStatus getCollectionStatus() {
		return collectionStatus;
	}
	public void setCollectionStatus(CollectionStatus collectionStatus) {
		this.collectionStatus = collectionStatus;
	}
	public String getRequestId() {
		return requestId;
	}
	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public List<PurchaseCollectionRemark> getRemarks() {
		return remarks;
	}

	public void setRemarks(List<PurchaseCollectionRemark> remarks) {
		this.remarks = remarks;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	private String id;
	private String requestId;
	private CollectionStatus collectionStatus;
	private List<PurchaseCollectionRemark> remarks;
	private Date created;
	private Date lastModified;
}
