// noinspection DuplicatedCode

const prsUtil = require('../../common/utils')

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/sqrr/PrsLogin.page');
const PrsAppHomePage = require('../../pageobjects/sqrr/PrsAppHome.page');
const PrsAppPurchaseSearchPage = require('../../pageobjects/sqrr/PrsAppPurchaseSearch.page');
const PrsAppPurchaseViewPage = require('../../pageobjects/sqrr/PrsAppPurchaseView.page');
const PrsAppSwitchrolePage = require("../../pageobjects/sqrr/PrsAppSwitchrole.page");


describe('SQRR: Submit SQRR: PI', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEKAWIS');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '529');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).toExist();
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should be in SQRR lineitems page.', async () => {
    await expect(browser).toHaveUrlContaining('/prs/app/purchase/new/sqrr/items/');
  })
});

describe('SQRR: Submit SQRR: PI: AOR raised by PI\'s researcher', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEKAWIS');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '540');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).not.toExist();
  });
});

describe('SQRR: Submit SQRR: PI: AOR raised by Lab Admin', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEKAWIS');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '542');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).not.toExist();
  });
});

describe('SQRR: Submit SQRR: PI: AOR raised by delegate of PI', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEKAWIS');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '537');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).toExist();
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should be in SQRR lineitems page.', async () => {
    await expect(browser).toHaveUrlContaining('/prs/app/purchase/new/sqrr/items/');
  })
});

describe('SQRR: Submit SQRR: Delegate of PI', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEWM');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppSwitchrole_01Page', async () => {
    await expect(await PrsAppSwitchrolePage.role(0)).toExist();
    await prsUtil.clickElement(PrsAppSwitchrolePage.role(0));
  })

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '537');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).toExist();
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should be in SQRR lineitems page.', async () => {
    await expect(browser).toHaveUrlContaining('/prs/app/purchase/new/sqrr/items/');
  })
});

describe('SQRR: Submit SQRR: Lab Admin', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEKLK');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '542');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).toExist();
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should be in SQRR lineitems page.', async () => {
    await expect(browser).toHaveUrlContaining('/prs/app/purchase/new/sqrr/items/');
  })
});

describe('SQRR: Submit SQRR: Researcher', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'CHEHKG');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '540');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await expect(await PrsAppPurchaseViewPage.submitSqrrButton).toExist();
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should be in SQRR lineitems page.', async () => {
    await expect(browser).toHaveUrlContaining('/prs/app/purchase/new/sqrr/items/');
  })
});
