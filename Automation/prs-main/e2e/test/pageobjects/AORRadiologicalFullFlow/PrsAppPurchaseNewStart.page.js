const Page = require('../Page')

class PrsAppPurchaseNewStartPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('#purchaseRequestType-aor') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/start/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

