const Page = require('../Page')

class PrsAppPurchaseNewSearch_08Page extends Page {
  get biological_link () { return $('LI:nth-of-type(2) > A.nav-link') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get biologicalsearchbutton_button () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_08Page

module.exports = new PrsAppPurchaseNewSearch_08Page();

