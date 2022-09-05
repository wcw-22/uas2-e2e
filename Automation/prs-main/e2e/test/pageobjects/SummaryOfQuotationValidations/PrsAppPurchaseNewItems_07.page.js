const Page = require('../Page')

class PrsAppPurchaseNewItems_07Page extends Page {
  get nolabel_div () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(2)') } 
  get lineitemsupplier1_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_07Page

module.exports = new PrsAppPurchaseNewItems_07Page();

