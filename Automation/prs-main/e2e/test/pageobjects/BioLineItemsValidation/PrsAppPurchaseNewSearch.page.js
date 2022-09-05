const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get category_select () { return $('#biologicalCategoryCode') } 
  // available 7 options: 'Please Select', 'Arthropods', 'Biological Agent', 'Biological Toxins', 'Nucleic Acid', 'Proteins', 'Tissues/Cells', 

  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get biologicalsearchbutton_button () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

