const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_03Page extends Page {
  get accountAssignment_span () { return $('H2 > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_03Page

module.exports = new PrsAppPurchaseNewAccountAssignment_03Page();

