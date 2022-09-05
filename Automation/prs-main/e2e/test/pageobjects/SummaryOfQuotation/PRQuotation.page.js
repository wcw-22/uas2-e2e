const Page = require('../Page')

class PRQuotationPage extends Page {
  get billingAddress_text () { return $('#forBa') } 
  get sameAddressAsBillingAddress_checkboxInput () { return $('#billingSameAsDeliveryCheckbox	') } 
  get requestorSPhone_textInput () { return $('#requestorPhone') } 
  get quotationReferenceNumber_textInput () { return $('DIV.col-sm-12 > INPUT[type="text"]') } 
  get expectedDeliveryDate_textInput () { return $('DIV:nth-of-type(4) > DIV.col-sm-12 > INPUT') } 
  get upload_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_span () { return $('DIV:nth-of-type(2) > BUTTON > APP-MESSAGE > SPAN') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRQuotationPage

module.exports = new PRQuotationPage();

