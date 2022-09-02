'use strict';

const Page = require('../Page')

class OamadminportalAppContentSwitchrolePage extends Page {
  get nolabel_h3 () { return $('H3') } 
  get logoutfromswitchrolebutton_button () { return $('APP-SWITCH-ROLE > DIV.container-lg > DIV:nth-of-type(10) > DIV.col-12 > #logoutFromSwitchRoleButton') } 

  open() {
    return super.open('/oamadminportal/app/content/switchRole') // update as needed
  }
} // end of class OamadminportalAppContentSwitchrolePage

module.exports = new OamadminportalAppContentSwitchrolePage();

