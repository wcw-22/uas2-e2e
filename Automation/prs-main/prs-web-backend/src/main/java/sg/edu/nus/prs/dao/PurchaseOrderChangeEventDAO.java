package sg.edu.nus.prs.dao;

import java.util.List;

import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.PurchaseOrderChangeEvent;

public interface PurchaseOrderChangeEventDAO {
	
	List<PurchaseOrderChangeEvent> getPurchaseOrderChangeEvents(String poId);
	
	public void addPurchaseOrderChangeEvents(PurchaseOrder po);
	
	
}
