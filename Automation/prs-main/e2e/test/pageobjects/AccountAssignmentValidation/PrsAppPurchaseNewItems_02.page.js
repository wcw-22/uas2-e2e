const Page = require('../Page')

class PrsAppPurchaseNewItems_02Page extends Page {
  get supplier3_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_02Page

module.exports = new PrsAppPurchaseNewItems_02Page();

