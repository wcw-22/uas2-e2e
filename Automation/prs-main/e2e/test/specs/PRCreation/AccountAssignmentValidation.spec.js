
/*** Generated spec file ***/
const PrsLoginPage = require('../pageobjects/AccountAssignmentValidation/PrsLogin.page')
const PrsAppHome_01Page = require('../pageobjects/AccountAssignmentValidation/PrsAppHome_01.page')
const PrsAppPurchaseNewStartPage = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewStart.page')
const PrsAppPurchaseNewSearchPage = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewSearch.page')
const PrsAppPurchaseNewSearch_01Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewSearch_01.page')
const PrsAppPurchaseNewSearch_02Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewSearch_02.page')
const PrsAppPurchaseNewSearch_03Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewSearch_03.page')
const PrsAppPurchaseNewItemsPage = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewItems.page')
const PrsAppPurchaseNewItems_01Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewItems_01.page')
const PrsAppPurchaseNewItems_02Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewItems_02.page')
const PrsAppPurchaseNewItems_03Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewItems_03.page')
const PrsAppPurchaseNewAccountAssignmentPage = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment.page')
const PrsAppPurchaseNewAccountAssignment_01Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_01.page')
const PrsAppPurchaseNewAccountAssignment_02Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_02.page')
const PrsAppPurchaseNewAccountAssignment_03Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_03.page')
const PrsAppPurchaseNewAccountAssignment_04Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_04.page')
const PrsAppPurchaseNewAccountAssignment_05Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_05.page')
const PrsAppPurchaseNewAccountAssignment_06Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_06.page')
const PrsAppPurchaseNewAccountAssignment_07Page = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewAccountAssignment_07.page')
const PrsAppPurchaseNewQuotationPage = require('../pageobjects/AccountAssignmentValidation/PrsAppPurchaseNewQuotation.page')
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
    await (await PrsAppPurchaseNewSearchPage.search_button).click() // click=11
  })

  it('should execute PrsAppPurchaseNewSearch_01Page', async () => {
    await (await PrsAppPurchaseNewSearch_01Page.add_button).click() // click=12
    await (await PrsAppPurchaseNewSearch_01Page.biological_span).click() // click=13
    await (await PrsAppPurchaseNewSearch_01Page.scientificName_textInput).click() // click=14
    await (await PrsAppPurchaseNewSearch_01Page.scientificName_textInput).setValueByKeys('ESCH') // change=15
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
    await (await PrsAppPurchaseNewSearch_03Page.add_button).click() // click=22
    await (await PrsAppPurchaseNewSearch_03Page.next_button).click() // click=23
  })

  it('should execute PrsAppPurchaseNewItemsPage', async () => {
    await (await PrsAppPurchaseNewItemsPage.supplier_textInput).click() // click=24
    await (await PrsAppPurchaseNewItemsPage.supplier_textInput).setValueByKeys('1 Pl') // change=25
  })

  it('should execute PrsAppPurchaseNewItems_01Page', async () => {
    await (await PrsAppPurchaseNewItems_01Page._1PlusPrivateLimited_span).click() // click=26
    await (await PrsAppPurchaseNewItems_01Page.supplier2_textInput).click() // click=27
    await (await PrsAppPurchaseNewItems_01Page.supplier2_textInput).setValueByKeys('1 Pl') // change=28
  })

  it('should execute PrsAppPurchaseNewItems_02Page', async () => {
    await (await PrsAppPurchaseNewItems_02Page._1PlusPrivateLimited_span).click() // click=29
    await (await PrsAppPurchaseNewItems_02Page.supplier3_textInput).click() // click=30
    await (await PrsAppPurchaseNewItems_02Page.supplier3_textInput).setValueByKeys('1 Pl') // click=31
  })

  it('should execute PrsAppPurchaseNewItems_03Page', async () => {
    await (await PrsAppPurchaseNewItems_03Page._1PlusPrivateLimited_span).click() // click=32
    await (await PrsAppPurchaseNewItems_03Page.price1_textInput).click() // click=33
    await (await PrsAppPurchaseNewItems_03Page.price1_textInput).setValueByKeys('10') // change=34
    await (await PrsAppPurchaseNewItems_03Page.quantity1_textInput).click() // click=35
    await (await PrsAppPurchaseNewItems_03Page.quantity1_textInput).setValueByKeys('10') // change=36
    await (await PrsAppPurchaseNewItems_03Page.unit1_select).selectByVisibleText('Ea') // change=37 - select
    await (await PrsAppPurchaseNewItems_03Page.price3_textInput).click() // click=38
    await (await PrsAppPurchaseNewItems_03Page.price3_textInput).setValueByKeys('10') // change=39
    await (await PrsAppPurchaseNewItems_03Page.quantity3_textInput).click() // click=40
    await (await PrsAppPurchaseNewItems_03Page.quantity3_textInput).setValueByKeys('10') // change=41
    await (await PrsAppPurchaseNewItems_03Page.unit3_select).selectByVisibleText('Ea') // change=42 - select
    await (await PrsAppPurchaseNewItems_03Page.price2_textInput).click() // click=43
    await (await PrsAppPurchaseNewItems_03Page.price2_textInput).setValueByKeys('10') // change=44
    await (await PrsAppPurchaseNewItems_03Page.quantity2_textInput).click() // click=45
    await (await PrsAppPurchaseNewItems_03Page.quantity2_textInput).setValueByKeys('10') // change=46
    await (await PrsAppPurchaseNewItems_03Page.unit2_select).selectByVisibleText('Ea') // change=47 - select
    await (await PrsAppPurchaseNewItems_03Page.next_button).click() // click=48
    await browser.pause(1000);
  })

  it('should execute PrsAppPurchaseNewAccountAssignmentPage', async () => {
    await (await PrsAppPurchaseNewAccountAssignmentPage.storageLocation_select).selectByVisibleText('MD10 > 02 > 02 > BAY BH LAB') // change=49 - select
    await (await PrsAppPurchaseNewAccountAssignmentPage.inventoryOwner_select).selectByVisibleText('Name of 00007319')
    await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).click() // click=50
    await (await PrsAppPurchaseNewAccountAssignmentPage.wbs_textInput).setValueByKeys('A-0002272-00-00') // change=51
    await (await PrsAppPurchaseNewAccountAssignmentPage.add1_1_button).click() // click=52
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_01Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_01Page.wbs1_1_textInput).click() // click=53
    await (await PrsAppPurchaseNewAccountAssignment_01Page.a00022720000_textInput).setValueByKeys('A-0002272-00-00') // change=54
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_02Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_02Page.quantity1_1_numberInput).click() // click=55
    await (await PrsAppPurchaseNewAccountAssignment_02Page.quantity1_1_numberInput).click() // click=56
    await (await PrsAppPurchaseNewAccountAssignment_02Page.quantity1_1_numberInput).setValueByKeys('100') // change=57
    await (await PrsAppPurchaseNewAccountAssignment_02Page.quantity1_1_numberInput).click() // click=58
    await (await PrsAppPurchaseNewAccountAssignment_02Page.quantity1_1_numberInput).setValueByKeys('5') // change=59
    await (await PrsAppPurchaseNewAccountAssignment_02Page.add1_1_button).click() // click=60
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_03Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_03Page.wbs1_2_textInput).click() // click=61
    await (await PrsAppPurchaseNewAccountAssignment_03Page.wbs1_2_textInput).setValueByKeys('A-0002272-00-00') // change=62
    await (await PrsAppPurchaseNewAccountAssignment_03Page.quantity1_2_numberInput).click() // click=63
    await (await PrsAppPurchaseNewAccountAssignment_03Page.quantity1_2_numberInput).click() // click=64
    await (await PrsAppPurchaseNewAccountAssignment_03Page.quantity1_2_numberInput).setValueByKeys('10') // change=65
    await (await PrsAppPurchaseNewAccountAssignment_03Page.next_button).click() // click=66
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_04Page', async () => {
    await expect(await PrsAppPurchaseNewAccountAssignment_04Page.errMsg1_li).toExist() // assertExist=67
    await (await PrsAppPurchaseNewAccountAssignment_04Page.errMsg1_li).click() // click=68
    await expect(await PrsAppPurchaseNewAccountAssignment_04Page.errMsg1_li).toHaveTextContaining('BARIUM NITRATE: WBS A-0002272-00-00, GL 7100103 used more than once.') // assertText=69
    await expect(await PrsAppPurchaseNewAccountAssignment_04Page.errMsg2_li).toExist() // assertExist=70
    await expect(await PrsAppPurchaseNewAccountAssignment_04Page.errMsg2_li).toHaveTextContaining('Total account assignment quantity must match line item quantity.') // assertText=71
    await (await PrsAppPurchaseNewAccountAssignment_04Page.quantity1_1_numberInput).click() // click=72
    await (await PrsAppPurchaseNewAccountAssignment_04Page.quantity1_1_numberInput).setValueByKeys('-5') // change=73
    await (await PrsAppPurchaseNewAccountAssignment_04Page.next_button).click() // click=74
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_05Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_05Page.errMsg1_li).click() // click=75
    await expect(await PrsAppPurchaseNewAccountAssignment_05Page.errMsg1_li).toHaveTextContaining('BARIUM NITRATE: Account Assignment [Line 1]: Quantity must be more than 0.') // assertText=76
    await (await PrsAppPurchaseNewAccountAssignment_05Page.a00022720000_textInput).click() // click=77
    await (await PrsAppPurchaseNewAccountAssignment_05Page.a00022820000_textInput).setValue('A-0002282-00-00') // change=78
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_06Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_06Page.quantity1_1_numberInput).click() // click=79
    await (await PrsAppPurchaseNewAccountAssignment_06Page.quantity1_1_numberInput).setValueByKeys('5.0001') // change=80
    await (await PrsAppPurchaseNewAccountAssignment_06Page.quantity1_2_numberInput).click() // click=81
    await (await PrsAppPurchaseNewAccountAssignment_06Page.quantity1_2_numberInput).click() // click=82
    await (await PrsAppPurchaseNewAccountAssignment_06Page.quantity1_2_numberInput).setValueByKeys('4.9999') // change=83
    await (await PrsAppPurchaseNewAccountAssignment_06Page.next_button).click() // click=84
  })

  it('should execute PrsAppPurchaseNewAccountAssignment_07Page', async () => {
    await (await PrsAppPurchaseNewAccountAssignment_07Page.errMsg1_li).click() // click=85
    await expect(await PrsAppPurchaseNewAccountAssignment_07Page.errMsg1_li).toHaveTextContaining('BARIUM NITRATE: Account Assignment [Line 1]: Quantity must be up to 3 decimal places.') // assertText=86
    await (await PrsAppPurchaseNewAccountAssignment_07Page.errMsg2_li).click() // click=87
    await expect(await PrsAppPurchaseNewAccountAssignment_07Page.errMsg2_li).toHaveTextContaining('BARIUM NITRATE: Account Assignment [Line 2]: Quantity must be up to 3 decimal places.') // assertText=88
    await (await PrsAppPurchaseNewAccountAssignment_07Page.quantity1_1_numberInput).click() // click=89
    await (await PrsAppPurchaseNewAccountAssignment_07Page.quantity1_1_numberInput).setValue('5.001') // change=90
    await (await PrsAppPurchaseNewAccountAssignment_07Page.quantity1_2_numberInput).click() // click=91
    await (await PrsAppPurchaseNewAccountAssignment_07Page.quantity1_2_numberInput).setValue('4.999') // change=92
    await (await PrsAppPurchaseNewAccountAssignment_07Page.next_button).click() // click=93
  })

  it('should execute PrsAppPurchaseNewQuotationPage', async () => {
    await (await PrsAppPurchaseNewQuotationPage.summaryOfQuotation_span).click() // click=94
    await expect(await PrsAppPurchaseNewQuotationPage.summaryOfQuotation_span).toHaveTextContaining('Summary of Quotation') // assertText=95
    await (await PrsAppPurchaseNewQuotationPage.menulogout_link).click() 
  })
})
