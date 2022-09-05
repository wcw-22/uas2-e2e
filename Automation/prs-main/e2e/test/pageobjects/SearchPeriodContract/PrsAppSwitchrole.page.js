const Page = require('../Page')

class PrsAppSwitchrolePage extends Page {
  get selectRole1_textInput () { return $('DIV:nth-of-type(2) > #roleTable > TBODY > TR > TD > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrolePage

module.exports = new PrsAppSwitchrolePage();

