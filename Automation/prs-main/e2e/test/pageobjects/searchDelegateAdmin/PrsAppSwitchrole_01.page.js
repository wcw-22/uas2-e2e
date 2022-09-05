const Page = require('../Page')

class PrsAppSwitchrole_01Page extends Page {
  get nusAdministrator_textInput () { return $('DIV:nth-of-type(1) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 
  get facultyAdministrator_textInput () { return $('DIV:nth-of-type(2) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 	
  get selectRole2_textInput () { return $('DIV:nth-of-type(3) > #roleTable > TBODY > TR > TD > INPUT[type="text"]	') } 	
	
  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrole_01Page

module.exports = new PrsAppSwitchrole_01Page();

