const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_06Page extends Page {
  get nameOf00007319_p () { return $('DIV:nth-of-type(2) > P') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_06Page

module.exports = new PrsAppPurchaseNewAccountAssignment_06Page();

