'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboardPage extends Page {
  get menuadmission_link () { return $('#menuAdmission') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboardPage

module.exports = new OamadminportalAppContentDashboardPage();

