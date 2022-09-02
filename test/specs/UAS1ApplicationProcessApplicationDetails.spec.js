'use strict';

/*** Generated spec file ***/
const AdfsOauth2AuthorizePage = require('../pageobjects/testUAS1PortalLogin/AdfsOauth2Authorize.page')
const UasLogin_01Page = require('../pageobjects/testUAS1PortalLogin/UasLogin_01.page')
const UasServletSearchapplication_01Page = require('../pageobjects/testUAS1PortalLogin/UasServletSearchapplication_01.page')
let dataVariables = {};

describe('Sign In', () => {
  it('should execute AdfsOauth2AuthorizePage', async () => {
    await AdfsOauth2AuthorizePage.open()
    browser.pause(30000)

    await (await AdfsOauth2AuthorizePage.usernameinput_emailInput).click() // click=0
    await (await AdfsOauth2AuthorizePage.usernameinput_emailInput).setValueByKeys('nusstf\\wcw-22') // change=1
    await (await AdfsOauth2AuthorizePage.passwordinput_passwordInput).click() // click=0
    await (await AdfsOauth2AuthorizePage.passwordinput_passwordInput).setValueByKeys('P#$$word8899') // change=2
    await (await AdfsOauth2AuthorizePage.submitbutton_span).click() // click=3
  })

  it('should execute UasLogin_01Page', async () => {
    await (await UasLogin_01Page.webfxMenuObject232_link).click() // click=4
    await (await UasLogin_01Page.webfxMenuObject3_link).click() // click=5
  })

  it('should execute UasServletSearchapplication_01Page', async () => {
    await (await UasServletSearchapplication_01Page.searchstr_textInput).click() // click=6
    await (await UasServletSearchapplication_01Page.searchstr_textInput).setValueByKeys('33000576') // change=7
    await (await UasServletSearchapplication_01Page.submit_submitInput).click() // click=8
    browser.pause(50000)
  })
})

/*** Generated spec file ***/
const UasServletSearchapplicationPage = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletSearchapplication.page')
const UasServletSearchapplication_02Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletSearchapplication_02.page')
const UasServletSearchapplication_04Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletSearchapplication_04.page')
const UasServletUpdateapplnparticulars_01Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletUpdateapplnparticulars_01.page')
const UasServletUpdateapplnparticulars_02Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletUpdateapplnparticulars_02.page')
const UasServletSearchapplication_05Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletSearchapplication_05.page')
const UasServletSearchapplication_07Page = require('../pageobjects/UAS1ApplicationProcessApplicationDetails/UasServletSearchapplication_07.page')


describe('UAS Backend System', () => {

  it('should execute UasServletSearchapplication_04Page', async () => {
    await (await UasServletSearchapplication_04Page.applicationDetails_link).click() // click=5
  })

  it('should execute UasServletUpdateapplnparticulars_01Page', async () => {
    await (await UasServletUpdateapplnparticulars_01Page.back_submitInput).click() // click=6
  })

  it('should execute UasServletUpdateapplnparticulars_02Page', async () => {
    await expect(await UasServletUpdateapplnparticulars_02Page._9999_b).toHaveTextContaining('9999') // assertText=7
    await expect(await UasServletUpdateapplnparticulars_02Page._24082022_b).toHaveTextContaining('24/08/2022') // assertText=8
    await expect(await UasServletUpdateapplnparticulars_02Page.received_b).toHaveTextContaining('RECEIVED') // assertText=9
    await expect(await UasServletUpdateapplnparticulars_02Page.normalFee_b).toHaveTextContaining('NORMAL FEE') // assertText=10
    const nolabel_td1 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td1).getText()
    expect(nolabel_td1).toEqual('')
    const nolabel_td2 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td2).getText()
    expect(nolabel_td2).toEqual('')
    const nolabel_td3 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td3).getText()
    expect(nolabel_td3).toEqual('')
    const nolabel_td4 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td4).getText()
    expect(nolabel_td4).toEqual('')
    const nolabel_td5 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td5).getText()
    expect(nolabel_td5).toEqual('')
    const nolabel_td6 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td6).getText()
    expect(nolabel_td6).toEqual('')
    await expect(await UasServletUpdateapplnparticulars_02Page.documentsUploaded_b).toHaveTextContaining('DOCUMENTS UPLOADED') // assertText=17
    await expect(await UasServletUpdateapplnparticulars_02Page.awaitingPayment_b).toHaveTextContaining('AWAITING PAYMENT') // assertText=18
    const nolabel_td7 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td7).getText()
    expect(nolabel_td7).toEqual('')
    const nolabel_td8 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td8).getText()
    expect(nolabel_td8).toEqual('')
    const nolabel_td9 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td9).getText()
    expect(nolabel_td9).toEqual('')
    const nolabel_td10 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td10).getText()
    expect(nolabel_td10).toEqual('')
    const nolabel_td11 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td11).getText()
    expect(nolabel_td11).toEqual('')
    const nolabel_td12 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td12).getText()
    expect(nolabel_td12).toEqual('')
    await expect(await UasServletUpdateapplnparticulars_02Page._2024_b).toHaveTextContaining('2024') // assertText=25
    const nolabel_td13 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td13).getText()
    expect(nolabel_td13).toEqual('')
    const nolabel_td14 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td14).getText()
    expect(nolabel_td14).toEqual('')
    const nolabel_td15 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td15).getText()
    expect(nolabel_td15).toEqual('')
    const nolabel_td16 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td16).getText()
    expect(nolabel_td16).toEqual('')
    await expect(await UasServletUpdateapplnparticulars_02Page.n_b).toHaveTextContaining('N') // assertText=30
    await expect(await UasServletUpdateapplnparticulars_02Page.scHaveNotReceivedAnyTg_b).toHaveTextContaining('SC have not received any TG') // assertText=31
    const nolabel_td17 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td17).getText()
    expect(nolabel_td17).toEqual('')
    const nolabel_td18 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td18).getText()
    expect(nolabel_td18).toEqual('')
    await expect(await UasServletUpdateapplnparticulars_02Page._b).toHaveTextContaining('--') // assertText=34
    const nolabel_td19 = await(await UasServletUpdateapplnparticulars_02Page.nolabel_td19).getText()
    expect(nolabel_td19).toEqual('')
    await expect(await UasServletUpdateapplnparticulars_02Page.nolabel_h2).toHaveTextContaining('A Level Application Processing') // assertText=36
    await expect(await UasServletUpdateapplnparticulars_02Page._33000576OngZhiPing_h2).toHaveTextContaining('(33000576 / ONG ZHI PING )') // assertText=37
  })


})
