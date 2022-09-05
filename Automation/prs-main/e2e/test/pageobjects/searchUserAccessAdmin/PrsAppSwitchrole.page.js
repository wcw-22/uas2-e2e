const Page = require('../Page')

class PrsAppSwitchrolePage extends Page {
  get selectRole0_textInput () { return $('DIV:nth-of-type(1) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 
  get selectRole1_textInput () { return $('#select-role-1') } 
  get selectRole2_textInput () { return $('#select-role-2') } 
  

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrolePage

module.exports = new PrsAppSwitchrolePage();

