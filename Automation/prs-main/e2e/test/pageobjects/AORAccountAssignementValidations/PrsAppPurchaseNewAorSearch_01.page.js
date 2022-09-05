const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_01Page extends Page {
  //get search_button () { return $('DIV > DIV.desktop-min-content-height > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get search_button () { return $('#chemicalSearchButton') } 
  open() {
    return super.open('/prs/app/purchase/new/aor/search/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_01Page

module.exports = new PrsAppPurchaseNewAorSearch_01Page();

