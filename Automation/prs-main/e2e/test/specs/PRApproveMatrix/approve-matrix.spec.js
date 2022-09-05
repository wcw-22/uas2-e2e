/*** Generated spec file ***/
const fs = require('fs')
const parse = require('csv-parse')

const PrsLoginPage = require('../../pageobjects/PRApproveMatrix/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/PRApproveMatrix/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/PRApproveMatrix/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../../pageobjects/PRApproveMatrix/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewSearchPage = require('../../pageobjects/PRApproveMatrix/PrsAppPurchaseNewSearch.page')
const PrsAppPurchaseNewItemsPage = require('../../pageobjects/PRApproveMatrix/PrsAppPurchaseNewItems.page')
const PrsAppPurchaseNewAccountAssignmentPage = require('../../pageobjects/PRApproveMatrix/PrsAppPurchaseNewAccountAssignment.page')

var testData = {}

describe("Approve Matrix", () => {
    
    describe("Loading data file", () => {
        fs.createReadStream('./test/data/approve-matrix-data.csv')
            .pipe(parse({columns: true}))
            .on('data', function(row) {
                var desc = row["Description"]
                
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



function _Fn(key, cases){
    describe(key, () => {
        // login page
        it("should execute PrsLoginPage", async () => {
            console.log("processing for suit " + key)
            
            await PrsLoginPage.open()

            await (await PrsLoginPage.loginas_textInput).click()
            await (await PrsLoginPage.loginas_textInput).setValue(cases[0]["LoginID"])
            await (await PrsLoginPage.login_button).click()
        })
        
        // if need switch role
        if(cases[0]["SwitchRole"] != 0) {
            switch (cases[0]["SwitchRole"]) {
                case '1':
                    it('should execute PrsAppSwitchrole_01Page', async () => {
                        await (await PrsAppSwitchrole_01Page.switchRole_1).click()
                    })
                    break;
                case '2':
                    it('should execute PrsAppSwitchrole_01Page', async () => {
                        await (await PrsAppSwitchrole_01Page.switchRole_2).click()
                    })
                    break;
                case '3':
                    it('should execute PrsAppSwitchrole_01Page', async () => {
                        await (await PrsAppSwitchrole_01Page.switchRole_3).click()
                    })
                    break;
                case '4':
                    it('should execute PrsAppSwitchrole_01Page', async () => {
                        await (await PrsAppSwitchrole_01Page.switchRole_4).click()
                    })
                    break;
            }
                    
        }
        
        it('should execute PrsAppHome_01Page', async () => {
            await (await PrsAppHome_01Page.newRequest_link).click()
        })
        
        it('should execute PrsAppPurchaseNewStartPage', async () => {
            await (await PrsAppPurchaseNewStartPage.purchaseRequestEpv5000CatalogBuy_radioInput).click()
            await (await PrsAppPurchaseNewStartPage.purchaseRequestEpv5000CatalogBuy_radioInput).click()
            await (await PrsAppPurchaseNewStartPage.next_button).click()
        })

        it('should execute PrsAppPurchaseNewSearchPage', async () => {
            await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).click()
            await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).setValue(cases[0]["ChemicalName"])
            await (await PrsAppPurchaseNewSearchPage.search_button).click()
            await (await PrsAppPurchaseNewSearchPage.add_button).click()
            await (await PrsAppPurchaseNewSearchPage.next_button).click()
        })

        it('should execute PrsAppPurchaseNewItemsPage', async () => {
            // set delegator
            if (cases[0]["Delegator"]) {
                await (await PrsAppPurchaseNewItemsPage.onBehalfOf_select).selectByVisibleText(cases[0]["Delegator"])
            }
            
            await (await PrsAppPurchaseNewItemsPage.physical_select).selectByVisibleText(cases[0]["PhysicalForm"])
            await (await PrsAppPurchaseNewItemsPage.grade_select).selectByVisibleText(cases[0]["Grade"])
            await (await PrsAppPurchaseNewItemsPage.supplier_textInput).click()
            await (await PrsAppPurchaseNewItemsPage.supplier_textInput).setValue(cases[0]["Supplier"])
            await (await PrsAppPurchaseNewItemsPage._01ComputerSystemPteLtd_span).click()
            await (await PrsAppPurchaseNewItemsPage.package_numberInput).click()
            await (await PrsAppPurchaseNewItemsPage.package_numberInput).setValue(cases[0]["Packaging"])
            await (await PrsAppPurchaseNewItemsPage.package_unit_select).selectByVisibleText(cases[0]["PackagingUnit"])
            await (await PrsAppPurchaseNewItemsPage.nolabel_textInput).click()
            await (await PrsAppPurchaseNewItemsPage.nolabel_span).click()
            await (await PrsAppPurchaseNewItemsPage.price0_textInput).click()
            await (await PrsAppPurchaseNewItemsPage.price0_textInput).setValue(cases[0]["UnitPrice"])
            await (await PrsAppPurchaseNewItemsPage.quantity_textInput).click()
            await (await PrsAppPurchaseNewItemsPage.quantity_textInput).setValue(cases[0]["Quantity"])
            await (await PrsAppPurchaseNewItemsPage.unit_select).selectByVisibleText(cases[0]["Unit"])
            await (await PrsAppPurchaseNewItemsPage.next_button).click()
        })
        
        cases.forEach((dt) => {
            try {
                it(dt["Senario"], async (done) => {
                    console.log(dt["Senario"])
                
                    await browser.waitUntil( async () => {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText(dt["Location"])
                        return true
                    }, 5000, 'expected page loaded after 5s')
                    
                    await (await PrsAppPurchaseNewAccountAssignmentPage.inventoryOwner_select).selectByVisibleText(dt["Owner"])
                    await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).click()
                    
                    if(dt["GLAccount"]) {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.glAccount_select).selectByVisibleText(dt["GLAccount"])
                    }
                    
                    // enter wbs account
                    if(dt["A"]) {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValue(dt["A"])
                        
                        if(dt["E"] && dt["H"]) {
                            // click add button
                            if(!(await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput.isExisting())) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.nolabel_button).click()
                            }
                            
                            if(!(await PrsAppPurchaseNewAccountAssignmentPage.wbs2_textInput.isExisting())) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.nolabel_button).click()
                            }
                            
                            await (await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput).setValue(dt["E"])
                            await (await PrsAppPurchaseNewAccountAssignmentPage.wbs2_textInput).setValue(dt["H"])
                        } else {
                            // click add button
                            if(dt["E"] || dt["H"]) {
                                if(!(await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput.isExisting())) {
                                    await (await PrsAppPurchaseNewAccountAssignmentPage.nolabel_button).click()
                                }
                            }
                            
                            if(dt["E"]) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput).setValue(dt["E"])
                            }
                            if(dt["H"]) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput).setValue(dt["H"])
                            }
                        }
                    } else {
                        if(dt["E"] && dt["H"]) {
                            await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValue(dt["E"])
                            
                            if(!(await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput.isExisting())) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.nolabel_button).click()
                            }
                            
                            await (await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput).setValue(dt["H"])
                        } else {
                            if(dt["E"]) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValue(dt["E"])
                            }
                            
                            if(dt["H"]) {
                                await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValue(dt["H"])
                            }
                        }
                    }
                    
                    if(dt["ApproverType"] === 'label') {
                        await expect(await PrsAppPurchaseNewAccountAssignmentPage.approver1_label).toHaveTextContaining(dt["Approver1"]).then(done)
                    }
                    
                    if(dt["ApproverType"] === 'select') {
                        await expect(await PrsAppPurchaseNewAccountAssignmentPage.approver1_select).toHaveTextContaining(dt["Approver1"]).then(done)
                    }
                    
                    if(dt["Approver2"]) {
                        await expect(await PrsAppPurchaseNewAccountAssignmentPage.approver2_select).toHaveTextContaining(dt["Approver2"]).then(done)
                    }
                    
                    if(dt["ErrorInfo"]) {
                        await expect(await PrsAppPurchaseNewAccountAssignmentPage.error_info).toHaveTextContaining(dt["ErrorInfo"]).then(done)
                    }
                    
                    // clean wbs account info
                    if(await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput.isExisting()) {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).clearValue()
                    }
                    
                    if(await PrsAppPurchaseNewAccountAssignmentPage.wbs2_textInput.isExisting()) {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.remove_wbs1_button).click()
                    }
                    if(await PrsAppPurchaseNewAccountAssignmentPage.wbs1_textInput.isExisting()) {
                        await (await PrsAppPurchaseNewAccountAssignmentPage.remove_wbs1_button).click()
                    }
                
                })
            } catch(error) {
                console.log(error)
            }
        })
        
    })
}





 

