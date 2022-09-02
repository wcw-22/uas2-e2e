const Page = require('../Page')

class PrsAppSwitchrole_01Page extends Page {
  get selectRole8_textInput () { return $('DIV:nth-of-type(9) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrole_01Page

module.exports = new PrsAppSwitchrole_01Page();

