const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_05Page extends Page {
  get nolabel_button () { return $('TH:nth-of-type(5) > BUTTON[type="button"]') } 
  get aaWbs1_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > INPUT') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_05Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_05Page();

