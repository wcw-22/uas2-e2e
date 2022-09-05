
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/CatalogLineItemValidations/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/CatalogLineItemValidations/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewSearchPage = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewSearch.page')
const PrsAppPurchaseNewSearch_01Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewSearch_01.page')
const PrsAppPurchaseNewSearch_02Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewSearch_02.page')
const PrsAppPurchaseNewItemsPage = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewItems.page')
const PrsAppPurchaseNewItems_01Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewItems_01.page')
const PrsAppPurchaseNewItems_02Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewItems_02.page')
const PrsAppPurchaseNewSearch_03Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewSearch_03.page')
const PrsAppPurchaseNewSearch_04Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewSearch_04.page')
const PrsAppPurchaseNewItems_03Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewItems_03.page')
const PrsAppPurchaseNewItems_04Page = require('../pageobjects/CatalogLineItemValidations/PrsAppPurchaseNewItems_04.page')
let dataVariables = {};

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTBAYBH') // change=1
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
    await (await PrsAppPurchaseNewSearchPage.catalogue_radioInput).click() // click=7
    await (await PrsAppPurchaseNewSearchPage.catalogue_radioInput).click() // change=8 - radioInput
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).click() // click=9
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).setValueByKeys('BARIUM ACETATE') // change=10
    await (await PrsAppPurchaseNewSearchPage.chemicalsearchbutton_button).click() // click=11
  })

  it('should execute PrsAppPurchaseNewSearch_01Page', async () => {
    await (await PrsAppPurchaseNewSearch_01Page.addnewlineitem0_button).click() // click=12
    await (await PrsAppPurchaseNewSearch_01Page.chemicalName_textInput).click()
    await (await PrsAppPurchaseNewSearch_01Page.chemicalName_textInput).setValueByKeys('BIS-CYCLO') // change=13
    await (await PrsAppPurchaseNewSearch_01Page.chemicalsearchbutton_button).click() // click=14
  })

  it('should execute PrsAppPurchaseNewSearch_02Page', async () => {
    await (await PrsAppPurchaseNewSearch_02Page.addnewlineitem1_button).click() // click=15
    await (await PrsAppPurchaseNewSearch_02Page.nextbutton_button).click() // click=16
  })

  it('should execute PrsAppPurchaseNewItemsPage', async () => {
    await (await PrsAppPurchaseNewItemsPage.nextbutton_button).click() // click=17
  })

  it('should execute PrsAppPurchaseNewItems_01Page', async () => {
    await expect(await PrsAppPurchaseNewItems_01Page.errorMsg1_li).toHaveTextContaining('BARIUM ACETATE: Quantity is required.') // assertText=18
    await (await PrsAppPurchaseNewItems_01Page.quantity_textInput).click() // click=19
    await (await PrsAppPurchaseNewItems_01Page.quantity_textInput).setValueByKeys('5') // change=20
    await (await PrsAppPurchaseNewItems_01Page.nextbutton_button).click() // click=21
  })

  it('should execute PrsAppPurchaseNewItems_02Page', async () => {
    await expect(await PrsAppPurchaseNewItems_02Page.errorMsg3_li).toHaveTextContaining('BIS-CYCLOPENTADIENYL IRON: Unit Price is required.') // assertText=22
    await (await PrsAppPurchaseNewItems_02Page.backbutton_button).click() // click=23
  })

  it('should execute PrsAppPurchaseNewSearch_03Page', async () => {
    await (await PrsAppPurchaseNewSearch_03Page.catalogue_radioInput).click() // click=24
    await (await PrsAppPurchaseNewSearch_03Page.catalogue_radioInput).click() // change=25 - radioInput
    await (await PrsAppPurchaseNewSearch_03Page.chemicalName_textInput).click() // click=26
    await (await PrsAppPurchaseNewSearch_03Page.chemicalName_textInput).setValueByKeys('barium acetate') // change=27
    await (await PrsAppPurchaseNewSearch_03Page.chemicalsearchbutton_button).click() // click=28
  })

  it('should execute PrsAppPurchaseNewSearch_04Page', async () => {
    await (await PrsAppPurchaseNewSearch_04Page.addnewlineitem1_button).click() // click=29
    await (await PrsAppPurchaseNewSearch_04Page.nextbutton_button).click() // click=30
  })

  it('should execute PrsAppPurchaseNewItems_03Page', async () => {
    await (await PrsAppPurchaseNewItems_03Page.quantity1_textInput).click() // click=31
    await (await PrsAppPurchaseNewItems_03Page.quantity1_textInput).setValueByKeys('11') // change=32
    await (await PrsAppPurchaseNewItems_03Page.quantity2_textInput).click() // click=33
    await (await PrsAppPurchaseNewItems_03Page.quantity2_textInput).setValueByKeys('5') // change=34
    await (await PrsAppPurchaseNewItems_03Page.nextbutton_button).click() // click=35
  })

  it('should execute PrsAppPurchaseNewItems_04Page', async () => {
    await expect(await PrsAppPurchaseNewItems_04Page.errorMsg2_li).toHaveTextContaining('The remaining value for the contract EXT-CON-2021 is insufficient for your request.') // assertText=36
    await expect(await PrsAppPurchaseNewItems_04Page.errorMsg1_li).toHaveTextContaining('BIS-CYCLOPENTADIENYL IRON: Unit Price is required.') // assertText=37
    await expect(await PrsAppPurchaseNewItems_04Page._1100_span).toHaveTextContaining('SGD 1,100.00') // assertText=38
    await (await PrsAppPurchaseNewItems_04Page.quantity1_textInput).click() // click=39
    await (await PrsAppPurchaseNewItems_04Page.quantity1_textInput).setValue('')
    await (await PrsAppPurchaseNewItems_04Page.quantity1_textInput).setValueByKeys('10') // change=40
    await expect(await PrsAppPurchaseNewItems_04Page._1100_span).toHaveTextContaining('SGD 1,000.00') // assertText=41
    await (await PrsAppPurchaseNewItems_04Page.menulogout_link).click() 
  })
})
