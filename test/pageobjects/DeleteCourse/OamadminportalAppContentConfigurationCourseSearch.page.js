'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationCourseSearchPage extends Page {
  get manageCourseSearch_h3 () { return $('H3') } 
  get courseCode_textInput () { return $('#courseCode') } 
  get search_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get tcb01_p () { return $('APP-COURSE-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #courseSearchResultTable > DIV:nth-of-type(1) > #courseSearchResultTable-table > TBODY > TR > TD:nth-of-type(1) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/course/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationCourseSearchPage

module.exports = new OamadminportalAppContentConfigurationCourseSearchPage();

