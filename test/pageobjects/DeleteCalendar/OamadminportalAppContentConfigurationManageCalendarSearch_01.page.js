'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearch_01Page extends Page {
  get on_checkboxInput () { return $('#action_0') } 
  get delete_app_message () { return $('DIV.col-md-12.text-end > BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_p () { return $('DIV:nth-of-type(2) > P') } 
  get nolabel_p () { return $('DIV:nth-of-type(2) > P') } 
  get nolabel_p () { return $('DIV:nth-of-type(2) > P') } 
  get yes_app_message () { return $('DIV:nth-of-type(3) > BUTTON:nth-of-type(1) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search?searchState=%7B%22category%22:%22Admission%22,%22activity%22:%22006%22,%22applicationType%22:%22%22,%22sortBy%22:%5B%7B%22direction%22:%22ASC%22,%22field%22:%221%22%7D%5D,%22page%22:0,%22windowSize%22:0,%22nonce%22:1661236124224%7D#searchResult') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearch_01Page

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearch_01Page();

