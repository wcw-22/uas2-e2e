const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_02Page extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/8c1c3556-0794-47af-97e3-099adb3e280e') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_02Page();

