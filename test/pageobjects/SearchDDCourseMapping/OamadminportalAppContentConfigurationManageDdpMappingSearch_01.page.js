'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page extends Page {
  get nolabel_h3 () { return $('H3') } 
  get doubleDegreeCourse_textInput () { return $('#doubleDegreeCourse') } 
  get singleDegreeCourse_textInput () { return $('#singleDegreeCourse') } 
  get applicationtype_select () { return $('#applicationType') } 
  // available 15 options: 'Please select', 'A Level', 'A Level Applicant invited for Green Harvest Application', 'International Baccalaureate (IB) Diploma Holders', 'International Qualifications', 'NUS Current Student', 'NUS High School Diploma Holders', 'Nursing Diploma Holders with working experience as a Registered Nurse (RN)', 'Polytechnic Applicants', 'Senior Middle 2', 'Singapore Citizens/ Singapore Permanent Residents with International Qualifications', 'Transfer Applicants from NUS (Sem 1)', 'Transfer Applicants from NUS (Sem 2)', 'Transfer Applicants from Other Universities and Former University Undergraduates (Sem 1)', 'Transfer Applicants from Other Universities and Former University Undergraduates (Sem 2)', 

  get search_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get tcCourse9_p () { return $('APP-MANAGE-DDP-MAPPING-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #ddpMappingSearchResultTable > DIV:nth-of-type(1) > #ddpMappingSearchResultTable-table > TBODY > TR > TD:nth-of-type(1) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-ddp-mapping/search') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page

module.exports = new OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page();

