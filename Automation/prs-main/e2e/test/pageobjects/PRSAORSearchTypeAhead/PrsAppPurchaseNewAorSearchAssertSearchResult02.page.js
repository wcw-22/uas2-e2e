const Page = require('./page')

class PrsAppPurchaseNewAorSearchAssertSearchResult02Page extends Page {
  get search_span () { return $('DIV > DIV.desktop-min-content-height > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/1be844f6-b931-4ccf-bbef-0a660416c760') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchAssertSearchResult02Page

module.exports = new PrsAppPurchaseNewAorSearchAssertSearchResult02Page();

