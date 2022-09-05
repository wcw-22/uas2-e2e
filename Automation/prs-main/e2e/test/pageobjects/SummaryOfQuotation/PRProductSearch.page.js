const Page = require('../Page')

class PRProductSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 
  //get search_button () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get search_button () { return $('#chemicalSearchButton')  } 

  open() {
    return super.open('/prs/app/purchase/new/search/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRProductSearchPage

module.exports = new PRProductSearchPage();

