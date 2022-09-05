package sg.edu.nus.prs.dao;

import java.util.List;
import java.util.Map;

import sg.edu.nus.prs.domain.purchase.GRStatus;
import sg.edu.nus.prs.domain.purchase.POLineItem;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;

public interface PurchaseOrderDAO {
	
	public PurchaseOrder addPurchaseOrder(PurchaseOrder po);
	
	public PurchaseOrder savePurchaseOrderAck(PurchaseOrder po);
	
	public PurchaseOrder updatePurchaseOrder(PurchaseOrder po);
	
	public PurchaseOrder updatePurchaseOrderStatus(PurchaseOrder po);	
	
	public PurchaseOrder getPurchaseOrderSummary(String poId);
	
	public List<POLineItem> getPOLineItems(String poId);
	
	public Map<String, List<POLineItem>> getPOLineItemsWithSupplier(String poId);
	
	public List<PurchaseOrder> getPurchaseOrderSummaryByRequestNo(String requestNo);

	public void updateDeliveryComplete(String poId, List<String> lineItemIDs, GRStatus gRStatus);
}
