const Page = require('../Page')

class PRProductSearchResultPage extends Page {
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get add_button () { return $('TR:nth-of-type(10) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get scientificName_div () { return $('APP-PURCHASE-SEARCH-BIOLOGICAL > FORM.form-horizontal > DIV:nth-of-type(3)') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get search_button () { return $('#biologicalSearchButton') } 
  get search_span () { return $('APP-PURCHASE-SEARCH-BIOLOGICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/search/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRProductSearchResultPage

module.exports = new PRProductSearchResultPage();

