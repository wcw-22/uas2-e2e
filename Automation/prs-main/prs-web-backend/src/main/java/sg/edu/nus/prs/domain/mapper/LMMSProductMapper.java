package sg.edu.nus.prs.domain.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.NotationType;
import sg.edu.nus.prs.domain.common.NumericalValue;
import sg.edu.nus.prs.domain.purchase.ChemicalProduct;
import sg.edu.nus.prs.domain.purchase.ChemicalProductInventory;
import sg.edu.nus.prs.domain.purchase.ChemicalProductInventoryCommitRollBackTransferRequest;
import sg.edu.nus.prs.domain.purchase.ChemicalProductInventoryLabelledRequest;
import sg.edu.nus.prs.domain.purchase.ProductInventoryListRequest;
import sg.edu.nus.prs.domain.purchase.ProductInventoryRequest;
import sg.edu.nus.prs.domain.purchase.ProductInventoryReserveRequest;
import sg.edu.nus.prs.domain.purchase.ChemicalProductInventoryReserveTransferRequest;
import sg.edu.nus.prs.domain.purchase.productdetails.BiologicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.RadioactiveProductDetail;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveActivity;
import sg.edu.nus.prs.http.lmms.domain.ProductData;
import sg.edu.nus.prs.http.lmms.domain.ProductInventoryData;
import sg.edu.nus.prs.http.lmms.domain.LMMSCommitRollBackTransferProductInventoryRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSLabelledProductInventoryRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSProductInventoryListRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSProductInventoryRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSProductInventoryReserveRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSRadioactiveProductRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSRadioactiveProductRequestActivity;
import sg.edu.nus.prs.http.lmms.domain.LMMSRadioactiveProductRequestBiological;
import sg.edu.nus.prs.http.lmms.domain.LMMSRadioactiveProductRequestRadionuclide;
import sg.edu.nus.prs.http.lmms.domain.LMMSBiologicalProductRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSChemicalProductRequest;
import sg.edu.nus.prs.http.lmms.domain.LMMSReserveTransferProductInventoryRequest;

@Component
public class LMMSProductMapper {

	private ModelMapper modelMapper;
	
