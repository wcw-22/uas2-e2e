const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_03Page extends Page {
  get approver2_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 2 options: 'Please Select', 'David Gonzalez', 

  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_03Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_03Page();

