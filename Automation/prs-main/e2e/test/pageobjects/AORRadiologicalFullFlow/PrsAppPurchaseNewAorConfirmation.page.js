const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmationPage extends Page {
  get nolabel_app_aor_confirmation () { return $('APP-AOR-CONFIRMATION') } 
  get no_span () { return $('APP-AOR-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #cancelSubmitButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmationPage

module.exports = new PrsAppPurchaseNewAorConfirmationPage();

