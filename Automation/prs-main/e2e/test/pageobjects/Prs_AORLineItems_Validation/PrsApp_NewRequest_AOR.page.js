const Page = require('./page')

class PrsApp_NewRequest_AORPage extends Page {
  get lblPurchaseReqType () { return $('DIV:nth-of-type(2) > LABEL') } 
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_span () { return $('BUTTON > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/start/ee9e4fd7-027e-46e3-b9d4-6b82599ad11a') // update as needed
  }
} // end of class PrsApp_NewRequest_AORPage

module.exports = new PrsApp_NewRequest_AORPage();

