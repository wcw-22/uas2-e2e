const Page = require('../Page')

class PrsAppPurchaseNewAorSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchPage

module.exports = new PrsAppPurchaseNewAorSearchPage();

