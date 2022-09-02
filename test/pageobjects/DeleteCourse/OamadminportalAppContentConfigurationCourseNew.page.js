'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseNewPage extends Page {
  get nolabel_app_message () { return $('H3 > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('SPAN:nth-of-type(1) > APP-MESSAGE') } 
  get yes_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get ok_app_message () { return $('APP-COURSE-NEW > DIV.container-large > FORM.form-horizontal > DIV:nth-of-type(6) > DIV.col-sm-12 > BUTTON > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/new/50a3ea27-3300-43e6-a2e3-a5f53c3631b4?searchState=%7B%22courseCode%22:%22TCB01%22,%22courseName%22:%22%22,%22courseType%22:%22%22,%22interviewCourse%22:%22%22,%22active%22:%22Yes%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseNewPage

module.exports = new OamadminportalAppContentConfigurationCourseNewPage();

