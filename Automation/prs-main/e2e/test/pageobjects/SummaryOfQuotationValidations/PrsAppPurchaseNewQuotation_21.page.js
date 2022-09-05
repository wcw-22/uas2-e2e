const Page = require('../Page')

class PrsAppPurchaseNewQuotation_21Page extends Page {
  get quotationReferenceNumber_textInput () { return $('TR:nth-of-type(3) > TD:nth-of-type(2) > DIV:nth-of-type(3) > DIV.col-sm-12 > INPUT[type="text"]') } 
  get expectedDeliveryDate_textInput () { return $('TR:nth-of-type(3) > TD:nth-of-type(4) > DIV:nth-of-type(4) > DIV.col-sm-12 > INPUT') } 
  get addattachmentbutton2_button () { return $('TR:nth-of-type(3) > TD:nth-of-type(5) > TABLE > TR > TD:nth-of-type(1) > DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_span () { return $('DIV:nth-of-type(2) > BUTTON > APP-MESSAGE > SPAN') } 
  get nolabel_fileInput () { return $('DIV:nth-of-type(3) > INPUT[type="file"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_21Page

module.exports = new PrsAppPurchaseNewQuotation_21Page();

