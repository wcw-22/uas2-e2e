const Page = require('../Page')

class PRProductSearch_01Page extends Page {
  get search_button () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 
  open() {
    return super.open('/prs/app/purchase/new/search/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRProductSearch_01Page

module.exports = new PRProductSearch_01Page();

