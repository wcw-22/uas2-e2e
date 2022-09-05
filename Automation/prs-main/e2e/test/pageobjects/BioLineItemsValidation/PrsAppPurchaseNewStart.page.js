const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('#purchaseRequestType-pr') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

