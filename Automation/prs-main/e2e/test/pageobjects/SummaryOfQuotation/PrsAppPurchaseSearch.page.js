const Page = require('../Page')

class PrsAppPurchaseSearchPage extends Page {
  get searchRequest_span () { return $('H2 > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/search') // update as needed
  }
} // end of class PrsAppPurchaseSearchPage

module.exports = new PrsAppPurchaseSearchPage();

