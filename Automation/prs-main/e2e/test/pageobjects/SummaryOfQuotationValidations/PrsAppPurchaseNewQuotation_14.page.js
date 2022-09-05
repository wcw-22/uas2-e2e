const Page = require('../Page')

class PrsAppPurchaseNewQuotation_14Page extends Page {
  get quotationReferenceNumber_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > DIV:nth-of-type(3) > DIV.col-sm-12 > INPUT[type="text"]') } 
  get expectedDeliveryDate_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(4) > DIV:nth-of-type(4) > DIV.col-sm-12 > INPUT') } 
  get addattachmentbutton1_button () { return $('TR:nth-of-type(2) > TD:nth-of-type(5) > TABLE > TR > TD:nth-of-type(1) > DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get declaration_div () { return $('DIV:nth-of-type(8) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get nolabel_fileInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(5) >  DIV:nth-of-type(3) > INPUT[type="file"]') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_14Page

module.exports = new PrsAppPurchaseNewQuotation_14Page();

