const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_05Page extends Page {
  get nolabel_app_purchase_account_assignment () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT') } 
  get accountAssignment_span () { return $('H2 > APP-MESSAGE > SPAN') } 
  get backbutton_button () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/account-assignment/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_05Page

module.exports = new PrsAppPurchaseNewAccountAssignment_05Page();


