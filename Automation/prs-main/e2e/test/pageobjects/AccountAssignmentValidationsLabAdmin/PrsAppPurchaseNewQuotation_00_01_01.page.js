const Page = require('../Page')

class PrsAppPurchaseNewQuotation_00_01_01Page extends Page {
  get summaryOfQuotation_span () { return $('H2 > APP-MESSAGE > SPAN') } 
  get backbutton_button () { return $('APP-PURCHASE-QUOTATION > DIV > DIV:nth-of-type(5) > DIV.row > DIV.col-md-12 > #backButton')}

  open() {
    return super.open('/prs/app/purchase/new/quotation/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_00_01_01Page

module.exports = new PrsAppPurchaseNewQuotation_00_01_01Page();

