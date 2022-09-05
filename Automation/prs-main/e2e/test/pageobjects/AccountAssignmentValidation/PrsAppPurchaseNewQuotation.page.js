const Page = require('../Page')

class PrsAppPurchaseNewQuotationPage extends Page {
  get summaryOfQuotation_span () { return $('H2 > APP-MESSAGE > SPAN') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/quotation/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotationPage

module.exports = new PrsAppPurchaseNewQuotationPage();

