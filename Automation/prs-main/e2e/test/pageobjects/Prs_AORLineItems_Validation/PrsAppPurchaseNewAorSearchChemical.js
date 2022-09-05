const Page = require('./page')

class PrsAppPurchaseNewAorSearchChemical extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchChemical

module.exports = new PrsAppPurchaseNewAorSearchChemical();

