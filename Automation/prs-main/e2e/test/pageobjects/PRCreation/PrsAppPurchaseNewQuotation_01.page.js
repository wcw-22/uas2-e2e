const Page = require('../Page')

class PrsAppPurchaseNewQuotation_01Page extends Page {
  get billingAddress_text () { return $('#forBa') } 
  get sameAddressAsBillingAddress_checkboxInput () { return $('#billingSameAsDeliveryCheckbox') } 
  get requestorSPhone_textInput () { return $('#requestorPhone') } 
  get quotationReferenceNumber_textInput () { return $('DIV.col-sm-12 > INPUT[type="text"]') } 
  get expectedDeliveryDate_textInput () { return $('DIV:nth-of-type(4) > DIV.col-sm-12 > INPUT') } 
  get upload_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_fileInput () { return $('DIV:nth-of-type(3) > INPUT[type="file"]') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_01Page

module.exports = new PrsAppPurchaseNewQuotation_01Page();

