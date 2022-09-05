
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewSearchPage = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewSearch.page')
const PrsAppPurchaseNewSearch_01Page = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewSearch_01.page')
const PrsAppPurchaseNewItemsPage = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewItems.page')
const PrsAppPurchaseNewItems_01Page = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewItems_01.page')
const PrsAppPurchaseNewAccountAssignmentPage = require('../pageobjects/AccountAssignmentResearcher_Chemical/PrsAppPurchaseNewAccountAssignment.page')
let dataVariables = {};

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('nithila') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.newRequest_link).click() // click=3
  })

  it('should execute PrsAppPurchaseNewStartPage', async () => {
    await (await PrsAppPurchaseNewStartPage.purchaseRequestEpv5000CatalogBuy_radioInput).click() // click=4
    await (await PrsAppPurchaseNewStartPage.purchaseRequestEpv5000CatalogBuy_radioInput).click() // change=5 - radioInput
    await (await PrsAppPurchaseNewStartPage.nextbutton_button).click() // click=6
  })

  it('should execute PrsAppPurchaseNewSearchPage', async () => {
    await (await PrsAppPurchaseNewSearchPage.product_radioInput).click() // click=7
    await (await PrsAppPurchaseNewSearchPage.product_radioInput).click() // change=8 - radioInput
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).click() // click=9
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).setValueByKeys('barium nitrate') // change=10
    await (await PrsAppPurchaseNewSearchPage.chemicalsearchbutton_button).click() // click=11
  })

  it('should execute PrsAppPurchaseNewSearch_01Page', async () => {
    await (await PrsAppPurchaseNewSearch_01Page.addnewlineitem0_button).click() // click=12
    await (await PrsAppPurchaseNewSearch_01Page.nextbutton_button).click() // click=13
  })

  it('should execute PrsAppPurchaseNewItemsPage', async () => {
    await (await PrsAppPurchaseNewItemsPage.price0_textInput).click() // click=14
    await (await PrsAppPurchaseNewItemsPage.price0_textInput).setValueByKeys('10') // change=15
    await (await PrsAppPurchaseNewItemsPage.quantity_textInput).click() // click=16
    await (await PrsAppPurchaseNewItemsPage.quantity_textInput).setValueByKeys('30') // change=17
    await (await PrsAppPurchaseNewItemsPage.unit_select).selectByVisibleText('Ea') // change=18 - select
    await (await PrsAppPurchaseNewItemsPage.lineitemsupplier0_textInput).click() // click=19
    await (await PrsAppPurchaseNewItemsPage.lineitemsupplier0_textInput).setValueByKeys('1 PL')
  })

  it('should execute PrsAppPurchaseNewItems_01Page', async () => {
    await (await PrsAppPurchaseNewItems_01Page._1PlusPrivateLimited_span).click() // click=20
    await (await PrsAppPurchaseNewItems_01Page.nextbutton_button).click() // click=21
  })

  it('should execute PrsAppPurchaseNewAccountAssignmentPage', async () => {
    await browser.pause(1000);
    //await expect(await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByIndex(4)).not.toExist()
    await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 02 > 02 > BAY BH LAB') // change=22 - select
    await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 03 > 01') // change=75 - select
    await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 03 > 01 > BAY BH LAB') // change=75 - select
    await (await PrsAppPurchaseNewAccountAssignmentPage.menulogout_link).click() 
  })
})
