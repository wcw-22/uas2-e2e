const Page = require('../Page')

class PrsAppPurchaseNewQuotation_12Page extends Page {
  get backbutton_button () { return $('APP-PURCHASE-QUOTATION > DIV > DIV:nth-of-type(5) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_12Page

module.exports = new PrsAppPurchaseNewQuotation_12Page();

