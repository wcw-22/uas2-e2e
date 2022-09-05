const Page = require('../Page')

class PrsAppPurchaseNewSearch_05Page extends Page {
  get addnewlineitem0_button () { return $('#radioactiveSearchResultTable-table > TBODY > TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > #nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_05Page

module.exports = new PrsAppPurchaseNewSearch_05Page();

