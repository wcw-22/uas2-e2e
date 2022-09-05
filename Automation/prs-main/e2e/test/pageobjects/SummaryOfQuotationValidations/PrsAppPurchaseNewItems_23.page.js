const Page = require('../Page')

class PrsAppPurchaseNewItems_23Page extends Page {
  get lineitemsupplier1_textInput () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get price1_textInput () { return $('	DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(6) > SELECT') } 
  get currencycode_select () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT.line-item-min-width') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 


  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_23Page

module.exports = new PrsAppPurchaseNewItems_23Page();

