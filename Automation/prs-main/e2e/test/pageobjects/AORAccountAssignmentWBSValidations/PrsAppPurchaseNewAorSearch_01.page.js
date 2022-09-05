const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_01Page extends Page {
  get search_span () { return $('#chemicalSearchButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_01Page

module.exports = new PrsAppPurchaseNewAorSearch_01Page();

