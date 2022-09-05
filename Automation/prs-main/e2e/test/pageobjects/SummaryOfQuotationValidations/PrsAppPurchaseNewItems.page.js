const Page = require('../Page')

class PrsAppPurchaseNewItemsPage extends Page {
  get quantity0_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get lineitemsupplier1_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get price1_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity1_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit1_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 


  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItemsPage

module.exports = new PrsAppPurchaseNewItemsPage();

