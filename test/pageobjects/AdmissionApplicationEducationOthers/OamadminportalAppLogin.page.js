'use strict';

const Page = require('../Page')

class OamadminportalAppLoginPage extends Page {
  get loginas_textInput () { return $('INPUT[type="text"][name="loginAs"]') } 
  get login_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/oamadminportal/app/login') // update as needed
  }
} // end of class OamadminportalAppLoginPage

module.exports = new OamadminportalAppLoginPage();
