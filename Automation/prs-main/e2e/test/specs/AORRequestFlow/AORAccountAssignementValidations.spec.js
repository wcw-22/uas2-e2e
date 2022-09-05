
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AORAccountAssignementValidations/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AORAccountAssignementValidations/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchPage = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorSearch.page')
const PrsAppPurchaseNewAorSearch_01Page = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorSearch_01.page')
const PrsAppPurchaseNewAorSearch_02Page = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorSearch_02.page')
const PrsAppPurchaseNewAorItemsPage = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorItems.page')
const PrsAppPurchaseNewAorAccountAssignment_LoadPage = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorAccountAssignment_Load.page')
const PrsAppPurchaseNewAorAccountAssignment_Validations_Page = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorAccountAssignment_Validations_1.page')
const PrsAppPurchaseNewAorAccountAssignment_01Page = require('../pageobjects/AORAccountAssignementValidations/PrsAppPurchaseNewAorAccountAssignment_01.page')

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
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // click=5
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // change=6 - radioInput
    await (await PrsAppPurchaseNewStartPage.next_button).click() // click=7
  })

  it('should execute PrsAppPurchaseNewAorSearchPage', async () => {
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).click() // click=8
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).setValue('BEN') // change=9
  })

  it('should execute PrsAppPurchaseNewAorSearch_01Page', async () => {
    
    await (await PrsAppPurchaseNewAorSearch_01Page.search_button).click() // click=10
  })

  it('should execute PrsAppPurchaseNewAorSearch_02Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_02Page.add_button).click() // click=11
    await (await PrsAppPurchaseNewAorSearch_02Page.next_span).click() // click=12
  })

  it('should execute PrsAppPurchaseNewAorItemsPage', async () => {
    await (await PrsAppPurchaseNewAorItemsPage.physicalForm_select).selectByVisibleText('Gas') // change=13 - select
    await (await PrsAppPurchaseNewAorItemsPage.qty_numberInput).click() // click=14
    await (await PrsAppPurchaseNewAorItemsPage.qty_numberInput).setValue('5') // change=15
    await (await PrsAppPurchaseNewAorItemsPage.totalQuantity_div).click() // click=16
    await (await PrsAppPurchaseNewAorItemsPage.unit_select).selectByVisibleText('m3') // change=17 - select
    await (await PrsAppPurchaseNewAorItemsPage.next_button).click() // click=18
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_LoadPage', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_LoadPage.next_span).click() // click=19
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_Validations_Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.locationIsRequired_li).click() // click=20
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.epv_li).click() // click=21
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.pop_li).click() // click=22
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.acctassignement_li).click() // click=23
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_li).click() // click=24
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.locationIsRequired_li).toHaveTextContaining('Location is required.') // assertText=25
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.nolabel_div).click() // click=26
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.epv_li).click() // click=27
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.epv_li).toHaveTextContaining('Estimated Procurement Value (SGD) is required.') // assertText=28
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.pop_li).toHaveTextContaining('Purpose of Purchase is required.') // assertText=29
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.acctassignement_li).toHaveTextContaining('EPV is required.') // assertText=30
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.acctassignement_li).click() // click=31
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_li).toHaveTextContaining('WBS is required.') // assertText=32
    await expect(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.inventoryOwnerIsRequired_li).toHaveTextContaining('Inventory Owner is required') // assertText=33
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.nolabel_ul).click() // click=34
  })


  it('should execute PrsAppPurchaseNewAorAccountAssignment_Validations_Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.storageLocation_select).selectByVisibleText('MD7 > 03 > 01A > LEE GLC LAB') // change=19 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).click() // click=20
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).setValue('5') // change=21
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.purposeOfPurchase_text).click() // click=22
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.purposeOfPurchase_text).setValue('Testing AOR with amount less than 5000') // change=23
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_textInput).click() // click=24
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_textInput).setValue('A-0002322-00-00') // change=25

  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_01Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.epvTbl_numberInput).click() // click=21
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.epvTbl_numberInput).setValue('5') // change=22


    const approverDiv = await PrsAppPurchaseNewAorAccountAssignment_01Page.approvers_div
    const approverDetailsLoaded = await approverDiv.isExisting()
    await expect(approverDetailsLoaded).toBe(true)

    // The EPV value is set less than 5000
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.approvers_div).click() // click=23
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.next_span).click() // click=24
    await expect (await PrsAppPurchaseNewAorAccountAssignment_01Page.error_div).toHaveTextContaining('Estimated Procurement Value (SGD) must be more than 5000.') // click=25    
  })


  it('should execute PrsAppPurchaseNewAorAccountAssignment_Validations_Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.storageLocation_select).selectByVisibleText('MD7 > 03 > 01A > LEE GLC LAB') // change=19 - select
    
    // The EPV value and total EPV value does not match
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).click() // click=20
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).setValue('5001') // change=21
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.purposeOfPurchase_text).click() // click=22
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.purposeOfPurchase_text).setValue('Testing AOR with amount less than 5000') // change=23

    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.next_span).click() // click=24
    await expect (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.error_div).toHaveTextContaining('Total EPV entered does not match the Estimated Procurement Value (SGD)') // click=25    
    

    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).click() // click=20
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.estimatedProcurementValueSgd_textInput).setValue('5001') // change=21

    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.epvTbl_numberInput).click() // click=21
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.epvTbl_numberInput).setValue('5001') // change=22

    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_textInput).click() // click=24
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.wbs_textInput).setValue('A-0002322-00-00') // change=25
   

    await(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.glCode_select).selectByIndex(0)
    await (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.next_span).click() // click=26

    await expect (await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.error_div).toHaveTextContaining('GL Account is required.') // click=25    
  })


  it('should execute PrsAppPurchaseNewAorAccountAssignment_01Page', async () => {

    await(await PrsAppPurchaseNewAorAccountAssignment_Validations_Page.glCode_select).selectByIndex(1)

    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.purposeOfPurchase_text).click() // click=22
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.purposeOfPurchase_text).setValue('TestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestiTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingngTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTesting gTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingestingTestingTestingTestingTestingestingTestingTestingTestingTesting') // change=23

    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.next_span).click() // click=24
    await expect (await PrsAppPurchaseNewAorAccountAssignment_01Page.error_div).toHaveTextContaining('Purpose of Purchase is too long. Maximum length is 4000.') // click=25    
  })
})
