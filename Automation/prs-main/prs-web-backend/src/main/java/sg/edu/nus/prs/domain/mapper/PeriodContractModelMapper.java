package sg.edu.nus.prs.domain.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.periodcontract.PeriodContract;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractContact;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractForm;
import sg.edu.nus.prs.exception.PRSExceptionCode;
import sg.edu.nus.prs.exception.PRSRuntimException;
import sg.edu.nus.prs.util.Constants;

@Component
public class PeriodContractModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(PeriodContractModelMapper.class);
	private final PeriodContractSupplierModelMapper supplierModelMapper;
	
	@Autowired
	PeriodContractModelMapper(PeriodContractSupplierModelMapper supplierModelMapper) {
		this.supplierModelMapper = supplierModelMapper;
	}

	public PeriodContract toPeriodContract(PeriodContractForm form) {
		if (form == null) {
			return null;
		}

		PeriodContract periodContract = new PeriodContract();
		if (StringUtils.isNotEmpty(form.getId())) {
			periodContract.setPeriodContractSequenceNumber(form.getId());
		}

		periodContract.setContractNumber(form.getContractNumber());
		periodContract.setContractValue(form.getContractValue());
		periodContract.setContractDesc(form.getContractDescription());

		if (StringUtils.isNotEmpty(form.getCurrencyCode())) {
			Currency currency = new Currency();
			currency.setCode(form.getCurrencyCode());
			periodContract.setCurrency(currency);
		}

		periodContract.setContractStatus(form.getStatus());
		periodContract.setContractApplicableFor(form.getContractApplicableFor());
		periodContract.setContractCategory(form.getCategory());
		periodContract.setContractType(form.getContractType());
		
		if (StringUtils.isNotEmpty(form.getDurationStartDate())) {
			try {
				periodContract.setStartDate(DateUtils.parseDate(form.getDurationStartDate(), Constants.DATE_FORMAT));
			} catch (ParseException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_INVALID_DATE);
			}
		}
		
		if (StringUtils.isNotEmpty(form.getDurationEndDate())) {
			try {
				periodContract.setEndDate(DateUtils.parseDate(form.getDurationEndDate(), Constants.DATE_FORMAT));
			} catch (ParseException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_INVALID_DATE);
			}
		}

		periodContract.setSupplierList(supplierModelMapper.toPeriodContractSupplier(form.getSupplierList()));

		if (CollectionUtils.isNotEmpty(form.getFaculties())) {
			periodContract.setFaculties(new ArrayList<>(form.getFaculties()));
		}

		if (CollectionUtils.isNotEmpty(form.getContactEmails())) {
			periodContract.setContactEmails(form.getContactEmails().stream()
				.map(PeriodContractContact::getContactNusnet)
				.filter(StringUtils::isNotEmpty)
				.collect(Collectors.toList()));
		}

		return periodContract;
	}
	
	public PeriodContractForm domainObjectToForm(PeriodContract periodContract) {
		if (periodContract == null) {
			return null;
		}

		PeriodContractForm form = new PeriodContractForm();
		if (StringUtils.isNotEmpty(periodContract.getPeriodContractSequenceNumber())) {
			form.setId(periodContract.getPeriodContractSequenceNumber());
		}

		form.setContractNumber(periodContract.getContractNumber());
		form.setContractValue(periodContract.getContractValue());
		form.setContractDescription(periodContract.getContractDesc());

		if (periodContract.getCurrency() != null) {
			form.setCurrencyCode(periodContract.getCurrency().getCode());
		}

		form.setStatus(periodContract.getContractStatus());
		form.setContractApplicableFor(periodContract.getContractApplicableFor());
		form.setCategory(periodContract.getContractCategory());
		form.setContractType(periodContract.getContractType());
		
		SimpleDateFormat dateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);
		
		if (periodContract.getStartDate() != null) {
			form.setDurationStartDate(dateFormat.format(periodContract.getStartDate()));
		}
		
		if (periodContract.getEndDate() != null) {
			form.setDurationEndDate(dateFormat.format(periodContract.getEndDate()));
		}
		
		form.setSupplierList(supplierModelMapper.domainObjectToForm(periodContract.getSupplierList()));

		if (CollectionUtils.isNotEmpty(periodContract.getFaculties())) {
			form.setFaculties(new ArrayList<>(periodContract.getFaculties()));
		}

		if (CollectionUtils.isNotEmpty(periodContract.getContactEmails())) {
			form.setContactEmails(periodContract.getContactEmails().stream()
				.map(ce -> new PeriodContractContact(ce))
				.collect(Collectors.toList()));
		}

		return form;
	}
	


}
