package sg.edu.nus.prs.domain.mapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.purchase.DeliveryInfo;
import sg.edu.nus.prs.domain.purchase.LineItem;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.PurchaseOrderForm;
import sg.edu.nus.prs.domain.purchase.PurchaseRequestForm;
import sg.edu.nus.prs.domain.purchase.Quotation;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.domain.purchase.RequestType;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.http.sap.domain.po.POBillingAddress;
import sg.edu.nus.prs.http.sap.domain.po.PODeliveryAddress;
import sg.edu.nus.prs.http.sap.domain.po.PODetail;
import sg.edu.nus.prs.http.sap.domain.po.POInformation;
import sg.edu.nus.prs.http.sap.domain.po.POPayment;
import sg.edu.nus.prs.http.sap.domain.po.PORequest;
import sg.edu.nus.prs.http.sap.domain.po.PORequestDocument;
import sg.edu.nus.prs.http.sap.domain.po.PORequestDocumentHeader;
import sg.edu.nus.prs.http.sap.domain.po.POSummary;
import sg.edu.nus.prs.http.sap.domain.po.POSupplierInfomation;
import sg.edu.nus.prs.service.LookupService;
import sg.edu.nus.prs.util.Constants;

@Component
public class PurchaseOrderModelMapper {
	
	private POLineItemModelMapper poLineItemModelMapper;
	private LookupService lookupService;
	private PurchaseOrderChangeEventMapper purchaseOrderChangeEventMapper;
	
	
	@Autowired
	public PurchaseOrderModelMapper(POLineItemModelMapper pOLineItemModelMapper, LookupService lookupService, 
			PurchaseOrderChangeEventMapper purchaseOrderChangeEventMapper) {
		this.poLineItemModelMapper = pOLineItemModelMapper;
		this.lookupService = lookupService;
		this.purchaseOrderChangeEventMapper = purchaseOrderChangeEventMapper;
	}
	
	public List<PurchaseOrder> toDomainObjPurchaseOrders(Request request) {
		
		if(null == request) {
			throw new IllegalStateException("Request not found.");
		}
		
		List<PurchaseOrder> orders = new ArrayList<PurchaseOrder>();
		
		if(RequestType.REQ_TYPE_AOR != request.getRequestType()) {
			Map<Supplier,List<Quotation>> quotationWithAwardedSuppliers = getQuotationWithAwardedSuppliers(request);
			
			if(null != quotationWithAwardedSuppliers) {
				for (Supplier supplier : quotationWithAwardedSuppliers.keySet()) {
					List<Quotation> quotationWithAwardedSupplier  = quotationWithAwardedSuppliers.get(supplier);
					PurchaseOrder order = new PurchaseOrder();
					order.setRequestId(String.valueOf(request.getId()));
					order.setCreatedDate(request.getDateOfRequest());			
					
					if(null != quotationWithAwardedSupplier.get(0).getDeliveryInfo()) {
						DeliveryInfo deliveryInfo = quotationWithAwardedSupplier.get(0).getDeliveryInfo();
						order.setBillingAddress(deliveryInfo.getBillingAddress());			
						order.setDeliveryAddress(toPurchaseOrderDeliveryAddress(request, deliveryInfo));
						
					} else {
						throw new IllegalStateException("Request Delivery Info not found.");
					}	
					
					List<LineItem> lineItems = getLineItemOfQuotations(request, quotationWithAwardedSupplier);
					order.setPoLineItems(poLineItemModelMapper.toDomainObjPOLineItems(lineItems));
					order.setCurrency(lineItems.get(0).getCurrency());
					orders.add(order);
					}
						
				}
				
			} else {
				
				//For AOR more than 15k. PO is saved to DB without delivery information. 
				//Once its imported by SESAMI, PO Status will be changed to "PO_ISSUED_AOR_MORE_15K"
				PurchaseOrder order = new PurchaseOrder();
				order.setRequestId(String.valueOf(request.getId()));
				order.setCreatedDate(request.getDateOfRequest());
				order.setCurrency(request.getCurrency());
				orders.add(order);
			}
		
		return orders;
		
	}
	
