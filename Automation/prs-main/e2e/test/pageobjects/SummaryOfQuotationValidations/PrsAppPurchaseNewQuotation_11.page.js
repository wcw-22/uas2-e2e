const Page = require('../Page')

class PrsAppPurchaseNewQuotation_11Page extends Page {
  get attachmentdocdescription00_textInput () { return $('TD:nth-of-type(2) > DIV > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_11Page

module.exports = new PrsAppPurchaseNewQuotation_11Page();

