const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_04Page extends Page {
  get errMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get errMsg2_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(2)') } 
  get quantity1_1_numberInput () { return $('TR:nth-of-type(1) > TD:nth-of-type(6) > INPUT[type="number"]') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAccountAssignment_04Page();

