const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_07Page extends Page {
  get nolabel_app_aor_account_assignment () { return $('APP-AOR-ACCOUNT-ASSIGNMENT') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_07Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_07Page();

