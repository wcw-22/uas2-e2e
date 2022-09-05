const Page = require('./page')

class PrsAppPurchaseNewAorSearchAssertSearchResultPage extends Page {
  get add_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/1be844f6-b931-4ccf-bbef-0a660416c760') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchAssertSearchResultPage

module.exports = new PrsAppPurchaseNewAorSearchAssertSearchResultPage();

