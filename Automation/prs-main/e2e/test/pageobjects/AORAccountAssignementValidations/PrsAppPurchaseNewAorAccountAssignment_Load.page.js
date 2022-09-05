const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_LoadPage extends Page {
  get next_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_LoadPage

module.exports = new PrsAppPurchaseNewAorAccountAssignment_LoadPage();

