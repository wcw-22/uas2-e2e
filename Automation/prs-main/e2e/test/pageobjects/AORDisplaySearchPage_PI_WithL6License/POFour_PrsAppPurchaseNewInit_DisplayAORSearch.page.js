const Page = require('./page')

class POFour_PrsAppPurchaseNewInit_DisplayAORSearchPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/f568cc7e-f2b8-443d-b427-0f2c4b69666d') // update as needed
  }
} // end of class POFour_PrsAppPurchaseNewInit_DisplayAORSearchPage

module.exports = new POFour_PrsAppPurchaseNewInit_DisplayAORSearchPage();

