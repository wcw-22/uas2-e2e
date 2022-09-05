package sg.edu.nus.prs.domain.mapper;

import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.ChemicalGrade;
import sg.edu.nus.prs.domain.common.ConcentrationUnit;
import sg.edu.nus.prs.domain.common.NotationType;
import sg.edu.nus.prs.domain.common.PhyForm;
import sg.edu.nus.prs.domain.common.UnitMsr;
import sg.edu.nus.prs.domain.purchase.AccountAssignment;
import sg.edu.nus.prs.domain.purchase.LineItem;
import sg.edu.nus.prs.domain.purchase.Manufacturer;
import sg.edu.nus.prs.domain.purchase.POITemStatusType;
import sg.edu.nus.prs.domain.purchase.POLineItem;
import sg.edu.nus.prs.domain.purchase.POLineItemForm;
import sg.edu.nus.prs.domain.purchase.Product;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.Quotation;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalAgent;
import sg.edu.nus.prs.domain.purchase.biological.BiologicalConcentrationUnit;
import sg.edu.nus.prs.domain.purchase.catalog.ChemicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.productdetails.AdditionalChargeProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.BiologicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.RadioactiveProductDetail;
import sg.edu.nus.prs.http.sap.domain.po.POAccountAssignment;
import sg.edu.nus.prs.http.sap.domain.po.POItem;
import sg.edu.nus.prs.service.LookupService;
import sg.edu.nus.prs.util.Constants;

@Component
public class POLineItemModelMapper {

	private LookupService lookupService;

	@Autowired
	public POLineItemModelMapper(LookupService lookupService) {
		this.lookupService = lookupService;
	}

	public List<POLineItem> toDomainObjPOLineItems(List<LineItem> lineItems) {
		
		if(CollectionUtils.isEmpty(lineItems)) {
			throw new IllegalStateException("LineItem list not found.");
		}
		
		int[] lineNo = { 1 };

		List<POLineItem> poItems = lineItems.stream().map(l -> this.toDomainObjPoLineItem(l, lineNo[0]++))
				.collect(Collectors.toList());
		return poItems;

	}

	public POLineItem toDomainObjPoLineItem(LineItem lineItem, int lineNo) {

		POLineItem item = new POLineItem();
		item.setLineNo(String.format("%05d", lineNo));
		item.setUnit(lineItem.getUnit());
		item.setItemDescription(toItemDescription(lineItem));
		item.setUnitPrice(lineItem.getUnitPrice());
		item.setQuantity(lineItem.getQuantity());
		item.setTotalAmount(lineItem.getSubTotal());
		item.setPrLineitemId(lineItem.getId());
		item.setDownpaymentPercentage(lineItem.getDownpaymentPercentage());
		item.setDownpaymentAmount(lineItem.getDownpaymentAmount());
		item.setDownpaymentDueDate(lineItem.getDownpaymentDueDate());		

		return item;

	}
	
	// to convert PO and Request to POCreation Request
	public List<POItem> toIntObjPOLineItem(Request request, PurchaseOrder po) {

		if (CollectionUtils.isEmpty(po.getPoLineItems())) {
			throw new IllegalStateException("PO LineItems not found.");
		}

		List<POItem> poItems = po.getPoLineItems().stream().map(l -> this.toIntObjPOLineItem(request, l))
				.collect(Collectors.toList());
		return poItems;

	}
	
	public List<POLineItemForm> domainObjectToForm(List<POLineItem> lineItems) {
		if(CollectionUtils.isEmpty(lineItems)) {
			return Collections.emptyList();
		}

		List<POLineItemForm> poItems = lineItems.stream().map(l -> this.domainObjectToForm(l))
				.collect(Collectors.toList());
		return poItems;
	}
	
	private POLineItemForm domainObjectToForm(POLineItem lineItem) {
		POLineItemForm lineItemForm = new POLineItemForm();
		lineItemForm.setId(lineItem.getId());
		lineItemForm.setItemDescription(lineItem.getItemDescription());
		lineItemForm.setLineNo(lineItem.getLineNo());
		lineItemForm.setQuantity(lineItem.getQuantity());
		lineItemForm.setUnit(lineItem.getUnit().getDescription());
		lineItemForm.setTotalAmount(lineItem.getTotalAmount());
		lineItemForm.setRemarks(lineItem.getRemarks());
		lineItemForm.setDeliveryCompleted(lineItem.getDeliveryCompleted());
		lineItemForm.setPrLineitemId(lineItem.getPrLineitemId());

		return lineItemForm;
	}

