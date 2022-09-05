const Page = require('../Page')

class PrsAppPurchaseSearchPage extends Page {
  get searchRequest_h2 () { return $('H2') } 

  open() {
    return super.open('/prs/app/purchase/search') // update as needed
  }
} // end of class PrsAppPurchaseSearchPage

module.exports = new PrsAppPurchaseSearchPage();

