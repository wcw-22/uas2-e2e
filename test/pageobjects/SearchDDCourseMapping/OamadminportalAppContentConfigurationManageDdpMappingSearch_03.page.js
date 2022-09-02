'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page extends Page {
  get tcCourse10TcCourse11_p () { return $('APP-MANAGE-DDP-MAPPING-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #ddpMappingSearchResultTable > DIV:nth-of-type(1) > #ddpMappingSearchResultTable-table > TBODY > TR:nth-of-type(1) > TD:nth-of-type(3) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page();

