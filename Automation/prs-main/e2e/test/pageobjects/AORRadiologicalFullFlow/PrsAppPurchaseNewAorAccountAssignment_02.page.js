const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_02Page extends Page {
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(4)') } 
  get storageLocation_select () { return $('#location') } 
  // available 3 options: 'Please Select', 'MD7 > 03 > 01A > LEE GLC LAB', 'MD7 > 03 > 02 > LEE GLC LAB', 

  get estimatedProcurementValueSgd_textInput () { return $('#estimatedProcurementValue') } 
  get purposeOfPurchase_text () { return $('#purposeOfPurchase') } 
  get nolabel_div () { return $('DIV:nth-of-type(7) > DIV.col-md-12') } 
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  get nolabel_tr () { return $('TBODY > TR') } 
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get aaLimit0_numberInput () { return $('INPUT[type="number"]') } 
  get aaLimit0_numberInput () { return $('INPUT[type="number"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_02Page();

