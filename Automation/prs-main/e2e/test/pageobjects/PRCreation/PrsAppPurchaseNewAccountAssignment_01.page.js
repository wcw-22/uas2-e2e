const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_01Page extends Page {
  get nameOf00007319_p () { return $('DIV:nth-of-type(3) > P') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAccountAssignment_01Page();

