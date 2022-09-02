'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page extends Page {
  get aLevel_p () { return $('APP-MANAGE-DDP-MAPPING-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #ddpMappingSearchResultTable > DIV:nth-of-type(1) > #ddpMappingSearchResultTable-table > TBODY > TR > TD:nth-of-type(2) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page();

