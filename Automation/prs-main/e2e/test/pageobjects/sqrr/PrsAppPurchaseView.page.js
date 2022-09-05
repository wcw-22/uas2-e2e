const Page = require('../Page')

class PrsAppPurchaseViewPage extends Page {
  get submitSqrrButton () { return $('#submitSqrrButton') }
  get copyAsNewRequestButton() { return $('#copyAsNewRequestButton') }
  get justificationRemarks() { return $('#justificationRemarks') }
  get approveButton() { return $('#approveButton') }
  get yesButton() { return $('#approvingYesButton') }
} // end of class PrsAppPurchaseViewPage

module.exports = new PrsAppPurchaseViewPage();

