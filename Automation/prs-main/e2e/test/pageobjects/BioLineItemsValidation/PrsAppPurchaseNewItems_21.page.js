const Page = require('../Page')

class PrsAppPurchaseNewItems_21Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get quantityperunit0_numberInput () { return $('DIV:nth-of-type(4) > INPUT[type="number"]') } 
  get additionalCharge1_text () { return $('TEXTAREA') } 
  get nextbutton_button () { return $('#nextButton') } 
  get sgd100000_span () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(7) > SPAN') } 
  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_21Page

module.exports = new PrsAppPurchaseNewItems_21Page();

