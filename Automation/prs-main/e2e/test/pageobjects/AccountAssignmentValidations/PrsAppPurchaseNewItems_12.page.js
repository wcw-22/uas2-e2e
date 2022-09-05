const Page = require('../Page')

class PrsAppPurchaseNewItems_12Page extends Page {
  get removelineitembutton4_button () { return $('DIV:nth-of-type(5)  > APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > DIV:nth-of-type(1) > DIV.col-sm-12.text-right > BUTTON[type="button"]') } 
  get removelineitembutton5_button () { return $('DIV:nth-of-type(6) > APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > DIV:nth-of-type(1) > DIV.col-sm-12.text-right > BUTTON[type="button"]') } 
  get backbutton_button () { return $('APP-PURCHASE-ITEMS > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_12Page

module.exports = new PrsAppPurchaseNewItems_12Page();

