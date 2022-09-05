const Page = require('./page')

class POEight_PrsAppNewRequest_AssertPage extends Page {
  get chemical_link () { return $('LI:nth-of-type(1) > A.nav-link') } 
  get chemical_span () { return $('LI:nth-of-type(1) > A.nav-link > SPAN') } 
  get biological_link () { return $('LI:nth-of-type(2) > A.nav-link') } 
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get radioactive_link () { return $('LI:nth-of-type(3) > A.nav-link') } 
  get radioactive_span () { return $('LI:nth-of-type(3) > A.nav-link > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/6ca84db5-faa7-4b89-b2bf-b0d6037ecbec') // update as needed
  }
} // end of class POEight_PrsAppNewRequest_AssertPage

module.exports = new POEight_PrsAppNewRequest_AssertPage();

