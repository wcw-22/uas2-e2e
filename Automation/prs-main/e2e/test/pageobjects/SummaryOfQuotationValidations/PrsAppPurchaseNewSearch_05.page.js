const Page = require('../Page')

class PrsAppPurchaseNewSearch_05Page extends Page {
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get biologicalsearchbutton_button () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_05Page

module.exports = new PrsAppPurchaseNewSearch_05Page();

