const Page = require('./page')

class POFour_PrsAppPurchaseNewInit_AssertPage extends Page {
  get chemical_span () { return $('LI:nth-of-type(1) > A.nav-link > SPAN') } 
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get radioactive_span () { return $('LI:nth-of-type(3) > A.nav-link > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/f568cc7e-f2b8-443d-b427-0f2c4b69666d') // update as needed
  }
} // end of class POFour_PrsAppPurchaseNewInit_AssertPage

module.exports = new POFour_PrsAppPurchaseNewInit_AssertPage();

