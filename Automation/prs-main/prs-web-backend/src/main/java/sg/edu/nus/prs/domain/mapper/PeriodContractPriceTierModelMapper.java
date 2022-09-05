package sg.edu.nus.prs.domain.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.periodcontract.PeriodContractProductPriceTier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractProductPriceTierForm;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierProduct;

@Component
public class PeriodContractPriceTierModelMapper {

	public PeriodContractProductPriceTier toPeriodContractProductPriceTier(PeriodContractProductPriceTierForm form) {
		if (form == null) {
			return null;
		}

		PeriodContractProductPriceTier priceTier = new PeriodContractProductPriceTier();
		priceTier.setMaxQuantity(form.getMaxQuantity());
		priceTier.setMinQuantity(form.getMinQuantity());
		priceTier.setPriceTierNumber(form.getPriceTierNumber());
		priceTier.setUnitPrice(form.getUnitPrice());

		return priceTier;
	}

	public List<PeriodContractProductPriceTier> toPeriodContractProductPriceTier(List<PeriodContractProductPriceTierForm> priceTierList) {
		if (CollectionUtils.isNotEmpty(priceTierList)) {
			return priceTierList.stream()
					.map(this::toPeriodContractProductPriceTier)
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	
	private PeriodContractProductPriceTierForm domainObjectToForm(PeriodContractProductPriceTier priceTier) {
		if (priceTier == null) {
			return null;
		}

		PeriodContractProductPriceTierForm form = new PeriodContractProductPriceTierForm();
		form.setMaxQuantity(priceTier.getMaxQuantity());
		form.setMinQuantity(priceTier.getMinQuantity());
		form.setPriceTierNumber(priceTier.getPriceTierNumber());
		form.setUnitPrice(priceTier.getUnitPrice());
		//form.setSupplierProductNumber(priceTier.getSupplierProductNumber());

		return form;
	}
	
	public List<PeriodContractProductPriceTierForm> domainObjectToForm(List<PeriodContractProductPriceTier> priceTierList) {
		if (CollectionUtils.isNotEmpty(priceTierList)) {
			return priceTierList.stream().filter(Objects::nonNull)
					.map(this::domainObjectToForm)
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

}
