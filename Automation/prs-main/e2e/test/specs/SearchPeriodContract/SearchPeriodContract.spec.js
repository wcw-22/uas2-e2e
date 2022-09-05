
const fs = require('fs'); 
const parse = require('csv-parser');

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/SearchPeriodContract/PrsLogin.page')
const PrsAppSwitchrolePage = require('../../pageobjects/SearchPeriodContract/PrsAppSwitchrole.page')
const PrsAppHome_02Page = require('../../pageobjects/SearchPeriodContract/PrsAppHome_02.page')
const PrsAppConfigurationPeriodcontractSearchPage = require('../../pageobjects/SearchPeriodContract/PrsAppConfigurationPeriodcontractSearch.page')
const PrsAppConfigurationPeriodcontractSearch_01Page = require('../../pageobjects/SearchPeriodContract/PrsAppConfigurationPeriodcontractSearch_01.page')
let currentValue

var testData = {}

// describe("Period Contract Search", () => {
    
    // describe("Loading data file", () => {
        // fs.createReadStream('./test/SearchPeriodContract.csv')
            // .pipe(parse({columns: true}))
            // .on('data', function(row) {
                // var desc = row["SN"]
                
                // if(!testData[desc]) {
                    // //var tl = []
                    // //tl.push(row)
                    
                    // testData[desc] = [row]
                // } else {
                    // testData[desc].push(row)
                // }
            // })
            // .on('end',function() {
                // console.log("Loading file finished.")
            // });
    // });
    
    // it('should be able to pass test with all data', () => {
        // for (var key in testData) {
			// console.log(key)
            // //_Fn(key, testData[key])
        // }
    // })
// })

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTHQ') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppSwitchrolePage', async () => {
    await (await PrsAppSwitchrolePage.selectRole1_textInput).click() // click=3
  })

  it('should execute PrsAppHome_02Page', async () => {
    await (await PrsAppHome_02Page.configuration_link).click() // click=4
    await (await PrsAppHome_02Page.managePeriodContract_link).moveTo() // click=5
    await (await PrsAppHome_02Page.searchPeriodContract_link).click() // click=7
  })
  
  
  it('should validate no input', async () => {
	  await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click()
	  await expect(await PrsAppConfigurationPeriodcontractSearchPage.nolabel_ul).toHaveTextContaining('Please enter a criteria to perform the search.')
  })
  
  it('should validate ContractEndShouldNotBeEmpty', async () => {
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys('23/07/2021')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click()
	  await expect(await PrsAppConfigurationPeriodcontractSearchPage.nolabel_ul).toHaveTextContaining('Contract End should not be empty.')
  })
  
  it('should validate ContractStartShouldNotBeEmpty', async () => {
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys('')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).setValueByKeys('23/07/2021')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click()
	  await expect(await PrsAppConfigurationPeriodcontractSearchPage.nolabel_ul).toHaveTextContaining('Contract Start should not be empty.')
  })
  
  
  it('should validate ContractStartGreaterThanContractEnd', async () => {
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys('23/07/2023')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click()
	  await expect(await PrsAppConfigurationPeriodcontractSearchPage.nolabel_ul).toHaveTextContaining('Contract End is earlier than the Contract Start.')
  })
  
  it('should execute clearAll', async () => {
	  const var0 = await (await PrsAppConfigurationPeriodcontractSearchPage.all_radioInput).getValue()
	  console.log("All radio1" + var0)
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).setValueByKeys('SIT-TEST-1')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).setValueByKeys('test contract')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).click() 
	  await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).setValueByKeys('12') 
	  await (await PrsAppConfigurationPeriodcontractSearchPage._13463677_span).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys('AMETAZOLE')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).setValueByKeys('01')
	  await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_label).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=30
      await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).setValueByKeys('123') 
	  await (await PrsAppConfigurationPeriodcontractSearchPage.contractCategory_select).selectByVisibleText('Solvent')
	  await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click()
	  await (await PrsAppConfigurationPeriodcontractSearchPage.clearAll_span).click()
	  
	  //onst var1 = await (await PrsAppConfigurationPeriodcontractSearchPage.all_radioInput).getValue()
	  //console.log("All radio2" + var0)
	  
	  await expect(await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).toHaveTextContaining('Please Select')
  })
  
  
  
  
  

  // it('should execute PrsAppConfigurationPeriodcontractSearchPage', async () => {
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=8
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).click() // click=9
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).setValueByKeys('SIT-TEST-1') // change=10
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=11
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).click() // click=12
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).setValueByKeys('test contract') // change=13
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_div).click() // click=14
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).setValueByKeys('') // change=15
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=16
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click() // click=17
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys('23/07/2021') // change=18
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).click() // click=19
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).setValueByKeys('23/08/2022') // change=20
    // await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).click() // click=21
    // await (await PrsAppConfigurationPeriodcontractSearchPage._13463677_span).click() // click=22
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).click() // click=23
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys('METHYL') // change=24
    // await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click() // click=25
    // await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_label).click() // click=26
    // await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_checkboxInput).click() // click=27
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_span).click() // click=28
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=29
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=30
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).setValueByKeys('123') // change=31
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractCategory_select).selectByVisibleText('Solvent') // change=32 - select
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=33
    // await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click() // click=34
    // await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click() // change=35 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // click=36
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // change=37 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_label).click() // click=38
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // click=39
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // change=40 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.unpublished_radioInput).click() // click=41
    // await (await PrsAppConfigurationPeriodcontractSearchPage.unpublished_radioInput).click() // change=42 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // click=43
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // change=44 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // click=45
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // change=46 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.clearAll_span).click() // click=47
    // await (await PrsAppConfigurationPeriodcontractSearchPage.clearAll_span).click() // click=48
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractreset_button).click() // click=49
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractreset_button).click() // click=50
    // await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click() // click=51
    // await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectClearall_button).click() // click=52
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=53
    // await (await PrsAppConfigurationPeriodcontractSearchPage.nolabel_ul).click() // click=54
  // })

  // it('should execute PrsAppConfigurationPeriodcontractSearch_01Page', async () => {
    // await (await PrsAppConfigurationPeriodcontractSearch_01Page.nolabel_ul).click() // click=55
  // })
})
