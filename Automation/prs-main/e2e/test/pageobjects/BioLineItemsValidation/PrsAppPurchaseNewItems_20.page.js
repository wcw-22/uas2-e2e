const Page = require('../Page')

class PrsAppPurchaseNewItems_20Page extends Page {
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get sgd100000_span () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(7) > SPAN') } 
  get quantityperunit0_numberInput () { return $('DIV:nth-of-type(4) > INPUT[type="number"]') } 
  get nextbutton_button () { return $('#nextButton') } 
  get errMsg_div () { return $('DIV.alert.alert-danger') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_20Page

module.exports = new PrsAppPurchaseNewItems_20Page();

