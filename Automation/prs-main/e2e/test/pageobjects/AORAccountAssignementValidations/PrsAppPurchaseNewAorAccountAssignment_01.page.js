const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_01Page extends Page {
  get epvTbl_numberInput () { return $('INPUT[type="number"]') } 
  get next_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 
  get approvers_div () { return $('DIV:nth-of-type(3) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get error_div() { return $('DIV.alert.alert-danger > UL > LI') }
  get purposeOfPurchase_text () { return $('#purposeOfPurchase') } 
  get error_div() { return $('DIV.alert.alert-danger > UL > LI') }
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/8c1c3556-0794-47af-97e3-099adb3e280e') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_01Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_01Page();

