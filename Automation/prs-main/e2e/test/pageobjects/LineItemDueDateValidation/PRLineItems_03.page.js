const Page = require('../Page')

class PRLineItems_03Page extends Page {
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get _01082021_textInput () { return $('DIV:nth-of-type(6) > INPUT[type="text"]') } 
  

  open() {
    return super.open('/prs/app/purchase/new/items/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRLineItems_03Page

module.exports = new PRLineItems_03Page();

