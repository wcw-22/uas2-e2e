const Page = require('../Page')

class PRLineItems_05Page extends Page {
  get percentageAmountDueDate_div () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV.row') } 
  get _01082021_textInput () { return $('DIV:nth-of-type(6) > INPUT[type="text"]') } 
  get next_button () { return $('DIV.col-md-12 > BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/items/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRLineItems_05Page

module.exports = new PRLineItems_05Page();

