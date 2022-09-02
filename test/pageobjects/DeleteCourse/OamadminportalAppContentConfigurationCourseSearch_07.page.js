'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseSearch_07Page extends Page {
  get manageCourseSearch_h3 () { return $('H3') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseSearch_07Page

module.exports = new OamadminportalAppContentConfigurationCourseSearch_07Page();

