/*** Generated spec file ***/
const fs = require('fs')
const parse = require('csv-parser')
const PrsLoginPage = require('../../pageobjects/searchDelegateAdmin/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/searchDelegateAdmin/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/searchDelegateAdmin/PrsAppHome_01.page')
const PrsAppDelegationSearchPage = require('../../pageobjects/searchDelegateAdmin/PrsAppDelegationSearch.page')
let currentValue
var testData = {}

describe("Manage Delegate ", () => {
    
    describe("Loading data file", () => {
        fs.createReadStream('./test/data/search-delegate-data.csv')
            .pipe(parse({columns: true}))
            .on('data', function(row) {
                var desc = row["Description"]
                
                if(!testData[desc]) {
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

function _Fn(key, cases){
	describe(key, () => {
		it('should execute PrsLoginPage', async () => {
			await PrsLoginPage.open()

			await (await PrsLoginPage.loginas_textInput).click()
			await (await PrsLoginPage.loginas_textInput).setValueByKeys(cases[0]["LoginID"])
			await (await PrsLoginPage.login_button).click()
		})
	  
		if(cases[0]["Role"] != 0) {
			switch (cases[0]["Role"]) {
				case '1':
					it('should execute PrsAppSwitchrole_01Page', async () => {
						await (await PrsAppSwitchrole_01Page.nusAdministrator_textInput).click()
					})
				break;
				case '2':
					it('should execute PrsAppSwitchrole_01Page', async () => {
						await (await PrsAppSwitchrole_01Page.facultyAdministrator_textInput).click()
					})
				break;
				case '3':
					it('should execute PrsAppSwitchrole_01Page', async () => {
						await (await PrsAppSwitchrole_01Page.selectRole2_textInput).click()
					})
				break;
			}				
		}

		it('should execute PrsAppHome_01Page', async () => {
			await (await PrsAppHome_01Page.configuration_link).click()
			await (await PrsAppHome_01Page.manageDelegate_link).moveTo()
			await (await PrsAppHome_01Page.searchDelegate_link).click()
		})

		it('should execute PrsAppDelegationSearchPage to validate empty inputs', async () => {  
			await (await PrsAppDelegationSearchPage.search_button).click() 
			await expect(await PrsAppDelegationSearchPage.nusnetIdIsInvalid_li).toHaveTextContaining('Please enter a criteria to perform the search.') 
		})
		
		
		cases.forEach((dt) => {
            it(dt["Scenario"], async () => {
                //console.log(dt["Scenario"])
                //try {
					if(dt["Type"] === '1') {
						await (await PrsAppDelegationSearchPage.delegate_radioInput).click() 
						await (await PrsAppDelegationSearchPage.delegate_radioInput).click()
					}
					if(dt["Type"] === '2') {
						await (await PrsAppDelegationSearchPage.approver_radioInput).click() 
						await (await PrsAppDelegationSearchPage.approver_radioInput).click()
					}
					if(dt["NUSNETID"]) {
						await (await PrsAppDelegationSearchPage.nusnetId_textInput).click() 
						await (await PrsAppDelegationSearchPage.nusnetId_textInput).setValueByKeys(dt["NUSNETID"])
					} else {
						await (await PrsAppDelegationSearchPage.nusnetId_textInput).click() 
						await (await PrsAppDelegationSearchPage.nusnetId_textInput).setValueByKeys('')
					}
					if(dt["DurationFrom"]) {
						await (await PrsAppDelegationSearchPage.duration_textInput).click() 
						await (await PrsAppDelegationSearchPage.duration_textInput).setValueByKeys(dt["DurationFrom"])
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					} else {
						await (await PrsAppDelegationSearchPage.duration_textInput).click() 
						await (await PrsAppDelegationSearchPage.duration_textInput).setValueByKeys('')
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					}
					if(dt["DurationTo"]) {
						await (await PrsAppDelegationSearchPage.to_textInput).click() 
						await (await PrsAppDelegationSearchPage.to_textInput).setValueByKeys(dt["DurationTo"])
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					} else {
						await (await PrsAppDelegationSearchPage.to_textInput).click() 
						await (await PrsAppDelegationSearchPage.to_textInput).setValueByKeys('')
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					}
					
					await (await PrsAppDelegationSearchPage.search_button).click() 
					
					if(dt["isValidationError"]) {
						await expect(await PrsAppDelegationSearchPage.validation_error_div).toExist()
						await (await PrsAppDelegationSearchPage.validation_error_div).click()
						await (await PrsAppDelegationSearchPage.toDateIsRequired_li).click() 
						await expect(await PrsAppDelegationSearchPage.toDateIsRequired_li).toHaveTextContaining(dt["ErrorMessage"]) 
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					}
					if(dt["isNoRecordFound"]) {
						await expect(await PrsAppDelegationSearchPage.noRecordsFound_p).toExist()
						await (await PrsAppDelegationSearchPage.noRecordsFound_p).click()	
						await expect(await PrsAppDelegationSearchPage.noRecordsFound_p).toHaveTextContaining('No records found.')
					}
					if(dt["isResultFound"]) {
						await (await PrsAppDelegationSearchPage.row_count_div).click()
						await expect(await PrsAppDelegationSearchPage.row_count_div).toHaveTextContaining(dt["ResultCount"]+' rows')
						await (await PrsAppDelegationSearchPage.manageDelegateSearch_span).click()
					}
					
				//}
                
            })
        })

  })
}






 

