const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get nolabel_div () { return $('FORM.form-horizontal > DIV:nth-of-type(1) > DIV.row > DIV:nth-of-type(2)') } 
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('#purchaseRequestType-pr') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

