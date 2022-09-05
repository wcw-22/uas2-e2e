const Page = require('../Page')

class PrsAppPurchaseConfirmationPage extends Page {
  get successDiv() { return $('div.alert.alert-success') }
  get confirmSubmitButton () { return $('#confirmSubmitButton') }
  get cancelSubmitButton() { return $('#cancelSubmitButton') }
} // end of class PrsAppPurchaseConfirmationPage

module.exports = new PrsAppPurchaseConfirmationPage();

