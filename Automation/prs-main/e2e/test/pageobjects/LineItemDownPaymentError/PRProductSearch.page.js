const Page = require('../Page')

class PRProductSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/search/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRProductSearchPage

module.exports = new PRProductSearchPage();

