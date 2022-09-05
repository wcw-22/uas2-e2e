package sg.edu.nus.prs.domain.mapper;

import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.InternalStore;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.internalproc.Collection;
import sg.edu.nus.prs.domain.purchase.AccountAssignment;
import sg.edu.nus.prs.domain.purchase.Journal;
import sg.edu.nus.prs.domain.purchase.JournalType;
import sg.edu.nus.prs.domain.purchase.Quotation;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.http.sap.domain.journal.JournalRequest;
import sg.edu.nus.prs.http.sap.domain.journal.JournalRequestDocument;
import sg.edu.nus.prs.http.sap.domain.journal.JournalRequestLineItems;
import sg.edu.nus.prs.http.sap.domain.journal.JournalRequestPosting;
import sg.edu.nus.prs.service.CurrentUserService;
import sg.edu.nus.prs.service.LookupService;
import sg.edu.nus.prs.util.Constants;

@Component
public class JournalModelMapper {

	private LookupService lookupService;
	private CurrentUserService currentUserService;

	@Autowired
	public JournalModelMapper(LookupService lookupService, CurrentUserService currentUserService) {
		this.lookupService = lookupService;
		this.currentUserService = currentUserService;
	}

	public List<Journal> toJournals(Request request, Collection collection) {

		List<AccountAssignment> accountAssignments = request.getLineItems().stream().map(l -> l.getAccountAssignments())
				.flatMap(l -> l.stream()).collect(Collectors.toList());

		AtomicInteger index = new AtomicInteger(1);

		return accountAssignments.stream()
				.map(accountAssignment -> toJournal(request, accountAssignment, collection, index))
				.filter(accountAssignment -> null != accountAssignment)
				.flatMap(accountAssignment -> accountAssignment.stream()).collect(Collectors.toList());
	}

	private List<Journal> toJournal(Request request, AccountAssignment accountAssignment, Collection collection, AtomicInteger index) {

		List<Journal> journals = new ArrayList<>();

		Optional<Quotation> internalAwardedQuotation = request.getQuotations().stream()
				.filter(q -> q.getAwardFlag()
						&& null != lookupService.getInternalStoreBySupplierCode(q.getSupplier().getSupplierCode()))
				.findFirst();

		if (!internalAwardedQuotation.isPresent()) {
			throw new IllegalStateException("Internal Supplier not found.");
		}
			
		InternalStore internalStore = lookupService
				.getInternalStoreBySupplierCode(internalAwardedQuotation.get().getSupplier().getSupplierCode());
		Supplier supplier = internalAwardedQuotation.get().getSupplier();
		
		List<String> itemTexts = new ArrayList<String>();
		itemTexts.add(request.getRequestNo());
		itemTexts.add(supplier.getSupplierName());
		
		Journal debitJournal = new Journal();
		debitJournal.setType(JournalType.JRNL_DEBIT);
		debitJournal.setLineItemNumber(String.valueOf(index.getAndIncrement()));
		debitJournal.setGlAccountNumber(accountAssignment.getGlAccount());
		debitJournal.setWbsAccountNumber(accountAssignment.getWbs());
		debitJournal.setItemText(String.join(Constants.PO_SEPERATOR, itemTexts));
		
		debitJournal.setAccountAssignmentId(accountAssignment.getId());
		debitJournal.setCollectionId(collection.getId());
		debitJournal.setAmount(accountAssignment.getSubTotal().toPlainString());
		debitJournal.setCreateUserNo(currentUserService.currentLoggedInUserNo());
		journals.add(debitJournal);
		
		Journal creditJournal = new Journal();
		creditJournal.setType(JournalType.JRNL_CREDIT);
		creditJournal.setLineItemNumber(String.valueOf(index.getAndIncrement()));
		creditJournal.setWbsAccountNumber(internalStore.getWbsAccountNo());
		creditJournal.setGlAccountNumber(internalStore.getGlAccount());
		creditJournal.setItemText(String.join(Constants.PO_SEPERATOR, itemTexts));				
		creditJournal.setAccountAssignmentId(accountAssignment.getId());
		creditJournal.setCollectionId(collection.getId());
		creditJournal.setAmount(accountAssignment.getSubTotal().toPlainString());
		creditJournal.setCreateUserNo(currentUserService.currentLoggedInUserNo());
		journals.add(creditJournal);

		return journals;
	}

