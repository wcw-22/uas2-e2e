'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page extends Page {
  get nolabel_i () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(9) > DIV.col-12.text-end > BUTTON.btn-link > I.fa.fa-edit') } 
  get noRecordsFound_app_message () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > DIV > DIV:nth-of-type(3) > TABLE > TBODY > TR > TD > APP-MESSAGE') } 
  get cancel_app_message () { return $('DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(4) > DIV.col-12.text-end > BUTTON:nth-of-type(2) > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page();

