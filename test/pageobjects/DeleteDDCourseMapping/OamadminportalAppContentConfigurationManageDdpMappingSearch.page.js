'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearchPage extends Page {
  get nolabel_h3 () { return $('H3') } 
  get doubleDegreeCourse_textInput () { return $('#doubleDegreeCourse') } 
  get search_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get tcbCourse02_p () { return $('APP-MANAGE-DDP-MAPPING-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #ddpMappingSearchResultTable > DIV:nth-of-type(1) > #ddpMappingSearchResultTable-table > TBODY > TR > TD:nth-of-type(1) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearchPage

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearchPage();

