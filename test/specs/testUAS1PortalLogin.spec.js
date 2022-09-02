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
  })
})
