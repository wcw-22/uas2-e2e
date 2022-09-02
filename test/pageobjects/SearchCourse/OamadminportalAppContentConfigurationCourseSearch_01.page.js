'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseSearch_01Page extends Page {
  get manageCourseSearch_h3 () { return $('H3') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/search?searchState=%7B%22courseCode%22:%22TC8%22,%22courseName%22:%22TC-Course8%22,%22courseType%22:%22%22,%22interviewCourse%22:%22%22,%22active%22:%22Yes%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseSearch_01Page

module.exports = new OamadminportalAppContentConfigurationCourseSearch_01Page();

