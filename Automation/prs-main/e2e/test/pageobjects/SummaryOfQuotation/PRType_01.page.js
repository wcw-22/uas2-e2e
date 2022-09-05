const Page = require('../Page')

class PRType_01Page extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRType_01Page

module.exports = new PRType_01Page();

