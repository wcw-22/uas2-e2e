const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmation_01Page extends Page {
  get nolabel_app_aor_confirmation () { return $('APP-AOR-CONFIRMATION') } 
  get _500100_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P') } 
  get _500000_p () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > P') } 
  get _100_p () { return $('TR:nth-of-type(2) > TD:nth-of-type(4) > P') } 
  get sgd500100_td () { return $('TFOOT > TR > TD:nth-of-type(2)') } 
  get yes_span () { return $('#confirmSubmitButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmation_01Page

module.exports = new PrsAppPurchaseNewAorConfirmation_01Page();

