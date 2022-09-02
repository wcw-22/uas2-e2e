'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboardPage extends Page {
  get menuconfiguration_link () { return $('#menuConfiguration') } 
  get menucalendar_link () { return $('LI:nth-of-type(1) > #menuCalendar') } 
  get menucalendarsearch_link () { return $('LI:nth-of-type(1) > UL.dropdown-menu > LI:nth-of-type(1) > #menuCalendarSearch') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboardPage

module.exports = new OamadminportalAppContentDashboardPage();

