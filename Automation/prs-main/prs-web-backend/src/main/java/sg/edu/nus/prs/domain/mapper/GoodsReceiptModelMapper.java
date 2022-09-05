package sg.edu.nus.prs.domain.mapper;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.GRType;
import sg.edu.nus.prs.domain.purchase.GoodsReceipt;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptForm;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptFormLineItem;
import sg.edu.nus.prs.domain.purchase.GoodsReceiptFormOrder;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.http.sap.domain.gr.GRDetail;
import sg.edu.nus.prs.http.sap.domain.gr.GRRequest;
import sg.edu.nus.prs.http.sap.domain.gr.GRRequestDocument;
import sg.edu.nus.prs.http.sap.domain.gr.GRRequestDocumentHeader;
import sg.edu.nus.prs.service.UserDetailService;
import sg.edu.nus.prs.util.Constants;

@Component
public class GoodsReceiptModelMapper {

	private GRLineItemModelMapper grLineItemModelMapper;
	private UserDetailService userDetailService;

	@Autowired
	public GoodsReceiptModelMapper(GRLineItemModelMapper grLineItemModelMapper, UserDetailService userDetailService) {
		this.grLineItemModelMapper = grLineItemModelMapper;
		this.userDetailService = userDetailService;
	}

	public GRRequest toGRCreationRequest(GoodsReceipt gr, PurchaseOrder po, Request request) {

		if (null == gr.getType()) {
			throw new IllegalStateException("Invalid GR Type");
		}
		
		GRRequest grRequest = new GRRequest();
		GRRequestDocument document = new GRRequestDocument();
		GRRequestDocumentHeader header = new GRRequestDocumentHeader();
		GRDetail detail = new GRDetail();

		header.setDocumentID(request.getRequestNo());

		if (GRType.GR_GRS == gr.getType()) {
			header.setDocumentType(Constants.PORequestDocumentType.PO_GOODS_RECEIPT);
		} else if (GRType.GR_GRN == gr.getType()) {
			header.setDocumentType(Constants.PORequestDocumentType.PO_GOODS_RETURN);
		}

		header.setDoNo(gr.getDeliveryOrderNo());
		header.setHubID(Constants.PORequest.HUB_ID);
		header.setGrNo(gr.getId());

		SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.PROCUREMENT_DATE_FORMAT);
		header.setGrDate(dateFormat.format(gr.getReceivedDate()));
		header.setOrderNo(po.getSapPONumber());
		header.setGrStatus(StringUtils.EMPTY);
		header.setSapGRNo(StringUtils.EMPTY);
		
		UserDetail userDetail = userDetailService.getUserByUserNo(gr.getCreateUserNo());
		if(null == userDetail) {
			throw new IllegalStateException("GR Officer's user details not found.");
		}
		header.setGrOfficer(userDetail.getName());		
		detail.setLineItems(grLineItemModelMapper.toGRItems(gr.getLineItems(), po));
		
		document.setHeader(header);
		document.setDetail(detail);
		
		grRequest.setDocument(document);

		return grRequest;

	}
	
	public GoodsReceiptForm domainObjectToForm(List<GoodsReceipt> grList) {
	    if (null == grList) return null;
	    
	    GoodsReceiptForm form = new GoodsReceiptForm();
	    //Map property

	    List<GoodsReceiptFormOrder> grOrderList = new ArrayList<GoodsReceiptFormOrder>();
	    form.setGrOrders(grOrderList);
	    for(GoodsReceipt gr : grList) {
	    	if (null == gr) continue;
	    	
		    form.setType(gr.getType());
		    form.setDeliveryOrderNo(gr.getDeliveryOrderNo());
		    form.setReceivedDate(gr.getReceivedDate());
		    GoodsReceiptFormOrder grOrder = new GoodsReceiptFormOrder();
	    
		    grOrder.setPoNo(gr.getPoNo());
		    grOrder.setPoId(gr.getPOId());
		    form.setId(gr.getId());
		    
		    //Map each lineitem
		    if (CollectionUtils.isNotEmpty( gr.getLineItems())) {
		    	grOrder.setGrLineItems(new ArrayList<GoodsReceiptFormLineItem>());
		    	
		    	gr.getLineItems().forEach(item -> {
		    		grOrder.getGrLineItems().add(this.grLineItemModelMapper.domainObjectToForm(item));
		    	});	    	
		    }
		    grOrderList.add(grOrder);
	    }
	    return form;
	}
	
	public List<GoodsReceipt> formToDomainObject(GoodsReceiptForm form) {
		if (null == form) return null;
		List<GoodsReceipt> grList = new ArrayList<GoodsReceipt>();
		
		for(GoodsReceiptFormOrder grOrder : form.getGrOrders()) {
			if(StringUtils.isEmpty(grOrder.getSapPONumber())) continue;
			GoodsReceipt gr = new GoodsReceipt();
			
			gr.setReceivedDate(form.getReceivedDate());
			gr.setType(form.getType()); 
			
			gr.setDeliveryOrderNo(form.getDeliveryOrderNo());
			gr.setPoNo(grOrder.getPoNo());
			gr.setPOId(grOrder.getPoId());
			gr.setId(form.getId());
			
			if (CollectionUtils.isNotEmpty(grOrder.getGrLineItems())) {
				grOrder.getGrLineItems().stream().filter(
						i -> null != i.getReceivedQuantity() && i.getReceivedQuantity().compareTo(BigDecimal.ZERO) > 0)
						.forEach(item -> {
							gr.getLineItems().add(this.grLineItemModelMapper.formToDomainObject(item));
						});
			}
			if(CollectionUtils.isEmpty(gr.getLineItems())) continue;
			grList.add(gr);
		}
		return grList;
	}

}
