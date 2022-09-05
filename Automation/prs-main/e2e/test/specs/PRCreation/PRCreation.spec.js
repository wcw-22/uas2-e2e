
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/PRCreation/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/PRCreation/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/PRCreation/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewSearchPage = require('../pageobjects/PRCreation/PrsAppPurchaseNewSearch.page')
const PrsAppPurchaseNewSearch_01Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewSearch_01.page')
const PrsAppPurchaseNewSearch_02Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewSearch_02.page')
const PrsAppPurchaseNewSearch_03Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewSearch_03.page')
const PrsAppPurchaseNewItemsPage = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems.page')
const PrsAppPurchaseNewItems_01Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems_01.page')
const PrsAppPurchaseNewItems_02Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems_02.page')
const PrsAppPurchaseNewItems_03Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems_03.page')
const PrsAppPurchaseNewItems_04Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems_04.page')
const PrsAppPurchaseNewItems_05Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewItems_05.page')
const PrsAppPurchaseNewAccountAssignmentPage = require('../pageobjects/PRCreation/PrsAppPurchaseNewAccountAssignment.page')
const PrsAppPurchaseNewAccountAssignment_01Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewAccountAssignment_01.page')
const PrsAppPurchaseNewQuotation_01Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewQuotation_01.page')
const PrsAppPurchaseNewConfirmationPage = require('../pageobjects/PRCreation/PrsAppPurchaseNewConfirmation.page')
const PrsAppPurchaseNewConfirmation_01Page = require('../pageobjects/PRCreation/PrsAppPurchaseNewConfirmation_01.page')
const PrsAppPurchaseSearchPage = require('../pageobjects/PRCreation/PrsAppPurchaseSearch.page')
let currentValue

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
    await (await PrsAppPurchaseNewStartPage.next_button).click() // click=6
  })

  it('should execute PrsAppPurchaseNewSearchPage', async () => {
    await (await PrsAppPurchaseNewSearchPage.product_radioInput).click() // click=7
    await (await PrsAppPurchaseNewSearchPage.product_radioInput).click() // change=8 - radioInput
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).click() // click=9
    await (await PrsAppPurchaseNewSearchPage.chemicalName_textInput).setValueByKeys('Barium Nitrate') // change=10
    await (await PrsAppPurchaseNewSearchPage.chemicalsearchbutton_button).click() // click=11
  })

  it('should execute PrsAppPurchaseNewSearch_01Page', async () => {
    await (await PrsAppPurchaseNewSearch_01Page.add_button).click() // click=12
    await (await PrsAppPurchaseNewSearch_01Page.biological_span).click() // click=13
    await (await PrsAppPurchaseNewSearch_01Page.scientificName_textInput).click() // click=14
    await (await PrsAppPurchaseNewSearch_01Page.scientificName_textInput).setValueByKeys('ESCHER') // change=15
    await (await PrsAppPurchaseNewSearch_01Page.search_button).click() // click=16
  })

  it('should execute PrsAppPurchaseNewSearch_02Page', async () => {
    await (await PrsAppPurchaseNewSearch_02Page.add_button).click() // click=17
    await (await PrsAppPurchaseNewSearch_02Page.radioactive_span).click() // click=18
    await (await PrsAppPurchaseNewSearch_02Page.radionuclideS_textInput).click() // click=19
    await (await PrsAppPurchaseNewSearch_02Page.radionuclideS_textInput).setValueByKeys('c-14') // change=20
    await (await PrsAppPurchaseNewSearch_02Page.search_button).click() // click=21
  })

  it('should execute PrsAppPurchaseNewSearch_03Page', async () => {
    await (await PrsAppPurchaseNewSearch_03Page.addnewlineitem0_button).click() // click=22
    await (await PrsAppPurchaseNewSearch_03Page.next_button).click() // click=23
  })

  it('should execute PrsAppPurchaseNewItemsPage', async () => {
    //await (await PrsAppPurchaseNewItemsPage.supplier1_div).click() // click=24
    await (await PrsAppPurchaseNewItemsPage.supplier1_textInput).click() // click=17
    await (await PrsAppPurchaseNewItemsPage.supplier1_textInput).setValue('1 PL')
  })

  it('should execute PrsAppPurchaseNewItems_01Page', async () => {
    await (await PrsAppPurchaseNewItems_01Page._1PlusPrivateLimited_span).click() // click=25
    await (await PrsAppPurchaseNewItems_01Page.price1_textInput).click() // click=26
    await (await PrsAppPurchaseNewItems_01Page.price1_textInput).setValueByKeys('10') // change=27
    await (await PrsAppPurchaseNewItems_01Page.quantity1_textInput).click() // click=28
    await (await PrsAppPurchaseNewItems_01Page.quantity1_textInput).setValueByKeys('20') // change=29
    await (await PrsAppPurchaseNewItems_01Page.unit1_select).selectByVisibleText('Ea') // change=30 - select
    await (await PrsAppPurchaseNewItems_01Page.price2_textInput).click() // click=31
    await (await PrsAppPurchaseNewItems_01Page.price2_textInput).setValueByKeys('25') // change=32
    await (await PrsAppPurchaseNewItems_01Page.quantity2_textInput).click() // click=33
    await (await PrsAppPurchaseNewItems_01Page.quantity2_textInput).setValueByKeys('15') // change=34
    await (await PrsAppPurchaseNewItems_01Page.unit2_select).selectByVisibleText('Ea') // change=35 - select
    await (await PrsAppPurchaseNewItems_01Page.price3_textInput).click() // click=36
    await (await PrsAppPurchaseNewItems_01Page.price3_textInput).setValueByKeys('100') // change=37
    await (await PrsAppPurchaseNewItems_01Page.quantity3_textInput).click() // click=38
    await (await PrsAppPurchaseNewItems_01Page.quantity3_textInput).setValueByKeys('2') // change=39
    await (await PrsAppPurchaseNewItems_01Page.unit3_select).selectByVisibleText('Ea') // change=40 - select
    //await (await PrsAppPurchaseNewItems_01Page.supplier2_div).click() // click=41
    await (await PrsAppPurchaseNewItems_01Page.supplier2_textInput).click() // click=17
    await (await PrsAppPurchaseNewItems_01Page.supplier2_textInput).setValue('Chemstore')
  })

  it('should execute PrsAppPurchaseNewItems_02Page', async () => {
    await (await PrsAppPurchaseNewItems_02Page.chemstore_span).click() // click=42
    await (await PrsAppPurchaseNewItems_02Page.supplier3_textInput).click() // click=43
    await (await PrsAppPurchaseNewItems_02Page.supplier3_textInput).setValue('1 PL')
  })

  it('should execute PrsAppPurchaseNewItems_03Page', async () => {
    await (await PrsAppPurchaseNewItems_03Page._1PlusPrivateLimited_span).click() // click=44
    await (await PrsAppPurchaseNewItems_03Page.next_button).click() // click=45
  })

  it('should execute PrsAppPurchaseNewItems_04Page', async () => {
    await expect(await PrsAppPurchaseNewItems_04Page.errorMsg1_li).toExist() // assertExist=46
    await expect(await PrsAppPurchaseNewItems_04Page.errorMsg1_li).toHaveTextContaining('You cannot select both external and internal suppliers') // assertText=47
    await (await PrsAppPurchaseNewItems_04Page.supplier2_textInput).click() // click=48
    await (await PrsAppPurchaseNewItems_04Page.supplier2_textInput).setValue('1 PL')
  })

  it('should execute PrsAppPurchaseNewItems_05Page', async () => {
    await (await PrsAppPurchaseNewItems_05Page._1PlusPrivateLimited_span).click() // click=49
    await (await PrsAppPurchaseNewItems_05Page.next_button).click() // click=50
  })

  it('should execute PrsAppPurchaseNewAccountAssignmentPage', async () => {
    await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 02 > 02 > BAY BH LAB') // change=51 - select
    await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).click() // click=52
    await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValueByKeys('A-0002272-00-00') // change=53
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_01Page', async () => {
    await expect(await PrsAppPurchaseNewAccountAssignment_01Page.nameOf00007319_p).toExist() // assertExist=54
    await expect(await PrsAppPurchaseNewAccountAssignment_01Page.nameOf00007319_p).toHaveTextContaining('Name of 00007319') // assertText=55
    await (await PrsAppPurchaseNewAccountAssignment_01Page.next_button).click() // click=56
  })

  it('should execute PrsAppPurchaseNewQuotation_01Page', async () => {
    await (await PrsAppPurchaseNewQuotation_01Page.sameAddressAsBillingAddress_checkboxInput).click() // click=57
    await (await PrsAppPurchaseNewQuotation_01Page.billingAddress_text).click() // click=58
    await (await PrsAppPurchaseNewQuotation_01Page.billingAddress_text).setValueByKeys('10 Kent ridge') // change=59
    await (await PrsAppPurchaseNewQuotation_01Page.requestorSPhone_textInput).click() // click=60
    await (await PrsAppPurchaseNewQuotation_01Page.requestorSPhone_textInput).setValueByKeys('8976435678') // change=61
    await (await PrsAppPurchaseNewQuotation_01Page.quotationReferenceNumber_textInput).click() // click=62
    await (await PrsAppPurchaseNewQuotation_01Page.quotationReferenceNumber_textInput).setValueByKeys('123') // change=63
    await (await PrsAppPurchaseNewQuotation_01Page.expectedDeliveryDate_textInput).click() // click=64
    await (await PrsAppPurchaseNewQuotation_01Page.expectedDeliveryDate_textInput).setValueByKeys('30/08/2021') // change=65
     
    //await (await PrsAppPurchaseNewQuotation_01Page.upload_fileInput).click() // click=66
    //await (await PrsAppPurchaseNewQuotation_01Page.upload_button).click() // click=67
    //await (await PrsAppPurchaseNewQuotation_01Page.upload_fileInput).setValueByKeys('D:\fakepath\PDS.pdf') // change=68
    const fileUpload = (await PrsAppPurchaseNewQuotation_01Page.upload_fileInput)
    //attacheFile(fileUpload,'D:\\Work Files\\Central Java Common Apps\\PDS.pdf', el =>  el.parentNode.className = '')
    attacheFile(fileUpload,"D:\\Work Files\\Central Java Common Apps\\PDS.pdf", el => { el.parentNode.className = ''; el.setAttribute('data-quote-index', 0); })
    await browser.pause(1000);
    await (await PrsAppPurchaseNewQuotation_01Page.next_button).click() // click=69
  })

  it('should execute PrsAppPurchaseNewConfirmationPage', async () => {
    await expect(await PrsAppPurchaseNewConfirmationPage.items_div).toExist() // assertExist=70
    await expect(await PrsAppPurchaseNewConfirmationPage._1PlusPrivateLimited_div).toExist() // assertExist=71
    await expect(await PrsAppPurchaseNewConfirmationPage.accountAssignment_div).toExist() // assertExist=72
    await expect(await PrsAppPurchaseNewConfirmationPage.summaryOfQuotations_div).toExist() // assertExist=73
    await (await PrsAppPurchaseNewConfirmationPage.yes_button).click() // click=74
  })

  it('should execute PrsAppPurchaseNewConfirmation_01Page', async () => {
    await expect(await PrsAppPurchaseNewConfirmation_01Page.confirmationMsg_div).toExist() // assertExist=75
    await expect(await PrsAppPurchaseNewConfirmation_01Page.confirmationMsg_div).toHaveTextContaining('Request has been created successfully.') // assertText=76
    await (await PrsAppPurchaseNewConfirmation_01Page.ok_button).click() // click=77
  })

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await expect(await PrsAppPurchaseSearchPage.searchRequest_span).toHaveTextContaining('Search Request') // assertText=78
    await (await PrsAppPurchaseSearchPage.menulogout_link).click() 
  })

})

async function attacheFile(fileUpload, filename, callback) {
  await browser.execute(
    callback,
    fileUpload
  )
  console.log("filename: "+ filename);
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename) // change=47 - else fileInput
    
}
