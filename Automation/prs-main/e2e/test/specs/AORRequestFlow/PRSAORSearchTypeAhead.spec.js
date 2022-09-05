
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/PRSAORSearchTypeAhead/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewAorSearchByChemicalNamePage = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewAorSearchByChemicalName.page')
const PrsAppPurchaseNewAorSearchAssertChemicalNameLengthPage = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewAorSearchAssertChemicalNameLength.page')
const PrsAppPurchaseNewAorSearchAssertSearchResultPage = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewAorSearchAssertSearchResult.page')
const PrsAppPurchaseNewAorSearchByCASNumberPage = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewAorSearchByCASNumber.page')
const PrsAppPurchaseNewAorSearchAssertSearchResult02Page = require('../pageobjects/PRSAORSearchTypeAhead/PrsAppPurchaseNewAorSearchAssertSearchResult02.page')

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.nusnetId_label).click() // click=0
    await (await PrsLoginPage.loginas_textInput).click() // click=1
    await (await PrsLoginPage.loginas_textInput).setValue('BCHLEEC') // change=2 - else textInput
    await (await PrsLoginPage.login_button).click() // click=3
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.newRequest_link).click() // click=4
  })

  it('should execute PrsAppPurchaseNewStartPage', async () => {
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // click=5
    await (await PrsAppPurchaseNewStartPage.approvalOfRequirementEpv5000_radioInput).click() // change=6 - radioInput
    await (await PrsAppPurchaseNewStartPage.next_button).click() // click=7
  })

  it('should execute PrsAppPurchaseNewAorSearchByChemicalNamePage', async () => {
    await (await PrsAppPurchaseNewAorSearchByChemicalNamePage.chemicalName_textInput).click() // click=8
    await (await PrsAppPurchaseNewAorSearchByChemicalNamePage.chemicalName_textInput).setValue('ben') // change=9 - else textInput
  })

  it('should execute PrsAppPurchaseNewAorSearchAssertChemicalNameLengthPage', async () => {
    const nameTypeAhead =  await $('//*[contains(@id,"ngb-typeahead")]')

    console.log("Children",await nameTypeAhead)
    const children = await nameTypeAhead.$$('ul > li')
    console.log("Children",await children)   


    const firstElement = children[0];
    console.log("Hi",await firstElement)

    const typeAheadWorks = await firstElement.isExisting()

    await expect(typeAheadWorks).toBe(true)
    await (await PrsAppPurchaseNewAorSearchAssertChemicalNameLengthPage.search_span).click() // click=10
  })

  it('should execute PrsAppPurchaseNewAorSearchAssertSearchResultPage', async () => {
    await (await PrsAppPurchaseNewAorSearchAssertSearchResultPage.add_button).click() // click=11
  })

  it('should execute PrsAppPurchaseNewAorSearchByCASNumberPage', async () => {
    await (await PrsAppPurchaseNewAorSearchByCASNumberPage.casNumber_textInput).click() // click=12
    await (await PrsAppPurchaseNewAorSearchByCASNumberPage.casNumber_textInput).setValue('58094') // change=13 - else textInput
  })

  it('should execute PrsAppPurchaseNewAorSearchAssertSearchResult02Page', async () => {
    await (await PrsAppPurchaseNewAorSearchAssertSearchResult02Page.search_span).click() // click=14
  })
})