	private String toItemDescription(LineItem lineItem) {

		if (null == lineItem) {
			throw new IllegalStateException("LineItem not found.");
		}

		String itemDescription = "";
		Product product = lineItem.getProduct();

		if (null != product) {
			switch (product.getCategoryCode()) {
			case PRODUCT_CHEMICAL:
				itemDescription = toChemicalItemDescription(product);
				break;
			case PRODUCT_RADIOACTIVE:
				itemDescription = toRadioactiveItemDescription(product);
				break;
			case PRODUCT_ADDITIONAL_CHARGE:
				AdditionalChargeProductDetail acpd = (AdditionalChargeProductDetail) product.getProductDetail();
				itemDescription = acpd.getDescription();
				break;
			case PRODUCT_BIOLOGICAL:
				itemDescription = toBiologicalItemDescription(product);
				break;
			default:
				break;
			}

		}
		
		List<String> contractItemDescription = new ArrayList<> ();
		
		if(StringUtils.isNotEmpty(itemDescription) && StringUtils.isNotEmpty(lineItem.getContractNumber())) {
			contractItemDescription.add(itemDescription);
			contractItemDescription.add(Constants.PORequest.CONTRACT_NO + lineItem.getContractNumber());
			itemDescription = String.join(Constants.PO_SEPERATOR, contractItemDescription);
		}

		return StringUtils.isNotEmpty(itemDescription) ? itemDescription.toUpperCase(Locale.getDefault()) : "";

	}
	
	private String toChemicalItemDescription(Product product) {
		ChemicalCatalogItem catalogItem = chemicalProductDetailToCatalogItem(product);

		if (StringUtils.isEmpty(product.getProductRefId())) {
			
				// Convert various codes to the proper representations.
				Map<String, PhyForm> phyFormMap = this.lookupService.getPhysicalForms().stream()
						.collect(Collectors.toMap(PhyForm::getCode, Function.identity()));
				Map<String, UnitMsr> unitMsrMap = this.lookupService.getUnitMeasures().stream()
						.collect(Collectors.toMap(UnitMsr::getCode, Function.identity()));

				if (catalogItem.getOriginalQuantityUnit() != null
						&& StringUtils.isNotEmpty(catalogItem.getOriginalQuantityUnit().getCode())) {
					catalogItem.setOriginalQuantityUnit(
							unitMsrMap.get(catalogItem.getOriginalQuantityUnit().getCode()));
				}

				if (catalogItem.getPhysicalForm() != null
						&& StringUtils.isNotEmpty(catalogItem.getPhysicalForm().getCode())) {
					catalogItem.setPhysicalForm(phyFormMap.get(catalogItem.getPhysicalForm().getCode()));
				}
				
		} else {
				ChemicalProductDetail productDetail = (ChemicalProductDetail) product.getProductDetail();
				ChemicalCatalogItem catItem = productDetail.toCatalogItem();
				catalogItem = null != catItem ? catItem : catalogItem;
		}

		String packagingSize = "";
		
		if(null != catalogItem.getOriginalQuantity() && null != catalogItem.getOriginalQuantityUnit()) {
			packagingSize = String.join(" ", Arrays.asList(catalogItem.getOriginalQuantity().toPlainString(),
					catalogItem.getOriginalQuantityUnit().getDescription()));
		}

		List<String> chemicalItemDescription = new ArrayList<> ();
		
		chemicalItemDescription.add(catalogItem.getChemicalName());
		
		if(StringUtils.isNotEmpty(catalogItem.getProductManufacturerNumber())) {
			chemicalItemDescription.add(catalogItem.getProductManufacturerNumber());
		}
		
		if(StringUtils.isNotEmpty(packagingSize)) {
			chemicalItemDescription.add(packagingSize);
		}
		
		if(null != catalogItem.getPhysicalForm()) {
			chemicalItemDescription.add(catalogItem.getPhysicalForm().getDescription());
		}
		
		if (CollectionUtils.isNotEmpty(catalogItem.getCasNumbers())) {
			chemicalItemDescription.addAll(catalogItem.getCasNumbers());
		}

		return String.join(Constants.PO_SEPERATOR, chemicalItemDescription);

	}
	
