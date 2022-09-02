'use strict';

const Page = require('../Page')

class OamadminportalAppLoggedoutPage extends Page {
  get nolabel_h3 () { return $('H3') } 

  open() {
    return super.open('/oamadminportal/app/loggedOut') // update as needed
  }
} // end of class OamadminportalAppLoggedoutPage

module.exports = new OamadminportalAppLoggedoutPage();

