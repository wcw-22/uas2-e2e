const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_02Page extends Page {
  get nolabel_app_purchase_account_assignment () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT') } 
  get add1_1_button () { return $('TR:nth-of-type(2) > TD:nth-of-type(7) > BUTTON[type="button"]') } 
  get nolabel_td () { return $('TR:nth-of-type(3) > TD:nth-of-type(1)') } 
  get quantity1_1_numberInput () { return $('INPUT[type="number"]') } 
  get nameOf00007319_p () { return $('TABLE > TR:nth-of-type(2) > TD:nth-of-type(2) > P') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAccountAssignment_02Page();

