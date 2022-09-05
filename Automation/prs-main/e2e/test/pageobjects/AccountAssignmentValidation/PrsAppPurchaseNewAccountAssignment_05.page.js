const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_05Page extends Page {
  get errMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get a00022720000_textInput () { return $('TR:nth-of-type(3) > TD:nth-of-type(2) > INPUT[type="text"].wbs-input') } 
  get a00022820000_textInput () { return $('TR:nth-of-type(3) > TD:nth-of-type(2) > INPUT[type="text"].wbs-input') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_05Page

module.exports = new PrsAppPurchaseNewAccountAssignment_05Page();

