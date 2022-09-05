const Page = require('../Page')

class PRLineItems_02Page extends Page {
  get supplier_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get next_button () { return $('DIV.col-md-12 > BUTTON:nth-of-type(3)') } 
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get errorMsg2_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/items/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRLineItems_02Page

module.exports = new PRLineItems_02Page();

