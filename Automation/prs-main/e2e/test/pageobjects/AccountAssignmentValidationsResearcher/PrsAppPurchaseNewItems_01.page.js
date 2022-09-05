const Page = require('../Page')

class PrsAppPurchaseNewItems_01Page extends Page {
  get lineitemsupplier2_textInput () { return $('DIV:nth-of-type(3) > APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_01Page

module.exports = new PrsAppPurchaseNewItems_01Page();

