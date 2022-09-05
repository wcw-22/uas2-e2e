const Page = require('./page')

class PrsAppPurchaseNewAorSearchChemical01 extends Page {
  get search_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchChemical01

module.exports = new PrsAppPurchaseNewAorSearchChemical01();

