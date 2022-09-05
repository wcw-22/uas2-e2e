const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_03Page extends Page {
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get aaLimit0_numberInput () { return $('INPUT[type="number"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_03Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_03Page();

