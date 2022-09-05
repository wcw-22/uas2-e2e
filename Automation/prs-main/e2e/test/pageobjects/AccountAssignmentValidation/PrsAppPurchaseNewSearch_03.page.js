const Page = require('../Page')

class PrsAppPurchaseNewSearch_03Page extends Page {
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_03Page

module.exports = new PrsAppPurchaseNewSearch_03Page();

