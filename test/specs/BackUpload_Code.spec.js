'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/BackUpload_Code/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/BackUpload_Code/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/BackUpload_Code/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage = require('../pageobjects/BackUpload_Code/OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCode.page')
let dataVariables = {};

async function attacheFile(fileUpload, filename) {
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename)
}
describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()

    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=0
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('acts') // change=1
    await (await OamadminportalAppLoginPage.login_button).click() // click=2
  })

  it('should execute OamadminportalAppContentSwitchrolePage', async () => {
    await (await OamadminportalAppContentSwitchrolePage.nusAdministrator_button).click() // click=3
  })

  it('should execute OamadminportalAppContentDashboardPage', async () => {
    await (await OamadminportalAppContentDashboardPage.menuconfiguration_link).click() // click=4
    await (await OamadminportalAppContentDashboardPage.menubatchupload_link).moveTo() // moveTo=5
    await (await OamadminportalAppContentDashboardPage.menubatchuploadcode_link).click() // click=6
  })
  const path = require('path')
  it('should execute OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage', async () => {
    browser.pause(52000)
    const fileUpload = (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.batchuploadfile_fileInput)
    attacheFile(fileUpload,"C:\\Users\\wcw-22\\Downloads\\Financial-Aid-PackageCode-template.xlsx")

   await (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.uploadCodeType_select).selectByVisibleText('Package Code') // change=7 - select
    //await (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.batchuploadfile_fileInput).click() // click=8
   // await (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.batchuploadfile_fileInput).setValueByKeys(remoteFilePath) // change=9
    //await (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.upload_app_message).click() // click=10
    //await (await OamadminportalAppContentConfigurationFinancialaidBatchUploadUploadCodePage.back_app_message).click() // click=11
    //const filePath = 'C:\\Users\\wcw-22\\Downloads'
    //const remoteFilePath = await browser.uploadFile(filePath)
     const SubmitBtn = $('//app-message[(text() = "Upload" or . = "Upload")]')
        
    browser.pause(62000)

    SubmitBtn.click()

    browser.pause(982000)
  })
})
