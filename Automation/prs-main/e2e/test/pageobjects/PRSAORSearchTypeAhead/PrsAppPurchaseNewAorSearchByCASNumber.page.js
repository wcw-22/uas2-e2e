const Page = require('./page')

class PrsAppPurchaseNewAorSearchByCASNumberPage extends Page {
  get casNumber_textInput () { return $('#casNumber') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/1be844f6-b931-4ccf-bbef-0a660416c760') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchByCASNumberPage

module.exports = new PrsAppPurchaseNewAorSearchByCASNumberPage();

