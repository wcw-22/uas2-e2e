'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearch_02Page extends Page {
  get contentContainer_div () { return $('APP-MANAGE-CALENDAR-SEARCH > #content-container') } 
  get exportToExcel_app_message () { return $('DIV.col-md-12.text-end > BUTTON:nth-of-type(2) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search?searchState=%7B%22category%22:%22%22,%22activity%22:%22%22,%22applicationType%22:%22%22,%22sortBy%22:%5B%7B%22direction%22:%22ASC%22,%22field%22:%221%22%7D%5D,%22page%22:0,%22windowSize%22:0,%22acadYear%22:%222022%22,%22nextAcadYear%22:%222023%22,%22nonce%22:1661222691623%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearch_02Page

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearch_02Page();