	private Map<Supplier, List<Quotation>> getQuotationWithAwardedSuppliers(Request request) {
		List<Quotation> quotations = request.getQuotations();
		
		if(CollectionUtils.isNotEmpty(quotations)) {
			
			Map<Supplier, List<Quotation>> quotationWithAwardedSuppliers = quotations.stream()
			.filter(q -> q.getAwardFlag())
			.collect(Collectors.groupingBy(Quotation::getSupplier));
			
			return quotationWithAwardedSuppliers;
			
		}
		return null;
	}
	
	private List<LineItem> getLineItemOfQuotations(Request request, List<Quotation> quotations) {
		List<LineItem> lineItems = new  ArrayList<LineItem>();
		for (Quotation quotation : quotations) {
			lineItems.addAll(request.getLineItems().stream()
					.filter(l -> StringUtils.isNotBlank(l.getQuotationId()) && l.getQuotationId().equalsIgnoreCase(quotation.getId()))
					.collect(Collectors.toList()));
		}
		return lineItems;
		
	}
	
	/*
	public PurchaseOrder toDomainObjPurchaseOrder(Request request) {
		
		if(null == request) {
			throw new IllegalStateException("Request not found.");
		}
		
		PurchaseOrder order = new PurchaseOrder();
		order.setRequestId(String.valueOf(request.getId()));
		order.setCreatedDate(request.getDateOfRequest());	
		
		if(RequestType.REQ_TYPE_AOR != request.getRequestType()) {
			if(null != request.getDeliveryInfo()) {
				DeliveryInfo deliveryInfo = request.getDeliveryInfo();
				order.setBillingAddress(deliveryInfo.getBillingAddress());			
				order.setDeliveryAddress(toPurchaseOrderDeliveryAddress(deliveryInfo));
				
			} else {
				throw new IllegalStateException("Request Delivery Info not found.");
			}
			order.setPoLineItems(poLineItemModelMapper.toDomainObjPOLineItems(request.getLineItems()));
		}
		
		return order;
		
	} */

	public PORequest toIntObjPOCreationRequest(PurchaseOrder purchaseOrder, Request request) {
		
		PORequestDocumentHeader header = new PORequestDocumentHeader();
		header.setDocumentType(Constants.PORequestDocumentType.PO_CREATION);
		header.setHubID(Constants.PORequest.HUB_ID);
		header.setDocumentID(purchaseOrder.getpId());
		header.setOrderInformation(toIntObjPOInformation(request));
		header.setPayment(toIntObjPOPayment(purchaseOrder, request));
		header.setBillTo(toIntObjPOBillingAddress(purchaseOrder));
		header.setShipTo(toIntObjPODeliveryAddress(purchaseOrder));
		header.setSupplierInfo(toIntObjPOSupplierInfomation(purchaseOrder, request));
				
		PORequest purchaseOrderRequest = new PORequest();
		PORequestDocument document = new PORequestDocument();
		document.setHeader(header);
		document.setDetail(toIntObjPODetail(request, purchaseOrder));
		document.setSummary(toIntObjPOSummary(purchaseOrder));
		
		purchaseOrderRequest.setDocument(document);
		
		return purchaseOrderRequest;
	}
	
	public PurchaseOrderForm domainObjectToFormObject(PurchaseOrder domainObj) {
		PurchaseOrderForm poForm = new PurchaseOrderForm();
		poForm.setId(domainObj.getpId());
		poForm.setSapPONumber(domainObj.getSapPONumber());
		poForm.setBillingAddress(domainObj.getBillingAddress());
		poForm.setDeliveryAddress(domainObj.getDeliveryAddress());
		poForm.setStatus(domainObj.getStatusCode());
		poForm.setRemarks(domainObj.getRemarks());
		poForm.setRecCreateDate(domainObj.getCreatedDate());
		poForm.setLineItems(this.poLineItemModelMapper.domainObjectToForm(domainObj.getPoLineItems()));
		poForm.setPoChangeEvents(this.purchaseOrderChangeEventMapper.toPurchaseOrderChangeEvents(domainObj.getPurchaseOrderChangeEvents()));
		poForm.setSupplier(domainObj.getSupplier());
		return poForm;
	}
	
