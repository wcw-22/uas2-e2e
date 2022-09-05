const Page = require('../Page')

class PrsAppPurchaseNewItems_21Page extends Page {
  get price1_textInput () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 
  get _abbot_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get nextbutton_button () { return $('#nextButton') } 
  get currencycode_select () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT.line-item-min-width') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_21Page

module.exports = new PrsAppPurchaseNewItems_21Page();

