const Page = require('../Page')

class PrsAppPurchaseNewItemsPage extends Page {
  get supplier_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewItemsPage

module.exports = new PrsAppPurchaseNewItemsPage();

