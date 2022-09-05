const Page = require('../Page')

class PRLineItems_02Page extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRLineItems_02Page

module.exports = new PRLineItems_02Page();

