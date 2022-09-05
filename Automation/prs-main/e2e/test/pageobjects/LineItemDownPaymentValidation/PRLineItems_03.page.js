const Page = require('../Page')

class PRLineItems_02Page extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') }   
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/items/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRLineItems_02Page

module.exports = new PRLineItems_02Page();

