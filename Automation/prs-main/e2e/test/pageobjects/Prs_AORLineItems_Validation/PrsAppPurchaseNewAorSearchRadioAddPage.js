const Page = require('./page')

class PrsAppPurchaseNewAorSearchRadioAddPage extends Page {
  get add_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 
  get next_span () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(2) > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2) > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchRadioAddPage

module.exports = new PrsAppPurchaseNewAorSearchRadioAddPage();

