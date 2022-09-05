const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('#purchaseRequestType-pr') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