	private String toRadioactiveItemDescription(Product product) {
		List<String> radioactiveItemDescription = new ArrayList<> ();
		RadioactiveProductDetail radioactiveProductDetail = (RadioactiveProductDetail) product.getProductDetail();
		if(null != radioactiveProductDetail) {
			if(StringUtils.isNotBlank(radioactiveProductDetail.getRadionuclideName())) {
				radioactiveItemDescription.add(radioactiveProductDetail.getRadionuclideName());
			}
			if(StringUtils.isNotEmpty(radioactiveProductDetail.getSourceType().getDescription())) {
				radioactiveItemDescription.add(radioactiveProductDetail.getSourceType().getDescription());
			}
			if(CollectionUtils.isNotEmpty(radioactiveProductDetail.getActivity())) {
				radioactiveProductDetail.getActivity().forEach(a -> {
					if(NotationType.REAL_NUMBER_FORM == a.getActivity().getNotationType()) {
						//activity
						radioactiveItemDescription.add(a.getActivity().getReal().toPlainString());
						radioactiveItemDescription.add(a.getActivityUnit().getAbbreviation());
						
					} else if(NotationType.SCIENTIFIC_FORM == a.getActivity().getNotationType()) {
						//activity
						radioactiveItemDescription.add(a.getActivity().getCoefficient() + "X" + a.getActivity().getBase() + 
								Constants.EXPONENT_OPERATOR + a.getActivity().getExponent().toPlainString());
						radioactiveItemDescription.add(a.getActivityUnit().getAbbreviation());
					}
					if(null != a.getConcentration()) {
						if(NotationType.REAL_NUMBER_FORM == a.getConcentration().getNotationType()) {
							//activity concentration
							radioactiveItemDescription.add(a.getConcentration().getReal().toPlainString());
							radioactiveItemDescription.add(a.getConcentrationUnit().getAbbreviation());
						} else if(NotationType.SCIENTIFIC_FORM == a.getConcentration().getNotationType()) {
							//concentration
							radioactiveItemDescription.add(a.getConcentration().getCoefficient() + "X" + a.getConcentration().getBase() + 
									Constants.EXPONENT_OPERATOR + a.getConcentration().getExponent().toPlainString());
							radioactiveItemDescription.add(a.getConcentrationUnit().getAbbreviation());
						}
					}
						
					
					
				});				
			
			}
			if(null != radioactiveProductDetail.getOriginalQuantity()) {
				radioactiveItemDescription.add(radioactiveProductDetail.getOriginalQuantity().toPlainString());
				Map<String, UnitMsr> unitMsrMap = this.lookupService.getUnitMeasures().stream()
						.collect(Collectors.toMap(UnitMsr::getCode, Function.identity()));
				radioactiveItemDescription.add(unitMsrMap.get(radioactiveProductDetail.getOriginalQuantityUnitCode()).getDescription());
			}
			
			if(StringUtils.isNotBlank(radioactiveProductDetail.getProductManufacturerNumber())) {
				radioactiveItemDescription.add(radioactiveProductDetail.getProductManufacturerNumber());
			}
		}
		
		return String.join(Constants.PO_SEPERATOR, radioactiveItemDescription);
	}
	
	private String toBiologicalItemDescription(Product product) {
		
		BiologicalProductDetail biologicalProductDetail = (BiologicalProductDetail) product.getProductDetail();
		
		List<String> biologicalProductDescription = new ArrayList<String>();
		
		if(StringUtils.isNotBlank(biologicalProductDetail.getBiologicalMaterialName())) {
			biologicalProductDescription.add(biologicalProductDetail.getBiologicalMaterialName());
		}
		
		List<BiologicalAgent> biologicalAgents = biologicalProductDetail.getAgents();
		if(CollectionUtils.isNotEmpty(biologicalAgents)) {
			biologicalAgents.forEach(a -> {
				if(StringUtils.isNotBlank(a.getToxinName())) {
					biologicalProductDescription.add(a.getToxinName());
				}
				if(StringUtils.isNotBlank(a.getScientificName())) {
					biologicalProductDescription.add(a.getScientificName());
				}
				if(StringUtils.isNotBlank(a.getStrain())) {
					biologicalProductDescription.add( a.getStrain());
				}
			});
		}
		
		biologicalProductDescription.add(biologicalProductDetail.getOriginalQuantity().toPlainString());
		
		Map<String, UnitMsr> biologicalUnitMeasuresMap = this.lookupService.getBiologicalUnitOfMeasures().stream()
				.collect(Collectors.toMap(UnitMsr::getCode, Function.identity()));
		
		biologicalProductDescription.add(biologicalUnitMeasuresMap.get(biologicalProductDetail.getOriginalQuantityUnitCode()).getDescription());
		
		return String.join(Constants.PO_SEPERATOR, biologicalProductDescription);

	}

