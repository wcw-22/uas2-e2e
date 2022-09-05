const Page = require('../Page')

class PrsAppPurchaseNewQuotation_05Page extends Page {
  get requestorSPhone_div () { return $('DIV:nth-of-type(7)') } 
  get nolabel_div () { return $('DIV:nth-of-type(7) > DIV:nth-of-type(2)') } 
  get requestorSPhone_textInput () { return $('#requestorPhone') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_05Page

module.exports = new PrsAppPurchaseNewQuotation_05Page();

