
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AORRadiologicalFullFlow/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorSearch.page')
const PrsAppPurchaseNewAorSearch_01Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorSearch_01.page')
const PrsAppPurchaseNewAorSearch_02Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorSearch_02.page')
const PrsAppPurchaseNewAorItemsPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorItems.page')
const PrsAppPurchaseNewAorItems_01Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorItems_01.page')
const PrsAppPurchaseNewAorAccountAssignmentPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment.page')
const PrsAppPurchaseNewAorAccountAssignment_02Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_02.page')
const PrsAppPurchaseNewAorAccountAssignment_03Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_03.page')
const PrsAppPurchaseNewAorAccountAssignment_04Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_04.page')
const PrsAppPurchaseNewAorAccountAssignment_05Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_05.page')
const PrsAppPurchaseNewAorConfirmationPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorConfirmation.page')
const PrsAppPurchaseNewAorAccountAssignment_06Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_06.page')
const PrsAppPurchaseNewAorAccountAssignment_07Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorAccountAssignment_07.page')
const PrsAppPurchaseNewAorConfirmation_01Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorConfirmation_01.page')
const PrsAppPurchaseNewAorConfirmation_02Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorConfirmation_02.page')
const PrsAppPurchaseNewAorConfirmation_03Page = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseNewAorConfirmation_03.page')
const PrsAppPurchaseSearchPage = require('../pageobjects/AORRadiologicalFullFlow/PrsAppPurchaseSearch.page')
let currentValue



