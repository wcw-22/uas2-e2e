const Page = require('../Page')

class PrsAppPurchaseNewSearch_03Page extends Page {
  get add_span () { return $('APP-PURCHASE-SEARCH-RADIOACTIVE > #targetSearchResultForm > DIV.form-group.row > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(2) > APP-DATA-GRID > DIV:nth-of-type(1) > TABLE.data-grid > TBODY > TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON > APP-MESSAGE > SPAN') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  open() {
    return super.open('/prs/app/purchase/new/search/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_03Page

module.exports = new PrsAppPurchaseNewSearch_03Page();

