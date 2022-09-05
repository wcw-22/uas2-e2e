const Page = require('../Page')

class PrsAppPurchaseNewQuotation_08Page extends Page {
  get errMsg_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get nolabel_div () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2)') } 
  get quotationReferenceNumber_textInput () { return $('DIV.col-sm-12 > INPUT[type="text"]') } 
  get instructionToSupplier_text () { return $('DIV.col-sm-12 > TEXTAREA') } 
  get nolabel_td () { return $('TD:nth-of-type(4)') } 
  get expectedDeliveryDate_textInput () { return $('DIV:nth-of-type(4) > DIV.col-sm-12 > INPUT') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_08Page

module.exports = new PrsAppPurchaseNewQuotation_08Page();

