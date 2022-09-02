'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarViewPage extends Page {
  get backToSearch_button () { return $('APP-MANAGE-CALENDAR-VIEW > DIV.container-large > DIV:nth-of-type(2) > DIV.col-md-12.text-end > BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/view/42100ffd-20fa-48f2-b461-e548123a78e9?searchState=%7B%22category%22:%22%22,%22activity%22:%22%22,%22applicationType%22:%22%22,%22sortBy%22:%5B%7B%22direction%22:%22ASC%22,%22field%22:%221%22%7D%5D,%22page%22:0,%22windowSize%22:0,%22acadYear%22:%222022%22,%22nextAcadYear%22:%222023%22,%22nonce%22:1661222691623%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarViewPage

module.exports = new OamadminportalAppContentConfigurationManageCalendarViewPage();

