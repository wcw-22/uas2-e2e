const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('#purchaseRequestType-pr') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/8979a0fb-5e60-409b-9e26-c357f41ef7c1') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

