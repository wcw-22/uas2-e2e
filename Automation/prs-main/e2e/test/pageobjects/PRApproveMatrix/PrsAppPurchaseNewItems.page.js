const Page = require('../Page')

class PrsAppPurchaseNewItemsPage extends Page {
  get physical_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get grade_select () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 13 options: 'Please Select', 'ACS', 'ANALYTICAL REAGENT', 'ANHYDROUS', 'CHROMATOGRAPHY (HPLC/GC)', 'GENERAL PURPOSE REAGENT', 'LIFE SCIENCE APPLICATIONS', 'NMR ISOTOPE', 'PHARMACEUTICAL/FOOD', 'REAGENT', 'SPECTROMETRY', 'TECHNICAL', 'TRACES ANALYSIS', 
  
  get onBehalfOf_select () { return $('#authorizingUserId') }
  
  get supplier_textInput () { return $('APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get _01ComputerSystemPteLtd_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get package_numberInput () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get package_numberInput () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get package_unit_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(3) > SELECT') } 
  get nolabel_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('DIV:nth-of-type(6) > SELECT') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6c267d15-71e9-4c1c-9ad9-264002974baf') // update as needed
  }
} // end of class PrsAppPurchaseNewItemsPage

module.exports = new PrsAppPurchaseNewItemsPage();

