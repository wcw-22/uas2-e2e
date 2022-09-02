'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page extends Page {
  get nolabel_h3 () { return $('H3') } 
  get aLevel_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcCourse9_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcCourse10_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcCourse11_p () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get backToSearch_app_message () { return $('APP-MANAGE-DDP-MAPPING-VIEW > DIV.container-large > DIV:nth-of-type(6) > DIV.col-md-12.text-end > BUTTON:nth-of-type(3) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/view/TC9?searchState=%7B%22doubleDegreeCourse%22:%22TC-Course9%22,%22applicationType%22:%22A%20Level%20%22,%22singleDegreeCourse%22:%22TC-Course10%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page();

