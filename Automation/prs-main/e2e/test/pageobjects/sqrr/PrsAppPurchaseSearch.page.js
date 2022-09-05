const Page = require('../Page')

class PrsAppPurchaseSearchPage extends Page {
  get prAorSqrrNumberInput () { return $('#purchaseRequestNumber') }
  get searchButton () { return $('#searchButton') }
  get firstSearchResult () { return $('TD:nth-of-type(3)') }
} // end of class PrsAppPurchaseSearchPage

module.exports = new PrsAppPurchaseSearchPage();

