const Page = require('../Page')

class PRLineItems_01Page extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity1_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get quantity1_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit1_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  get percentage1_textInput () { return $('DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get percentage1_textInput () { return $('DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get downPaymentAmount1_textInput () { return $('DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(4) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRLineItems_01Page

module.exports = new PRLineItems_01Page();

