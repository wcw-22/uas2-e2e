package sg.edu.nus.prs.domain.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.common.GLAccount;
import sg.edu.nus.prs.domain.common.RegulationCheck;
import sg.edu.nus.prs.domain.common.WBSAccount;
import sg.edu.nus.prs.domain.purchase.*;
import sg.edu.nus.prs.domain.purchase.catalog.ChemicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogItem;
import sg.edu.nus.prs.domain.user.Department;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.user.NUSNETDetail;
import sg.edu.nus.prs.domain.user.StaffDetail;
import sg.edu.nus.prs.domain.user.UserDetail;
import sg.edu.nus.prs.exception.PRSExceptionCode;
import sg.edu.nus.prs.exception.PRSRuntimException;
import sg.edu.nus.prs.service.CatalogService;
import sg.edu.nus.prs.service.LookupService;
import sg.edu.nus.prs.service.RequestService;
import sg.edu.nus.prs.service.StaffService;
import sg.edu.nus.prs.service.UserDetailService;
import sg.edu.nus.prs.service.WBSAccountService;
import sg.edu.nus.prs.util.Constants;

@Component
public class RequestModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(RequestModelMapper.class);

	private final LocationModelMapper locationModelMapper;
	private final LineItemModelMapper lineItemModelMapper;
	private final QuotationModelMapper quotationModelMapper;
	private final DeliveryInfoModelMapper deliveryInfoModelMapper;
	private final FundCheckDetailModelMapper fundCheckDetailModelMapper;
	private final ApprovalModelMapper approvalModelMapper;
	private final StaffService staffService;
	private final WBSAccountService wbsAccountService;
	private final CatalogService catalogService;
	private final LookupService lookupService;
	private final RequestService requestService;
	private final DocumentModelMapper documentModelMapper;
	private final UserDetailService userDetailService;

	@Autowired
	public RequestModelMapper(LocationModelMapper locationModelMapper,
							  LineItemModelMapper lineItemModelMapper,
							  QuotationModelMapper quotationModelMapper,
							  DeliveryInfoModelMapper deliveryInfoModelMapper,
							  FundCheckDetailModelMapper fundCheckDetailModelMapper,
							  ApprovalModelMapper approvalModelMapper,
							  StaffService staffService,
							  WBSAccountService wbsAccountService,
							  CatalogService catalogService,
							  LookupService lookupService,
							  RequestService requestService,
							  DocumentModelMapper documentModelMapper,
							  UserDetailService userDetailService) {
		this.locationModelMapper = locationModelMapper;
		this.lineItemModelMapper = lineItemModelMapper;
		this.quotationModelMapper = quotationModelMapper;
		this.deliveryInfoModelMapper = deliveryInfoModelMapper;
		this.fundCheckDetailModelMapper = fundCheckDetailModelMapper;
		this.approvalModelMapper = approvalModelMapper;
		this.staffService = staffService;
		this.wbsAccountService = wbsAccountService;
		this.catalogService = catalogService;
		this.lookupService = lookupService;
		this.requestService = requestService;
		this.documentModelMapper = documentModelMapper;
		this.userDetailService = userDetailService;
	}

	public Request toRequest(PurchaseRequestForm form) {
		if (form == null) { return null; }

		Request request = new Request();
		if (StringUtils.isNotEmpty(form.getId())) {
			request.setId(form.getId());
		}

		request.setRequestNo(form.getPurchaseRequestNumber());
		request.setRequestType(form.getRequestType());

		request.setRequestorStaffNo(form.getRequestorId());
		request.setRequestorRole(form.getRequestorRole());

		if (StringUtils.isNotEmpty(form.getCurrencyCode())) {
			Currency currency = new Currency();
			currency.setCode(form.getCurrencyCode());
			request.setCurrency(currency);
		}

		if (null != form.getTotal()) {
			request.setTotalAmount(form.getSgdTotal());
		}

		request.setEpv(form.getEpvType());
		request.setStatusCode(form.getStatus());

		if (form.getLocation() != null) {
			request.setLocation(locationModelMapper.toLocation(form.getLocation()));
		}

		request.setCreateUserNo(form.getCreatorId());
		request.setUpdateUserNo(form.getUpdaterId());

		// Quotations must be before line items, as line items refer to quotations.
		// If line items refer to a supplier that does not have a quotation, create an empty quotation for that supplier.
		if (form.getQuotationSummary() == null) {
			form.setQuotationSummary(new PurchaseQuotationSummary());
		}

		request.setQuotations(quotationModelMapper.toQuotationList(form.getQuotationSummary(), form.getLineItems()));
		request.setPurposeOfPurchase(form.getPurposeOfPurchase());

		if (CollectionUtils.isNotEmpty(form.getLineItems())) {
			request.setLineItems(lineItemModelMapper.toLineItemList(form, request, form.getLineItems()));
		} else {
			request.setLineItems(Collections.emptyList());
		}

		// Delivery Info
		request.setDeliveryInfo(deliveryInfoModelMapper.toDeliveryInfo(form.getQuotationSummary()));

		RequestAdditionalDetails requestAdditionalDetails = new RequestAdditionalDetails();
		requestAdditionalDetails.setWbs(form.getDefaultWBS());
		requestAdditionalDetails.setGlAccount(form.getDefaultGLAccount());
		requestAdditionalDetails.setExchangeRates(form.getCurrencyExchangeRates());
		if (Boolean.TRUE.equals(form.getDownpaymentCategory())) {
			requestAdditionalDetails.setDownpaymentCategory(Constants.DOWNPAYMENT_CATEGORY_CODE);
		}
		request.setRequestDetail(requestAdditionalDetails);

		if (StringUtils.isNotEmpty(form.getDateOfRequest())) {
			try {
				request.setDateOfRequest(DateUtils.parseDate(form.getDateOfRequest(), Constants.DATE_FORMAT));
			} catch (ParseException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_INVALID_DATE);
			}
		}

		// Inventory Owner
		if (StringUtils.isNotEmpty(form.getInventoryOwnerUserId())) {
			StaffDetail staffDetail = staffService.getStaffByNUSNET(form.getInventoryOwnerUserId());
			if (staffDetail != null) {
				request.setInventoryOwnerStaffNo(staffDetail.getStaffNo());
			}
		}

		// Approvals.
		request.setApprovals(new ArrayList<>());
		if (StringUtils.isNotEmpty(form.getApprover1UserId())) {
			UserDetail userDetail = userDetailService.getUserByNUSNET(form.getApprover1UserId());
			if (userDetail != null) {
				PurchaseApproval approval = new PurchaseApproval();
				approval.setApproverType(ApproverType.APPV_TP_APPROVER_1);
				approval.setStatus(ApprovalStatus.APPV_STS_PENDING);
				approval.setApproverStaffNo(userDetail.getUserNo());
				approval.setAutoApprove(form.getApprover1AutoApprove());
				approval.setApproverRole(form.getApprover1Role());

				if (StringUtils.isNotEmpty(form.getApprover1AuthorizingUserId())) {
					StaffDetail authStaffDetail = staffService.getStaffByNUSNET(form.getApprover1AuthorizingUserId());
					if (authStaffDetail != null) {
						approval.setAuthorizingStaffNo(authStaffDetail.getStaffNo());
					}
				}

				request.getApprovals().add(approval);
			}
		}

		if (StringUtils.isNotEmpty(form.getApprover2UserId())) {
			UserDetail userDetail = userDetailService.getUserByNUSNET(form.getApprover2UserId());
			if (userDetail != null) {
				PurchaseApproval approval = new PurchaseApproval();
				approval.setApproverType(ApproverType.APPV_TP_APPROVER_2);
				approval.setStatus(ApprovalStatus.APPV_STS_PENDING);
				approval.setApproverStaffNo(userDetail.getUserNo());
				approval.setAutoApprove(form.getApprover2AutoApprove());
				approval.setApproverRole(form.getApprover2Role());

				if (StringUtils.isNotEmpty(form.getApprover2AuthorizingUserId())) {
					StaffDetail authStaffDetail = staffService.getStaffByNUSNET(form.getApprover2AuthorizingUserId());
					if (authStaffDetail != null) {
						approval.setAuthorizingStaffNo(authStaffDetail.getStaffNo());
					}
				}

				request.getApprovals().add(approval);
			}
		}

		if (RequestType.REQ_TYPE_AOR == request.getRequestType() || RequestType.REQ_TYPE_SQRR == request.getRequestType()) {
			if (CollectionUtils.isNotEmpty(form.getApprovedAccountLimits())) {
				request.setAccountLimits(form.getApprovedAccountLimits());
			}
		}

		if (RequestType.REQ_TYPE_AOR == request.getRequestType() || RequestType.REQ_TYPE_SQRR == request.getRequestType()) {
			if (CollectionUtils.isNotEmpty(form.getSupportingDocuments())) {
				List<Document> documents = form.getSupportingDocuments().stream()
						.peek(d -> d.setDocumentType(DocumentType.DOCUMENT_SUPPORTING))
						.map(this.documentModelMapper::purchaseQuotationAttachmentToDocument)
						.collect(Collectors.toList());
				request.setRequestDocuments(documents);
			}
		}

		if (CollectionUtils.isNotEmpty(form.getSealedSourceSafetyAttachment())) {
			List<Document> documents = form.getSealedSourceSafetyAttachment().stream()
					.peek(d -> d.setDocumentType(DocumentType.DOCUMENT_SEALED_SOURCE_SAFETY))
					.map(this.documentModelMapper::purchaseQuotationAttachmentToDocument)
					.collect(Collectors.toList());

			if (CollectionUtils.isEmpty(request.getRequestDocuments())) {
				request.setRequestDocuments(documents);
			} else {
				List<Document> concat = new ArrayList<>(request.getRequestDocuments().size() + documents.size());
				concat.addAll(request.getRequestDocuments());
				concat.addAll(documents);

				request.setRequestDocuments(concat);
			}
		}

		if (RequestType.REQ_TYPE_AOR == request.getRequestType()) {
			request.setPurposeOfPurchase(form.getPurposeOfPurchase());
		}

		// Authorizing user.
		if (StringUtils.isNotEmpty(form.getAuthorizingUserId())) {
			StaffDetail authUser = staffService.getStaffByNUSNET(form.getAuthorizingUserId());
			request.setAuthorizingStaffNo(authUser.getStaffNo());
		}

		// Set the department based on the WBS faculty and department.
		Set<String> wbsAccountNos = new HashSet<>();
		if (CollectionUtils.isNotEmpty(request.getLineItems())) {
			for (LineItem lineItem: request.getLineItems()) {
				if (CollectionUtils.isEmpty(lineItem.getAccountAssignments())) {
					continue;
				}

				for (AccountAssignment aa: lineItem.getAccountAssignments()) {
					wbsAccountNos.add(aa.getWbs());
				}
			}
		}

		if (CollectionUtils.isNotEmpty(request.getAccountLimits())) {
			for (ApprovedAccountLimit al: request.getAccountLimits()) {
				wbsAccountNos.add(al.getWbs());
			}
		}

		if (CollectionUtils.isNotEmpty(wbsAccountNos)) {
			List<WBSAccount> accounts = wbsAccountNos.stream()
					.filter(StringUtils::isNotEmpty)
					.map(wbsAccountService::getWBSAccount)
					.filter(Objects::nonNull)
					.collect(Collectors.toList());

			// It should have been validated to all belong to the same department.
			String departmentCode = accounts.stream()
					.filter(wa -> null != wa.getDepartment())
					.map(wa -> wa.getDepartment().getDepartment())
					.filter(StringUtils::isNotEmpty)
					.findFirst()
					.orElse(null);

			if (StringUtils.isNotEmpty(departmentCode)) {
				Faculty facultyDepartment = lookupService.getFacultyOfDepartment(departmentCode);
				request.setFacultyDepartment(facultyDepartment);
			}
		}

		// TODO: Always recalculate the form totals.

		return request;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public PurchaseRequestForm domainObjectToForm(Request request, Boolean copy) {
		if (request == null) { return null; }
		
		PurchaseRequestForm form = domainObjectToUserInputForm(request, copy);
		
		if(copy) { return form; }
		
		if (request.getId() != null) {
			form.setId(request.getId());
		}

		form.setStatus(request.getStatusCode());
		form.setPurchaseRequestNumber(request.getRequestNo());
		
		// Date of Request.
		SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);
		if (request.getDateOfRequest() != null) {
			form.setDateOfRequest(dateFormat.format(request.getDateOfRequest()));
		}

		form.setCreatorId(request.getCreateUserNo());
		form.setUpdaterId(request.getUpdateUserNo());

		// Fund check
		List<PurchaseFundCheck> purchaseFundChecks = new ArrayList<>();
		if (CollectionUtils.isNotEmpty(request.getSystemChecks())) {
			for (SystemCheck systemCheck : request.getSystemChecks()) {
				if (null != systemCheck && SystemCheckType.SYSCHK_FUND.equals(systemCheck.getCheckType())) {
					List<FundCheckResult> fundChecks = systemCheck.getResultDetail();

					if (CollectionUtils.isNotEmpty(fundChecks)) {
						purchaseFundChecks
								.addAll(fundCheckDetailModelMapper.domainObjectListToFormObjectList(fundChecks));
					}
				}
			}
		}
		form.setFundChecks(purchaseFundChecks);

		// Licence check
		List<PurchaseLicenceCheck> purchaseLicenceChecks = new ArrayList<>();
		
		boolean isOverseas = requestService.isOverseasSupplier(request);
		
		if (CollectionUtils.isNotEmpty(request.getSystemChecks())) {
			for (SystemCheck systemCheck : request.getSystemChecks()) {
				// 1.0 Chemical
				if (null != systemCheck && SystemCheckType.SYSCHK_LICENCE.equals(systemCheck.getCheckType())) {
					List<ChemicalLicenseCheckResult> licenceChecks = systemCheck.getResultDetail();
					
					if (CollectionUtils.isNotEmpty(licenceChecks)) {
						List<String> chemicalNos = licenceChecks.stream()
								.map(ChemicalLicenseCheckResult::getChemicalNo)
								.collect(Collectors.toList());
						Map<String, ChemicalCatalogItem> chemicalMap = this.catalogService
								.getCatalogById(ProductTypeCode.PRODUCT_CHEMICAL, chemicalNos)
								.stream()
								.map(ChemicalCatalogItem.class::cast)
								.collect(Collectors.toMap(ChemicalCatalogItem::getChemicalNumber, Function.identity()));

						for (ChemicalLicenseCheckResult licenceCheck : licenceChecks) {
							PurchaseChemicalLicenceCheck purchaseLicenceCheck = new PurchaseChemicalLicenceCheck();
							purchaseLicenceCheck.setProductTypeCode(ProductTypeCode.PRODUCT_CHEMICAL);
							purchaseLicenceCheck.setChemicalNumber(licenceCheck.getChemicalNo());
							purchaseLicenceCheck.setStatus(licenceCheck.getOverallResult().getDescription());
							purchaseLicenceCheck.setQuantity(licenceCheck.getQuantity());
							purchaseLicenceCheck.setQuantityUnit(licenceCheck.getQuantityUnit());
							purchaseLicenceCheck.setPhysicalForm(licenceCheck.getPhysicalForm());

							Map<String, LicenseCheckResult> licenceCheckResultMap = licenceCheck.getRegulationCheckResults()
									.stream()
									.collect(Collectors.toMap(LicenseCheckResult::getRegulationId, Function.identity()));

							ChemicalCatalogItem catalogItem = chemicalMap.get(purchaseLicenceCheck.getChemicalNumber());
							if (catalogItem != null) {
								purchaseLicenceCheck.setChemicalName(catalogItem.getChemicalName());
								purchaseLicenceCheck.setCasNumbers(catalogItem.getCasNumbers());
								purchaseLicenceCheck.setSynonyms(catalogItem.getSynonyms());
								if (ObjectUtils.isNotEmpty(catalogItem.getRegulations())) {
									purchaseLicenceCheck.setRegulations(catalogItem.getRegulations().stream()
											.map(ObjectUtils::clone)
											.collect(Collectors.toList()));
									
									purchaseLicenceCheck.getRegulations().removeIf(r -> null == licenceCheckResultMap.get(r.getCode()));

									for (ChemicalRegulation regulation: purchaseLicenceCheck.getRegulations()) {
										LicenseCheckResult result = licenceCheckResultMap.get(regulation.getCode());
										RegulationCheck rc = RegulationCheck.fromDescription(regulation.getDescription(), regulation.getSchedule());

										if (rc != null) {
											if (!isOverseas && rc.isRequireLicenceCheckForLocal()) {
												regulation.setLicenseCheck(result.getResult());
												regulation.setMessage(result.getMessage());
											} else if (isOverseas && rc.isRequireLicenceCheckForOverseas()) {
												regulation.setLicenseCheck(result.getResult());
												regulation.setMessage(result.getMessage());
											}
										}
									}

									// Sort the licence checks, with null results at the bottom.
									purchaseLicenceCheck.getRegulations().sort((a, b) -> {
										if (a.getLicenseCheck() == null && b.getLicenseCheck() != null) {
											return 1;
										}

										if (a.getLicenseCheck() != null && b.getLicenseCheck() == null) {
											return -1;
										}

										return a.getDescription().compareTo(b.getDescription());
									});
								} else {
									purchaseLicenceCheck.setRegulations(catalogItem.getRegulations());
								}
							}

							purchaseLicenceCheck.setDate(licenceCheck.getDate());
							purchaseLicenceChecks.add(purchaseLicenceCheck);
						}
					}
				}
				
				// 2.0 Radioactive
				if (null != systemCheck && SystemCheckType.SYSCHK_LICENCE_RADIOACTIVE.equals(systemCheck.getCheckType())) {
					List<RadioactiveLicenceCheckResult> licenceChecks = systemCheck.getResultDetail();
					
					if(CollectionUtils.isNotEmpty(licenceChecks)) {
						List<String> radionuclideIds = licenceChecks.stream()
								.map(RadioactiveLicenceCheckResult::getRadionuclideId)
								.collect(Collectors.toList());
						
						Map<String, RadioactiveCatalogItem> radioactiveMap = this.catalogService
								.getCatalogById(ProductTypeCode.PRODUCT_RADIOACTIVE, radionuclideIds)
								.stream()
								.map(RadioactiveCatalogItem.class::cast)
								.collect(Collectors.toMap(RadioactiveCatalogItem::getRadionuclideId, Function.identity()));
						
						for (RadioactiveLicenceCheckResult licenceCheck : licenceChecks) {
							PurchaseRadioactiveLicenceCheck purchaseLicenceCheck = new PurchaseRadioactiveLicenceCheck();
							purchaseLicenceCheck.setProductTypeCode(ProductTypeCode.PRODUCT_RADIOACTIVE);
							purchaseLicenceCheck.setLineItemNumber(licenceCheck.getLineItemNumber());
							purchaseLicenceCheck.setDate(licenceCheck.getDate());
							purchaseLicenceCheck.setStatus(licenceCheck.getOverallResult().getDescription());
							
							RadioactiveCatalogItem catalogItem = radioactiveMap.get(licenceCheck.getRadionuclideId());
							
							// radioactive details
							if(catalogItem != null) {
								List<Regulation> regulations = licenceCheck.getRegulationCheckResults()
										.stream()
										.map(k -> {
											Regulation regulation = new Regulation();
											regulation.setCode(k.getRegulationId());
											regulation.setDescription(k.getRegulationName());
											regulation.setLicenseCheck(k.getResult());
											regulation.setMessage(k.getMessage());
											return regulation;
										}).collect(Collectors.toList());
								purchaseLicenceCheck.setRegulations(regulations);
								purchaseLicenceCheck.setRadionuclides(catalogItem.getRadionuclideName());
							}
							purchaseLicenceChecks.add(purchaseLicenceCheck);
						}
					}
				}
			}
		}

		form.setLicenceChecks(purchaseLicenceChecks);

		// Approvals
		if (CollectionUtils.isNotEmpty(request.getApprovals())) {
			form.setPurchaseApprovals(request.getApprovals().stream()
				.map(approvalModelMapper::domainObjectToForm)
				.sorted(Comparator.comparingInt(a -> a.getApproverType().getSortOrder()))
				.collect(Collectors.toList()));

			for (PurchaseApprovalForm paf: form.getPurchaseApprovals()) {
				if (paf.getApproverType() == ApproverType.APPV_TP_APPROVER_1) {
					form.setApprover1UserId(paf.getApprover());
					form.setApprover1AuthorizingUserId(paf.getAuthorizingUser());
					form.setApprover1AutoApprove(paf.getAutoApprove());
					form.setApprover1Role(paf.getApproverRole());
				}
				if (paf.getApproverType() == ApproverType.APPV_TP_APPROVER_2) {
					form.setApprover2UserId(paf.getApprover());
					form.setApprover2AuthorizingUserId(paf.getAuthorizingUser());
					form.setApprover2AutoApprove(paf.getAutoApprove());
					form.setApprover2Role(paf.getApproverRole());
				}
			}
		}

		return form;
	}
	
	private PurchaseRequestForm domainObjectToUserInputForm(Request request, Boolean copy) {
		
		PurchaseRequestForm form = new PurchaseRequestForm();
		
		if (request.getCurrency() != null) {
			form.setCurrencyCode(request.getCurrency().getCode());
		}

		if (null != request.getTotalAmount()) {
			form.setTotal(request.getTotalAmount());
			form.setSgdTotal(request.getTotalAmount());
		}

		form.setEpvType(request.getEpv());
		form.setRequestType(request.getRequestType());

		// Line Items.
		form.setLineItems(lineItemModelMapper.toPurchaseLineItems(request, request.getLineItems()));

		// Location.
		if (request.getLocation() != null) {
			form.setLocation(locationModelMapper.domainToFormObject(request.getLocation()));
		}

		if (request.getRequestDetail() != null) {
			RequestAdditionalDetails additionalDetails = request.getRequestDetail();
			form.setDefaultWBS(additionalDetails.getWbs());
			form.setDefaultGLAccount(additionalDetails.getGlAccount());
			form.setCurrencyExchangeRates(additionalDetails.getExchangeRates());

			if (StringUtils.equals(Constants.DOWNPAYMENT_CATEGORY_CODE, additionalDetails.getDownpaymentCategory())) {
				form.setDownpaymentCategory(true);
			}

			if (StringUtils.isNotEmpty(form.getDefaultWBS())) {
				form.setDefaultWBSOwner(getWBSOwner(form.getDefaultWBS()));
			}

			if (StringUtils.isNotEmpty(form.getDefaultGLAccount())) {
				form.setDefaultGLAccountDescription(getGLAccountDescription(form.getDefaultGLAccount()));
			}
		}

		// Quotation Summary and quotations.
		form.setQuotationSummary(deliveryInfoModelMapper.toPurchaseQuotationSummary(request.getDeliveryInfo()));
		quotationModelMapper.toPurchaseQuotationList(form.getQuotationSummary(), request.getQuotations(), copy);

		if (StringUtils.isNotEmpty(request.getPurposeOfPurchase())) {
			if (form.getQuotationSummary() == null) {
				form.setQuotationSummary(new PurchaseQuotationSummary());
			}

			form.setPurposeOfPurchase(request.getPurposeOfPurchase());
		}

		form.setRequestorId(request.getRequestorStaffNo());
		form.setRequestorRole(request.getRequestorRole());

		// Inventory Owner
		if (StringUtils.isNotEmpty(request.getInventoryOwnerStaffNo())) {
			StaffDetail staffDetail = staffService.getStaff(request.getInventoryOwnerStaffNo());
			if (staffDetail != null) {
				form.setInventoryOwner(staffDetail.getName());

				if (CollectionUtils.isNotEmpty(staffDetail.getNusnetDetails())) {
					form.setInventoryOwnerUserId(staffDetail.getNusnetDetails().get(0).getUserId());
				}
			}
		}

		// Approved account limits.
		if (CollectionUtils.isNotEmpty(request.getAccountLimits())) {
			form.setApprovedAccountLimits(request.getAccountLimits());

			for (ApprovedAccountLimit aal: form.getApprovedAccountLimits()) {
				if (StringUtils.isNotEmpty(aal.getWbs())) {
					aal.setWbsAccountOwner(getWBSOwner(aal.getWbs()));
				}

				if (StringUtils.isNotEmpty(aal.getGlAccount())) {
					aal.setGlAccountDescription(getGLAccountDescription(aal.getGlAccount()));
				}
			}
		}

		// Supporting documents.
		if (CollectionUtils.isNotEmpty(request.getRequestDocuments())) {
			List<PurchaseAttachment> attachments = request.getRequestDocuments().stream()
					.filter(d -> d.getDocumentType() == DocumentType.DOCUMENT_SUPPORTING)
					.map(d -> this.documentModelMapper.documentToPurchaseQuotationAttachment(d, copy))
					.collect(Collectors.toList());

			form.setSupportingDocuments(attachments);

			List<PurchaseAttachment> sealedSourceAttachments = request.getRequestDocuments().stream()
					.filter(d -> d.getDocumentType() == DocumentType.DOCUMENT_SEALED_SOURCE_SAFETY)
					.map(d -> this.documentModelMapper.documentToPurchaseQuotationAttachment(d, copy))
					.collect(Collectors.toList());

			if (CollectionUtils.isNotEmpty(sealedSourceAttachments)) {
				form.setSealedSourceSafetyAttachment(sealedSourceAttachments);
			}
		}

		if (RequestType.REQ_TYPE_AOR == request.getRequestType()) {
			form.setPurposeOfPurchase(request.getPurposeOfPurchase());
		}

		// Authorizing user.
		if (StringUtils.isNotEmpty(request.getAuthorizingStaffNo())) {
			StaffDetail authUser = staffService.getStaff(request.getAuthorizingStaffNo());
			form.setAuthorizingUserName(authUser.getName());

			if (CollectionUtils.isNotEmpty(authUser.getNusnetDetails())) {
				authUser.getNusnetDetails().stream()
						.min(Comparator.comparing(NUSNETDetail::getUserId))
						.ifPresent(nn -> form.setAuthorizingUserId(nn.getUserId()));
			}
		}
		
		// set requestor department name
		if (StringUtils.isNotEmpty(request.getRequestorStaffNo())) {
			List<Department> requestorDepartments = getRequestorDepartments(request.getRequestorStaffNo());
			if (CollectionUtils.isNotEmpty(requestorDepartments)) {
				form.setRequestorDepartmentName(requestorDepartments.stream()
						.map(Department::getDescription)
						.collect(Collectors.joining(", ")));
			}
		}

		return form;
	}
	
	private List<Department> getRequestorDepartments(String requestorStaffNo) {
		UserDetail userDetail = userDetailService.getUserByUserNo(requestorStaffNo);
		if(null != userDetail && CollectionUtils.isNotEmpty(userDetail.getNusnetDetails())) {
			List<String> departmentCodes = userDetail.getNusnetDetails().stream()
					.filter(n -> null != n && StringUtils.isNotEmpty(n.getDepartmentCode()) 
					&& StringUtils.equals(n.getStatus(), Constants.ACTIVE_STAFF))
					.map(NUSNETDetail::getDepartmentCode)
					.collect(Collectors.toList());
			return departmentCodes.stream().map(lookupService::getDepartmentByCode)
					.collect(Collectors.toList());
			
		}
		return Collections.emptyList();
	}
	
	public void attachPendingGoodsReceiptInfo(PurchaseRequestForm form, List<PendingGoodsReceiptInfo> pendingGoodsReceiptInfos) {
		form.setPendingGoodsReceiptInfo(pendingGoodsReceiptInfos);
	}

	private String getWBSOwner(String wbs) {
		if (StringUtils.isNotEmpty(wbs)) {
			WBSAccount wbsAccount = wbsAccountService.getWBSAccount(wbs);
			if (wbsAccount != null) {
				if (StringUtils.isNotEmpty(wbsAccount.getPi1Id())) {
					// Owned by PI.
					StaffDetail staffDetail = staffService.getStaffByNUSNET(wbsAccount.getPi1Id());
					return staffDetail.getName();
				} else {
					// Owned by department.
					return wbsAccount.getDepartment().getDescription();
				}
			}
		}

		return null;
	}

	private String getGLAccountDescription(String glAccount) {
		if (StringUtils.isNotEmpty(glAccount)) {
			GLAccount gl = lookupService.getGLAccountByCode(glAccount);
			if (gl != null) {
				return gl.getDescription();
			}
		}

		return null;
	}
}
