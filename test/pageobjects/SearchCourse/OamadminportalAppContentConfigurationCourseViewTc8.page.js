'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseViewTc8Page extends Page {
  get manageCourseView_h3 () { return $('H3') } 
  get courseCodetc8_div () { return $('DIV.container-large > DIV:nth-of-type(2)') } 
  get tc8_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get tcCourse8_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get _100SingleDegreeProgram_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get yes_p () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get yes_p () { return $('DIV:nth-of-type(6) > DIV:nth-of-type(2) > P.form-control-plaintext') } 
  get deleteBackToSearch_div () { return $('DIV.col-md-12.text-end') } 
  get backToSearch_app_message () { return $('APP-COURSE-VIEW > DIV.container-large > DIV:nth-of-type(7) > DIV.col-md-12.text-end > BUTTON:nth-of-type(2) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/view/TC8?searchState=%7B%22courseCode%22:%22TC8%22,%22courseName%22:%22TC-Course8%22,%22courseType%22:%22%22,%22interviewCourse%22:%22%22,%22active%22:%22Yes%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseViewTc8Page

module.exports = new OamadminportalAppContentConfigurationCourseViewTc8Page();

