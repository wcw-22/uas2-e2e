const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_06Page extends Page {
  get nolabel_app_aor_account_assignment () { return $('APP-AOR-ACCOUNT-ASSIGNMENT') } 
  get aaWbs1_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > INPUT') } 
  get aaLimit1_numberInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(4) > INPUT[type="number"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_06Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_06Page();

