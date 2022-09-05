const Page = require('../Page')

class PrsAppPurchaseNewItems_04Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get geneticallyModified_select () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 3 options: 'Please Select', 'No', 'Yes', 

  get nolabel_div () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1)') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get sgd11000_span () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(7) > SPAN') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_04Page

module.exports = new PrsAppPurchaseNewItems_04Page();

