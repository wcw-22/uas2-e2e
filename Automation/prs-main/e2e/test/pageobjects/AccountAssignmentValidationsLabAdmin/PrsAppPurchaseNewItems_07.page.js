const Page = require('../Page')

class PrsAppPurchaseNewItems_07Page extends Page {
  get quantityperunit2_numberInput () { return $('DIV:nth-of-type(4) > INPUT[type="number"]') } 
  get nolabel_div () { return $('DIV:nth-of-type(4) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(1) > DIV.col-sm-12.text-right') } 
  get price3_textInput () { return $('DIV:nth-of-type(4) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity3_textInput () { return $('DIV:nth-of-type(4) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit3_select () { return $('DIV:nth-of-type(4) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get price4_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity4_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit4_select () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_07Page

module.exports = new PrsAppPurchaseNewItems_07Page();

