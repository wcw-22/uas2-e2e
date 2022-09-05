
/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/NewPeriodContractValidations/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/NewPeriodContractValidations/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/NewPeriodContractValidations/PrsAppHome_01.page')
const NewPeriodContract_ContractStart_ContractEndPage = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_ContractStart_ContractEnd.page')
const NewPeriodContract_ContractNumberPage = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_ContractNumber.page')
const NewPeriodContract_ContractDescriptionPage = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_ContractDescription.page')
const NewPeriodContract_ContractValuePage = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_ContractValue.page')
const NewPeriodContract_EmailPage = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_Email.page')
const NewPeriodContract_Success1Page = require('../../pageobjects/NewPeriodContractValidations/NewPeriodContract_Success1.page')
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

  it('should execute NewPeriodContract_ContractStart_ContractEndPage', async () => {
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractStart_textInput).click() // click=8
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractStart_textInput).setValueByKeys('17/05/2022') // change=9
	await (await NewPeriodContract_ContractStart_ContractEndPage.contractNumber_span).click()
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractEnd_textInput).click() // click=10
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractEnd_textInput).setValueByKeys('02/08/2021') // change=11
	await (await NewPeriodContract_ContractStart_ContractEndPage.contractNumber_span).click()
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractNumber_textInput).click() // click=12
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractNumber_textInput).setValueByKeys('G-TEST') // change=13
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractValue_textInput).click() // click=14
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractValue_textInput).setValueByKeys('120000') // change=15
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractDescription_text).click() // click=16
    await (await NewPeriodContract_ContractStart_ContractEndPage.contractDescription_text).setValueByKeys('Test') // change=17
    await (await NewPeriodContract_ContractStart_ContractEndPage.nolabel_textInput).click() // click=18
	await (await NewPeriodContract_ContractStart_ContractEndPage.nolabel_textInput).setValue('ABBOTT')
    await (await NewPeriodContract_ContractStart_ContractEndPage.nolabel_span).click() // click=19
    await (await NewPeriodContract_ContractStart_ContractEndPage.campus_radioInput).click() 
    await (await NewPeriodContract_ContractStart_ContractEndPage.publish_button).click() // click=22
	await expect(await NewPeriodContract_ContractStart_ContractEndPage.nolabel_ul).toHaveTextContaining('Contract End is earlier than the Contract Start.')
  })

  it('should execute NewPeriodContract_ContractNumberPage', async () => {
    await (await NewPeriodContract_ContractNumberPage.contractStart_textInput).click() // click=23
    await (await NewPeriodContract_ContractNumberPage.contractStart_textInput).setValueByKeys('01/07/2021') // change=24
	await (await NewPeriodContract_ContractNumberPage.contractNumber_span).click()
    await (await NewPeriodContract_ContractNumberPage.contractEnd_textInput).click() // click=25
    await (await NewPeriodContract_ContractNumberPage.contractEnd_textInput).setValueByKeys('02/08/2022') // change=26
	await (await NewPeriodContract_ContractNumberPage.contractNumber_span).click()
    await (await NewPeriodContract_ContractNumberPage.contractNumber_textInput).click() // click=27
    await (await NewPeriodContract_ContractNumberPage.contractNumber_textInput).setValueByKeys('123456789012345678901') // change=28
    await (await NewPeriodContract_ContractNumberPage.publish_button).click() // click=29
	await expect(await NewPeriodContract_ContractNumberPage.nolabel_ul).toHaveTextContaining('Contract Number is too long. Maximum length is 20.')
    await (await NewPeriodContract_ContractNumberPage.others_radioInput).click() // click=30
	await (await NewPeriodContract_ContractNumberPage.contractNumber_textInput).setValueByKeys('') // change=33
	//setTimeout(function(){ alert("Hello"); }, 3000);
	await (await NewPeriodContract_ContractNumberPage.contractNumber_span).click()
    await (await NewPeriodContract_ContractNumberPage.contractNumber_textInput).setValueByKeys('G-TEST-2') // change=33
    await (await NewPeriodContract_ContractNumberPage.publish_button).click() // click=34
	await expect(await NewPeriodContract_ContractNumberPage.nolabel_ul).toHaveTextContaining('Contract Number is already in use by another Period Contract.')
  })

  it('should execute NewPeriodContract_ContractDescriptionPage', async () => {
    await (await NewPeriodContract_ContractDescriptionPage.contractDescription_div).click() // click=35
    await (await NewPeriodContract_ContractDescriptionPage.contractDescription_text).click() // click=36
    await (await NewPeriodContract_ContractDescriptionPage.contractDescription_text).setValueByKeys('Description is the fiction-writing mode for transmitting a mental image of the particulars of a story. Description is the fiction-writing mode for transmitting a mental image of the particulars of a story. Description is the fiction-writing mode for transmitting a mental image of the particulars of a story') // change=37
    await (await NewPeriodContract_ContractDescriptionPage.publish_button).click() // click=38
	await expect(await NewPeriodContract_ContractDescriptionPage.nolabel_ul).toHaveTextContaining('Contract Description is too long. Maximum length is 255.')
  })

  
  
    it('should execute NewPeriodContract_EmailPage', async () => {
	await (await NewPeriodContract_ContractValuePage.contractValue_textInput).click()
	await (await NewPeriodContract_ContractValuePage.contractValue_textInput).setValueByKeys('100000')
    await (await NewPeriodContract_EmailPage.recipientsForEmailReminderNusnet_textInput).click() // click=20
    await (await NewPeriodContract_EmailPage.recipientsForEmailReminderNusnet_textInput).setValueByKeys('ABC')
	await (await NewPeriodContract_EmailPage.publish_button).click()
	await expect(await NewPeriodContract_EmailPage.nolabel_ul).toHaveTextContaining('Recipients for email reminder contains an invalid NUSNET id.')
  })
  
  
})
