const Page = require('./page')

class PrsAppPurchaseNewStart extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_span () { return $('BUTTON > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/start/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewStart

module.exports = new PrsAppPurchaseNewStart();

