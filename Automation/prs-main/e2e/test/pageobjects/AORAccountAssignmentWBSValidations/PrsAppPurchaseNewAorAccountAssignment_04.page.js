const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_04Page extends Page {
  get nolabel_app_aor_account_assignment () { return $('APP-AOR-ACCOUNT-ASSIGNMENT') } 
  get approvers_span () { return $('DIV:nth-of-type(3) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1) > B > APP-MESSAGE > SPAN') } 
  get approver1_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > SELECT') } 
  // available 2 options: 'Please Select', 'David Gonzalez', 

  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_04Page();

