const Page = require('../Page')

class PRLineItemsPage extends Page {
  get downpayment_checkboxInput () { return $('#downpaymentCategory') } 
  get physicalForm1Select_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get packagingSize1_numberInput () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get packSizeUom1_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(3) > SELECT') } 
  // available 1 options: 'Please Select', 

  get grade1_select () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 13 options: 'Please Select', 'ACS', 'ANALYTICAL REAGENT', 'ANHYDROUS', 'CHROMATOGRAPHY (HPLC/GC)', 'GENERAL PURPOSE REAGENT', 'LIFE SCIENCE APPLICATIONS', 'NMR ISOTOPE', 'PHARMACEUTICAL/FOOD', 'REAGENT', 'SPECTROMETRY', 'TECHNICAL', 'TRACES ANALYSIS', 

  get manufacturer1_textInput () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRLineItemsPage

module.exports = new PRLineItemsPage();

