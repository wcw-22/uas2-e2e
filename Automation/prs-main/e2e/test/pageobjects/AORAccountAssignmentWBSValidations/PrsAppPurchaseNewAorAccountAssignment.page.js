const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignmentPage extends Page {
  get nolabel_div () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(1) > DIV.col-md-12') } 
  get storageLocation_select () { return $('#location') } 
  // available 3 options: 'Please Select', 'MD7 > 03 > 01A > LEE GLC LAB', 'MD7 > 03 > 02 > LEE GLC LAB', 

  get estimatedProcurementValueSgd_textInput () { return $('#estimatedProcurementValue') } 
  get purposeOfPurchase_text () { return $('#purposeOfPurchase') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAorAccountAssignmentPage();

