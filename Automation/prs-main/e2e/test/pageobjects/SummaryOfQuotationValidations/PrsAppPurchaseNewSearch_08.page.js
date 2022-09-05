const Page = require('../Page')

class PrsAppPurchaseNewSearch_08Page extends Page {
  get addnewlineitem3_button () { return $('TR:nth-of-type(4) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > #nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_08Page

module.exports = new PrsAppPurchaseNewSearch_08Page();

