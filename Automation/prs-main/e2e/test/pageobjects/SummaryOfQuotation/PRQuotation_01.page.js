const Page = require('../Page')

class PRQuotation_01Page extends Page {
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get upload_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_span () { return $('DIV:nth-of-type(2) > BUTTON > APP-MESSAGE > SPAN') } 
  get file1_fileInput () { return $('DIV:nth-of-type(3) > INPUT[type="file"]') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/quotation/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRQuotation_01Page

module.exports = new PRQuotation_01Page();

