package sg.edu.nus.prs.dao;

import java.util.List;
import java.util.Map;

import sg.edu.nus.prs.domain.purchase.catalog.BiologicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.BiologicalCatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.CatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.Manufacturer;
import sg.edu.nus.prs.domain.purchase.ProductTypeCode;
import sg.edu.nus.prs.domain.purchase.PurchaseLineItem;
import sg.edu.nus.prs.domain.purchase.catalog.ChemicalCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogItem;
import sg.edu.nus.prs.domain.purchase.catalog.RadioactiveCatalogSearchForm;
import sg.edu.nus.prs.domain.purchase.productdetails.BiologicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.ChemicalProductDetail;
import sg.edu.nus.prs.domain.purchase.productdetails.RadioactiveProductDetail;
import sg.edu.nus.prs.domain.purchase.radioactive.RadioactiveActivity;
import sg.edu.nus.prs.domain.util.PagedData;

public interface CatalogDAO {
    PagedData<ChemicalCatalogItem> searchCatalog(CatalogSearchForm input);
    
    PagedData<RadioactiveCatalogItem> searchRadioactiveCatalogItems(RadioactiveCatalogSearchForm input);
    
    PagedData<BiologicalCatalogItem> searchBiologicalCatalogItems(BiologicalCatalogSearchForm input);

    List<CatalogItem> getCatalogById(ProductTypeCode productTypeCode, List<String> catalogItemIds);

    List<CatalogItem> getProductCatalogById(ProductTypeCode productTypeCode, List<String> catalogItemIds);

    List<Manufacturer> getManufacturerList();

    List<Manufacturer> getManufacturerListByName(List<String> manufacturerNames);

    List<Manufacturer> getManufacturerListByIds(List<String> manufacturerIds);

    List<String> searchChemicalNameList(String partial, boolean activeOnly, boolean allResults);

    List<String> searchCASNumberList(String partial, boolean activeOnly, boolean allResults);

    List<String> searchProductNumberList(String partial, boolean activeOnly, boolean allResults);
    
    List<String> searchRadioactiveProductNumberList(String partial, boolean activeOnly, boolean allResults);
    
    List<String> searchRadioNuclidesList(String partial, boolean activeOnly, boolean allResults);
    
    List<String> searchRadioactiveMaterialNameList(String partial, boolean activeOnly, boolean allResults);

    ChemicalCatalogItem getProductCatalogByCriteria(ChemicalProductDetail chemicalProductdetail);
    
    Map<String, List<RadioactiveActivity>> getRadioActivityForItems(List<RadioactiveCatalogItem> catalogItems);
    
}
