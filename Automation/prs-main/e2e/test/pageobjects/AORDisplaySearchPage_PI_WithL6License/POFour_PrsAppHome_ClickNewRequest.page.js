const Page = require('./page')

class POFour_PrsAppHome_ClickNewRequestPage extends Page {
  get newRequest_link () { return $('#prs-main-menu > UL:nth-of-type(1) > LI:nth-of-type(2) > A') } 

  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class POFour_PrsAppHome_ClickNewRequestPage

module.exports = new POFour_PrsAppHome_ClickNewRequestPage();

