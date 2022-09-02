'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseNew_02Page extends Page {
  get uas2ContentContainer_div () { return $('#uas2-content-container') } 
  get courseCode_textInput () { return $('#courseCode') } 
  get courseName_textInput () { return $('#courseName') } 
  get courseType_select () { return $('#courseType') } 
  // available 11 options: 'Please select', '100 - SINGLE DEGREE PROGRAM', '200 - JOINT DEGREE PROGRAM', '201 - JOINT DEGREE PROGRAM WITH PARTNER UNIVERSITY', '300 - DOUBLE DEGREE PROGRAM', '301 - DOUBLE DEGREE PROGRAM WITH PARTNER UNIVERSITY', '800 - SPECIALISATION PROGRAM', '400 - CONCURRENT DEGREE PROGRAM', '500 - DOUBLE MAJOR PROGRAM', '600 - MAJOR WITH A MINOR PROGRAM', '700 - CROSS DISCIPLINARY PROGRAM', 

  get yes_radioInput () { return $('#interviewCourseYes') } 
  get submit_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get yes_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get yes_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get eventidAck_button () { return $('DIV.col-sm-12 > BUTTON[type="button"]') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/new') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseNew_02Page

module.exports = new OamadminportalAppContentConfigurationCourseNew_02Page();

