const Page = require('../Page')

class PrsAppPurchaseNewItems_02Page extends Page {
  get lineitemsupplier3_textInput () { return $('DIV:nth-of-type(4) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_02Page

module.exports = new PrsAppPurchaseNewItems_02Page();

