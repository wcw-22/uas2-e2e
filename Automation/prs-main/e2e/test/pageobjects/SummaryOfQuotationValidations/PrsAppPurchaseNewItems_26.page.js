const Page = require('../Page')

class PrsAppPurchaseNewItems_26Page extends Page {
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_26Page

module.exports = new PrsAppPurchaseNewItems_26Page();

