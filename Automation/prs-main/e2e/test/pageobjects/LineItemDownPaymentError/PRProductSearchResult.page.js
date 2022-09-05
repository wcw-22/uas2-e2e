const Page = require('../Page')

class PRProductSearchResultPage extends Page {
  get nolabel_form () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal') } 
  get catalogue_radioInput () { return $('LABEL:nth-of-type(4) > INPUT[type="radio"][name="displayOption"]') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRProductSearchResultPage

module.exports = new PRProductSearchResultPage();

