const Page = require('./page')

class PrsAppPurchaseNewAorSearchChemical02 extends Page {
  get nolabel_app_aor_search () { return $('APP-AOR-SEARCH') } 
  get add_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 
  get next_span () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(2) > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2) > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/ea4af94f-b4a4-4871-8b0c-b66f5c8dc0f7') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchChemical02

module.exports = new PrsAppPurchaseNewAorSearchChemical02();

