const Page = require('../Page')

class PRLineItems_02Page extends Page {
  get nolabel_div () { return $('DIV.form-horizontal > DIV:nth-of-type(1)') } 
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity1_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit1_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get quantity2_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRLineItems_02Page

module.exports = new PRLineItems_02Page();