	public void domainObjectToForm(PurchaseRequestForm form, List<PurchaseOrder> poList) {		
		 if (CollectionUtils.isNotEmpty(poList) ){				 
			 List<PurchaseOrderForm> purchaseOrderFormList = poList.stream()
						.map(this::domainObjectToFormObject)
						.collect(Collectors.toList());			
			 form.setPurchaseOrderList(purchaseOrderFormList);			 
	  }
	}
	

	
	private String toPurchaseOrderDeliveryAddress(Request request, DeliveryInfo deliveryInfo) {

		if (null == deliveryInfo) {
			throw new IllegalStateException("Request Delivery Info not found.");
		}

		List<String> deliveryAddressParts = new ArrayList<String>();
		
		if (StringUtils.isNotEmpty(deliveryInfo.getQuotationReferenceNumber())) {
			deliveryAddressParts.add(deliveryInfo.getQuotationReferenceNumber());
		}
		
		if (StringUtils.isNotEmpty(deliveryInfo.getDeliveryAddress())) {
			deliveryAddressParts.add(deliveryInfo.getDeliveryAddress());
		}
		if (null != request.getDeliveryInfo() && StringUtils.isNotEmpty(request.getDeliveryInfo().getRequestorName())) {
			deliveryAddressParts.add(request.getDeliveryInfo().getRequestorName());
		}
		if (StringUtils.isNotEmpty(deliveryInfo.getRequestorPhone())) {
			deliveryAddressParts.add(deliveryInfo.getRequestorPhone());
		}
		if (StringUtils.isNotEmpty(deliveryInfo.getRequestorEmail())) {
			deliveryAddressParts.add(deliveryInfo.getRequestorEmail());
		}
		if (StringUtils.isNotEmpty(deliveryInfo.getInstructionToSupplier())) {
			deliveryAddressParts.add(deliveryInfo.getInstructionToSupplier());
		}
		
		return CollectionUtils.isNotEmpty(deliveryAddressParts) ? String.join(Constants.PO_SEPERATOR, deliveryAddressParts) : "";
	}
	
	private POInformation toIntObjPOInformation(Request request) {
		POInformation poInformation = new POInformation();
		
		Faculty faculty = request.getFacultyDepartment();
		if(null == faculty || CollectionUtils.isEmpty(faculty.getDepartments())) {
			throw new IllegalStateException("Request department not found.");
		}
		
		String requestDepartment = StringUtils.stripStart(faculty.getDepartments().get(0).getSapDepartment(), "0");
		
		
		/*FOR CDE Merger - to be removed once new codes will be done by FS2
		Map<String, String> oldNewDeptMap = getDeptCodeMapping();
		
		if(StringUtils.isNotBlank(requestDepartment) && oldNewDeptMap.values().contains(requestDepartment)) {
			for (Entry<String, String> entry : oldNewDeptMap.entrySet()) {
				if(Objects.equals(entry.getValue(), requestDepartment)) {
					requestDepartment = entry.getKey();
					break;
				}
			}
		}
		//FOR CDE Merger - to be removed once new codes will be done by FS2
		 */
		
		poInformation.setBusinessUnitCode(StringUtils.isNotBlank(requestDepartment) && requestDepartment.length() < 3
				? String.format("%03d", Integer.parseInt(requestDepartment))
				: requestDepartment);
		
		poInformation.setBusinessUnit("");
		poInformation.setPurchaseOrderNumber(request.getRequestNo());
		poInformation.setSapPONumber("");
		
		SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.PROCUREMENT_DATE_FORMAT);
		if (request.getDateOfRequest() != null) {
			poInformation.setPurchaseOrderDate(dateFormat.format(request.getDateOfRequest()));
		}
		
