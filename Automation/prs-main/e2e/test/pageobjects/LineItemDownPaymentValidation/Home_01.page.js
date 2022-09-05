const Page = require('../Page')

class Home_01Page extends Page {
  get newRequest_link () { return $('#prs-main-menu > UL:nth-of-type(1) > LI:nth-of-type(2) > A') } 

  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class Home_01Page

module.exports = new Home_01Page();

