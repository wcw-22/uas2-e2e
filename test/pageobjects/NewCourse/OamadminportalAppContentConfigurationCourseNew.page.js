'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseNewPage extends Page {
  get manageCourseAdd_app_message () { return $('H3 > APP-MESSAGE') } 
  get courseCode_textInput () { return $('#courseCode') } 
  get courseName_textInput () { return $('#courseName') } 
  get courseType_select () { return $('#courseType') } 
  // available 11 options: 'Please select', '100 - SINGLE DEGREE PROGRAM', '200 - JOINT DEGREE PROGRAM', '201 - JOINT DEGREE PROGRAM WITH PARTNER UNIVERSITY', '300 - DOUBLE DEGREE PROGRAM', '301 - DOUBLE DEGREE PROGRAM WITH PARTNER UNIVERSITY', '800 - SPECIALISATION PROGRAM', '400 - CONCURRENT DEGREE PROGRAM', '500 - DOUBLE MAJOR PROGRAM', '600 - MAJOR WITH A MINOR PROGRAM', '700 - CROSS DISCIPLINARY PROGRAM', 

  get yes_radioInput () { return $('#interviewCourseYes') } 
  get submit_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/new') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseNewPage

module.exports = new OamadminportalAppContentConfigurationCourseNewPage();

