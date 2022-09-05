const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_01Page extends Page {
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_01Page();

