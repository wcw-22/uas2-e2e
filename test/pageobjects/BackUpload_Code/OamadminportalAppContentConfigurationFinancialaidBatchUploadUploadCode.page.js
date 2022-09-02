'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage extends Page {
  get uploadCodeType_select () { return $('#uploadCodeType') } 
  // available 2 options: 'Please select', 'Package Code', 

  get batchuploadfile_fileInput () { return $('#batchUploadFile') } 
  get upload_app_message () { return $('BUTTON:nth-of-type(2) > APP-MESSAGE') } 
  get back_app_message () { return $('DIV.card > DIV:nth-of-type(2) > DIV.row > DIV.col-xs-12.text-end > BUTTON > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/financialaid/batch-upload/upload-code') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage

module.exports = new OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage();

