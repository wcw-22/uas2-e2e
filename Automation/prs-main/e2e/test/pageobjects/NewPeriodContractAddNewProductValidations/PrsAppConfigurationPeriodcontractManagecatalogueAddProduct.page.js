const Page = require('../Page')

class PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage extends Page {
  get casnumber_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #casNumber') } 
  get manufacturer_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #manufacturer') } 
  get productmanufacturernumber_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #productManufacturerNumber') } 
  get concentration_textInput () { return $('#concentration') } 
  get concentrationunit_select () { return $('#concentrationUnit') } 
  // available 16 options: 'Please Select', 'Grams/Cubic Metre', 'Grams/Litre', 'Kilograms/Cubic Metre', 'Micrograms/Cubic Metre', 'Micrograms/Litre', 'Micromolar (Micromoles/Litre)', 'Milligram/Millilitre', 'Milligrams/Cubic Metre', 'Milligrams/Litre', 'Millimolar (Millimoles/Litre)', 'Molar (Moles/Litre)', 'Parts Per Million', 'Percentage', 'Volume/Volume Percent (%V/V)', 'Weight/Volume Percentage (%W/V)', 

  get grade_select () { return $('#chemicalGrade') } 
  // available 13 options: 'Please Select', 'ACS', 'ANALYTICAL REAGENT', 'ANHYDROUS', 'CHROMATOGRAPHY (HPLC/GC)', 'GENERAL PURPOSE REAGENT', 'LIFE SCIENCE APPLICATIONS', 'NMR ISOTOPE', 'PHARMACEUTICAL/FOOD', 'REAGENT', 'SPECTROMETRY', 'TECHNICAL', 'TRACES ANALYSIS', 

  get physicalForm_select () { return $('#physicalForm') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get originalPackagingSize_textInput () { return $('#originalQuantity') } 
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 
  // available 1 options: 'Please Select', 

  get unit_select () { return $('#unit') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get minquantity0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get unitprice0_textInput () { return $('TD:nth-of-type(4) > INPUT') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get _1stBase_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get _1006652500_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get chemicalNameIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 
  get chemicalname_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #chemicalName') } 
  get ametazoleHydrochloride_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get cancelbutton_button () { return $('APP-PRODUCT-FORM > DIV.container-large > FORM.form-horizontal > DIV:nth-of-type(12) > #cancelButton') } 


  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage

module.exports = new PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage();

