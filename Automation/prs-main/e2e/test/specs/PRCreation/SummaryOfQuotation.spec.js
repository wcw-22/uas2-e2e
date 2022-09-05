
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/SummaryOfQuotation/PrsLogin.page')
const Home_01Page = require('../pageobjects/SummaryOfQuotation/Home_01.page')
const PRType_01Page = require('../pageobjects/SummaryOfQuotation/PRType_01.page')
const PRProductSearchPage = require('../pageobjects/SummaryOfQuotation/PRProductSearch.page')
const PRProductSearchResultPage = require('../pageobjects/SummaryOfQuotation/PRProductSearchResult.page')
const PRProductSearchResult_01Page = require('../pageobjects/SummaryOfQuotation/PRProductSearchResult_01.page')
const PRLineItemsPage = require('../pageobjects/SummaryOfQuotation/PRLineItems.page')
const PRLineItems_01Page = require('../pageobjects/SummaryOfQuotation/PRLineItems_01.page')
const PRLineItems_02Page = require('../pageobjects/SummaryOfQuotation/PRLineItems_02.page')
const PRLineItems_03Page = require('../pageobjects/SummaryOfQuotation/PRLineItems_03.page')
const PRAccountAssignmentPage = require('../pageobjects/SummaryOfQuotation/PRAccountAssignment.page')
const PRAccountAssignment_02Page = require('../pageobjects/SummaryOfQuotation/PRAccountAssignment_02.page')
const PRQuotationPage = require('../pageobjects/SummaryOfQuotation/PRQuotation.page')
const PRQuotation_01Page = require('../pageobjects/SummaryOfQuotation/PRQuotation_01.page')
const PRConfirmationPage = require('../pageobjects/SummaryOfQuotation/PRConfirmation.page')
const PRConfirmationMsgPage = require('../pageobjects/SummaryOfQuotation/PRConfirmationMsg.page')
const PrsAppPurchaseSearchPage = require('../pageobjects/SummaryOfQuotation/PrsAppPurchaseSearch.page')
let currentValue

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValue('ANTBAYBH') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute Home_01Page', async () => {
    await (await Home_01Page.newRequest_link).click() // click=3
  })

  it('should execute PRType_01Page', async () => {
    await (await PRType_01Page.purchaseRequestEpv5000CatalogBuy_radioInput).click() // click=4
    await (await PRType_01Page.next_button).click() // click=5
  })

  it('should execute PRProductSearchPage', async () => {
    await (await PRProductSearchPage.chemicalName_textInput).click() // click=6
    await (await PRProductSearchPage.chemicalName_textInput).setValue('Barium Nitrate') // change=7
    await (await PRProductSearchPage.search_button).click() // click=8
  })

  it('should execute PRProductSearchResultPage', async () => {
    await (await PRProductSearchResultPage.add_button).click() // click=9
    await (await PRProductSearchResultPage.biological_span).click() // click=10
    await (await PRProductSearchResultPage.scientificName_textInput).setValue('ESCH') // change=11
    await (await PRProductSearchResultPage.search_button).click() // click=12
  })

  it('should execute PRProductSearchResult_01Page', async () => {
    await (await PRProductSearchResult_01Page.add_button).click() // click=13
    await (await PRProductSearchResult_01Page.next_button).click() // click=14
  })

  it('should execute PRLineItemsPage', async () => {
    await expect(await PRLineItemsPage.item1_div).toExist() // assertExist=15
    await expect(await PRLineItemsPage.item2_div).toExist() // assertExist=16
    await (await PRLineItemsPage.supplier1_textInput).click() // click=17
    await (await PRLineItemsPage.supplier1_textInput).setValue('1 PL')
  })

  it('should execute PRLineItems_01Page', async () => {
    await (await PRLineItems_01Page._1PlusPrivateLimited_span).click() // click=18
    await (await PRLineItems_01Page.price1_textInput).click() // click=19
    currentValue = await (await PRLineItems_01Page.price1_textInput).getValue() // change=20 - apponlynumbers
    await browser.keys('\uE003'.repeat(currentValue.length)+'10') // change=20 - apponlynumbers
    await (await PRLineItems_01Page.quantity1_textInput).click() // click=21
    currentValue = await (await PRLineItems_01Page.quantity1_textInput).getValue() // change=22 - apponlynumbers
    await browser.keys('\uE003'.repeat(currentValue.length)+'15') // change=22 - apponlynumbers
    await (await PRLineItems_01Page.unit1_select).selectByVisibleText('Ea') // change=23 - select
    await (await PRLineItems_01Page.price2_textInput).click() // click=24
    currentValue = await (await PRLineItems_01Page.price2_textInput).getValue() // change=25 - apponlynumbers
    await browser.keys('\uE003'.repeat(currentValue.length)+'20') // change=25 - apponlynumbers
    await (await PRLineItems_01Page.quantity2_textInput).click() // click=26
    currentValue = await (await PRLineItems_01Page.quantity2_textInput).getValue() // change=27 - apponlynumbers
    await browser.keys('\uE003'.repeat(currentValue.length)+'25') // change=27 - apponlynumbers
    await (await PRLineItems_01Page.unit2_select).selectByVisibleText('Ea') // change=28 - select
    await (await PRLineItems_01Page.currencycode2_select).selectByVisibleText('AUD - Australian Dollar') // change=29 - select
    await (await PRLineItems_01Page.supplier2_textInput).click() // click=30
    await (await PRLineItems_01Page.supplier2_textInput).setValue('1 PL')
  })

  it('should execute PRLineItems_02Page', async () => {
    await (await PRLineItems_02Page._1PlusPrivateLimited_span).click() // click=31
    await (await PRLineItems_02Page.next_button).click() // click=32
  })

  it('should execute PRLineItems_03Page', async () => {
    await (await PRLineItems_03Page.errorMsg1_li).click() // click=33
    await expect(await PRLineItems_03Page.errorMsg1_li).toHaveTextContaining('Multiple currencies selected for supplier 1 PLUS PRIVATE LIMITED: AUD, SGD') // assertText=34
    await (await PRLineItems_03Page.currencycode_select).selectByVisibleText('SGD - Singapore Dollar') // change=35 - select
    await (await PRLineItems_03Page.next_span).click() // click=36
  })

  it('should execute PRAccountAssignmentPage', async () => {
    await expect(await PRAccountAssignmentPage.accountAssignment_div).toHaveTextContaining('Account Assignment') // assertText=37
    await (await PRAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 02 > 02 > BAY BH LAB') // change=38 - select
    await (await PRAccountAssignmentPage.wbs_textInput).click() // click=39
    await (await PRAccountAssignmentPage.wbs_textInput).setValue('A-0002272-00-00') // change=40
  })

  it('should execute PRAccountAssignment_02Page', async () => {
    await (await PRAccountAssignment_02Page.nameOf00007319_p).click() // click=41
    await expect(await PRAccountAssignment_02Page.nameOf00007319_p).toHaveTextContaining('Name of 00007319') // assertText=42
    await (await PRAccountAssignment_02Page.next_button).click() // click=43
  })

  it('should execute PRQuotationPage', async () => {
    await (await PRQuotationPage.billingAddress_text).click() // click=44
    await (await PRQuotationPage.billingAddress_text).setValue('10 Kent Ridge Crescent') // change=45
    await (await PRQuotationPage.requestorSPhone_textInput).click() // click=46
    await (await PRQuotationPage.requestorSPhone_textInput).setValue('67890876') // change=47
    await (await PRQuotationPage.sameAddressAsBillingAddress_checkboxInput).click() // click=48
    await (await PRQuotationPage.quotationReferenceNumber_textInput).click() // click=49
    await (await PRQuotationPage.quotationReferenceNumber_textInput).setValue('123') // change=50
    await (await PRQuotationPage.expectedDeliveryDate_textInput).click() // click=51
    await (await PRQuotationPage.expectedDeliveryDate_textInput).setValue('31/08/2021') // change=52
    await (await PRQuotationPage.next_button).click() // click=53
  })

  it('should execute PRQuotation_01Page', async () => {
    await (await PRQuotation_01Page.errorMsg1_li).click() // click=54
    await (await PRQuotation_01Page.menulogout_link).click() 
    //await (await PRQuotation_01Page.file1_fileInput).click() // click=3
    //await (await PRQuotation_01Page.upload_button).click() // click=4
    //await (await PRQuotation_01Page.file1_fileInput).setValue('D:\fakepath\PDS.pdf') // change=5

    //const fileUpload = (await PRQuotation_01Page.file1_fileInput)
    //attacheFile(fileUpload,'D:\\Work Files\\Central Java Common Apps\\PDS.pdf', el =>  el.parentNode.className = '')
    //await (await PRQuotation_01Page.next_button).click() // click=48

    //await (await PRQuotation_01Page.next_button).click() // click=6
  })
  /*
  it('should execute PRConfirmationPage', async () => {
    await (await PRConfirmationPage.yes_button).click() // click=7
  })

  it('should execute PRConfirmationMsgPage', async () => {
    await expect(await PRConfirmationMsgPage.msg_div).toExist() // assertExist=8
    await (await PRConfirmationMsgPage.msg_div).click() // click=9
    await expect(await PRConfirmationMsgPage.msg_span).toHaveTextContaining('Request has been created successfully. You will be notified once your request has been approved by the relevant approver(s).') // assertText=10
    await (await PRConfirmationMsgPage.ok_button).click() // click=11
  })

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await expect(await PrsAppPurchaseSearchPage.searchRequest_span).toExist() // assertExist=12
    await expect(await PrsAppPurchaseSearchPage.searchRequest_span).toHaveTextContaining('Search Request') // assertText=13
  })
*/
})

async function attacheFile(fileUpload, filename, callback) {
  await browser.execute(
    callback,
    fileUpload
  )
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename) // change=47 - else fileInput
}
