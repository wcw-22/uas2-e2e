const Page = require('../Page')

class PrsAppPurchaseNewItems_02Page extends Page {
  get supplier3_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get chemstore_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_02Page

module.exports = new PrsAppPurchaseNewItems_02Page();

