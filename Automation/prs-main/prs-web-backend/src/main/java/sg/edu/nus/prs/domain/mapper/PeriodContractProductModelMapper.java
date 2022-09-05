package sg.edu.nus.prs.domain.mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierProduct;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierProductForm;
import sg.edu.nus.prs.domain.purchase.ProductTypeCode;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogItem;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;

@Component
public class PeriodContractProductModelMapper {
	private final PeriodContractPriceTierModelMapper priceTierModelMapper;
	
	@Autowired
	PeriodContractProductModelMapper(PeriodContractPriceTierModelMapper priceTierModelMapper) {
		this.priceTierModelMapper = priceTierModelMapper;
	}

	public PeriodContractSupplierProduct toPeriodContractSupplierProduct(PeriodContractSupplierProductForm form) {
		if (form == null) {
			return null;
		}
		PeriodContractSupplierProduct product = new PeriodContractSupplierProduct();
		product.setProductNumber(form.getProductNumber());
		product.setSupplierPartNumber(form.getSupplierPartNumber());
		product.setUnit(form.getUnit());
		product.setQuantityPerUnit(form.getQuantityPerUnit());

		if (form.getCatalogItem() != null) {
			product.setProductTypeCode(form.getCatalogItem().getProductTypeCode());
			product.setProductReferenceNumber(form.getCatalogItem().getProductId());
		}

		product.setPriceTierList(priceTierModelMapper.toPeriodContractProductPriceTier(form.getPriceTierList()));

		return product;
	}

	public List<PeriodContractSupplierProduct> toPeriodContractSupplierProduct(List<PeriodContractSupplierProductForm> products) {
		if (CollectionUtils.isNotEmpty(products)) {
			return products.stream()
					.map(this::toPeriodContractSupplierProduct)
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}

	private PeriodContractSupplierProductForm domainObjectToForm(PeriodContractSupplierProduct product) {
		if (product == null) {
			return null;
		}
		PeriodContractSupplierProductForm form = new PeriodContractSupplierProductForm();
		form.setProductNumber(product.getProductNumber());
		form.setQuantityPerUnit(product.getQuantityPerUnit());
		form.setSupplierPartNumber(product.getSupplierPartNumber());
		form.setUnit(product.getUnit());
		form.setCatalogItem(getCatalogItem(product));
		form.setPriceTierList(priceTierModelMapper.domainObjectToForm(product.getPriceTierList()));
		
		return form;
	}
	
	public List<PeriodContractSupplierProductForm> domainObjectToForm(List<PeriodContractSupplierProduct> productList) {
		if (CollectionUtils.isNotEmpty(productList)) {
			return productList.stream().filter(Objects::nonNull)
					.map(this::domainObjectToForm)
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}
	
	
	private CatalogItem getCatalogItem(PeriodContractSupplierProduct product) {
		if (product.getProductTypeCode() == ProductTypeCode.PRODUCT_CHEMICAL) {
			ChemicalProductDetail productDetail = (ChemicalProductDetail) product.getProductDetail();
			return productDetail.toCatalogItem();
		}

		return null;
	}
}
