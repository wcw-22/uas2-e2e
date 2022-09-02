'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseSearch_04Page extends Page {
  get singleDegreeProgram_p () { return $('APP-COURSE-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #courseSearchResultTable > DIV:nth-of-type(1) > #courseSearchResultTable-table > TBODY > TR > TD:nth-of-type(3) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseSearch_04Page

module.exports = new OamadminportalAppContentConfigurationCourseSearch_04Page();

