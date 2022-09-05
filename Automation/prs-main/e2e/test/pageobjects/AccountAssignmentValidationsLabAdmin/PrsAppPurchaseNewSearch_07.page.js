const Page = require('../Page')

class PrsAppPurchaseNewSearch_07Page extends Page {
  get addnewlineitem1_button () { return $('TR:nth-of-type(2) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > #nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_07Page

module.exports = new PrsAppPurchaseNewSearch_07Page();

