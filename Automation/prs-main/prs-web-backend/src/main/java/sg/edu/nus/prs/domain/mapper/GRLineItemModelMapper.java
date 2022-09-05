package sg.edu.nus.prs.domain.mapper;

import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.GoodsReceiptInventoryItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptLineItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptFormLineItem;
import sg.edu.nus.prs.domain.purchase.POLineItem;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.http.sap.domain.gr.GRItem;

@Component
public class GRLineItemModelMapper {
	
	public List<GRItem> toGRItems(List<GoodsReceiptLineItem> lineItems, PurchaseOrder po) {
		List<GRItem> items = lineItems.stream()
				.filter(l -> null != l.getQuantity())
				.map(l -> this.toGRItem(l, po))
				.collect(Collectors.toList());
		return items;
	}

	public GRItem toGRItem(GoodsReceiptLineItem lineItem, PurchaseOrder po) {
		GRItem item = new GRItem();
		item.setItemNo(lineItem.getId());
		item.setReceivedQuantity(lineItem.getQuantity().setScale(3, RoundingMode.HALF_UP).toPlainString());
		
		if(CollectionUtils.isNotEmpty(po.getPoLineItems())) {
			Optional<POLineItem> poLineItem = po.getPoLineItems().stream()
					.filter(l -> l.getId().equals(lineItem.getPOLineItemId())).findFirst();
			if(poLineItem.isPresent()) {
				item.setPoItemNo(poLineItem.get().getLineNo());
			}
		}	
		
		return item;
	}
	

	public GoodsReceiptFormLineItem domainObjectToForm(GoodsReceiptLineItem lineItem) {
		GoodsReceiptFormLineItem formLineItem = new GoodsReceiptFormLineItem();
		
		formLineItem.setLineNo(lineItem.getLineItemNo());
		formLineItem.setQuantity(lineItem.getQuantity());
		formLineItem.setId(lineItem.getPOLineItemId());
		formLineItem.setInventoryQuantity(lineItem.getInventoryQuantity());
		
		return formLineItem;
	}
	
	public GoodsReceiptLineItem  formToDomainObject(GoodsReceiptFormLineItem formLineItem) {
		GoodsReceiptLineItem lineItem = new GoodsReceiptLineItem();
		
		lineItem.setLineItemNo(formLineItem.getLineNo());
		lineItem.setQuantity(formLineItem.getReceivedQuantity());
		lineItem.setRemarks(formLineItem.getComment());
		lineItem.setPOLineItemId(formLineItem.getId());
		lineItem.setPrLineItemNo(formLineItem.getPrLineitemId());
		
		return lineItem;
	}

}
