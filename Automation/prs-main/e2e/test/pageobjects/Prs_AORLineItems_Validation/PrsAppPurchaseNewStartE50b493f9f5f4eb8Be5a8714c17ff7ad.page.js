const Page = require('./page')

class PrsAppPurchaseNewStartE50b493f9f5f4eb8Be5a8714c17ff7adPage extends Page {
  get nolabel_label () { return $('DIV:nth-of-type(2) > LABEL') } 
  get approvalOfRequirementEpv5000_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/e50b493f-9f5f-4eb8-be5a-8714c17ff7ad') // update as needed
  }
} // end of class PrsAppPurchaseNewStartE50b493f9f5f4eb8Be5a8714c17ff7adPage

module.exports = new PrsAppPurchaseNewStartE50b493f9f5f4eb8Be5a8714c17ff7adPage();