		poInformation.setPurchaseOrderType(Constants.PORequest.ORDER_TYPE);
		
		return poInformation;
		
	}
	
	private POPayment toIntObjPOPayment(PurchaseOrder po, Request request) {
		POPayment poPayment = new POPayment();

		List<String> prlineItemIds = po.getPoLineItems().stream().map(poli -> poli.getPrLineitemId())
				.collect(Collectors.toList());
		
		if (CollectionUtils.isNotEmpty(prlineItemIds)) {
			
			Optional<LineItem> prLineItem = request.getLineItems().stream().filter(
					li -> null != li && StringUtils.isNotBlank(li.getId()) && prlineItemIds.contains(li.getId()))
					.findFirst();

			if (prLineItem.isPresent()) {
				// All PR line items will have same quotation id, since all belong to same supplier.
				LineItem lineItem = prLineItem.get();
				if(null != lineItem) {
					poPayment.setCurrency(po.getCurrency().getCode());
					Optional<Quotation> quotation = request.getQuotations().stream()
							.filter(q -> null != q && q.getId().equalsIgnoreCase(lineItem.getQuotationId())).findFirst();
					if(quotation.isPresent()) {
						poPayment.setTermsOfPayment(quotation.get().getDeliveryInfo().getPaymentTerm().getCode());
					}
				}
			}			
		}
		
		return poPayment;
	}
	
	private POBillingAddress toIntObjPOBillingAddress(PurchaseOrder po) {
		
		POBillingAddress billingAddress = new POBillingAddress();
		billingAddress.setBillingAddress(po.getBillingAddress());
		
		return billingAddress;
		
	}
	
	private PODeliveryAddress toIntObjPODeliveryAddress(PurchaseOrder po) {
		
		PODeliveryAddress deliveryAddress = new PODeliveryAddress();
		deliveryAddress.setDeliveryAddress(po.getDeliveryAddress());
		
		return deliveryAddress;
		
	}
	
	private POSummary toIntObjPOSummary(PurchaseOrder purchaseOrder) {
		
		BigDecimal totalAmount = purchaseOrder.getPoLineItems().stream().map(l -> l.getTotalAmount())
				.reduce(BigDecimal.ZERO, BigDecimal::add);
		
		POSummary summary = new POSummary();
		summary.setTotalAmount(totalAmount.setScale(2, RoundingMode.HALF_UP).toPlainString());
		summary.setTotalLineItems(String.valueOf(purchaseOrder.getPoLineItems().size()));
		
		return summary;
	}
	
	private POSupplierInfomation toIntObjPOSupplierInfomation(PurchaseOrder po, Request request) {
		
		POSupplierInfomation supplierInfo = new POSupplierInfomation();
		
		List<String> prlineItemIds = po.getPoLineItems().stream().map(poli -> poli.getPrLineitemId())
				.collect(Collectors.toList());
		
		if (CollectionUtils.isNotEmpty(prlineItemIds)) {
			
			Optional<LineItem> prLineItem = request.getLineItems().stream().filter(
					li -> null != li && StringUtils.isNotBlank(li.getId()) && prlineItemIds.contains(li.getId()))
					.findFirst();

			if (prLineItem.isPresent()) {
				// All PR line items will have same quotation id, since all belong to same supplier.
				LineItem lineItem = prLineItem.get();
				if(null != lineItem) {
					Optional<Quotation> quotation = request.getQuotations().stream()
							.filter(q -> null != q && q.getId().equalsIgnoreCase(lineItem.getQuotationId())).findFirst();
					if(quotation.isPresent()) {
						supplierInfo.setSupplierCompanyCode(quotation.get().getSupplier().getSupplierCode());
					}
				}
			}			
		}
		
		return supplierInfo;
	}
	
	private PODetail toIntObjPODetail(Request request,PurchaseOrder purchaseOrder) {
		
		PODetail orderDetail = new PODetail();
		orderDetail.setLineItems(poLineItemModelMapper.toIntObjPOLineItem(request, purchaseOrder));
		
		return orderDetail;
	}
	
}
