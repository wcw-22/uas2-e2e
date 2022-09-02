'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearchPage extends Page {
  get academicYear_textInput () { return $('#acadYear') } 
  get search_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearchPage

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearchPage();

