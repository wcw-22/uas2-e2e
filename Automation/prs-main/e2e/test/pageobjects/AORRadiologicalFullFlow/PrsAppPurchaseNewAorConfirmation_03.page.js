const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmation_03Page extends Page {
  get ok_span () { return $('APP-AOR-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-sm-12 > #okButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmation_03Page

module.exports = new PrsAppPurchaseNewAorConfirmation_03Page();

