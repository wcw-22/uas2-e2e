const Page = require('../Page')

class PrsAppPurchaseNewAorSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchPage

module.exports = new PrsAppPurchaseNewAorSearchPage();

