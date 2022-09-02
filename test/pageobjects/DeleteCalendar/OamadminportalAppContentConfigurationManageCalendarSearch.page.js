'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearchPage extends Page {
  get category_select () { return $('#category') } 
  // available 4 options: 'Please select', 'Admission', 'Scholarship', 'Financial Aid', 

  get activity_select () { return $('#activity') } 
  // available 1 options: 'Please select', 

  get search_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearchPage

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearchPage();

