const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_12Page extends Page {
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_12Page

module.exports = new PrsAppPurchaseNewAccountAssignment_12Page();

