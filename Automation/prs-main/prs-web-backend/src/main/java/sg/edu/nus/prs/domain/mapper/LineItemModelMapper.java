package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.commons.lang3.tuple.Triple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.common.*;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierProduct;
import sg.edu.nus.prs.domain.purchase.*;
import sg.edu.nus.prs.domain.purchase.biological.*;
import sg.edu.nus.prs.domain.purchase.catalog.BiologicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.ChemicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogItem;
import sg.edu.nus.prs.domain.purchase.productdetails.AdditionalChargeProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.BiologicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.RadioactiveProductDetail;
import sg.edu.nus.prs.domain.user.StaffDetail;
import sg.edu.nus.prs.service.*;
import sg.edu.nus.prs.util.Constants;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class LineItemModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(LineItemModelMapper.class);

	private final LookupService lookupService;
	private final CatalogService catalogService;
	private final StaffService staffService;
	private final WBSAccountService wbsAccountService;
	private final PeriodContractService periodContractService;

	@Autowired
	public LineItemModelMapper(LookupService lookupService,
							   CatalogService catalogService,
							   StaffService staffService,
							   WBSAccountService wbsAccountService,
							   PeriodContractService periodContractService) {
		this.lookupService = lookupService;
		this.catalogService = catalogService;
		this.staffService = staffService;
		this.wbsAccountService = wbsAccountService;
		this.periodContractService = periodContractService;
	}

	List<LineItem> toLineItemList(PurchaseRequestForm form, Request request, List<PurchaseLineItem> intObjList) {
		Map<String, Quotation> quotationMap = Collections.emptyMap();
		if (CollectionUtils.isNotEmpty(request.getQuotations())) {
			quotationMap = request.getQuotations().stream()
					.filter(q -> q.getSupplier() != null && StringUtils.isNotBlank(q.getSupplier().getSupplierCode()))
					.collect(Collectors.toMap(q -> q.getSupplier().getSupplierCode(), Function.identity(), (a, b) -> a));
		}

		int[] lineNo = { 1 };
		Map<String, Quotation> finalQuotationMap = quotationMap;
		return intObjList.stream()
				.map(l -> this.formToDomainObject(form, finalQuotationMap, l, lineNo[0]++))
				.filter(Objects::nonNull)
				.collect(Collectors.toList());
	}

	public LineItem formToDomainObject(PurchaseRequestForm form, Map<String, Quotation> quotationMap, PurchaseLineItem pli, int lineNo) {
		Product product = lineItemToProduct(pli);
		if (product == null) {
			return null;
		}

		LineItem lineItem = new LineItem();
		lineItem.setLineitemNo(String.format("%05d", lineNo));
		lineItem.setQuantity(pli.getQuantity());
		lineItem.setUnit(pli.getUnitCode());
		lineItem.setUnitPrice(pli.getUnitPrice());
		lineItem.setQuantityPerUnit(Unit.BOX == pli.getUnitCode() ? pli.getQuantityPerUnit() : null);

		lineItem.setCurrency(pli.getCurrency());
		lineItem.setSubTotal(pli.getSubTotal()); // TODO: Recalculate. Do not rely on input.

		if (pli.getSupplier() != null && StringUtils.isNotBlank(pli.getSupplier().getSupplierCode())) {
			Quotation quotation = quotationMap.get(pli.getSupplier().getSupplierCode());
			lineItem.setQuotationId(quotation.getId());
		} else {
			lineItem.setQuotationId(null);
		}

		lineItem.setProduct(product);
		if (pli.getCatalogItem() != null) {
			lineItem.setContractNumber(pli.getCatalogItem().getContractNumber());		
		}

		lineItem.setDownpaymentAmount(pli.getDownpaymentAmount());
		lineItem.setDownpaymentPercentage(pli.getDownpaymentPercentage());

		if (StringUtils.isNotBlank(pli.getDownpaymentDueDate())) {
			try {
				lineItem.setDownpaymentDueDate(DateUtils.parseDate(pli.getDownpaymentDueDate(), Constants.DATE_FORMAT));
			} catch (ParseException e) {
				logger.error("Unable to parse date.", e);
			}
		}

		lineItem.setAccountAssignments(pli.getAccountAssignments());
		if (CollectionUtils.isEmpty(lineItem.getAccountAssignments())) {
			AccountAssignment accountAssignment = new AccountAssignment(
					form.getDefaultWBS(),
					form.getDefaultGLAccount(),
					lineItem.getSubTotal(),
					pli.getSgdSubTotal()
			);
			accountAssignment.setQuantity(lineItem.getQuantity());

			lineItem.setAccountAssignments(Collections.singletonList(accountAssignment));
		}

		return lineItem;
	}

	private Product lineItemToProduct(PurchaseLineItem pli) {
		if (pli.getCatalogItem() == null) {
			return null;
		}

		CatalogItem ci = pli.getCatalogItem();

		if (ci.getProductTypeCode() == ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE) {
			// If additional charge has no description nor unit price, remove the line.
			if (StringUtils.isEmpty(pli.getDescription()) && pli.getUnitPrice() == null) {
				return null;
			}
		}

		Product product = new Product();
		product.setCategoryCode(ci.getProductTypeCode());
		product.setProductRefId(ci.getProductId());

		// If product is defined, check that the product is the same as that in the database.
		if (StringUtils.isNotBlank(product.getProductRefId())) {
			List<CatalogItem> dbCatalogItem = catalogService.getProductCatalogById(
					product.getCategoryCode(),
					Collections.singletonList(product.getProductRefId())
			);

			if (StringUtils.isNotBlank(ci.getContractNumber())) {
				PeriodContractSupplier pcs = periodContractService.getPeriodContractProduct(
						new Date(),
						ci.getContractNumber(),
						ci.getProductId(),
						(ci.getSupplier() != null) ? ci.getSupplier().getSupplierCode() : null
				);

				PeriodContractSupplierProduct pcsp = pcs.getProductList().get(0);

				// Populate DB entries with the contract details.
				CatalogItem dbCi = dbCatalogItem.get(0);
				dbCi.setSupplier(new Supplier(pcs.getSupplierCode(), pcs.getSupplierName()));
				dbCi.setSupplierPartNumber(pcsp.getSupplierPartNumber());
				dbCi.setContractNumber(pcs.getPeriodContractNumber());
				dbCi.setCurrency(pcs.getCurrency());
				dbCi.setContractUnit(pcsp.getUnit());
				dbCi.setQuantityPerUnit(pcsp.getQuantityPerUnit());
				dbCi.setTiers(pcsp.getPriceTierList());
			}

			boolean isValidProduct = false;
			if (CollectionUtils.isNotEmpty(dbCatalogItem)) {
				isValidProduct = ci.canonicalize().equals(dbCatalogItem.get(0).canonicalize());
			}

			if (!isValidProduct) {
				product.setProductRefId(null);
			}
		}

		if (StringUtils.isBlank(product.getProductRefId())) {
			switch (product.getCategoryCode()) {
				case PRODUCT_CHEMICAL: {
					ChemicalProductDetail cm = new ChemicalProductDetail();
					cm.setCatalogItem((ChemicalCatalogItem) ci);
					product.setProductDetail(cm);
				}
					break;

				case PRODUCT_BIOLOGICAL: {
					BiologicalProductDetail cm = new BiologicalProductDetail();
					cm.setCatalogItem((BiologicalCatalogItem) ci);
					product.setProductDetail(cm);
				}
					break;

				case PRODUCT_RADIOACTIVE: {
					RadioactiveProductDetail cm = new RadioactiveProductDetail();
					cm.setCatalogItem((RadioactiveCatalogItem) ci);
					product.setProductDetail(cm);
				}
					break;

				case PRODUCT_ADDITIONAL_CHARGE:
					AdditionalChargeProductDetail acpd = new AdditionalChargeProductDetail();
					acpd.setDescription(pli.getDescription());

					product.setProductDetail(acpd);
					break;
			}
		}

		return product;
	}
	
	List<PurchaseLineItem> toPurchaseLineItems(Request request, List<LineItem> lineItems) {
		if (CollectionUtils.isEmpty(lineItems)) {
			return Collections.emptyList();
		}

		Map<String, Quotation> quotationMap = Collections.emptyMap();
		if (CollectionUtils.isNotEmpty(request.getQuotations())) {
			quotationMap = request.getQuotations().stream()
					.collect(Collectors.toMap(Quotation::getId, Function.identity()));
		}
		Map<String, Quotation> finalQuotationMap = quotationMap;

		List<PurchaseLineItem> purchaseLineItems = lineItems.stream()
				.map(li -> this.toPurchaseLineItem(request, li, finalQuotationMap))
				.collect(Collectors.toList());

		// Manufacturers.
		List<String> manufacturerIds = purchaseLineItems.stream()
				.filter(pli -> pli.getCatalogItem().getManufacturer() != null)
				.filter(pli -> StringUtils.isNotEmpty(pli.getCatalogItem().getManufacturer().getCode()))
				.map(pli -> pli.getCatalogItem().getManufacturer().getCode())
				.collect(Collectors.toList());
		Map<String, Manufacturer> manufacturerMap = this.catalogService.getManufacturerListByIds(manufacturerIds).stream()
				.collect(Collectors.toMap(Manufacturer::getCode, Function.identity()));

		// Populate the codes as needed.
		Map<String, PhyForm> phyFormMap = this.lookupService.getPhysicalForms().stream()
				.collect(Collectors.toMap(PhyForm::getCode, Function.identity()));
		Map<String, UnitMsr> unitMsrMap = this.lookupService.getUnitMeasures().stream()
				.collect(Collectors.toMap(UnitMsr::getCode, Function.identity()));
		Map<String, ConcentrationUnit> concentrationUnitMap = this.lookupService.getConcentrationUnits().stream()
				.collect(Collectors.toMap(ConcentrationUnit::getCode, Function.identity()));
		Map<String, ChemicalGrade> chemicalGradeMap = this.lookupService.getChemicalGrades().stream()
				.collect(Collectors.toMap(ChemicalGrade::getCode, Function.identity()));

		Map<String, BiologicalCategory> biologicalCategoryMap = this.lookupService.getBiologicalCategories().stream()
				.collect(Collectors.toMap(BiologicalCategory::getCode, Function.identity()));
		Map<String, BiologicalType> biologicalTypeMap = this.lookupService.getBiologicalTypes().stream()
				.collect(Collectors.toMap(BiologicalType::getCode, Function.identity()));
		Map<String, BiologicalOrigin> biologicalOriginMap = this.lookupService.getBiologicalOrigins().stream()
				.collect(Collectors.toMap(BiologicalOrigin::getCode, Function.identity()));
		Map<String, BiologicalOrgan> biologicalOrganMap = this.lookupService.getBiologicalOrganTypes().stream()
				.collect(Collectors.toMap(BiologicalOrgan::getCode, Function.identity()));
		Map<String, UnitMsr> biologicalUnitMeasuresMap = this.lookupService.getBiologicalUnitOfMeasures().stream()
				.collect(Collectors.toMap(UnitMsr::getCode, Function.identity()));
		Map<String, BiologicalConcentrationUnit> biologicalConcentrationUnitMap = this.lookupService.getBiologicalConcentrationUnits().stream()
				.collect(Collectors.toMap(BiologicalConcentrationUnit::getCode, Function.identity()));
		Map<String, BiologicalProductFormat> biologicalProductFormatMap = this.lookupService.getBiologicalProductFormats().stream()
				.collect(Collectors.toMap(BiologicalProductFormat::getCode, Function.identity()));

		// Prepopulate contract items as needed. (key = contract, product ref, supplier code)
		Date now = request.getDateOfRequest();
		if (now == null) {
			now = new Date();
		}

		final Date refDate = now;
		Map<Triple<String, String, String>, PeriodContractSupplier> contractSupplierProductMap = purchaseLineItems.parallelStream()
				.filter(pli -> pli.getCatalogItem() != null)
				.filter(pli -> StringUtils.isNotBlank(pli.getCatalogItem().getContractNumber()))
				.filter(pli -> StringUtils.isNotBlank(pli.getCatalogItem().getProductId()))
				.filter(pli -> pli.getSupplier() != null)
				.filter(pli -> StringUtils.isNotBlank(pli.getSupplier().getSupplierCode()))
				.collect(Collectors.toConcurrentMap(
					pli -> Triple.of(
							pli.getCatalogItem().getContractNumber(),
							pli.getCatalogItem().getProductId(),
							pli.getSupplier().getSupplierCode()
					),
					pli -> periodContractService.getPeriodContractProduct(
							refDate,
							pli.getCatalogItem().getContractNumber(),
							pli.getCatalogItem().getProductId(),
							pli.getSupplier().getSupplierCode()
					),
					(a, b) -> a
				));

		purchaseLineItems.forEach(pli -> {
			CatalogItem ci = pli.getCatalogItem();

			// Type specific.
			if (pli.getCatalogItem().getProductTypeCode() == ProductTypeCode.PRODUCT_CHEMICAL) {
				ChemicalCatalogItem pliCi = (ChemicalCatalogItem) ci;

				if (pliCi.getOriginalQuantityUnit() != null
						&& StringUtils.isNotEmpty(pliCi.getOriginalQuantityUnit().getCode())) {
					pliCi.setOriginalQuantityUnit(unitMsrMap.get(pliCi.getOriginalQuantityUnit().getCode()));
				}

				if (pliCi.getConcentrationUnit() != null
						&& StringUtils.isNotEmpty(pliCi.getConcentrationUnit().getCode())) {
					pliCi.setConcentrationUnit(concentrationUnitMap.get(pliCi.getConcentrationUnit().getCode()));
				}

				if (pliCi.getPhysicalForm() != null
						&& StringUtils.isNotEmpty(pliCi.getPhysicalForm().getCode())) {
					pliCi.setPhysicalForm(phyFormMap.get(pliCi.getPhysicalForm().getCode()));
				}

				if (pliCi.getChemicalGrade() != null
						&& StringUtils.isNotEmpty(pliCi.getChemicalGrade().getCode())) {
					pliCi.setChemicalGrade(chemicalGradeMap.get(pliCi.getChemicalGrade().getCode()));
				}
			}
			else if (pli.getCatalogItem().getProductTypeCode() == ProductTypeCode.PRODUCT_BIOLOGICAL) {
				BiologicalCatalogItem pliCi = (BiologicalCatalogItem) ci;

				if (pliCi.getOriginalQuantityUnit() != null
						&& StringUtils.isNotEmpty(pliCi.getOriginalQuantityUnit().getCode())) {
					pliCi.setOriginalQuantityUnit(biologicalUnitMeasuresMap.get(pliCi.getOriginalQuantityUnit().getCode()));
				}

				if (pliCi.getCategory() != null
						&& StringUtils.isNotEmpty(pliCi.getCategory().getCode())) {
					pliCi.setCategory(biologicalCategoryMap.get(pliCi.getCategory().getCode()));
				}

				if (pliCi.getBiologicalType() != null
						&& StringUtils.isNotEmpty(pliCi.getBiologicalType().getCode())) {
					pliCi.setBiologicalType(biologicalTypeMap.get(pliCi.getBiologicalType().getCode()));
				}

				if (pliCi.getOrigin() != null
						&& StringUtils.isNotEmpty(pliCi.getOrigin().getCode())) {
					pliCi.setOrigin(biologicalOriginMap.get(pliCi.getOrigin().getCode()));
				}

				if (pliCi.getOrganSampleType() != null
						&& StringUtils.isNotEmpty(pliCi.getOrganSampleType().getCode())) {
					pliCi.setOrganSampleType(biologicalOrganMap.get(pliCi.getOrganSampleType().getCode()));
				}

				if (pliCi.getProductFormat() != null
						&& StringUtils.isNotEmpty(pliCi.getProductFormat().getCode())) {
					pliCi.setProductFormat(biologicalProductFormatMap.get(pliCi.getProductFormat().getCode()));
				}

				if (pliCi.getConcentrationUnit() != null
						&& StringUtils.isNotEmpty(pliCi.getConcentrationUnit().getCode())) {
					pliCi.setConcentrationUnit(biologicalConcentrationUnitMap.get(pliCi.getConcentrationUnit().getCode()));
				}
			}
			else if (pli.getCatalogItem().getProductTypeCode() == ProductTypeCode.PRODUCT_RADIOACTIVE) {
				RadioactiveCatalogItem pliCi = (RadioactiveCatalogItem) ci;

				if (pliCi.getPhysicalForm() != null
						&& StringUtils.isNotEmpty(pliCi.getPhysicalForm().getCode())) {
					pliCi.setPhysicalForm(phyFormMap.get(pliCi.getPhysicalForm().getCode()));
				}

				if (pliCi.getOriginalQuantityUnit() != null
						&& StringUtils.isNotEmpty(pliCi.getOriginalQuantityUnit().getCode())) {
					pliCi.setOriginalQuantityUnit(unitMsrMap.get(pliCi.getOriginalQuantityUnit().getCode()));
				}
			}

			// Common.
			if (ci.getManufacturer() != null
				&& StringUtils.isNotEmpty(ci.getManufacturer().getCode())) {
				ci.setManufacturer(manufacturerMap.get(ci.getManufacturer().getCode()));
			}

			// Contract.
			if (StringUtils.isNotBlank(pli.getCatalogItem().getContractNumber())
				&& pli.getSupplier() != null && StringUtils.isNotBlank(pli.getSupplier().getSupplierCode())
				&& StringUtils.isNotBlank(pli.getCatalogItem().getProductId())) {
				PeriodContractSupplier pcs = contractSupplierProductMap.get(Triple.of(
						pli.getCatalogItem().getContractNumber(),
						pli.getCatalogItem().getProductId(),
						pli.getSupplier().getSupplierCode()
				));

				if (pcs != null) {
					PeriodContractSupplierProduct pcsp = pcs.getProductList().get(0);

					ci.setSupplier(new Supplier(pcs.getSupplierCode(), pcs.getSupplierName()));
					ci.setSupplierPartNumber(pcsp.getSupplierPartNumber());
					ci.setCurrency(pcs.getCurrency());
					ci.setContractUnit(pcsp.getUnit());
					ci.setQuantityPerUnit(pcsp.getQuantityPerUnit());
					ci.setTiers(pcsp.getPriceTierList());
				}
			}
		});

		// Recalculate SGD subtotal as needed.
		RequestAdditionalDetails requestAdditionalDetails = request.getRequestDetail();
		if (requestAdditionalDetails != null && requestAdditionalDetails.getExchangeRates() != null) {
			Map<String, ExchangeRateDetail> exchangeRates = requestAdditionalDetails.getExchangeRates();

			purchaseLineItems.stream()
					.filter(pli -> pli.getCurrency() != null && !StringUtils.equals(pli.getCurrency().getCode(), Constants.SGD_CURRENCY))
					.forEach(pli -> {
						ExchangeRateDetail rate = exchangeRates.get(pli.getCurrency().getCode());
						if (rate == null || StringUtils.isBlank(rate.getRate())) { return; }

						pli.setSgdSubTotal(pli.getSubTotal().multiply(new BigDecimal(rate.getRate())));
					});
		}

		return purchaseLineItems;
	}

	private PurchaseLineItem toPurchaseLineItem(Request request, LineItem lineItem, Map<String, Quotation> quotationMap) {
		PurchaseLineItem pli = new PurchaseLineItem();
		pli.setQuantity(lineItem.getQuantity());
		pli.setUnitPrice(lineItem.getUnitPrice());
		pli.setSubTotal(lineItem.getSubTotal());
		pli.setUnitCode(lineItem.getUnit());
		pli.setQuantityPerUnit(lineItem.getQuantityPerUnit());
		pli.setLineItemNo(lineItem.getLineitemNo());
		pli.setCurrency(lineItem.getCurrency());

		pli.setDownpaymentPercentage(lineItem.getDownpaymentPercentage());
		pli.setDownpaymentAmount(lineItem.getDownpaymentAmount());

		if (lineItem.getDownpaymentDueDate() != null) {
			pli.setDownpaymentDueDate(DateFormatUtils.format(lineItem.getDownpaymentDueDate(), Constants.DATE_FORMAT));
		}

		if (StringUtils.isNotBlank(lineItem.getQuotationId())) {
			Quotation q = quotationMap.get(lineItem.getQuotationId());
			if (q.getSupplier() != null) {
				pli.setSupplier(new Supplier(
						q.getSupplier().getSupplierCode(),
						q.getSupplier().getSupplierName()
				));
			}
		}

		// If line item has only 1 account assignment record,
		// and this account assignment record follows the default WBS and GL,
		// do not map it.
		if (CollectionUtils.isNotEmpty(lineItem.getAccountAssignments()) && lineItem.getAccountAssignments().size() == 1) {
			RequestAdditionalDetails additionalDetails = request.getRequestDetail();
			AccountAssignment accountAssignment = lineItem.getAccountAssignments().get(0);

			if (additionalDetails != null) {
				String aaGl = StringUtils.firstNonBlank(accountAssignment.getGlAccount());
				String adGl = StringUtils.firstNonBlank(additionalDetails.getGlAccount());
				boolean isDefault = StringUtils.equals(aaGl, adGl);

				String aaWbs = StringUtils.firstNonBlank(accountAssignment.getWbs());
				String adWbs = StringUtils.firstNonBlank(additionalDetails.getWbs());
				if (!StringUtils.equals(aaWbs, adWbs)) {
					isDefault = false;
				}

				if (isDefault) {
					pli.setAccountAssignments(null);
					pli.setSgdSubTotal(accountAssignment.getSgdSubtotal());
				} else {
					pli.setAccountAssignments(lineItem.getAccountAssignments());
					populateWBSAccountOwner(pli);
				}
			}
		} else {
			pli.setAccountAssignments(lineItem.getAccountAssignments());
			populateWBSAccountOwner(pli);
		}

		if (CollectionUtils.isNotEmpty(pli.getAccountAssignments())) {
			pli.setSgdSubTotal(BigDecimal.ZERO);
			for (AccountAssignment aa : pli.getAccountAssignments()) {
				if (aa.getSgdSubtotal() != null) {
					pli.setSgdSubTotal(pli.getSgdSubTotal().add(aa.getSubTotal()));
				}
			}
		}

		if (lineItem.getProduct() != null) {
			this.productToPurchaseLineItem(lineItem.getProduct(), pli);
		}

		if (StringUtils.isNotEmpty(lineItem.getContractNumber()) && pli.getCatalogItem() != null) {
			pli.getCatalogItem().setContractNumber(lineItem.getContractNumber());

			if (pli.getCatalogItem().getProductTypeCode() == ProductTypeCode.PRODUCT_ADDITIONAL_CHARGE) {
				pli.getCatalogItem().setCurrency(new Currency(
						lineItem.getCurrency().getCode(),
						lineItem.getCurrency().getDescription())
				);
			}
		}

		return pli;
	}

	private void populateWBSAccountOwner(PurchaseLineItem pli) {
		if (CollectionUtils.isNotEmpty(pli.getAccountAssignments())) {
			for (AccountAssignment aa : pli.getAccountAssignments()) {
				// Populate WBS Owner
				if (StringUtils.isNotEmpty(aa.getWbs())) {
					WBSAccount wbsAccount = wbsAccountService.getWBSAccount(aa.getWbs());
					if (wbsAccount != null) {
						if (StringUtils.isNotEmpty(wbsAccount.getPi1Id())) {
							// Owned by PI.
							StaffDetail staffDetail = staffService.getStaffByNUSNET(wbsAccount.getPi1Id());
							aa.setWbsAccountOwner(staffDetail.getName());
						} else {
							// Owned by department.
							aa.setWbsAccountOwner(wbsAccount.getDepartment().getDescription());
						}
					}
				}

				// Populate the GL account description.
				if (StringUtils.isNotEmpty(aa.getGlAccount())) {
					GLAccount glAccount = lookupService.getGLAccountByCode(aa.getGlAccount());
					if (glAccount != null) {
						aa.setGlAccountDescription(glAccount.getDescription());
					}
				}
			}
		}
	}

	private void productToPurchaseLineItem(Product product, PurchaseLineItem pli) {
		switch (product.getCategoryCode()) {
			case PRODUCT_CHEMICAL: {
				ChemicalProductDetail cpd = (ChemicalProductDetail) product.getProductDetail();
				ChemicalCatalogItem cpdci = cpd.toCatalogItem();
				pli.setCatalogItem(cpdci);
			}
			break;

			case PRODUCT_BIOLOGICAL: {
				BiologicalProductDetail bpd = (BiologicalProductDetail) product.getProductDetail();
				BiologicalCatalogItem bpdci = bpd.toCatalogItem();
				pli.setCatalogItem(bpdci);
			}
			break;

			case PRODUCT_RADIOACTIVE: {
				RadioactiveProductDetail rpd = (RadioactiveProductDetail) product.getProductDetail();
				RadioactiveCatalogItem rpdci = rpd.toCatalogItem();
				pli.setCatalogItem(rpdci);
			}
			break;

			case PRODUCT_ADDITIONAL_CHARGE: {
				AdditionalChargeProductDetail acpd = (AdditionalChargeProductDetail) product.getProductDetail();
				pli.setCatalogItem(acpd.toCatalogItem());
				pli.setDescription(acpd.getDescription());
			}
			break;
		}
	}
}
