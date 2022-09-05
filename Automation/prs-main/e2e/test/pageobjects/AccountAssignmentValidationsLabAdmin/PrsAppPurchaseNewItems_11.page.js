const Page = require('../Page')

class PrsAppPurchaseNewItems_11Page extends Page {
  get price5_textInput () { return $('DIV:nth-of-type(6) > APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity5_textInput () { return $('DIV:nth-of-type(6) > APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit5_select () { return $('DIV:nth-of-type(6) > APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get nextbutton_button () { return $('#nextButton') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_11Page

module.exports = new PrsAppPurchaseNewItems_11Page();

