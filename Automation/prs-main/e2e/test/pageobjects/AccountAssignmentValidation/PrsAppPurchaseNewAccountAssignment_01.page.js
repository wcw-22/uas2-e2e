const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_01Page extends Page {
  get wbs1_1_textInput () { return $('INPUT[type="text"].wbs-input') } 
  get a00022720000_textInput () { return $('INPUT[type="text"].wbs-input') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAccountAssignment_01Page();

