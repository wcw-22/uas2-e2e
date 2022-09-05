const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > #nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/69f4633a-fadd-474e-9e27-363a4beea0de') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