async function attacheFile(fileUpload, filename, callback) {
  await browser.execute(callback, fileUpload)
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename)
}

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.contentContainer_div).click() // click=0
    await (await PrsLoginPage.loginas_textInput).click() // click=1
    await (await PrsLoginPage.loginas_textInput).setValue('BCHLEEC') // change=2
    await (await PrsLoginPage.login_button).click() // click=3
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.newRequest_link).click() // click=4
  })

  it('should execute PrsAppPurchaseNewStartPage', async () => {
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // click=5
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // change=6 - radioInput
    await (await PrsAppPurchaseNewStartPage.next_span).click() // click=7
  })

  it('should execute PrsAppPurchaseNewAorSearchPage', async () => {
    await (await PrsAppPurchaseNewAorSearchPage.radioactive_span).click() // click=8
    await (await PrsAppPurchaseNewAorSearchPage.radionuclideS_textInput).click() // click=9
    await (await PrsAppPurchaseNewAorSearchPage.radionuclideS_textInput).setValue('C-14') // change=10
  })

  it('should execute PrsAppPurchaseNewAorSearch_01Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_01Page.search_span).click() // click=11
  })

  it('should execute PrsAppPurchaseNewAorSearch_02Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_02Page.backNext_div).click() // click=12
    await (await PrsAppPurchaseNewAorSearch_02Page.radioactivesearchresulttable0ActionAddBtn_button).click() // click=13
    await (await PrsAppPurchaseNewAorSearch_02Page.nextbutton_button).click() // click=14
  })

  it('should execute PrsAppPurchaseNewAorItemsPage', async () => {
    await (await PrsAppPurchaseNewAorItemsPage.next_span).click() // click=15
    await (await PrsAppPurchaseNewAorItemsPage.sourceType_select).selectByVisibleText('SEALED') // change=16 - select
    await (await PrsAppPurchaseNewAorItemsPage.quantity_numberInput).click() // click=17
    await (await PrsAppPurchaseNewAorItemsPage.quantity_numberInput).click() // click=18
    await (await PrsAppPurchaseNewAorItemsPage.quantity_numberInput).setValue('50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000') // click=19
    await (await PrsAppPurchaseNewAorItemsPage.notationtypeRealInputActivity00_textInput).click() // click=20
    await (await PrsAppPurchaseNewAorItemsPage.nolabel_td).click() // click=21
    await (await PrsAppPurchaseNewAorItemsPage.notationtypeRealInputActivity00_textInput).click() // click=22
    await (await PrsAppPurchaseNewAorItemsPage.notationtypeRealInputActivity00_textInput).setValue('50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000') // change=23
    await (await PrsAppPurchaseNewAorItemsPage.notationtypeUnitActivity00_select).selectByVisibleText('Bq') // change=24 - select
    await (await PrsAppPurchaseNewAorItemsPage.next_span).click() // click=25
    await (await PrsAppPurchaseNewAorItemsPage.nolabel_td).click() // click=26
  })

  it('should execute PrsAppPurchaseNewAorItems_01Page', async () => {

    await expect(await PrsAppPurchaseNewAorItems_01Page.nolabel_li).toHaveTextContaining('C-14: Activity for C-14 is invalid.') // assertText=29
    await (await PrsAppPurchaseNewAorItems_01Page.notationtypeRealInputActivity00_textInput).click() // click=34
    await (await PrsAppPurchaseNewAorItems_01Page.notationtypeRealInputActivity00_textInput).click() // click=35
    await (await PrsAppPurchaseNewAorItems_01Page.notationtypeRealInputActivity00_textInput).setValue('20.00') // change=36
    await (await PrsAppPurchaseNewAorItems_01Page.next_span).click() // click=25

    //await expect(await PrsAppPurchaseNewAorItems_01Page.c14QuantityIsRequired_li).toHaveTextContaining('C-14: Quantity is invalid.') // assertText=27
    //await (await PrsAppPurchaseNewAorItems_01Page.c14QuantityIsRequired_li).click() // click=28
    
    await (await PrsAppPurchaseNewAorItems_01Page.quantity_numberInput).setValue('20.00') // change=33  
    await (await PrsAppPurchaseNewAorItems_01Page.next_span).click() // click=37
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignmentPage', async () => {
    await expect(await PrsAppPurchaseNewAorAccountAssignmentPage.radioactiveSealedSource_span).toExist() // assertExist=38
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_02Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.nolabel_li).click() // click=39
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.storageLocation_select).selectByVisibleText('MD7 > 03 > 01A > LEE GLC LAB') // change=40 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.estimatedProcurementValueSgd_textInput).click() // click=41
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.estimatedProcurementValueSgd_textInput).setValue('5001') // change=42
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).click() // click=43
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).setValue('@Testing###!!!!!!!!!!!!!!!!!!!***********((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))\'') // change=44
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.next_span).click() // click=45
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).click() // click=46
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).setValue('alert("Hi");') // change=47
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.next_span).click() // click=48
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).click() // click=49
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.purposeOfPurchase_text).setValue('javascript:alert("Hi");') // change=50
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.next_span).click() // click=51
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).click() // click=52
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaWbs0_textInput).setValue('A-0002322-00-00') // change=53
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaLimit0_numberInput).click() // click=57
    await (await PrsAppPurchaseNewAorAccountAssignment_02Page.aaLimit0_numberInput).setValue('5001') // change=58
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_03Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.approver2_select).selectByVisibleText('David Gonzalez') // change=59 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.next_span).click() // click=60
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_04Page', async () => {


    const fileUpload = (await PrsAppPurchaseNewAorAccountAssignment_04Page.upload_fileInput)
    //await (await PrsAppPurchaseNewAorAccountAssignmentPage.file_upload).click() // click=20
    //await (await PrsAppPurchaseNewAorAccountAssignmentPage.upload_span).click() // click=21

   
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\Picture.png", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignment_04Page.fileIsInvalid_div).toHaveTextContaining('File is invalid.') // click=25    
    
    browser.pause(50000)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\PMP.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignment_04Page.fileIsInvalid_div).toHaveTextContaining('File size exceeded the maximum file size of 10MB') // click=25    

    browser.pause(50000)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\ReallyLongNamemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await expect (await PrsAppPurchaseNewAorAccountAssignment_04Page.fileIsInvalid_div).toHaveTextContaining('Filename is too long. Maximum length is 50.') // click=25    

 
    
    
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_05Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_05Page.next_span).click() // click=64
    await expect(await PrsAppPurchaseNewAorAccountAssignment_05Page.fileIsInvalid_div).toHaveTextContaining('Sealed source safety review approval form is required.') // assertText=70

    const fileUpload = (await PrsAppPurchaseNewAorAccountAssignment_05Page.upload_fileInput)
    attacheFile(fileUpload,"D:\\Java-Workspace\\poio\\FileUpload\\QR_code.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await (await PrsAppPurchaseNewAorAccountAssignment_05Page.next_span).click() // click=64
  })


  it('should execute PrsAppPurchaseNewAorConfirmation_01Page', async () => {
    await (await PrsAppPurchaseNewAorConfirmation_01Page.yes_span).click() // click=77
  })

  it('should execute PrsAppPurchaseNewAorConfirmation_02Page', async () => {
    await (await PrsAppPurchaseNewAorConfirmation_02Page.nolabel_span).click() // click=78
    await expect(await PrsAppPurchaseNewAorConfirmation_02Page.nolabel_div).toHaveTextContaining('Request has been created successfully. You will be notified once your request has been approved by the relevant approver(s).Request Number: PRS-2021-0000743') // assertText=79
  })

  it('should execute PrsAppPurchaseNewAorConfirmation_03Page', async () => {
    await (await PrsAppPurchaseNewAorConfirmation_03Page.ok_span).click() // click=80
  })

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await (await PrsAppPurchaseSearchPage.searchRequest_h2).click() // click=81
  })

  
})
