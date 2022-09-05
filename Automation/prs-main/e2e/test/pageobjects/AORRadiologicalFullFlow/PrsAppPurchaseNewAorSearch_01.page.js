const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_01Page extends Page {
  get search_span () { return $('#radioactiveSearchButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_01Page

module.exports = new PrsAppPurchaseNewAorSearch_01Page();

