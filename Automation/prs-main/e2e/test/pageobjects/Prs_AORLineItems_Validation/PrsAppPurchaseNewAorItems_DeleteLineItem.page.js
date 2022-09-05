const Page = require('./page')

class PrsAppPurchaseNewAorItems_DeleteLineItem extends Page {
  get back_span () { return $('APP-AOR-ITEMS > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2) > APP-MESSAGE > SPAN') } 
  get deleteLineItem () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 
  get nolabel_span () { return $('TR > TD:nth-of-type(2) > BUTTON > SPAN.glyphicon.glyphicon-minus') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  open() {
    return super.open('/prs/app/purchase/new/aor/items/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_DeleteLineItem

module.exports = new PrsAppPurchaseNewAorItems_DeleteLineItem();

