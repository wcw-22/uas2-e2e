const Page = require('../Page')

class PrsAppPurchaseNewQuotation_07Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get quotationReferenceNumber_textInput () { return $('DIV.col-sm-12 > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_07Page

module.exports = new PrsAppPurchaseNewQuotation_07Page();

