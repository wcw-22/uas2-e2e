const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > #nextButton') } 
  open() {
    return super.open('/prs/app/purchase/new/search/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

