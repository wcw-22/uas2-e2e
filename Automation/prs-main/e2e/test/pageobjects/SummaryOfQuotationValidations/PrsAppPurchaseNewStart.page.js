const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('#purchaseRequestType-pr') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

