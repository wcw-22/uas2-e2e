const Page = require('../Page')

class PrsAppPurchaseNewItems_03Page extends Page {
  get quantity1_textInput () { return $('DIV:nth-of-type(1) > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get quantity2_textInput () { return $('DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_03Page

module.exports = new PrsAppPurchaseNewItems_03Page();

