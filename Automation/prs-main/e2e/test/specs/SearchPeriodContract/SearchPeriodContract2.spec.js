const fs = require('fs'); 
const parse = require('csv-parser');
var assert = require('assert')

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/SearchPeriodContract2/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/SearchPeriodContract2/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/SearchPeriodContract2/PrsAppHome_01.page')
const PrsAppConfigurationPeriodcontractSearchPage = require('../../pageobjects/SearchPeriodContract2/PrsAppConfigurationPeriodcontractSearch.page')
let dataVariables = {};

var testData = {}

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTHQ') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppSwitchrole_01Page', async () => {
    await (await PrsAppSwitchrole_01Page.selectRole1_textInput).click() // click=3
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.configuration_link).click() // click=4
    await (await PrsAppHome_01Page.managePeriodContract_link).moveTo() // click=5
    await (await PrsAppHome_01Page.searchPeriodContract_link).click() // click=7
  })
})

describe("Period Contract Search", () => {
    
    describe("Loading data file", () => {
        fs.createReadStream('./test/specs/SearchPeriodContract/SearchPeriodContract.csv')
            .pipe(parse({columns: true}))
            .on('data', function(row) {
                var desc = row["SN"]
                
                if(!testData[desc]) {
                    //var tl = []
                    //tl.push(row)
                    
                    testData[desc] = [row]
                } else {
                    testData[desc].push(row)
                }
            })
            .on('end',function() {
                console.log("Loading file finished.")
            });
    });
    
    it('should be able to pass test with all data', () => {
        for (var key in testData) {
            _Fn(key, testData[key])
        }
    })
})

function _Fn(key, cases) {
	var row = cases[0]
	
	describe(key, () => {
		
		var ContractNumber = row["ContractNumber"]
		var ContractDescription = row["ContractDescription"]
		var ContractStart = row["ContractStart"]
		var ContractEnd = row["ContractEnd"]
		var CASNumber = row["CASNumber"]
		var ChemicalName = row["ChemicalName"]
		var Supplier = row["Supplier"]
		var SupplierPartNumber = row["SupplierPartNumber"]
		var ContractCategory = row["ContractCategory"]
		var ContractStatus = row["ContractStatus"]
		var ExpectedRowCount = row["ExpectedRowCount"]
		
		
		it('executing case '+key, async () => {
			
			await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractreset_button).click()
			const supListClr = await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).getText()
			if (supListClr != "Please Select") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectClearall_button).click() 
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
			}
			
			if (ContractNumber != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).setValueByKeys(ContractNumber)
			}
			
			if (ContractDescription != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).setValueByKeys(ContractDescription)
			}
			
			if (ContractStart != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys(ContractStart)
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
			}
			
			if (ContractEnd != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).setValueByKeys(ContractEnd)
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
			}
			
			if (CASNumber != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).click() 
				await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).setValueByKeys(CASNumber) 
				await (await PrsAppConfigurationPeriodcontractSearchPage._13463677_span).click()
			}
			
			if (ChemicalName != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).click()
				await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys(ChemicalName)
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
			}
			
			if (Supplier != "") {
				var supList = Supplier.split(",")
				if (supList == null || supList.length <= 1) {
					await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click()
					await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).click()
					await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).setValueByKeys(Supplier)
					await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_label).click()
					await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
					
				} else {
					for (let i=0; i<supList.length; i++) {
						await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click()
						await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).click()
						await (await PrsAppConfigurationPeriodcontractSearchPage.filtertext_textInput).setValueByKeys(supList[i])
						await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_label).click()
						await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
					}
				}
			}
			
			if (SupplierPartNumber != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=30
				await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).setValueByKeys(SupplierPartNumber) 
			}
			
			if (ContractCategory != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.contractCategory_select).selectByVisibleText(ContractCategory)
			}
			
			if (SupplierPartNumber != "") {
				await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=30
				await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).setValueByKeys(SupplierPartNumber) 
			}
			
			if (ContractStatus != "") {
				switch (ContractStatus) {
					case "Defunct":
						await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click()
						break;
					case "Draft":
						await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click()
						break;
					case "Published":
						await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click()
						break;
					case "Unpublished":
						await (await PrsAppConfigurationPeriodcontractSearchPage.unpublished_radioInput).click()
						break;
				}			
			}
 	  
			await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click()
			
			if (ExpectedRowCount != "") {
				if (ExpectedRowCount == "0") {
					await expect(await PrsAppConfigurationPeriodcontractSearchPage.nolabel_label).not.toExist()
				} else {
					var var1 = await (await PrsAppConfigurationPeriodcontractSearchPage.nolabel_label).getText()
					var lines = var1.split("\n")
					var tmp = (lines[lines.length - 1]).split(" ")
					var rowCount = tmp[tmp.length - 2]
					console.log(rowCount)
					expect(rowCount).toEqual(ExpectedRowCount)
				}
			}
			
			
			
		})
		
		
		
		//clearSearch()
	})
}

