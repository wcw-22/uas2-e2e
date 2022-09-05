const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_15Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(4) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_15Page

module.exports = new PrsAppPurchaseNewAccountAssignment_15Page();

