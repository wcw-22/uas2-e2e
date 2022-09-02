'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseSearch_05Page extends Page {
  get yes_p () { return $('APP-COURSE-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #courseSearchResultTable > DIV:nth-of-type(1) > #courseSearchResultTable-table > TBODY > TR > TD:nth-of-type(4) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseSearch_05Page

module.exports = new OamadminportalAppContentConfigurationCourseSearch_05Page();

