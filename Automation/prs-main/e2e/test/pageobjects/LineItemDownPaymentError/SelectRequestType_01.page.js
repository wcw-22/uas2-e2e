const Page = require('../Page')

class SelectRequestType_01Page extends Page {
  get nolabel_div () { return $('FORM.form-horizontal > DIV:nth-of-type(1) > DIV.row > DIV:nth-of-type(2)') } 
  get purchaseRequestEpv5000CatalogBuy_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="purchaseRequestType"]') } 
  get next_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/start/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class SelectRequestType_01Page

module.exports = new SelectRequestType_01Page();

