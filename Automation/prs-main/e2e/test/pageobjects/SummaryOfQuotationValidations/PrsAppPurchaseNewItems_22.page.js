const Page = require('../Page')

class PrsAppPurchaseNewItems_22Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-ITEMS > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_22Page

module.exports = new PrsAppPurchaseNewItems_22Page();
