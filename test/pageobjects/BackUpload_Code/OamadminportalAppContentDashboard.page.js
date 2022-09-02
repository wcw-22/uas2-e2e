'use strict';

const Page = require('../Page')

class OamadminportalAppContentDashboardPage extends Page {
  get menuconfiguration_link () { return $('#menuConfiguration') } 
  get menubatchupload_link () { return $('#menuBatchUpload') } 
  get menubatchuploadcode_link () { return $('#menuBatchUploadCode') } 

  open() {
    return super.open('/oamadminportal/app/content/dashboard') // update as needed
  }
} // end of class OamadminportalAppContentDashboardPage

module.exports = new OamadminportalAppContentDashboardPage();

