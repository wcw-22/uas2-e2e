const Page = require('./page')

class PrsAppPurchaseNewAorSearchByChemicalNamePage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/1be844f6-b931-4ccf-bbef-0a660416c760') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchByChemicalNamePage

module.exports = new PrsAppPurchaseNewAorSearchByChemicalNamePage();

