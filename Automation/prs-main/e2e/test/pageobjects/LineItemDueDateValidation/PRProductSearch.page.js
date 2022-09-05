const Page = require('../Page')

class PRProductSearchPage extends Page {
  get product_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="displayOption"]') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get search_button () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 
  
  open() {
    return super.open('/prs/app/purchase/new/search/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRProductSearchPage

module.exports = new PRProductSearchPage();

