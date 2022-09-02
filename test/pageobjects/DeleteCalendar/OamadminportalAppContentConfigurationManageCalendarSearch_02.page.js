'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearch_02Page extends Page {
  get nolabel_li () { return $('UL.mb-0 > LI') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search?searchState=%7B%22category%22:%22Admission%22,%22activity%22:%22006%22,%22applicationType%22:%22%22,%22sortBy%22:%5B%7B%22direction%22:%22ASC%22,%22field%22:%221%22%7D%5D,%22page%22:0,%22windowSize%22:0,%22nonce%22:1661236124224%7D#searchResult') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearch_02Page

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearch_02Page();

