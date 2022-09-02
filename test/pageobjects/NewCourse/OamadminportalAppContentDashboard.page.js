'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboardPage extends Page {
  get menuconfiguration_link () { return $('#menuConfiguration') } 
  get menucourse_link () { return $('#menuCourse') } 
  get menucoursenew_link () { return $('#menuCourseNew') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboardPage

module.exports = new OamadminportalAppContentDashboardPage();

