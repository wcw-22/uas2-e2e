const Page = require('../Page')

class PrsAppPurchaseNewItems_25Page extends Page {
  get removelineitembutton2_button () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(1) > DIV.col-sm-12.text-right > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_25Page

module.exports = new PrsAppPurchaseNewItems_25Page();

