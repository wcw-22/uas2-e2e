'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseViewTcb01_05Page extends Page {
  get manageCourseView_h3 () { return $('H3') } 
  get tcb01_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get tcbCourse01_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get _100SingleDegreeProgram_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get yes_p () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get yes_p () { return $('DIV:nth-of-type(6) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get delete_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/view/TCB01') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseViewTcb01_05Page

module.exports = new OamadminportalAppContentConfigurationCourseViewTcb01_05Page();

