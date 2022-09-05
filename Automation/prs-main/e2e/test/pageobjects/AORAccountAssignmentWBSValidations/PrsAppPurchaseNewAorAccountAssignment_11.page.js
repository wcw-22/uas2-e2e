const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_11Page extends Page {
  get nolabel_app_aor_account_assignment () { return $('APP-AOR-ACCOUNT-ASSIGNMENT') } 
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_div () { return $('DIV:nth-of-type(6) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(2)') } 
  get nolabel_table () { return $('TABLE') } 
  get aaWbs0_textInput () { return $('TR:nth-of-type(1) > TD:nth-of-type(2) > INPUT') } 
  get nolabel_tr () { return $('TR:nth-of-type(2)') } 
  get aaWbs1_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > INPUT') } 
  get approver1_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > SELECT') } 
  // available 2 options: 'Please Select', 'David Gonzalez', 

  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  get aaWbs0_textInput () { return $('TR:nth-of-type(1) > TD:nth-of-type(2) > INPUT') } 
  get aaWbs1_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > INPUT') } 
  get nolabel_table () { return $('TABLE') } 
  get nolabel_tr () { return $('TR:nth-of-type(2)') } 
  get nolabel_tr () { return $('TR:nth-of-type(2)') } 
  get aaWbs1_textInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > INPUT') } 
  get laineyGuerrero_p () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > P') } 

  get aaLimit0_numberInput () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > INPUT[type="number"]') } 
  get aaLimit1_numberInput () { return $('TR:nth-of-type(2) > TD:nth-of-type(4) > INPUT[type="number"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_11Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_11Page();

