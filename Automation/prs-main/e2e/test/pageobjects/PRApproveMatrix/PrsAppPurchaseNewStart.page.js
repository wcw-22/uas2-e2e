const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/6c267d15-71e9-4c1c-9ad9-264002974baf') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

