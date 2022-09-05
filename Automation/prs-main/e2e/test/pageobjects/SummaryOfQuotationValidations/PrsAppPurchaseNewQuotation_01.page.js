const Page = require('../Page')

class PrsAppPurchaseNewQuotation_01Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get billingAddress_text () { return $('#forBa') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_01Page

module.exports = new PrsAppPurchaseNewQuotation_01Page();

