'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarSearch_01Page extends Page {
  get aLevel_p () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > P.form-control-plaintext.cursor-pointer') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/search?searchState=%7B%22category%22:%22%22,%22activity%22:%22%22,%22applicationType%22:%22%22,%22sortBy%22:%5B%7B%22direction%22:%22ASC%22,%22field%22:%221%22%7D%5D,%22page%22:0,%22windowSize%22:0,%22acadYear%22:%222022%22,%22nextAcadYear%22:%222023%22,%22nonce%22:1661222691623%7D#searchResult') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarSearch_01Page

module.exports = new OamadminportalAppContentConfigurationManageCalendarSearch_01Page();

