const Page = require('../Page')

class PrsAppPurchaseNewQuotation_10Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get addattachmentbutton0_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get fileInput_fileInput () { return $('DIV:nth-of-type(3) > INPUT[type="file"]') } 
  get instructionToSupplier_text () { return $('DIV.col-sm-12 > TEXTAREA') }

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_10Page

module.exports = new PrsAppPurchaseNewQuotation_10Page();

