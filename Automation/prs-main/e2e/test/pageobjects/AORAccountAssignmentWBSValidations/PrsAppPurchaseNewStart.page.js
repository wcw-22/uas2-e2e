const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('#purchaseRequestType-aor') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/start/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

