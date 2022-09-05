const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  // available 3 options: 'Please Select', 'MD7 > 03 > 01A > LEE GLC LAB', 'MD7 > 03 > 02 > LEE GLC LAB', 

  get estimatedProcurementValueSgd_textInput () { return $('#estimatedProcurementValue') } 
  get purposeOfPurchase_text () { return $('#purposeOfPurchase') } 
  get upload_button () { return $('DIV:nth-of-type(2) > BUTTON[type="button"]') } 
  get upload_fileInput () { return $('APP-AOR-ACCOUNT-ASSIGNMENT > DIV:nth-of-type(2) > INPUT[type="file"]') }  

  get supportingdocdescription0_textInput () { return $('TD:nth-of-type(3) > INPUT[type="text"]') } 
  get fileIsInvalid_div () { return $('DIV.alert.alert-danger') } 
  get fileIsInvalid_li () {return $('DIV.alert.alert-danger > UL > LI')}
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAorAccountAssignmentPage();

