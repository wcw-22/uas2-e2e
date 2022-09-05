const Page = require('../Page')

class PrsAppPurchaseNewItems_06Page extends Page {
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit0_select () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get quantity1_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get price2_textInput () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity2_textInput () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit2_select () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get sigmaAldrichPteLtd_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_06Page

module.exports = new PrsAppPurchaseNewItems_06Page();