	private ChemicalCatalogItem chemicalProductDetailToCatalogItem(Product product) {
		ChemicalCatalogItem catalogItem = new ChemicalCatalogItem();
		catalogItem.setProductId(product.getProductRefId());

		if (StringUtils.isEmpty(catalogItem.getProductId())) {
			ChemicalProductDetail cpd = (ChemicalProductDetail) product.getProductDetail();
			catalogItem.setProductManufacturerNumber(cpd.getProductManufacturerNumber());
			catalogItem.setChemicalNumber(cpd.getChemicalNumber());
			catalogItem.setChemicalName(cpd.getChemicalName());
			catalogItem.setCasNumbers(cpd.getCasNumbers());

			catalogItem.setOriginalQuantity(cpd.getOriginalQuantity());
			catalogItem.setOriginalQuantityUnit(new UnitMsr());
			catalogItem.getOriginalQuantityUnit().setCode(cpd.getOriginalQuantityUnitCode());

			catalogItem.setConcentration(cpd.getConcentration());
			catalogItem.setConcentrationUnit(new ConcentrationUnit());
			catalogItem.getConcentrationUnit().setCode(cpd.getConcentrationUnitCode());

			catalogItem.setPhysicalForm(new PhyForm());
			catalogItem.getPhysicalForm().setCode(cpd.getPhysicalFormCode());

			catalogItem.setChemicalGrade(new ChemicalGrade());
			catalogItem.getChemicalGrade().setCode(cpd.getChemicalGradeCode());

			catalogItem.setManufacturer(new Manufacturer());
			catalogItem.getManufacturer().setCode(cpd.getManufacturerCode());
		}

		return catalogItem;
	}

	private POItem toIntObjPOLineItem(Request request, POLineItem poLineItem) {

		POItem poItem = new POItem();
		
		poItem.setItemNo(poLineItem.getLineNo());
		poItem.setItemStatus(POITemStatusType.PO_ITEM_NEW.getCode());
		poItem.setQuantity(poLineItem.getQuantity().setScale(3, RoundingMode.HALF_UP).toPlainString());
		poItem.setUnitMeasure(poLineItem.getUnit().name());
		poItem.setUnitPrice(poLineItem.getUnitPrice().setScale(2, RoundingMode.HALF_UP).toPlainString());

		Optional<LineItem> requestLineItemOpt = request.getLineItems().stream()
				.filter(l -> StringUtils.isNotBlank(l.getId()) && l.getId().equals(poLineItem.getPrLineitemId())).findFirst();

		SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.PROCUREMENT_DATE_FORMAT);
		if (requestLineItemOpt.isPresent()) {
			LineItem requestLineItem = requestLineItemOpt.get();
			
			poItem.setLineItemTotal(poLineItem.getTotalAmount().setScale(2, RoundingMode.HALF_UP).toPlainString());
			poItem.setProductDescription(poLineItem.getItemDescription());
			poItem.setAccountAssignment(toIntObjPOAccountAssignmentList(requestLineItem.getAccountAssignments()));
			
			Optional<Quotation> quotation = request.getQuotations().stream()
					.filter(q -> null != q && q.getId().equalsIgnoreCase(requestLineItemOpt.get().getQuotationId())).findFirst();
			if(quotation.isPresent()) {
				poItem.setDeliveryDate(dateFormat.format(quotation.get().getDeliveryInfo().getExpectedDeliveryDate()));
			}
		}
		
		//Only if DownpayType is M; input only either DownpayAmount or DownpayPercent
		if(null != poLineItem.getDownpaymentDueDate() && (null != poLineItem.getDownpaymentAmount() || null != poLineItem.getDownpaymentPercentage())) {
			poItem.setDownpayType(Constants.PORequest.DOWNPAYMENT_TYPE_M);
			poItem.setDownpayAmount(null != poLineItem.getDownpaymentAmount() ? poLineItem.getDownpaymentAmount().toPlainString() : null);
			poItem.setDownpayPercent(null != poLineItem.getDownpaymentPercentage() ? poLineItem.getDownpaymentPercentage().toPlainString() : null);
			poItem.setDownpayDueDate(dateFormat.format(poLineItem.getDownpaymentDueDate()));
		} else {
			poItem.setDownpayType(Constants.PORequest.DOWNPAYMENT_TYPE_N);
		}
		
		
		return poItem;

	}

	private List<POAccountAssignment> toIntObjPOAccountAssignmentList(List<AccountAssignment> accountAssignments) {

		if (CollectionUtils.isEmpty(accountAssignments)) {
			throw new IllegalStateException("LineItem AccountAssignment not found.");
		}

		List<POAccountAssignment> poAccountAssignments = accountAssignments.stream()
				.map(a -> this.toIntObjPOAccountAssignment(a)).collect(Collectors.toList());

		return poAccountAssignments;
	}

	private POAccountAssignment toIntObjPOAccountAssignment(AccountAssignment accountAssignment) {

		POAccountAssignment poAccountAssignment = new POAccountAssignment();
		poAccountAssignment.setGlAccount(accountAssignment.getGlAccount());
		poAccountAssignment.setWbs(accountAssignment.getWbs());
		if (null == accountAssignment.getQuantity()) {
			throw new IllegalStateException("Account Assignment quantity not found.");
		}
		poAccountAssignment
				.setQuantity(accountAssignment.getQuantity().setScale(3, RoundingMode.HALF_UP).toPlainString());
		return poAccountAssignment;
	}
}
