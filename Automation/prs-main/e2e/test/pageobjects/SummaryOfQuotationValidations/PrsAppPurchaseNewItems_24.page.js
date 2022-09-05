const Page = require('../Page')

class PrsAppPurchaseNewItems_24Page extends Page {
  get nextbutton_button () { return $('#nextButton') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get currencycode_select () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT.line-item-min-width') } 
  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_24Page

module.exports = new PrsAppPurchaseNewItems_24Page();

