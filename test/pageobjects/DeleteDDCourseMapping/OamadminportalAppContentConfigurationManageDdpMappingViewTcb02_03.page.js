'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page extends Page {
  get nolabel_h3 () { return $('H3') } 
  get aLevel_p () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse02_p () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse03_p () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 
  get tcbCourse04_p () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > P.form-control-plaintext.fs-6') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/view/TCB02?searchState=%7B%22doubleDegreeCourse%22:%22TCB-Course02%22,%22applicationType%22:%22A%20Level%20%22,%22singleDegreeCourse%22:%22%22%7D') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page();

