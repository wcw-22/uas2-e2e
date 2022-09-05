const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignmentPage extends Page {
  get radioactiveSealedSource_span () { return $('DIV:nth-of-type(6) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(1) > B > APP-MESSAGE:nth-of-type(1) > SPAN') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAorAccountAssignmentPage();

