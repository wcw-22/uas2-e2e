package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.domain.purchase.*;
import sg.edu.nus.prs.exception.PRSExceptionCode;
import sg.edu.nus.prs.exception.PRSRuntimException;
import sg.edu.nus.prs.util.CommonUtils;
import sg.edu.nus.prs.util.Constants;

import java.text.ParseException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class QuotationModelMapper {
	private final DocumentModelMapper documentModelMapper;

	@Autowired
	public QuotationModelMapper(DocumentModelMapper documentModelMapper) {
		this.documentModelMapper = documentModelMapper;
	}

	public List<Quotation> toQuotationList(PurchaseQuotationSummary summary, List<PurchaseLineItem> lineItems) {
		List<Quotation> quotations = new ArrayList<>();
		if (summary != null && CollectionUtils.isNotEmpty(summary.getQuotations())) {
			quotations = summary.getQuotations().stream()
					.map(q -> this.purchaseQuotationToQuotation(summary, q))
					.peek(q -> q.setAwardFlag(true))
					.collect(Collectors.toList());
		}

		if (summary != null && CollectionUtils.isNotEmpty(summary.getOtherQuotations())) {
			List<Quotation> otherQuotations = summary.getOtherQuotations().stream()
					.map(q -> this.purchaseQuotationToQuotation(summary, q))
					.peek(q -> q.setAwardFlag(false))
					.collect(Collectors.toList());

			quotations.addAll(otherQuotations);
		}

		if (CollectionUtils.isNotEmpty(lineItems)) {
			Map<String, Quotation> quotationMap = quotations.stream()
					.filter(q -> q.getSupplier() != null)
					.filter(q -> StringUtils.isNotBlank(q.getSupplier().getSupplierCode()))
					.filter(q -> Boolean.TRUE.equals(q.getAwardFlag()))
					.collect(Collectors.toMap(q -> q.getSupplier().getSupplierCode(), Function.identity()));

			List<Quotation> missingQuotations = new ArrayList<>();

			for (PurchaseLineItem pli: lineItems) {
				if (pli.getSupplier() == null
					|| StringUtils.isBlank(pli.getSupplier().getSupplierCode())) {
					continue;
				}

				Quotation supplierQuotation = quotationMap.get(pli.getSupplier().getSupplierCode());
				if (supplierQuotation == null) {
					Quotation q = new Quotation();
					q.setId(CommonUtils.generateTemporaryId());
					q.setSupplier(new Supplier(
							pli.getSupplier().getSupplierCode(),
							pli.getSupplier().getSupplierName()
					));

					supplierQuotation = q;

					missingQuotations.add(q);
					quotationMap.put(pli.getSupplier().getSupplierCode(), q);
				}

				if (supplierQuotation.getAward() == null) {
					// All line item selected suppliers are awarded.
					QuotationAward award = new QuotationAward();
					supplierQuotation.setAward(award);
					supplierQuotation.setAwardFlag(true);
				}
			}

			if (CollectionUtils.isNotEmpty(missingQuotations)) {
				List<Quotation> combined = new ArrayList<>(quotations.size() + missingQuotations.size());
				combined.addAll(quotations);
				combined.addAll(missingQuotations);

				quotations = combined;
			}
		}

		return quotations;
	}

	private Quotation purchaseQuotationToQuotation(PurchaseQuotationSummary summary, PurchaseQuotation pq) {
		Supplier supplier = new Supplier();
		supplier.setSupplierCode(pq.getSupplierCode());
		supplier.setSupplierName(pq.getSupplier());

		DeliveryInfo deliveryInfo = new DeliveryInfo();
		deliveryInfo.setRequestorName(summary.getRequestorName());
		deliveryInfo.setDeliveryAddress(summary.getDeliveryAddress());
		deliveryInfo.setBillingAddress(summary.getBillingAddress());
		deliveryInfo.setRequestorEmail(summary.getRequestorEmail());
		deliveryInfo.setRequestorPhone(summary.getRequestorPhone());
		deliveryInfo.setInstructionToSupplier(pq.getInstructionToSupplier());
		deliveryInfo.setQuotationReferenceNumber(pq.getQuotationReferenceNumber());
		if (StringUtils.isNotBlank(pq.getExpectedDeliveryDate())) {
			try {
				Date expectedDeliveryDate = DateUtils.parseDate(pq.getExpectedDeliveryDate(), Constants.DATE_FORMAT);
				deliveryInfo.setExpectedDeliveryDate(expectedDeliveryDate);
			} catch (ParseException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_INVALID_DATE);
			}
		}

		deliveryInfo.setPaymentTerm(PaymentTerm.fromDescription(pq.getPaymentTerm()));

		Quotation quotation = new Quotation();
		quotation.setId(CommonUtils.generateTemporaryId());
		quotation.setSupplier(supplier);
		quotation.setQuotationAmount(pq.getTotalAmount());
		quotation.setDeliveryInfo(deliveryInfo);

		if (StringUtils.isNotEmpty(summary.getAwardedSupplierCode())) {
			if (summary.getAwardedSupplierCode().equals(supplier.getSupplierCode())) {
				quotation.setAwardFlag(true);

				QuotationAward award = new QuotationAward();
				award.setAwardJustification(summary.getJustificationOfAward());
				award.setJustificationRemark(summary.getJustificationRemarks());
				quotation.setAward(award);
			}
		}

		if (CollectionUtils.isNotEmpty(pq.getAttachments())) {
			quotation.setDocuments(pq.getAttachments().stream()
					.peek(d -> d.setDocumentType(DocumentType.DOCUMENT_QUOTATION))
					.map(this.documentModelMapper::purchaseQuotationAttachmentToDocument)
					.collect(Collectors.toList()));
		} else {
			quotation.setDocuments(Collections.emptyList());
		}

		return quotation;
	}

	public void toPurchaseQuotationList(PurchaseQuotationSummary summary, List<Quotation> quotations, Boolean copyFlag) {
		if (CollectionUtils.isNotEmpty(quotations)) {
			List<PurchaseQuotation> purchaseQuotations = quotations.stream()
					.filter(q -> Boolean.TRUE.equals(q.getAwardFlag()))
					.map(q -> this.toPurchaseQuotation(summary, q, copyFlag))
					.collect(Collectors.toList());

			List<PurchaseQuotation> otherPurchaseQuotations = quotations.stream()
					.filter(q -> !Boolean.TRUE.equals(q.getAwardFlag()))
					.map(q -> this.toPurchaseQuotation(summary, q, copyFlag))
					.collect(Collectors.toList());

			summary.setQuotations(purchaseQuotations);
			summary.setOtherQuotations(otherPurchaseQuotations);
		} else {
			summary.setQuotations(Collections.emptyList());
			summary.setOtherQuotations(Collections.emptyList());
		}
	}

	private PurchaseQuotation toPurchaseQuotation(PurchaseQuotationSummary summary, Quotation quotation, Boolean copyFlag) {
		PurchaseQuotation pq = new PurchaseQuotation();
		pq.setTotalAmount(quotation.getQuotationAmount());

		if (quotation.getSupplier() != null) {
			pq.setSupplierCode(quotation.getSupplier().getSupplierCode());
			pq.setSupplier(quotation.getSupplier().getSupplierName());

			if (Boolean.TRUE.equals(quotation.getAwardFlag())) {
				// Awarded.
				QuotationAward qa = quotation.getAward();

				summary.setAwardedSupplier(pq.getSupplier());
				summary.setAwardedSupplierCode(pq.getSupplierCode());
				summary.setJustificationOfAward(qa.getAwardJustification());
				summary.setJustificationRemarks(qa.getJustificationRemark());
			}
		}

		if (quotation.getDeliveryInfo() != null) {
			DeliveryInfo deliveryInfo = quotation.getDeliveryInfo();

			pq.setInstructionToSupplier(deliveryInfo.getInstructionToSupplier());
			pq.setQuotationReferenceNumber(deliveryInfo.getQuotationReferenceNumber());

			if (deliveryInfo.getExpectedDeliveryDate() != null) {
				pq.setExpectedDeliveryDate(DateFormatUtils.format(deliveryInfo.getExpectedDeliveryDate(), Constants.DATE_FORMAT));
			}

			if (deliveryInfo.getPaymentTerm() != null) {
				pq.setPaymentTerm(deliveryInfo.getPaymentTerm().getDescription());
			}
		}

		if (CollectionUtils.isNotEmpty(quotation.getDocuments())) {
			pq.setAttachments(quotation.getDocuments().stream()
					.map(d -> this.documentModelMapper.documentToPurchaseQuotationAttachment(d, copyFlag))
					.collect(Collectors.toList()));
		} else {
			pq.setAttachments(Collections.emptyList());
		}

		return pq;
	}



}
