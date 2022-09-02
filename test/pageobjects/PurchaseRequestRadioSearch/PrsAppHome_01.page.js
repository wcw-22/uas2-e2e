const Page = require('../Page')

class PrsAppHome_01Page extends Page {
  get newRequest_link () { return $('#prs-main-menu > UL:nth-of-type(1) > LI:nth-of-type(2) > A') } 

  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class PrsAppHome_01Page

module.exports = new PrsAppHome_01Page();

