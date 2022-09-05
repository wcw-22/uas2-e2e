const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_04Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAccountAssignment_04Page();

