
/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsAppHome_01.page')
const PrsAppConfigurationPeriodcontractStartPage = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsAppConfigurationPeriodcontractStart.page')
const PrsAppConfigurationPeriodcontractStart_01Page = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsAppConfigurationPeriodcontractStart_01.page')
const PrsAppConfigurationPeriodcontractStart_02Page = require('../../pageobjects/NewPeriodContractMandatoryFields/PrsAppConfigurationPeriodcontractStart_02.page')
let currentValue

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTHQ') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppSwitchrole_01Page', async () => {
    await (await PrsAppSwitchrole_01Page.catalogueAdministrator_textInput).click() // click=3
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.configuration_link).click() // click=4
    await (await PrsAppHome_01Page.managePeriodContract_link).moveTo() // click=5
    await (await PrsAppHome_01Page.newPeriodContract_link).click() // click=7
  })

  it('should validate PrsAppConfigurationPeriodcontractStartPage', async () => {
    await (await PrsAppConfigurationPeriodcontractStartPage.publish_span).click() // click=8
    await (await PrsAppConfigurationPeriodcontractStartPage.contractStatus_span).click() // click=9
  })

  it('should validate CreateNewPeriodContract_noinput', async () => {
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Start is required') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract End is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Number is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Value is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Applicable For is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10

  })
  
  it('should validate CreateNewPeriodContract_Input_1', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.contractStart_textInput).click() // click=11
    await (await PrsAppConfigurationPeriodcontractStart_01Page.contractStart_textInput).setValueByKeys('06/07/2021') // change=12
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=13
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract End is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Number is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Value is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Applicable For is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  })
  
  
  it('should validate CreateNewPeriodContract_Input_2', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.contractEnd_textInput).click() // click=14
    await (await PrsAppConfigurationPeriodcontractStart_01Page.contractEnd_textInput).setValueByKeys('02/08/2022') // change=15
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=16
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Number is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Value is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Applicable For is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  })
  
  
  it('should validate CreateNewPeriodContract_Input_3', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.contractNumber_textInput).click() // click=17
    await (await PrsAppConfigurationPeriodcontractStart_01Page.contractNumber_textInput).setValueByKeys('G-TEST-111') // change=19
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=20
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Value is required.') // assertText=10
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Applicable For is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  })
  
  it('should validate CreateNewPeriodContract_Input_4', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.contractValue_textInput).click() // click=21
    await (await PrsAppConfigurationPeriodcontractStart_01Page.contractValue_textInput).setValueByKeys('120000') // change=22
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=23
	await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Applicable For is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  })
  
  it('should validate CreateNewPeriodContract_Input_5', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.campus_label).click() // click=24
    await (await PrsAppConfigurationPeriodcontractStart_01Page.campus_radioInput).click() // click=25
    await (await PrsAppConfigurationPeriodcontractStart_01Page.campus_radioInput).click() // change=26 - radioInput
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=27
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('Contract Description is required.') // assertText=10
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  })
  
  
  it('should validate CreateNewPeriodContract_Input_6', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_01Page.contractDescription_text).click() // click=28
    await (await PrsAppConfigurationPeriodcontractStart_01Page.contractDescription_text).setValueByKeys('test contract desc') // change=29
    await (await PrsAppConfigurationPeriodcontractStart_01Page.publish_button).click() // click=30
    await expect(await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_ul).toHaveTextContaining('At least one supplier is required.') // assertText=10
  
	await (await PrsAppConfigurationPeriodcontractStart_01Page.nolabel_textInput).click() // click=31
  })
  

  it('should validate CreateNewPeriodContract_Input_7', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_textInput).click() // click=28
	await (await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_textInput).setValue('ABBOTT') // change=26
    await (await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_span).click() // click=9
    await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
  })
  
  
  it('should validate CreateNewPeriodContract_No_ContractStart', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractStart_textInput).click() // click=29
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractStart_textInput).setValue('') // change=30
    await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract Start is required')
  })
  
  it('should validate CreateNewPeriodContract_No_ContractEnd', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractStart_textInput).click()
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractStart_textInput).setValueByKeys('06/07/2021')
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_span).click()
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractEnd_textInput).click() // click=29
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractEnd_textInput).setValue('') // change=30
    await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract End is required')
  })
  
  
  
  it('should validate CreateNewPeriodContract_No_ContractNumber', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractEnd_textInput).click() // click=29
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractEnd_textInput).setValueByKeys('06/07/2022')
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_span).click()
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_textInput).click()
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_textInput).setValueByKeys('') 
    await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract Number is required')
  })
  
  
  it('should validate CreateNewPeriodContract_No_ContractValue', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_textInput).click() // click=17
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractNumber_textInput).setValueByKeys('G-TEST-111')  // change=19
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractValue_textInput).click() // click=21
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractValue_textInput).setValueByKeys('') // change=22
	 await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract Value is required')
  })
  
  
  it('should validate CreateNewPeriodContract_No_ContractDescription', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractValue_textInput).click() 
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractValue_textInput).setValueByKeys('120000') 
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractDescription_text).click()
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractDescription_text).setValueByKeys('') 
	 await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract Description is required.')

  })
  
  
  it('should validate CreateNewPeriodContract_No_ContractCategory', async () => {
	await (await PrsAppConfigurationPeriodcontractStart_02Page.contractDescription_text).click()
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractDescription_text).setValueByKeys('Test Description') 
    await (await PrsAppConfigurationPeriodcontractStart_02Page.contractCategory_select).selectByVisibleText('Please Select')
	await (await PrsAppConfigurationPeriodcontractStart_02Page.publish_button).click() // click=10
	await expect(await PrsAppConfigurationPeriodcontractStart_02Page.nolabel_ul).toHaveTextContaining('Contract Category is required.')

  })
  
  
})
