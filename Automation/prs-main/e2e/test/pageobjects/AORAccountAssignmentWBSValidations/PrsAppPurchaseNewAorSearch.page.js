const Page = require('../Page')

class PrsAppPurchaseNewAorSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchPage

module.exports = new PrsAppPurchaseNewAorSearchPage();

