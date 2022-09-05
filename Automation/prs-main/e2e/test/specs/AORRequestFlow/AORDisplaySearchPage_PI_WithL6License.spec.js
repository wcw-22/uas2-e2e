
/*** Generated spec file ***/
const POOne_PrsLoginPage = require('../pageobjects/AORDisplaySearchPage_PI_WithL6License/POOne_PrsLogin.page')
const POFour_PrsAppHome_ClickNewRequestPage = require('../pageobjects/AORDisplaySearchPage_PI_WithL6License/POFour_PrsAppHome_ClickNewRequest.page')
const POSeven_PrsAppNewRequest_SelectAORPage = require('../pageobjects/AORDisplaySearchPage_PI_WithL6License/POSeven_PrsAppNewRequest_SelectAOR.page')
const POEight_PrsAppNewRequest_AssertPage = require('../pageobjects/AORDisplaySearchPage_PI_WithL6License/POEight_PrsAppNewRequest_Assert.page')
const loginData = require('../testdata/AORTabAccess')



describe('Laboratory Materials Purchase Requisition System', () => {

  loginData.runs.forEach(function (run) {

  it('should execute POOne_PrsLoginPage', async () => {
    await POOne_PrsLoginPage.open()

    await (await POOne_PrsLoginPage.nusnetIdLogin_div).click() // click=0
    await (await POOne_PrsLoginPage.loginas_textInput).click() // click=1
    await (await POOne_PrsLoginPage.loginas_textInput).setValue(run.nusnetId) // change=2 - else textInput
    await (await POOne_PrsLoginPage.login_button).click() // click=3
  })

  it('should execute POFour_PrsAppHome_ClickNewRequestPage', async () => {
    await (await POFour_PrsAppHome_ClickNewRequestPage.newRequest_link).click() // click=4
  })

  it('should execute POSeven_PrsAppNewRequest_SelectAORPage', async () => {
    await (await POSeven_PrsAppNewRequest_SelectAORPage.approvalOfRequirementEpv5000_radioInput).click() // click=5
    await (await POSeven_PrsAppNewRequest_SelectAORPage.approvalOfRequirementEpv5000_radioInput).click() // change=6 - radioInput
    await (await POSeven_PrsAppNewRequest_SelectAORPage.next_span).click() // click=7
  })

  it('should execute POEight_PrsAppNewRequest_AssertPage', async () => {


    let chemicalSpan = await POEight_PrsAppNewRequest_AssertPage.chemical_span
    letisExistingChemicalTab = await chemicalSpan.isExisting()
    expect(letisExistingChemicalTab).toBe(true)

    letBioSpan = await POEight_PrsAppNewRequest_AssertPage.biological_span
    letisExistingBioTab = await letBioSpan.isExisting()
    expect(letisExistingBioTab).toBe(true)

    letRadioSpan = await POEight_PrsAppNewRequest_AssertPage.radioactive_span
    letisExistingRadioTab = await letRadioSpan.isExisting()

    if(run.isLicensed)
    {      
      await expect(letisExistingRadioTab).toBe(true)
    }
    if(!run.isLicensed)
    {      
      await expect(letisExistingRadioTab).toBe(false)
    }

    })
  })

})
