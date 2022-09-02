'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingNewPage extends Page {
  get nolabel_app_message () { return $('H3 > APP-MESSAGE') } 
  get aLevel_p () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse02_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse03_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse04_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get doYouWantToProceed_app_message () { return $('SPAN:nth-of-type(1) > APP-MESSAGE') } 
  get yes_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get eventidAck_button () { return $('APP-MANAGE-DDP-MAPPING-FORM > DIV.container-large > FORM.form-horizontal > DIV:nth-of-type(6) > DIV.col-sm-12 > BUTTON[type="button"]') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/new/dd31106d-ff03-4eda-b39e-3199190d692a?searchState=%7B%22doubleDegreeCourse%22:%22TCB-Course02%22,%22applicationType%22:%22A%20Level%20%22,%22singleDegreeCourse%22:%22%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingNewPage

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingNewPage();

