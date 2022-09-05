const Page = require('../Page')

class PrsAppPurchaseNewQuotation_20Page extends Page {
  get errMsg_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get uploadsealedsourcebutton_button () { return $('#uploadSealedSourceButton') } 
  get nolabel_fileInput () { return $('DIV:nth-of-type(4) > INPUT[type="file"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_20Page

module.exports = new PrsAppPurchaseNewQuotation_20Page();