// function clearSearch() {
	// describe('clear search', () => {
		
		// it('clear search', async () => {
			// await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractreset_button).click()
			// const supList = await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).getText()
			// if (supList != "Please Select") {
				// await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click()
				// await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectClearall_button).click() 
				// await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click()
			// }
			
		// })
	
	// })
// }

// describe('Laboratory Materials Purchase Requisition System', () => {
  // it('should execute PrsLoginPage', async () => {
    // await PrsLoginPage.open()

    // await (await PrsLoginPage.loginas_textInput).click() // click=0
    // await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTHQ') // change=1
    // await (await PrsLoginPage.login_button).click() // click=2
  // })

  // it('should execute PrsAppSwitchrole_01Page', async () => {
    // await (await PrsAppSwitchrole_01Page.selectRole1_textInput).click() // click=3
  // })

  // it('should execute PrsAppHome_01Page', async () => {
    // await (await PrsAppHome_01Page.configuration_link).click() // click=4
    // await (await PrsAppHome_01Page.managePeriodContract_link).click() // click=5
    // await (await PrsAppHome_01Page.configuration_link).click() // click=6
    // await (await PrsAppHome_01Page.searchPeriodContract_link).click() // click=7
  // })

  // it('should execute PrsAppConfigurationPeriodcontractSearchPage', async () => {
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).click() // click=8
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractnumber_textInput).setValueByKeys('SIT-TEST-1') // change=9
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click() // click=10
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).click() // click=11
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractDescription_textInput).setValueByKeys('test contract') // change=12
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).click() // click=13
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractStart_textInput).setValueByKeys('23/07/2021') // change=14
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).click() // click=15
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractEnd_textInput).setValueByKeys('23/08/2022') // change=16
    // await (await PrsAppConfigurationPeriodcontractSearchPage.casnumber_textInput).click() // click=17
    // await (await PrsAppConfigurationPeriodcontractSearchPage._13463677_span).click() // click=18
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).click() // click=19
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys('METHYL') // change=20
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_div).click() // click=21
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys('') // change=22
    // await (await PrsAppConfigurationPeriodcontractSearchPage.chemicalName_textInput).setValueByKeys('AMETAZOLE') // change=23
    // await (await PrsAppConfigurationPeriodcontractSearchPage.suppliersselectTrigger_button).click() // click=24
    // await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_label).click() // click=25
    // await (await PrsAppConfigurationPeriodcontractSearchPage._01ComputerSystemPteLtd_checkboxInput).click() // click=26
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractNumber_span).click() // click=27
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).click() // click=28
    // await (await PrsAppConfigurationPeriodcontractSearchPage.supplierPartNumber_textInput).setValueByKeys('9876') // change=29
    // await (await PrsAppConfigurationPeriodcontractSearchPage.contractCategory_select).selectByVisibleText('Solvent') // change=30 - select
    // await (await PrsAppConfigurationPeriodcontractSearchPage.all_radioInput).click() // click=31
    // await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click() // click=32
    // await (await PrsAppConfigurationPeriodcontractSearchPage.defunct_radioInput).click() // change=33 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // click=34
    // await (await PrsAppConfigurationPeriodcontractSearchPage.draft_radioInput).click() // change=35 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // click=36
    // await (await PrsAppConfigurationPeriodcontractSearchPage.published_radioInput).click() // change=37 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.unpublished_radioInput).click() // click=38
    // await (await PrsAppConfigurationPeriodcontractSearchPage.unpublished_radioInput).click() // change=39 - radioInput
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractsearch_button).click() // click=40
    // await (await PrsAppConfigurationPeriodcontractSearchPage.periodcontractreset_button).click() // click=41
  // })
// })
