const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('#purchaseRequestType-aor') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

