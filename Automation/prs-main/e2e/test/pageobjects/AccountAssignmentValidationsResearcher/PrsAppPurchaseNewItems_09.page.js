const Page = require('../Page')

class PrsAppPurchaseNewItems_09Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-ITEMS > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_09Page

module.exports = new PrsAppPurchaseNewItems_09Page();

