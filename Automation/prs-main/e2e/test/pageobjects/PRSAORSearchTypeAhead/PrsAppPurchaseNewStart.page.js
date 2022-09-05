const Page = require('./page')

class PrsAppPurchaseNewStartPage extends Page {
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/1be844f6-b931-4ccf-bbef-0a660416c760') // update as needed
  }
} // end of class PrsAppPurchaseNewStartPage

module.exports = new PrsAppPurchaseNewStartPage();