	@Autowired
	public LMMSProductMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}
	
	public ChemicalProduct intObjectToDomainObjectChemicalProduct(ProductData intObj) {
		return this.modelMapper.map(intObj, ChemicalProduct.class);
	}
	
	public ChemicalProductInventory intObjectToDomainObjectChemicalProductInventory(ProductInventoryData intObj) {
		return this.modelMapper.map(intObj, ChemicalProductInventory.class);
	}
	
	public LMMSChemicalProductRequest chemicalProductDetailToIntObject(ChemicalProductDetail domainObject) {
		LMMSChemicalProductRequest lmmsProductDetail = new LMMSChemicalProductRequest(domainObject.getChemicalNumber(),
				domainObject.getManufacturerCode(),
				domainObject.getProductManufacturerNumber(),
				domainObject.getOriginalQuantity(),
				domainObject.getOriginalQuantityUnitCode(),
				domainObject.getPhysicalFormCode(),
				null != domainObject.getConcentration() ? domainObject.getConcentration().toPlainString() : null,
				domainObject.getConcentrationUnitCode(),
				domainObject.getChemicalGradeCode(),
				null, null);
		
		return lmmsProductDetail;
	}
	
	public LMMSRadioactiveProductRequest radioactiveProductDetailToIntObject(Map<String, RadioactiveProductDetail> domainObject) {
		
		if(null != domainObject) {
			LMMSRadioactiveProductRequest lmmsRadioactiveProductRequest = new LMMSRadioactiveProductRequest();
			
			List<LMMSRadioactiveProductRequestRadionuclide> radionuclides = new ArrayList<LMMSRadioactiveProductRequestRadionuclide>();
			
			for (Map.Entry<String, RadioactiveProductDetail> entry : domainObject.entrySet()) {
				LMMSRadioactiveProductRequestRadionuclide radionuclide = new  LMMSRadioactiveProductRequestRadionuclide();
				RadioactiveProductDetail productDetail = entry.getValue();
				radionuclide.setRadionuclideId(productDetail.getRadionuclideId());
				radionuclide.setRadionuclideType(productDetail.getRadionuclideTypeCode());
				radionuclide.setPrItemNumber(entry.getKey());
				radionuclide.setRadionuclideProductId("");
				radionuclide.setProductName(productDetail.getProductDescription());
				radionuclide.setManufacturerCode(productDetail.getManufacturerCode());
				radionuclide.setPhysicalForm(productDetail.getPhysicalFormCode());
				radionuclide.setQuantity(productDetail.getOriginalQuantity());
				radionuclide.setUnitOfMeasureCode(productDetail.getOriginalQuantityUnitCode());
				radionuclide.setSourceTypeCode(productDetail.getSourceType().getCode());
				List<LMMSRadioactiveProductRequestActivity> productRequestActivity = new ArrayList<LMMSRadioactiveProductRequestActivity>();
				if (CollectionUtils.isNotEmpty(productDetail.getActivity())) {
					productRequestActivity = productDetail.getActivity().stream().map(a -> this.radioactiveActivityToIntObject(a))
							.collect(Collectors.toList());
				}
				radionuclide.setProductActivity(productRequestActivity);
				radionuclides.add(radionuclide);
			}
			
			lmmsRadioactiveProductRequest.setRadionuclides(radionuclides);
			
			return lmmsRadioactiveProductRequest;
			
		}
		
		return null;
	}
	
	private LMMSRadioactiveProductRequestActivity radioactiveActivityToIntObject(RadioactiveActivity radioactiveActivity) {
			LMMSRadioactiveProductRequestActivity intObjectActivity = new  LMMSRadioactiveProductRequestActivity();
			if(null != radioactiveActivity && null !=  radioactiveActivity.getActivity()) {
				NumericalValue activity = radioactiveActivity.getActivity();
				intObjectActivity.setRadionuclideId(radioactiveActivity.getRadionuclideId());
				intObjectActivity.setNotationType(activity.getNotationType().getNotationTypeCode());
				intObjectActivity.setActivityUnitOfMeasure(radioactiveActivity.getActivityUnit().getCode());
				switch (activity.getNotationType()) {
				case REAL_NUMBER_FORM:
					intObjectActivity.setActivityActualValue(activity.getReal().toPlainString());
					break;
				case SCIENTIFIC_FORM:
					intObjectActivity.setBase(String.valueOf(activity.getBase()));
					intObjectActivity.setCoefficient(activity.getCoefficient().toPlainString());
					intObjectActivity.setExponent(activity.getExponent().toBigInteger().toString());
					break;
					
				default:
					break;
				}
				
				NumericalValue concentration = radioactiveActivity.getConcentration();
				if(null != concentration && !concentration.isEmpty()) {
					
					intObjectActivity.setActivityConcentrationNotationType(concentration.getNotationType().getNotationTypeCode());
					switch (concentration.getNotationType()) {
					case REAL_NUMBER_FORM:
						intObjectActivity.setActivityConcentrationActualValue(concentration.getReal().toPlainString());
						break;
						
					case SCIENTIFIC_FORM:
						intObjectActivity.setActivityConcentrationBase(String.valueOf(concentration.getBase()));
						intObjectActivity.setActivityConcentrationExponent(concentration.getExponent().toPlainString());
						intObjectActivity.setActivityConcentrationCoefficient(concentration.getCoefficient().toPlainString());
						break;

					default:
						break;
					}
				}
				
				intObjectActivity.setActivityConcentrationUnitOfMeasure(radioactiveActivity.getConcentrationUnit() != null ? radioactiveActivity.getConcentrationUnit().getCode() : null);
				
				return intObjectActivity;
			}
			return null;
	}
	
	
	public LMMSBiologicalProductRequest biologicalProductDetailToIntObject(Map<String, BiologicalProductDetail> domainObject) {
		if(null != domainObject) {
			LMMSBiologicalProductRequest lmmsBiologicalProductRequest = new LMMSBiologicalProductRequest();
			
			List<LMMSRadioactiveProductRequestBiological> biologicals = new ArrayList<LMMSRadioactiveProductRequestBiological>();
			
			for (Map.Entry<String, BiologicalProductDetail> entry : domainObject.entrySet()) {
				LMMSRadioactiveProductRequestBiological biological = new  LMMSRadioactiveProductRequestBiological();
				BiologicalProductDetail productDetail = entry.getValue();
				biological.setPrItemNumber(entry.getKey());
				biological.setBiologicalMaterialId(productDetail.getBiologicalId());
				biological.setGeneticallyModifiedFlag(productDetail.getGeneticallyModified());
				biological.setManufacturerCode(productDetail.getManufacturerCode());
				biological.setProductFormat(productDetail.getProductFormat());
				biological.setProductName(productDetail.getBiologicalMaterialName());
				biological.setProductNumber(productDetail.getProductManufacturerNumber());
				biological.setQuantity(productDetail.getOriginalQuantity().toPlainString());
				biological.setSafetyLevel(productDetail.getSafetyLevelCode());
				biological.setUnitOfMeasureCode(productDetail.getOriginalQuantityUnitCode());
				NumericalValue concentration = productDetail.getConcentration();
				if(null != concentration && !concentration.isEmpty()) {
					biological.setConcentrationNotationType(concentration.getNotationType().getNotationTypeCode());
					if(NotationType.REAL_NUMBER_FORM == concentration.getNotationType()) {
						biological.setConcentrationRealNumber(concentration.getReal().toPlainString());
					} else if (NotationType.SCIENTIFIC_FORM == concentration.getNotationType()) {
						biological.setConcentrationBase(String.valueOf(concentration.getBase()));
						biological.setConcentrationExponent(concentration.getExponent().toBigInteger().toString());
						biological.setConcentrationCoefficient(concentration.getCoefficient().toPlainString());
					}
					biological.setConcentrationUOM(productDetail.getConcentrationUnitCode());
				}
				
				biologicals.add(biological);
			}
			
			lmmsBiologicalProductRequest.setBiologicals(biologicals);;
			
			return lmmsBiologicalProductRequest;
			
		}
		
		return null;
	}
	
	public LMMSProductInventoryRequest productInventoryDetailToIntObject(ProductInventoryRequest domainObject) {
		return this.modelMapper.map(domainObject, LMMSProductInventoryRequest.class);
	}
	
	public LMMSProductInventoryListRequest productInventoryDetailListToIntObjectList(ProductInventoryListRequest domainObject) {
		return this.modelMapper.map(domainObject, LMMSProductInventoryListRequest.class);
	}
	
	public LMMSProductInventoryReserveRequest productInventoryDetailReserveToIntObjectReserve(ProductInventoryReserveRequest domainObject) {
		return this.modelMapper.map(domainObject, LMMSProductInventoryReserveRequest.class);
	}

	public LMMSLabelledProductInventoryRequest labelledChemicalProductInventoryDetailToIntObject(ChemicalProductInventoryLabelledRequest domainObject) {
		return modelMapper.map(domainObject, LMMSLabelledProductInventoryRequest.class);
	}
	
	public LMMSReserveTransferProductInventoryRequest reserveTransferChemicalProductInventoryDetailToIntObject(ChemicalProductInventoryReserveTransferRequest domainObject) {
		return modelMapper.map(domainObject, LMMSReserveTransferProductInventoryRequest.class);
	}

	public LMMSCommitRollBackTransferProductInventoryRequest commitRollBackTransferChemicalProductInventoryDetailToIntObject(ChemicalProductInventoryCommitRollBackTransferRequest domainObject) {
		return modelMapper.map(domainObject, LMMSCommitRollBackTransferProductInventoryRequest.class);
	}
}
