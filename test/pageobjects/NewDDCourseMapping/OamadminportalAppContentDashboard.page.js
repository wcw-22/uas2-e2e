'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboardPage extends Page {
  get menuconfiguration_link () { return $('#menuConfiguration') } 
  get menuddpmapping_link () { return $('#menuDDPMapping') } 
  get menuddpmappingnew_link () { return $('#menuDDPMappingNew') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboardPage

module.exports = new OamadminportalAppContentDashboardPage();

