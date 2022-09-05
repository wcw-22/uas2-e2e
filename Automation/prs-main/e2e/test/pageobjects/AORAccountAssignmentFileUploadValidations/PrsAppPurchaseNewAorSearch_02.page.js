const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_02Page extends Page {
  get chemicalsearchresulttable0ActionAddBtn_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 
  get next_span () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(2) > DIV.row > DIV.col-md-12 > #nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_02Page

module.exports = new PrsAppPurchaseNewAorSearch_02Page();

