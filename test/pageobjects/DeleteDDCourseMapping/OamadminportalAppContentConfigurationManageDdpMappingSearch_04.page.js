'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page extends Page {
  get nolabel_h3 () { return $('H3') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page();

