const Page = require('../Page')

class PRProductSearch_01Page extends Page {
  get search_button () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRProductSearch_01Page

module.exports = new PRProductSearch_01Page();

