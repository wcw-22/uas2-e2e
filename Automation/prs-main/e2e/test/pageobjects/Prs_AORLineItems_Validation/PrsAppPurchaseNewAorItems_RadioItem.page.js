const Page = require('./page')

class PrsAppPurchaseNewAorItems_RadioItemPage extends Page {
  get nolabel_app_aor_items () { return $('APP-AOR-ITEMS') } 
  get next_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 
  get c14_strong () { return $('STRONG') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/ea4af94f-b4a4-4871-8b0c-b66f5c8dc0f7') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_RadioItemPage

module.exports = new PrsAppPurchaseNewAorItems_RadioItemPage();