	public JournalRequest toIntObjJournalRequest(Request request, List<Journal> journals, String userId) {
		
		if(CollectionUtils.isEmpty(journals)) {
			throw new IllegalArgumentException("Journal list is required.");
		}

		JournalRequest journalRequest = new JournalRequest();
		
		List<AccountAssignment> accountAssignments = request.getLineItems().stream()
				.map(l -> l.getAccountAssignments())
				.flatMap(l -> l.stream())
				.collect(Collectors.toList());
		
		Map<String, AccountAssignment> accountAssignmentMap = accountAssignments.stream()
				.collect(Collectors.toMap(a -> a.getId(), a -> a));
		
		JournalRequestPosting journalRequestPosting = new JournalRequestPosting();
		JournalRequestLineItems journalRequestLineItem = new JournalRequestLineItems();
		List<JournalRequestPosting> journalRequestPostingList = new ArrayList<JournalRequestPosting>();
		List<JournalRequestLineItems> journalRequestLineItemsList = new ArrayList<JournalRequestLineItems>();
		journalRequestLineItem.setLineItems(toIntObjJournalRequestDocuments(request, accountAssignmentMap, journals, userId));
		journalRequestLineItemsList.add(journalRequestLineItem);
		journalRequestPosting.setPosting(journalRequestLineItemsList);
		journalRequestPostingList.add(journalRequestPosting);
		journalRequest.setPostToSap(journalRequestPosting);
		return journalRequest;
	}

	private List<JournalRequestDocument> toIntObjJournalRequestDocuments(Request request, Map<String, AccountAssignment> accountAssignmentMap,
			List<Journal> journals, String userId) {

		List<JournalRequestDocument> documents = new ArrayList<JournalRequestDocument>();
		
		Quotation awardedQuotation = request.getQuotations().stream()
				.filter(q -> q.getAwardFlag())
				.findFirst()
				.get();
		
		InternalStore internalStore = lookupService.getInternalStoreBySupplierCode(awardedQuotation.getSupplier().getSupplierCode());

		journals.forEach(journal -> {
			JournalRequestDocument journalRequestDocument = new JournalRequestDocument();
			
			journalRequestDocument.setSapReferenceKey(generateObjectKey(request.getRequestNo()));
			journalRequestDocument.setDocumentType(Constants.JournalRequest.DOCUMENT_TYPE);
			journalRequestDocument.setLineItemNumber(journal.getLineItemNumber());
			String amount = accountAssignmentMap.get(journal.getAccountAssignmentId()).getSubTotal().setScale(2, RoundingMode.HALF_UP).toPlainString();
			journalRequestDocument.setAmount(JournalType.JRNL_DEBIT == journal.getType() ? amount
					: StringUtils.join(amount, Constants.JournalRequest.CREDIT_MINUS_SIGN));
			journalRequestDocument.setAccountType(Constants.JournalRequest.ACCOUNT_TYPE);
			journalRequestDocument.setGlAccount(journal.getGlAccountNumber());
			journalRequestDocument.setTaxCode("");
			journalRequestDocument.setSourceItemId(Constants.JournalRequest.SOURCE_SYSTEM_ID);
			journalRequestDocument.setUserId("");
			journalRequestDocument.setCompanyCode(Constants.JournalRequest.COMPANY_CODE);

			SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.SAP_DATE_FORMAT);
			journalRequestDocument.setDocumentDate(dateFormat.format(new Date()));

			journalRequestDocument.setCurrency(Constants.SGD_CURRENCY);
			journalRequestDocument.setItemText(journal.getItemText());
			journalRequestDocument.setWbsAccountNo(journal.getWbsAccountNumber());
			journalRequestDocument.setExchangeRate(Constants.JournalRequest.EXCHANGE_RATE);
			journalRequestDocument.setHeaderText(StringUtils.join(Constants.JournalRequest.HEADER_TEXT_PREFIX, dateFormat.format(new Date())));
			documents.add(journalRequestDocument);
		});

		return documents;
	}

	public String generateObjectKey(String refNo) {
		String formattedVal = refNo.replaceAll("[^\\d]", "");
		formattedVal = StringUtils.leftPad(formattedVal, 14, "0");
		return formattedVal;
	}
}
