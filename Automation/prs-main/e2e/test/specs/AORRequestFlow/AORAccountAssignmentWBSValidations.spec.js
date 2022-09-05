
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorSearch.page')
const PrsAppPurchaseNewAorSearch_01Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorSearch_01.page')
const PrsAppPurchaseNewAorSearch_02Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorSearch_02.page')
const PrsAppPurchaseNewAorItemsPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorItems.page')
const PrsAppPurchaseNewAorAccountAssignmentPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment.page')
const PrsAppPurchaseNewAorAccountAssignment_01Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_01.page')
const PrsAppPurchaseNewAorAccountAssignment_02Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_02.page')
const PrsAppPurchaseNewAorAccountAssignment_03Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_03.page')
const PrsAppPurchaseNewAorAccountAssignment_04Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_04.page')
const PrsAppPurchaseNewAorConfirmationPage = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorConfirmation.page')
const PrsAppPurchaseNewAorAccountAssignment_05Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_05.page')
const PrsAppPurchaseNewAorAccountAssignment_06Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_06.page')
const PrsAppPurchaseNewAorAccountAssignment_07Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_07.page')
const PrsAppPurchaseNewAorAccountAssignment_08Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_08.page')
const PrsAppPurchaseNewAorAccountAssignment_09Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_09.page')
const PrsAppPurchaseNewAorAccountAssignment_10Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_10.page')
const PrsAppPurchaseNewAorAccountAssignment_11Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorAccountAssignment_11.page')
const PrsAppPurchaseNewAorConfirmation_01Page = require('../pageobjects/AORAccountAssignmentWBSValidations/PrsAppPurchaseNewAorConfirmation_01.page')
let currentValue

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.nolabel_div).click() // click=0
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
    await (await PrsAppPurchaseNewStartPage.nextbutton_button).click() // click=7
  })

  it('should execute PrsAppPurchaseNewAorSearchPage', async () => {
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).click() // click=8
    await (await PrsAppPurchaseNewAorSearchPage.chemicalName_textInput).setValue('BEN') // change=9
  })

  it('should execute PrsAppPurchaseNewAorSearch_01Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_01Page.search_span).click() // click=10
  })

  it('should execute PrsAppPurchaseNewAorSearch_02Page', async () => {
    await (await PrsAppPurchaseNewAorSearch_02Page.chemicalsearchresulttable0ActionAddBtn_button).click() // click=11
    await (await PrsAppPurchaseNewAorSearch_02Page.next_span).click() // click=12
  })

  it('should execute PrsAppPurchaseNewAorItemsPage', async () => {
    await (await PrsAppPurchaseNewAorItemsPage.physicalForm_select).selectByVisibleText('Liquid') // change=13 - select
    await (await PrsAppPurchaseNewAorItemsPage.totalQuantity_numberInput).click() // click=14
    await (await PrsAppPurchaseNewAorItemsPage.totalQuantity_numberInput).setValue('5') // change=15
    await (await PrsAppPurchaseNewAorItemsPage.chemicalquantityunit0_select).selectByVisibleText('kg') // change=16 - select
    await (await PrsAppPurchaseNewAorItemsPage.next_span).click() // click=17
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignmentPage', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.nolabel_div).click() // click=18
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD7 > 03 > 01A > LEE GLC LAB') // change=19 - select
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.estimatedProcurementValueSgd_textInput).click() // click=20
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.estimatedProcurementValueSgd_textInput).setValue('5001') // change=21
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.purposeOfPurchase_text).click() // click=22
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.purposeOfPurchase_text).setValue('Testing WBS for AOR') // change=23
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_01Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.aaWbs0_textInput).click() // click=24
    await (await PrsAppPurchaseNewAorAccountAssignment_01Page.aaWbs0_textInput).setValue('A-0002324-00-00') // change=25
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_02Page', async () => {
    await expect(await PrsAppPurchaseNewAorAccountAssignment_02Page.nolabel_li).toHaveTextContaining('WBS \'A-0002324-00-00\' is invalid.') // assertText=26
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_03Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.aaWbs0_textInput).click() // click=27
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.aaWbs0_textInput).setValue('H-558-00-000009') // change=28
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.aaLimit0_numberInput).click() // click=29
    await (await PrsAppPurchaseNewAorAccountAssignment_03Page.aaLimit0_numberInput).setValue('5001') // change=30
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_04Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_04Page.approvers_span).click() // click=31
    await (await PrsAppPurchaseNewAorAccountAssignment_04Page.approver1_select).selectByVisibleText('Please Select') // change=32 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_04Page.approver1_select).selectByVisibleText('David Gonzalez') // change=33 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_04Page.nolabel_app_aor_account_assignment).click() // click=34
    await (await PrsAppPurchaseNewAorAccountAssignment_04Page.nextbutton_button).click() // click=35
  })

  it('should execute PrsAppPurchaseNewAorConfirmationPage', async () => {
    await (await PrsAppPurchaseNewAorConfirmationPage.no_span).click() // click=36
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_05Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_05Page.nolabel_button).click() // click=37
    await (await PrsAppPurchaseNewAorAccountAssignment_05Page.aaWbs1_textInput).click() // click=38
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_06Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_06Page.aaWbs1_textInput).click() // click=39
    await (await PrsAppPurchaseNewAorAccountAssignment_06Page.aaWbs1_textInput).setValue('A-0002324-00-00') // change=40
    await (await PrsAppPurchaseNewAorAccountAssignment_06Page.aaLimit1_numberInput).click() // click=41
    await (await PrsAppPurchaseNewAorAccountAssignment_06Page.aaLimit1_numberInput).setValue('0') // change=42
    await (await PrsAppPurchaseNewAorAccountAssignment_06Page.nolabel_app_aor_account_assignment).click() // click=43
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_07Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_07Page.nolabel_app_aor_account_assignment).click() // click=44
    await (await PrsAppPurchaseNewAorAccountAssignment_07Page.next_span).click() // click=45
    await expect(await PrsAppPurchaseNewAorAccountAssignment_07Page.nolabel_li).toHaveTextContaining('Account Assignment [Line 2]: EPV must be more than 0.') // assertText=46
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_08Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_08Page.nolabel_app_aor_account_assignment).click() // click=47
    await (await PrsAppPurchaseNewAorAccountAssignment_08Page.aaLimit1_numberInput).click() // click=48
    await (await PrsAppPurchaseNewAorAccountAssignment_08Page.aaLimit1_numberInput).setValue('0.1') // change=49
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_09Page', async () => {
    await expect(await PrsAppPurchaseNewAorAccountAssignment_09Page.sgd500110_td).toExist() // assertExist=50
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.nolabel_td).click() // click=51
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.aaLimit1_numberInput).setValue('-1') // change=52
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.aaLimit0_numberInput).click() // click=53
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.aaLimit0_numberInput).setValue('5002') // change=54
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.nextbutton_button).click() // click=55
    await (await PrsAppPurchaseNewAorAccountAssignment_09Page.aaLimit1_numberInput).click() // click=56
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_10Page', async () => {
    await expect(await PrsAppPurchaseNewAorAccountAssignment_10Page.nolabel_li).toHaveTextContaining('Account Assignment [Line 2]: EPV must be more than 0.') // assertText=57
  })

  it('should execute PrsAppPurchaseNewAorAccountAssignment_11Page', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs0_textInput).click() // click=58
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs0_textInput).setValue('H-558-00-000009') // change=7
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_table).click() // click=59
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs0_textInput).click() // click=60
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_div).click() // click=61

    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaLimit0_numberInput).click() // click=53
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaLimit0_numberInput).setValue('1') // change=54


    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs1_textInput).click() // click=62
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs1_textInput).setValue('H-558-00-000009') // change=7
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_table).click() // click=63
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_tr).click() // click=64

    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaLimit1_numberInput).click() // click=53
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaLimit1_numberInput).setValue('5000') // change=54

    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.approver1_select).selectByVisibleText('David Gonzalez') // change=65 - select
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.next_span).click() // click=66
    await expect(await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_li).toHaveTextContaining('Accounts in lines 1, 2 are the same.') // assertText=67
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_app_aor_account_assignment).click() // click=68
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs1_textInput).click() // click=69
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_tr).click() // click=70
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs1_textInput).setValue('A-0002324-00-00') // change=71
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.nolabel_tr).click() // click=72
    await (await PrsAppPurchaseNewAorAccountAssignment_11Page.aaWbs1_textInput).click() // click=73
    //await (await PrsAppPurchaseNewAorAccountAssignment_11Page.laineyGuerrero_p).click() // click=74
  })
})
