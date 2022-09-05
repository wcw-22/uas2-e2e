package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import sg.edu.nus.prs.domain.purchase.GoodsReceipt;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptFormLineItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptInventoryItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptLineItem;

public interface GoodsReceiptDAO {	
	public GoodsReceipt getGoodsReceiptSummary(String id);
	public List<GoodsReceiptLineItem> getGoodsReceiptLineItems(String id);
	public GoodsReceipt saveGoodsReceiptAck(GoodsReceipt gr);
	public GoodsReceipt saveGoodsReceipt(GoodsReceipt gr);
	public List<GoodsReceiptFormLineItem> getGoodsReceiptLineItemsByPONumber(String poNo);
	public GoodsReceiptInventoryItem saveLMMSInventoryContainers(GoodsReceiptInventoryItem invtItem);
	public List<GoodsReceiptInventoryItem> getGRInventoryItems(String grId);
	public int updateGRInventoryItemStatus(List<GoodsReceiptInventoryItem> items);
	public GoodsReceipt getToBeCreatedGoodsReceipt(String poId);
	public boolean hasPendingGoodsReceipt(String poId);
	public int updateGoodsReceiptSummary(GoodsReceipt gr);
	public BigDecimal getTotalGRQuantityByPOLineitem(String poLineitemId);
	public Optional<BigDecimal> getInventoryQuantityByPOLineitem(String poLineitemId);
	public void addInventoryQuantity(BigDecimal quantity, String poLineitemId, String grLineitemId);
	
	public String getRecentGROBySAPPONumber(String sapPoNumber);
}
