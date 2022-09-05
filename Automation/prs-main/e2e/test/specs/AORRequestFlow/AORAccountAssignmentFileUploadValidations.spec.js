
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchPage = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorSearch.page')
const PrsAppPurchaseNewAorSearch_01Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorSearch_01.page')
const PrsAppPurchaseNewAorSearch_02Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorSearch_02.page')
const PrsAppPurchaseNewAorItemsPage = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorItems.page')
const PrsAppPurchaseNewAorAccountAssignmentPage = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorAccountAssignment.page')
const PrsAppPurchaseNewAorAccountAssignment_01Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorAccountAssignment_01.page')
const PrsAppPurchaseNewAorAccountAssignment_02Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorAccountAssignment_02.page')
const PrsAppPurchaseNewAorAccountAssignment_03Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorAccountAssignment_03.page')
const PrsAppPurchaseNewAorAccountAssignment_04Page = require('../pageobjects/AORAccountAssignmentFileUploadValidations/PrsAppPurchaseNewAorAccountAssignment_04.page')


async function attacheFile(fileUpload, filename, callback) {
  await browser.execute(callback, fileUpload)
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename)
}

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=1
    await (await PrsLoginPage.loginas_textInput).setValue('BCHLEEC') // change=2
    await (await PrsLoginPage.login_button).click() // click=3
  })


  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.newRequest_link).click() // click=4
  })

  it('should execute PrsAppPurchaseNewStartPage', async () => {
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // click=2
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // change=3 - radioInput
    await (await PrsAppPurchaseNewStartPage.nextbutton_button).click() // click=4
  })

  it('should execute PrsAppPurchaseNewAorSearchPage', async () => {
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).click() // click=5
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).setValue('BEN') // change=6
  })

  it('should execute PrsAppPurchaseNewAorSearch_01Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_01Page.chemicalsearchbutton_button).click() // click=7
  })

  it('should execute PrsAppPurchaseNewAorSearch_02Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_02Page.chemicalsearchresulttable0ActionAddBtn_button).click() // click=8
    await (await PrsAppPurchaseNewAorSearch_02Page.next_span).click() // click=9
  })

  it('should execute PrsAppPurchaseNewAorItemsPage', async () => {
    await (await PrsAppPurchaseNewAorItemsPage.physicalForm_select).selectByVisibleText('Gas') // change=10 - select
    await (await PrsAppPurchaseNewAorItemsPage.totalQuantity_numberInput).click() // click=11
    await (await PrsAppPurchaseNewAorItemsPage.totalQuantity_numberInput).setValue('5') // change=12
    await (await PrsAppPurchaseNewAorItemsPage.chemicalquantityunit0_select).selectByVisibleText('m3') // change=13 - select
    await (await PrsAppPurchaseNewAorItemsPage.next_span).click() // click=14
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignmentPage', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD7 > 03 > 01A > LEE GLC LAB') // change=15 - select
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.estimatedProcurementValueSgd_textInput).click() // click=16
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.estimatedProcurementValueSgd_textInput).setValue('5001') // change=17
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.purposeOfPurchase_text).click() // click=18
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.purposeOfPurchase_text).setValue('Testing File Upload') // change=19

    const fileUpload = (await PrsAppPurchaseNewAorAccountAssignmentPage.upload_fileInput)
    //await (await PrsAppPurchaseNewAorAccountAssignmentPage.file_upload).click() // click=20
    //await (await PrsAppPurchaseNewAorAccountAssignmentPage.upload_span).click() // click=21

   
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\Picture.png", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignmentPage.fileIsInvalid_div).toHaveTextContaining('File is invalid.') // click=25    
    
    browser.pause(50000)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\PMP.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignmentPage.fileIsInvalid_div).toHaveTextContaining('File size exceeded the maximum file size of 10MB') // click=25    

    browser.pause(50000)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\ReallyLongNamemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignmentPage.fileIsInvalid_div).toHaveTextContaining('Filename is too long. Maximum length is 50.') // click=25    

  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_01Page', async () => {

    const fileUpload = (await PrsAppPurchaseNewAorAccountAssignment_01Page.upload_fileInput)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\QR_Code.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
     
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.supportingdocdescription0_textInput).click() // click=24
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.supportingdocdescription0_textInput).setValue('Input file description for uploaded file') // change=25
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.aaWbs0_textInput).click() // click=26
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.aaWbs0_textInput).setValue('A-0002322-00-00') // change=27
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_02Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.nolabel_tr).click() // click=28
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=29
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=30
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=31
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=32
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=33
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaLimit0_numberInput).click() // click=34
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaLimit0_numberInput).setValue('5001') // change=35
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_03Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.approver2_select).selectByVisibleText('David Gonzalez') // change=36 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.next_span).click() // click=37
  })

  
})
