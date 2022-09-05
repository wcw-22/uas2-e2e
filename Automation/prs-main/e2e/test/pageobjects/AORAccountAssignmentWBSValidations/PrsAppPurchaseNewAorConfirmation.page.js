const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmationPage extends Page {
  get no_span () { return $('APP-AOR-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #cancelSubmitButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmationPage

module.exports = new PrsAppPurchaseNewAorConfirmationPage();

