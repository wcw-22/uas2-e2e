const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_02Page extends Page {
  get errMsg1_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get removeitemassignmentbutton000_button () { return $('TR > TD:nth-of-type(3) > DIV > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAccountAssignment_02Page();

