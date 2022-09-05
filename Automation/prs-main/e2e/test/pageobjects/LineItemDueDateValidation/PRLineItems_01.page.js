const Page = require('../Page')

class PRLineItems_01Page extends Page {
  get percentage_textInput () { return $('DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get date_textInput () { return $('DIV:nth-of-type(6) > INPUT[type="text"]') } 
  get next_button () { return $('DIV.col-md-12 > BUTTON:nth-of-type(3)') } 
  open() {
    return super.open('/prs/app/purchase/new/items/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRLineItems_01Page

module.exports = new PRLineItems_01Page();

