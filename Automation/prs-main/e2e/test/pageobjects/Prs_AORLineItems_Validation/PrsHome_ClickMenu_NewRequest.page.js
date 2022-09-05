const Page = require('./page')

class PrsHome_ClickMenu_NewRequestPage extends Page {
  get newRequest_link () { return $('#prs-main-menu > UL:nth-of-type(1) > LI:nth-of-type(2) > A') } 

  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class PrsHome_ClickMenu_NewRequestPage

module.exports = new PrsHome_ClickMenu_NewRequestPage();

