const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_01Page extends Page {

  get upload_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_fileInput () { return $('APP-AOR-ACCOUNT-ASSIGNMENT > DIV:nth-of-type(2) > INPUT[type="file"]') } 
  get supportingdocdescription0_textInput () { return $('TD:nth-of-type(3) > INPUT[type="text"]') } 
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_01Page();

