const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_01Page extends Page {
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_01Page

module.exports = new PrsAppPurchaseNewAorSearch_01Page();

