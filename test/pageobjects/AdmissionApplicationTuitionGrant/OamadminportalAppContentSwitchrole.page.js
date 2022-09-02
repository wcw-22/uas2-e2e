'use strict';

const Page = require('../Page')

class OamadminportalAppContentSwitchrolePage extends Page {
  get nusAdministrator_button () { return $('DIV:nth-of-type(8) > DIV.col-12 > BUTTON[type="button"].col-3') } 

  open() {
    return super.open('/oamadminportal/app/content/switchRole') // update as needed
  }
} // end of class OamadminportalAppContentSwitchrolePage

module.exports = new OamadminportalAppContentSwitchrolePage();

