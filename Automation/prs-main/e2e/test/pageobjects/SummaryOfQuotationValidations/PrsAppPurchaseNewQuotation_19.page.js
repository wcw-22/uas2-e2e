const Page = require('../Page')

class PrsAppPurchaseNewQuotation_19Page extends Page {
  get sealedSourceApproval_div () { return $('DIV:nth-of-type(8) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get sealedSourceApproval_span () { return $('DIV:nth-of-type(8) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1) > B > APP-MESSAGE > SPAN') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_19Page

module.exports = new PrsAppPurchaseNewQuotation_19Page();

