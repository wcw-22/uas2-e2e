'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get otherInformation_app_message () { return $('APP-OTHER-INFORMATION-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get anyConviction_app_message () { return $('APP-OTHER-INFORMATION-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > APP-MESSAGE') } 
  get no_div () { return $('APP-OTHER-INFORMATION-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2)') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

