const Page = require('../Page')

class PrsAppPurchaseNewQuotationPage extends Page {
  get summaryOfQuotation_span () { return $('H2 > APP-MESSAGE > SPAN') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/quotation/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotationPage

module.exports = new PrsAppPurchaseNewQuotationPage();

