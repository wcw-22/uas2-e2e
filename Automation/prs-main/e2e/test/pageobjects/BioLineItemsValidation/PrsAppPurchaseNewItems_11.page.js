const Page = require('../Page')

class PrsAppPurchaseNewItems_11Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_div () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > DIV:nth-of-type(2)') } 
  get notationtypeRealInputBioConcentration0_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get notationtypeUnitBioConcentration0_select () { return $('APP-NUMERICAL-VALUE-FORM > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 10 options: 'Please Select', '% (w/v)', 'cells/ml', 'CFU/mL', 'g/ml', 'g/µl', 'µg/ml', 'µg/µl', 'ng/ml', 'ng/µl', 

  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_11Page

module.exports = new PrsAppPurchaseNewItems_11Page();

