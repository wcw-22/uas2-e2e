const Page = require('../Page')

class PrsAppSwitchrole_01Page extends Page {
  get switchRole_1 () { return $('DIV:nth-of-type(1) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 
  get switchRole_2 () { return $('DIV:nth-of-type(2) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 
  get switchRole_3 () { return $('DIV:nth-of-type(3) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 
  get switchRole_4 () { return $('DIV:nth-of-type(4) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrole_01Page

module.exports = new PrsAppSwitchrole_01Page();

