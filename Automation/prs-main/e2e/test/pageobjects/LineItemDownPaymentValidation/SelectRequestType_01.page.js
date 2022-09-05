const Page = require('../Page')

class SelectRequestType_01Page extends Page {
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class SelectRequestType_01Page

module.exports = new SelectRequestType_01Page();

