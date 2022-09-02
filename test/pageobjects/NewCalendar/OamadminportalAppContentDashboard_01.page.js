'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboard_01Page extends Page {
  get menuconfiguration_link () { return $('#menuConfiguration') } 
  get menucalendar_link () { return $('LI:nth-of-type(1) > #menuCalendar') } 
  get menucalendarnew_link () { return $('LI:nth-of-type(1) > UL.dropdown-menu > LI:nth-of-type(2) > #menuCalendarNew') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboard_01Page

module.exports = new OamadminportalAppContentDashboard_01Page();

