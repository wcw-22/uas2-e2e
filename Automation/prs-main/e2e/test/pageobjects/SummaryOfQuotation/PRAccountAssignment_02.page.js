const Page = require('../Page')

class PRAccountAssignment_02Page extends Page {
  get nameOf00007319_p () { return $('DIV:nth-of-type(3) > P') } 
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRAccountAssignment_02Page

module.exports = new PRAccountAssignment_02Page();

