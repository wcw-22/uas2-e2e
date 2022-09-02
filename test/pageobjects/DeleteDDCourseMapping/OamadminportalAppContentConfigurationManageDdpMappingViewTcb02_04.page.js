'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page extends Page {
  get delete_app_message () { return $('BUTTON:nth-of-type(2) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/view/TCB02') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page();

