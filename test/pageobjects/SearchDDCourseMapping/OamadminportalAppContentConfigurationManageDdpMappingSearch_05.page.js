'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page extends Page {
  get nolabel_h3 () { return $('H3') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search?searchState=%7B%22doubleDegreeCourse%22:%22TC-Course9%22,%22applicationType%22:%22A%20Level%20%22,%22singleDegreeCourse%22:%22TC-Course10%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page();

