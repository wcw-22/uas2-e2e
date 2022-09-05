const Page = require('../Page')

class PrsAppPurchaseNewQuotation_17Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-QUOTATION > DIV > DIV:nth-of-type(5) > DIV.row > DIV.col-md-12 > #backButton') } 
  get declaration_div () { return $('DIV:nth-of-type(8) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_17Page

module.exports = new PrsAppPurchaseNewQuotation_17Page();

