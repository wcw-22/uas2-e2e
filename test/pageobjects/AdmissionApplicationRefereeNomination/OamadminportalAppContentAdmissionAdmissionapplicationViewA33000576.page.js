'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get refereeNomination_app_message () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get salutation_app_message () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > THEAD.nus-blue-bg.text-white > TR > TH:nth-of-type(1) > APP-MESSAGE') } 
  get fullName_app_message () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > THEAD.nus-blue-bg.text-white > TR > TH:nth-of-type(2) > APP-MESSAGE') } 
  get givenName_app_message () { return $('DIV:nth-of-type(1) > TABLE > THEAD.nus-blue-bg.text-white > TR > TH:nth-of-type(3) > APP-MESSAGE') } 
  get designation_app_message () { return $('DIV:nth-of-type(1) > TABLE > THEAD.nus-blue-bg.text-white > TR > TH:nth-of-type(4) > APP-MESSAGE') } 
  get organisation_app_message () { return $('TH:nth-of-type(5) > APP-MESSAGE') } 
  get relationship_app_message () { return $('TH:nth-of-type(6) > APP-MESSAGE') } 
  get contactNumber_app_message () { return $('TH:nth-of-type(7) > APP-MESSAGE') } 
  get email_app_message () { return $('TH:nth-of-type(8) > APP-MESSAGE') } 
  get miss_td () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > TBODY > TR > TD:nth-of-type(1)') } 
  get euniceLoo_td () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > TBODY > TR > TD:nth-of-type(2)') } 
  get eunice_td () { return $('DIV:nth-of-type(1) > TABLE > TBODY > TR > TD:nth-of-type(3)') } 
  get teacher_td () { return $('TD:nth-of-type(4)') } 
  get hwaChongInstitution_td () { return $('TD:nth-of-type(5)') } 
  get teacher_td () { return $('TD:nth-of-type(6)') } 
  get _6577773333_td () { return $('TD:nth-of-type(7)') } 
  get hlTehYahooCom_td () { return $('TD:nth-of-type(8)') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

