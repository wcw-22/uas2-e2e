
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/Prs_AORLineItems_Validation/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppHome_01.page')
const PrsAppPurchaseNewStart = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchChemical = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearchChemical')
const PrsAppPurchaseNewAorSearchChemical01 = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearchChemical01')
const PrsAppPurchaseNewAorSearchChemical02 = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearchChemical02')
const PrsAppPurchaseNewAorItems_DeleteLineItem = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorItems_DeleteLineItem.page')
const PrsAppPurchaseNewAorSearch_Biological = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearch_Biological.page')
const PrsAppPurchaseNewAorSearch_Biological01 = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearch_Biological01')
const PrsAppPurchaseNewAorItems_Load = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorItems_Load.page')
const PrsAppPurchaseNewAorItems_Validations = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorItems_Validations.page')
const PrsAppPurchaseNewAorItems_Validations01 = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorItems_Validations01.page')
const PrsAppPurchaseNewAorSearch_RadioPage = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearch_Radio.page')
const PrsAppPurchaseNewAorSearch_RadioAddPage =  require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorSearchChemical02')
const PrsAppPurchaseNewAorAccountAssignmentPage = require('../pageobjects/Prs_AORLineItems_Validation/PrsAppPurchaseNewAorAccountAssignment.page')
describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValue('BCHLEEC') // change=1 - else textInput
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.newRequest_link).click() // click=3
  })

  it('should execute PrsAppPurchaseNewStart', async () => {
    await (await PrsAppPurchaseNewStart.approvalOfRequirementEpv5000_radioInput).click() // click=4
    await (await PrsAppPurchaseNewStart.approvalOfRequirementEpv5000_radioInput).click() // change=5 - radioInput
    await (await PrsAppPurchaseNewStart.next_span).click() // click=6
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical.chemicalName_textInput).click() // click=7
    await (await PrsAppPurchaseNewAorSearchChemical.chemicalName_textInput).setValue('BEN') // change=8 - else textInput
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical01', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical01.search_button).click() // click=9
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical02', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical02.add_button).click() // click=10
    await (await PrsAppPurchaseNewAorSearchChemical02.next_span).click() // click=11
  })

  it('should execute PrsAppPurchaseNewAorItems_DeleteLineItem', async () => {
    await (await PrsAppPurchaseNewAorItems_DeleteLineItem.nolabel_span).click() // click=48
    await (await PrsAppPurchaseNewAorItems_DeleteLineItem.deleteLineItem).click() // click=49
    await (await PrsAppPurchaseNewAorItems_DeleteLineItem.next_button).click() // click=19
  })

  it('should execute PrsAppPurchaseNewAorItems_DeleteLineItem', async () => {
    await (await PrsAppPurchaseNewAorItems_DeleteLineItem.back_span).click() // click=12
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical.chemicalName_textInput).click() // click=7
    await (await PrsAppPurchaseNewAorSearchChemical.chemicalName_textInput).setValue('BEN') // change=8 - else textInput
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical01', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical01.search_button).click() // click=9
  })

  it('should execute PrsAppPurchaseNewAorSearchChemical02', async () => {
    await (await PrsAppPurchaseNewAorSearchChemical02.add_button).click() // click=10
    await (await PrsAppPurchaseNewAorSearchChemical02.next_span).click() // click=11
  })

  it('should execute PrsAppPurchaseNewAorItems_DeleteLineItem', async () => {
    await (await PrsAppPurchaseNewAorItems_DeleteLineItem.back_span).click() // click=12
  })

  it('should execute PrsAppPurchaseNewAorSearch_Biological', async () => {
    await (await PrsAppPurchaseNewAorSearch_Biological.biological_link).click() // click=13
    await (await PrsAppPurchaseNewAorSearch_Biological.category_select).selectByVisibleText('Arthropods') // change=14 - select
    await (await PrsAppPurchaseNewAorSearch_Biological.biologicalType_select).selectByVisibleText('Fly') // change=15 - select
    await (await PrsAppPurchaseNewAorSearch_Biological.search_span).click() // click=16
  })

  it('should execute PrsAppPurchaseNewAorSearch_Biological01', async () => {
    await (await PrsAppPurchaseNewAorSearch_Biological01.add_button).click() // click=17
    //await (await PrsAppPurchaseNewAorSearch_Biological01.next_span).click() // click=18
  })

  it('should execute PrsAppPurchaseNewAorSearch_RadioPage', async () => {
    await (await PrsAppPurchaseNewAorSearch_RadioPage.radioactive_link).click() // click=6
    await (await PrsAppPurchaseNewAorSearch_RadioPage.radionuclideS_textInput).click() // click=7
    await (await PrsAppPurchaseNewAorSearch_RadioPage.radionuclideS_textInput).setValue('C-14') // change=8 - else textInput
    await (await PrsAppPurchaseNewAorSearch_RadioPage.search_button).click() // click=9
  })

  it('should execute PrsAppPurchaseNewAorSearch_RadioAddPage', async () => {
    await (await PrsAppPurchaseNewAorSearch_RadioAddPage.nolabel_app_aor_search).click() // click=10
    await (await PrsAppPurchaseNewAorSearch_RadioAddPage.add_button).click() // click=11
    await (await PrsAppPurchaseNewAorSearch_RadioAddPage.next_span).click() // click=12
  })


  it('should execute PrsAppPurchaseNewAorItems_Load', async () => {
    await (await PrsAppPurchaseNewAorItems_Load.next_button).click() // click=19
  })

  it('should execute PrsAppPurchaseNewAorItems_Validations', async () => {
  
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Physical Form is required.') // assertText=21
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Unit of Measure is required.') // assertText=22
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Quantity is required.') // assertText=23
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Unit of Measure is required.') // assertText=24
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Quantity is required.') // assertText=25


    //Assert Negative Values for Total Quantity
    await (await PrsAppPurchaseNewAorItems_Validations.selectChemPhysicalForm).selectByVisibleText('Gas') // change=25 - select
    await (await PrsAppPurchaseNewAorItems_Validations.selectChemTotalQty).click() // click=26
    await (await PrsAppPurchaseNewAorItems_Validations.selectChemTotalQty).setValue('-111') // change=27 - else numberInput
    await (await PrsAppPurchaseNewAorItems_Validations.selectChemUOM).selectByVisibleText('m3') // change=28 - select
    await (await PrsAppPurchaseNewAorItems_Validations.selectRadioSourceType).selectByVisibleText('SEALED') // change=29 - select
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioTotalQty).click() // click=30
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioTotalQty).setValue('-11') // change=31 - else numberInput
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioActivity).click() // click=32
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioActivity).setValue('5') // change=33 - else textInput
    await (await PrsAppPurchaseNewAorItems_Validations.selectRadioActivityUOM).selectByVisibleText('Bq') // change=34 - select
    await (await PrsAppPurchaseNewAorItems_Validations.txtBioQty).click() // click=35
    await (await PrsAppPurchaseNewAorItems_Validations.txtBioQty).setValue('-1') // change=36 - else numberInput
    await (await PrsAppPurchaseNewAorItems_Validations.selectBioUOM).selectByVisibleText('EA') // change=37 - select
    await (await PrsAppPurchaseNewAorItems_Validations.next_span).click() // click=38


    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('Quantity must be more than 0.') // assertText=21
    //await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('C-14: Quantity must be more than 0.') // assertText=22
    //await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining('CHRYSOMYA RUFIFACIES: Quantity must be more than 0.') // assertText=23

    await (await PrsAppPurchaseNewAorItems_Validations.selectChemTotalQty).setValue('111') // change=27 - else numberInput
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioTotalQty).setValue('11')
    await (await PrsAppPurchaseNewAorItems_Validations.txtBioQty).setValue('1')

    //Assert Negative Values for Radio Activity
    await (await PrsAppPurchaseNewAorItems_Validations.txtRadioActivity).setValue('-5')
    await (await PrsAppPurchaseNewAorItems_Validations.next_span).click() // click=38
    
    await expect (await PrsAppPurchaseNewAorItems_Validations.div_error).toHaveTextContaining(' Activity for C-14 must be more than 0.') // assertText=21
   

    await (await PrsAppPurchaseNewAorItems_Validations.scientificNotation_radioInput).click() // click=23
    await (await PrsAppPurchaseNewAorItems_Validations.scientificNotation_radioInput).click() // change=24 - radioIn


   })

    it('should execute PrsAppPurchaseNewAorItems_Validations01', async () => {
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificCoefActivity00_textInput).click() // click=20
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificCoefActivity00_textInput).setValue('-55') // change=21
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificExponentActivity00_textInput).click() // click=22
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificExponentActivity00_textInput).setValue('5') // change=23
      await (await PrsAppPurchaseNewAorItems_Validations01.nolabel_div).click() // click=24
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeUnitActivity00_select).selectByVisibleText('Bq') // change=25 - select
      await (await PrsAppPurchaseNewAorItems_Validations01.nextbutton_button).click() // click=26
      
      await expect (await PrsAppPurchaseNewAorItems_Validations01.div_error).toHaveTextContaining(' Activity for C-14 must be more than 0.') // assertText=21


      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificCoefActivity00_textInput).click()  // change=28 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificCoefActivity00_textInput).setValue('0.000000000000000000000000000000000007') // change=28 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificExponentActivity00_textInput).click() // click=29
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeScientificExponentActivity00_textInput).setValue('5') // change=30 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.notationtypeUnitActivity00_select).selectByVisibleText('Bq') // change=25 - select
      await (await PrsAppPurchaseNewAorItems_Validations01.nextbutton_button).click() // click=32
  
      await expect (await PrsAppPurchaseNewAorItems_Validations01.div_error).toHaveTextContaining(' Activity Co-Efficient Should not have more than 3 decimal places.') // assertText=21
  
  
      await (await PrsAppPurchaseNewAorItems_Validations01.txtRadioActivityCoeff).click()  // change=28 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.txtRadioActivityCoeff).setValue('55') // change=28 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.txtRadioActivityExponent).click() // click=29
      await (await PrsAppPurchaseNewAorItems_Validations01.txtRadioActivityExponent).setValue('5') // change=30 - else textInput
      await (await PrsAppPurchaseNewAorItems_Validations01.next_span).click() // click=3
    })

  it('should execute PrsAppPurchaseNewAorAccountAssignmentPage', async () => {
    await (await PrsAppPurchaseNewAorAccountAssignmentPage.back_button).click() // click=47
  })

 
 
})
