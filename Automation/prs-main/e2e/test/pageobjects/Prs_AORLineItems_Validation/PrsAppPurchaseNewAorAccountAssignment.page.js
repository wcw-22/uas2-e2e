const Page = require('./page')

class PrsAppPurchaseNewAorAccountAssignmentPage extends Page {
  get back_button () { return $('APP-AOR-ACCOUNT-ASSIGNMENT > DIV:nth-of-type(1) > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/5d31a12b-a9fc-4e02-9764-59b1f347f909') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAorAccountAssignmentPage();

