
/*** Generated spec file ***/
const LoginPage = require('../pageobjects/LineItemDownPaymentValidation/Login.page')
const Home_01Page = require('../pageobjects/LineItemDownPaymentValidation/Home_01.page')
const SelectRequestType_01Page = require('../pageobjects/LineItemDownPaymentValidation/SelectRequestType_01.page')
const PRProductSearchPage = require('../pageobjects/LineItemDownPaymentValidation/PRProductSearch.page')
const PRProductSearch_01Page = require('../pageobjects/LineItemDownPaymentValidation/PRProductSearch_01.page')
const PRProductSearchResultPage = require('../pageobjects/LineItemDownPaymentValidation/PRProductSearchResult.page')
const PRLineItemsPage = require('../pageobjects/LineItemDownPaymentValidation/PRLineItems.page')
const PRLineItems_01Page = require('../pageobjects/LineItemDownPaymentValidation/PRLineItems_01.page')
const PRLineItems_02Page = require('../pageobjects/LineItemDownPaymentValidation/PRLineItems_02.page')
const PRLineItems_03Page = require('../pageobjects/LineItemDownPaymentValidation/PRLineItems_03.page')

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute LoginPage', async () => {
    await LoginPage.open()

    await (await LoginPage.loginas_textInput).click() // click=0
    await (await LoginPage.loginas_textInput).setValue('ANTBAYBH') // change=1 - else textInput
    await (await LoginPage.login_button).click() // click=2
  })

  it('should execute Home_01Page', async () => {
    await (await Home_01Page.newRequest_link).click() // click=3
  })

  it('should execute SelectRequestType_01Page', async () => {
    await (await SelectRequestType_01Page.purchaseRequestEpv5000CatalogBuy_radioInput).click() // click=4
    await (await SelectRequestType_01Page.purchaseRequestEpv5000CatalogBuy_radioInput).click() // change=5 - radioInput
    await (await SelectRequestType_01Page.next_button).click() // click=6
  })

  it('should execute PRProductSearchPage', async () => {
    await (await PRProductSearchPage.product_radioInput).click() // click=7
    await (await PRProductSearchPage.product_radioInput).click() // change=8 - radioInput
    await (await PRProductSearchPage.chemicalName_textInput).click() // click=9
    await (await PRProductSearchPage.chemicalName_textInput).setValue('Barium Nitra') // change=10 - else textInput
  })

  it('should execute PRProductSearch_01Page', async () => {
    await (await PRProductSearch_01Page.chemicalsearchbutton_button).click() // click=11
  })

  it('should execute PRProductSearchResultPage', async () => {
    await (await PRProductSearchResultPage.add_button).click() // click=12
    await (await PRProductSearchResultPage.next_button).click() // click=13
  })

  it('should execute PRLineItemsPage', async () => {
    await (await PRLineItemsPage.downpayment_checkboxInput).click() // click=14
    await (await PRLineItemsPage.supplier1_textInput).click() // click=15
    await (await PRLineItemsPage.supplier1_textInput).setValue('1 PL')
  })

  it('should execute PRLineItems_01Page', async () => {
    await (await PRLineItems_01Page._1PlusPrivateLimited_span).click() // click=16
    await (await PRLineItems_01Page.price0_textInput).click() // click=17
    await (await PRLineItems_01Page.price0_textInput).setValue('0') // change=18 - else textInput
    await (await PRLineItems_01Page.quantity1_textInput).click() // click=19
    await (await PRLineItems_01Page.quantity1_textInput).setValue('0') // change=20 - else textInput
    await (await PRLineItems_01Page.unit1_select).selectByVisibleText('Ea') // change=21 - select
    await (await PRLineItems_01Page.percentage1_textInput).click() // click=22
    await (await PRLineItems_01Page.percentage1_textInput).setValue('101') // change=23 - else textInput
    await (await PRLineItems_01Page.downPaymentAmount1_textInput).click() // click=22
    await (await PRLineItems_01Page.downPaymentAmount1_textInput).setValue('-100') // change=23 - else textInput
    await (await PRLineItems_01Page.next_button).click() // click=24
  })

  it('should execute PRLineItems_02Page', async () => {
    await (await PRLineItems_02Page.errorMsg1_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg1_li)).toHaveTextContaining('BARIUM NITRATE: Quantity must be more than 0.') // assertText=26
    await (await PRLineItems_02Page.errorMsg2_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg2_li)).toHaveTextContaining('BARIUM NITRATE: Unit Price must be more than 0.') // assertText=26
    await (await PRLineItems_02Page.errorMsg3_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg3_li)).toHaveTextContaining('BARIUM NITRATE: Please enter either downpayment percentage or amount.') // assertText=26
    await (await PRLineItems_02Page.errorMsg4_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg4_li)).toHaveTextContaining('BARIUM NITRATE: Downpayment Percentage must be between 0.01 and 100 (inclusive).') // assertText=26
    await (await PRLineItems_02Page.errorMsg5_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg5_li)).toHaveTextContaining('BARIUM NITRATE: Downpayment Amount must be more than 0.') // assertText=26
    await (await PRLineItems_02Page.errorMsg6_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg6_li)).toHaveTextContaining('BARIUM NITRATE: Downpayment Date is required.') // assertText=26

    await (await PRLineItems_02Page.price0_textInput).setValue('30') // change=18 - else textInput
    await (await PRLineItems_02Page.quantity1_textInput).click() // click=19
    await (await PRLineItems_02Page.quantity1_textInput).setValue('10') // change=20 - else textInput
    await (await PRLineItems_02Page.unit1_select).selectByVisibleText('Ea') // change=21 - select
    await (await PRLineItems_02Page.percentage1_textInput).click() // click=22
    //await (await PRLineItems_02Page.percentage1_textInput).clearValue()
    await browser.keys('\uE003\uE003\uE003\uE003')
    await (await PRLineItems_02Page.downPaymentAmount1_textInput).click() // click=22
    await (await PRLineItems_02Page.downPaymentAmount1_textInput).setValue('25') 
    await (await PRLineItems_02Page.next_button).click() // click=24

  })

  it('should execute PRLineItems_03Page', async () => {
    await (await PRLineItems_03Page.errorMsg1_li).click() // click=25
    await expect(await PRLineItems_03Page.errorMsg1_li).toHaveTextContaining('BARIUM NITRATE: Downpayment Date is required.') // assertText=26
    //await expect(await PRLineItems_03Page.errorMsg2_li).not.toExist();
    //expect(PRLineItems_03Page).toHaveTextContaining('XXXX') // assertText=26
    await (await PRLineItems_03Page.menulogout_link).click() 
  })
})
