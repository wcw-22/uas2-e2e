const Page = require('./page')

class POSeven_PrsAppNewRequest_SelectAORPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_span () { return $('BUTTON > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/start/6ca84db5-faa7-4b89-b2bf-b0d6037ecbec') // update as needed
  }
} // end of class POSeven_PrsAppNewRequest_SelectAORPage

module.exports = new POSeven_PrsAppNewRequest_SelectAORPage();

