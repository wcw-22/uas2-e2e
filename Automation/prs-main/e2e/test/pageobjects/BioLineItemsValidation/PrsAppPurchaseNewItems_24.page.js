const Page = require('../Page')

class PrsAppPurchaseNewItems_24Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_div () { return $('DIV.col-sm-12.text-right') } 
  get additionalCharge1_text () { return $('TEXTAREA') } 
  get price1_textInput () { return $('APP-FRAGMENT-ADDITIONAL-CHARGE-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_24Page

module.exports = new PrsAppPurchaseNewItems_24Page();

