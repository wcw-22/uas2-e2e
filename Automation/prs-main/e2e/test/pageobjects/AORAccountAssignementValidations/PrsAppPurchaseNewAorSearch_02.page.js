const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_02Page extends Page {
  get add_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 
  get next_span () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(2) > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2) > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_02Page

module.exports = new PrsAppPurchaseNewAorSearch_02Page();

