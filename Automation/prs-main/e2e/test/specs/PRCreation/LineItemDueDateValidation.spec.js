
/*** Generated spec file ***/
const LoginPage = require('../pageobjects/LineItemDueDateValidation/Login.page')
const Home_01Page = require('../pageobjects/LineItemDueDateValidation/Home_01.page')
const SelectRequestType_01Page = require('../pageobjects/LineItemDueDateValidation/SelectRequestType_01.page')
const PRProductSearchPage = require('../pageobjects/LineItemDueDateValidation/PRProductSearch.page')
const PRProductSearchResultPage = require('../pageobjects/LineItemDueDateValidation/PRProductSearchResult.page')
const PRLineItemsPage = require('../pageobjects/LineItemDueDateValidation/PRLineItems.page')
const PRLineItems_01Page = require('../pageobjects/LineItemDueDateValidation/PRLineItems_01.page')
const PRLineItems_02Page = require('../pageobjects/LineItemDueDateValidation/PRLineItems_02.page')
const PRLineItems_03Page = require('../pageobjects/LineItemDueDateValidation/PRLineItems_03.page')
const PRLineItems_05Page = require('../pageobjects/LineItemDueDateValidation/PRLineItems_05.page')
const PRAccountAssignmentPage = require('../pageobjects/LineItemDueDateValidation/PRAccountAssignment.page')

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
    await (await PRProductSearchPage.chemicalName_textInput).setValue('Barium Nitrate') // change=10 - else textInput
    await (await PRProductSearchPage.chemicalsearchbutton_button).click() // click=11
  })

  it('should execute PRProductSearchResultPage', async () => {
    await (await PRProductSearchResultPage.add_button).click() // click=12
    await (await PRProductSearchResultPage.next_button).click() // click=13
  })

  it('should execute PRLineItemsPage', async () => {
    await (await PRLineItemsPage.downpayment_checkboxInput).click() // click=14
    await (await PRLineItemsPage.price0_textInput).click() // click=15
    await (await PRLineItemsPage.price0_textInput).setValue('10') // change=16 - else textInput
    await (await PRLineItemsPage.quantity_textInput).click() // click=17
    await (await PRLineItemsPage.quantity_textInput).setValue('15') // change=18 - else textInput
    await (await PRLineItemsPage.unit_select).selectByVisibleText('Ea') // change=19 - select
  })

  it('should execute PRLineItems_01Page', async () => {
    await (await PRLineItems_01Page.percentage_textInput).click() // click=20
    await (await PRLineItems_01Page.percentage_textInput).setValue('25') // change=21 - else textInput
    await (await PRLineItems_01Page.date_textInput).click() // click=22
    await (await PRLineItems_01Page.date_textInput).setValue('30/07/2021')
    await (await PRLineItems_02Page.next_button).click() // click=23
  })

  it('should execute PRLineItems_02Page', async () => {
    await (await PRLineItems_02Page.errorMsg1_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg1_li)).toHaveTextContaining('BARIUM NITRATE: Supplier is required.') // assertText=26
    await (await PRLineItems_02Page.errorMsg2_li).click() // click=25
    await expect((await PRLineItems_02Page.errorMsg2_li)).toHaveTextContaining('BARIUM NITRATE: Downpayment Date is invalid.') // assertText=26
    await (await PRLineItems_02Page.supplier_textInput).click() // click=24
    await (await PRLineItems_02Page.supplier_textInput).setValue('1 PL')
  })

  it('should execute PRLineItems_03Page', async () => {
    await (await PRLineItems_03Page._1PlusPrivateLimited_span).click() // click=25
    await (await PRLineItems_03Page._01082021_textInput).click() // click=26
  })

  it('should execute PRLineItems_05Page', async () => {
    await (await PRLineItems_05Page.percentageAmountDueDate_div).click() // click=27
    await (await PRLineItems_05Page._01082021_textInput).setValue('30/08/2021') // change=28 - else textInput
    await (await PRLineItems_05Page.next_button).click() // click=29
  })

  it('should execute PRAccountAssignmentPage', async () => {
    await expect(await PRAccountAssignmentPage.accountAssignment_div).toHaveTextContaining('Account Assignment') // assertText=30
    await (await PRAccountAssignmentPage.menulogout_link).click() 
  })
})
