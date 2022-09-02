'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseNew_01Page extends Page {
  get uas2ContentContainer_div () { return $('#uas2-content-container') } 
  get manageCourseAdd_app_message () { return $('H3 > APP-MESSAGE') } 
  get courseCode_textInput () { return $('#courseCode') } 
  get courseName_textInput () { return $('#courseName') } 
  get courseType_select () { return $('#courseType') } 
  // available 11 options: 'Please select', '100 - SINGLE DEGREE PROGRAM', '200 - JOINT DEGREE PROGRAM', '201 - JOINT DEGREE PROGRAM WITH PARTNER UNIVERSITY', '300 - DOUBLE DEGREE PROGRAM', '301 - DOUBLE DEGREE PROGRAM WITH PARTNER UNIVERSITY', '800 - SPECIALISATION PROGRAM', '400 - CONCURRENT DEGREE PROGRAM', '500 - DOUBLE MAJOR PROGRAM', '600 - MAJOR WITH A MINOR PROGRAM', '700 - CROSS DISCIPLINARY PROGRAM', 

  get submit_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('SPAN:nth-of-type(1) > APP-MESSAGE') } 
  get tcb01_p () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse01_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get _100SingleDegreeProgram_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/new') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseNew_01Page

module.exports = new OamadminportalAppContentConfigurationCourseNew_01Page();

