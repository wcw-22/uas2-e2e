const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_09Page extends Page {
  get aaLimit0_numberInput () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > INPUT[type="number"]') } 
  get nolabel_td () { return $('TR:nth-of-type(2) > TD:nth-of-type(4)') } 
  get aaLimit1_numberInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(4) > INPUT[type="number"]') } 
  get sgd500110_td () { return $('TR.danger > TD:nth-of-type(2)') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_09Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_09Page();

