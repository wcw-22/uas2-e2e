const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_01Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 
  get storageLocation_select () { return $('#location') } 
  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAccountAssignment_01Page();

