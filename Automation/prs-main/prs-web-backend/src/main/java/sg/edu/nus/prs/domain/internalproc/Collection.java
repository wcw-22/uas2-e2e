package sg.edu.nus.prs.domain.internalproc;

import java.util.Date;
import java.util.List;

import sg.edu.nus.prs.domain.periodcontract.PeriodContractUtilisation;

public class Collection {

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

	public List<CollectionRemark> getRemarks() {
		return remarks;
	}

	public void setRemarks(List<CollectionRemark> remarks) {
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

	public String getLastModifiedByStaffNumber() {
		return lastModifiedByStaffNumber;
	}
	public void setLastModifiedByStaffNumber(String lastModifiedByStaffNumber) {
		this.lastModifiedByStaffNumber = lastModifiedByStaffNumber;
	}

	public List<PeriodContractUtilisation> getContractUtilisations() {
		return contractUtilisations;
	}
	public void setContractUtilisations(List<PeriodContractUtilisation> contractUtilisations) {
		this.contractUtilisations = contractUtilisations;
	}
	
	private String id;
	private String requestId;
	private CollectionStatus collectionStatus;
	private List<CollectionRemark> remarks;
	private Date created;
	private Date lastModified;
	private String lastModifiedByStaffNumber;
	private List<PeriodContractUtilisation> contractUtilisations;
}
