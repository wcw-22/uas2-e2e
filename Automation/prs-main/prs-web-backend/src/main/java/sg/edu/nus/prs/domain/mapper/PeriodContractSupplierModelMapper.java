package sg.edu.nus.prs.domain.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Currency;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierForm;

@Component
public class PeriodContractSupplierModelMapper {
	private static final Logger logger = LoggerFactory.getLogger(PeriodContractSupplierModelMapper.class);

	private final PeriodContractAdditionalChargeModelMapper additionalChargesModelMapper;
	private final PeriodContractProductModelMapper productModelMapper;
	
	@Autowired
	PeriodContractSupplierModelMapper(PeriodContractAdditionalChargeModelMapper additionalChargesModelMapper,
									  PeriodContractProductModelMapper productModelMapper) {
		this.additionalChargesModelMapper = additionalChargesModelMapper;
		this.productModelMapper = productModelMapper;
	}

	public PeriodContractSupplier toPeriodContractSupplier(PeriodContractSupplierForm form) {
		if (form == null || (
				StringUtils.isBlank(form.getSupplierCode())
				&& StringUtils.isBlank(form.getSupplierName()) && StringUtils.isBlank(form.getCurrencyCode())
				&& (form.getAdditionalCharge() == null || (form.getAdditionalCharge() != null && form.getAdditionalCharge().getAdditionalChargeAmount() == null))
				&& CollectionUtils.isEmpty(form.getProductList()))) {
			return null;
		}

		PeriodContractSupplier supplier = new PeriodContractSupplier();

		supplier.setSupplierNumber(form.getSupplierNumber());
		supplier.setSupplierCode(form.getSupplierCode());
		supplier.setSupplierName(form.getSupplierName());

		if (StringUtils.isNotBlank(form.getCurrencyCode())) {
			Currency currency = new Currency();
			currency.setCode(form.getCurrencyCode());

			supplier.setCurrency(currency);
		}

		if (form.getAdditionalCharge() != null) {
			supplier.setAdditionalCharge(additionalChargesModelMapper.toPeriodContractSupplierAdditionalCharge(form.getAdditionalCharge()));
		}

		supplier.setProductList(productModelMapper.toPeriodContractSupplierProduct(form.getProductList()));

		return supplier;
	}

	public List<PeriodContractSupplier> toPeriodContractSupplier(List<PeriodContractSupplierForm> suppliers) {
		if (CollectionUtils.isNotEmpty(suppliers)) {
			return suppliers.stream()
					.map(this::toPeriodContractSupplier)
					.filter(Objects::nonNull)
					.collect(Collectors.toList());
		}

		return Collections.emptyList();
	}
	
	private PeriodContractSupplierForm domainObjectToForm(PeriodContractSupplier supplier) {
		if (supplier == null) {
			return null;
		}

		PeriodContractSupplierForm form = new PeriodContractSupplierForm();
		if (supplier.getCurrency() != null) {
			form.setCurrencyCode(supplier.getCurrency().getCode());
		}
		
		//form.setPeriodContractNumber(supplier.getPeriodContractNumber());
		form.setSupplierCode(supplier.getSupplierCode());
		form.setSupplierName(supplier.getSupplierName());
		form.setSupplierNumber(supplier.getSupplierNumber());
		form.setAdditionalCharge(additionalChargesModelMapper.domainObjectToForm(supplier.getAdditionalCharge()));
		form.setProductList(productModelMapper.domainObjectToForm(supplier.getProductList()));
		
		if (CollectionUtils.isNotEmpty(form.getProductList())) {
			form.getProductList().forEach(p -> p.setCurrencyCode(form.getCurrencyCode()));
		}
		return form;
	}
	
	public List<PeriodContractSupplierForm> domainObjectToForm(List<PeriodContractSupplier> suppliers) {
		if (CollectionUtils.isNotEmpty(suppliers)) {
				return suppliers.stream().filter(Objects::nonNull).map(this::domainObjectToForm).collect(Collectors.toList());
			
		}
		return Collections.emptyList();
	}
}
