// noinspection DuplicatedCode

const prsUtil = require('../../common/utils');

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/sqrr/PrsLogin.page');
const PrsAppHomePage = require('../../pageobjects/sqrr/PrsAppHome.page');
const PrsAppPurchaseSearchPage = require('../../pageobjects/sqrr/PrsAppPurchaseSearch.page');
const PrsAppPurchaseViewPage = require('../../pageobjects/sqrr/PrsAppPurchaseView.page');
const PrsAppPurchaseNewSqrrItems = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrItems.page');

describe('SQRR: Items', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'chekawis');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '697');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  /** Add/Remove line items **/
  it('should execute PrsAppPurchaseNewSqrrItems_AddRemove_LineItems', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.removeLineItemButton(0));
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toExist();
  });

  /** Downpayment */
  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentCategory', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentCategory: At least one', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.nextAndVerifyErrorExists('Please enter in at least one downpayment item.');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentPercentage', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '0');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Percentage must be between 0.01 and 100 (inclusive).');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Percentage must be between 0.01 and 100 (inclusive).');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '100.01');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Percentage must be between 0.01 and 100 (inclusive).');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '99.001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Percentage must be up to 2 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '99.00');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Percentage');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentAmount', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '0');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Amount must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Amount must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '0.991');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Amount must be up to 2 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '0.99');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment amount');

    // TODO: Validation not in yet.
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '1.01');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Amount must be between 0.01 and 1 (inclusive).');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentAmount + DownpaymentPercentage', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '0.99');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0), '99.00');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Please enter either downpayment percentage or amount.');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems_DownpaymentDate', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    let selected = await (await (await PrsAppPurchaseNewSqrrItems.downpaymentCategory)).isSelected();
    if (selected) {
      // Uncheck
      await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    }

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0), '0.99');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0), 'Bad Input');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Date is required.');

    let yesterday = new Date(Date.now() - 24*60*60*1000);
    let badInput = String(yesterday.getDate()).padStart(2, '0') + '/' + String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + yesterday.getFullYear();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0), badInput);
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Date is invalid.');

    let today = new Date();
    let goodInput = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0), goodInput);
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Downpayment Date');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.downpaymentCategory);
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentPercentageInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentAmountInput(0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.downpaymentDueDateInput(0)).not.toExist();

    await prsUtil.clearLineItems();
  });


  /** Common fields */
  it('should execute PrsAppPurchaseNewSqrrItems Unit Price', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Unit Price is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Unit Price must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '0.0001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Unit Price must be up to 3 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '99');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Unit Price');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), 'abc', '');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Quantity', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Quantity is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Quantity must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1'.repeat(8));
    await prsUtil.nextAndVerifyErrorExists(
        'KHAIRUL-MIXTURE CHEMICAL: Quantity is too long. Maximum length is 7.',
        'KHAIRUL-MIXTURE CHEMICAL: Quantity must be less than or equal to 9999999.',
      );

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '99');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Quantity');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), 'abc', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1.0', '10');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems SubTotal', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(0), 'SGD - Singapore Dollar');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '10');

    await (await (await PrsAppPurchaseNewSqrrItems.subTotalSpan(0))).waitForExist();
    await expect(await PrsAppPurchaseNewSqrrItems.subTotalSpan(0)).toHaveText('SGD 10.00');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(0), 'USD - U.S. Dollar');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1.25');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '2');

    await (await (await PrsAppPurchaseNewSqrrItems.subTotalSpan(0))).waitForExist();
    await expect(await PrsAppPurchaseNewSqrrItems.subTotalSpan(0)).toHaveText('USD 2.50');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(0), 'SGD - Singapore Dollar');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '10');

    await (await (await PrsAppPurchaseNewSqrrItems.subTotalSpan(0))).waitForExist();
    await expect(await PrsAppPurchaseNewSqrrItems.subTotalSpan(0)).toHaveText('SGD 10.00');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.unitSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Unit is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.unitSelect(0), 'Ea');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Unit');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.unitSelect(0), 'Box');
    await expect(await PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0)).toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Quantity Per Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.unitSelect(0), 'Box');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: No. of Items In Box is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: No. of Items In Box must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), 'abc', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), '1.0', '10');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityPerUnitInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '1.25');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '4');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(0), 'SGD - Singapore Dollar');

    await (await (await PrsAppPurchaseNewSqrrItems.subTotalSpan(0))).waitForExist();
    await expect(await PrsAppPurchaseNewSqrrItems.subTotalSpan(0)).toHaveText('SGD 25.00');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Supplier', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Supplier is required.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Supplier');

    await prsUtil.clearLineItems();
  });

  /** Additional Charges */
  it('should execute PrsAppPurchaseNewSqrrItems Additional Charges', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await (await (await PrsAppPurchaseNewSqrrItems.lineItemDiv(1))).waitForExist();

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), '');
    await prsUtil.nextAndVerifyErrorNotExists('Additional Charges: Description is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1), '1.25');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), '');
    await prsUtil.nextAndVerifyErrorExists('Additional Charges: Description is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), 'TEST');
    await prsUtil.nextAndVerifyErrorNotExists('Additional Charges');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), '0'.repeat(221));
    await prsUtil.nextAndVerifyErrorExists('Additional Charges: Description is too long. Maximum length is 220.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), '😊');
    await prsUtil.nextAndVerifyErrorExists('Additional Charges: Description contains invalid characters');

    await prsUtil.clearLineItems();
  });

  /** Chemical */
  it('should execute PrsAppPurchaseNewSqrrItems Chemical Packaging Size', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Packaging Size is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Packaging Size must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '0.0001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Packaging Size must be up to 3 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), 'abc', '');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Chemical Packaging Size Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Packaging Size Unit of Measure is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'L');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Packaging Size Unit of Measure');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Chemical Concentration', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.concentrationInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Concentration must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.concentrationInput(0), '0.0001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Concentration must be up to 3 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.concentrationInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.concentrationInput(0), 'abc', '');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Chemical Concentration Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.concentrationInput(0), '1');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.concentrationUnitSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Concentration Unit is invalid.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.concentrationUnitSelect(0), 'Grams/Litre');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Concentration Unit is invalid.');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Chemical Manufacturer', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Manufacturer is required.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL-MIXTURE CHEMICAL: Manufacturer');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Chemical Product Number', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(51));
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Product Number is too long. Maximum length is 50.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(50));
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL-MIXTURE CHEMICAL: Product Number');

    await prsUtil.clearLineItems();
  });

  /** Radioactive */
  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Physical Form', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Physical Form is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(0), 'Gas');
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Physical Form');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Packaging Size', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Packaging Size is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Packaging Size must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '0.0001');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Packaging Size must be up to 3 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '', '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), 'abc', '');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Packaging Size Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(0), 'Liquid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Packaging Size Unit of Measure is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'L');
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Packaging Size Unit of Measure');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(0), 'Solid');
    try {
      await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'L');
    } catch (e) {
      await expect(await (await PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0))).toHaveValue('');
    }
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Unit of Measure is invalid.');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Manufacturer', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Manufacturer is required.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Manufacturer');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Product Number', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(201));
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Product Number is too long. Maximum length is 200.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '>');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Product Number contains invalid characters');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(50));
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Product Number');

    await prsUtil.clearLineItems();
  });

  // TODO: Not implemented yet.
  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Material Name', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productDescriptionInput(0), '0'.repeat(201));
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Radioactive Material Name is too long. Maximum length is 200.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productDescriptionInput(0), '>');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Radioactive Material Name contains invalid characters');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productDescriptionInput(0), '0'.repeat(50));
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Radioactive Material Name');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Activity Concentration (Unsealed Only)', async () => {
    // Verify activity concentration field does not exist for sealed.
    await prsUtil.addFreshSqrrLineItem(2, 0);
    await expect(await PrsAppPurchaseNewSqrrItems.notationTypeReal(0, 0, 'CONCENTRATION')).not.toExist();

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.addFreshSqrrLineItem(3, 0);
    await expect(await PrsAppPurchaseNewSqrrItems.notationTypeReal(0, 0, 'CONCENTRATION')).toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Activity Concentration (Unsealed Only) Real', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.notationTypeReal(0, 0, 'CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION'), '');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION'), '0.00000000000000000000001');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 is invalid.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION'), '0.0000001');
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Activity Concentration for');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Activity Concentration (Unsealed Only) Real Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.notationTypeReal(0, 0, 'CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION'), '0.0000001');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.notationTypeUnitSelect(0, 0, 'CONCENTRATION'), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration Unit for KHAI-888 is invalid.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.notationTypeUnitSelect(0, 0, 'CONCENTRATION'), 'Bq/g');
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Activity Concentration Unit');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Activity Concentration (Unsealed Only) Scientific Notation', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.notationTypeScientific(0, 0, 'CONCENTRATION'));

    // Verify real fields disappear and scientific fields appear.
    await expect(await PrsAppPurchaseNewSqrrItems.notationTypeRealInput(0, 0, 'CONCENTRATION')).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION')).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION')).toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Activity Concentration (Unsealed Only) Scientific Notation Value', async () => {
    await prsUtil.addFreshSqrrLineItem(3, 0);

    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.notationTypeScientific(0, 0, 'CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 is required.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '-1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '0.000000000000000000000000000000001');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 Coefficient is invalid.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '-64.01');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 Exponent must be between -64 and 64 (inclusive)');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '64.01');
    await prsUtil.nextAndVerifyErrorExists('KHAI-888: Activity Concentration for KHAI-888 Exponent must be between -64 and 64 (inclusive)');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificCoefficientInput(0, 0, 'CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.notationTypeScientificExponentInput(0, 0, 'CONCENTRATION'), '64');
    await prsUtil.nextAndVerifyErrorNotExists('KHAI-888: Activity Concentration for');

    await prsUtil.clearLineItems();
  });

  /** Biological */
  it('should execute PrsAppPurchaseNewSqrrItems Biological Genetically Modified (non-toxin)', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    // Displays for non-toxin
    await expect(await PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0)).toExist();

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorNotExists('Genetically Modified');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0), 'No');
    await prsUtil.nextAndVerifyErrorNotExists('Genetically Modified');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Genetically Modified (toxin)', async () => {
    await prsUtil.addFreshSqrrLineItem(14, 0);

    // Does not display for toxin
    await expect(await PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0)).not.toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Product Format', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    // Displays for non-toxin
    await expect(await PrsAppPurchaseNewSqrrItems.productFormatSelect(0)).toExist();

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.productFormatSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorNotExists('Product Format');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.productFormatSelect(0), 'LIVE');
    await prsUtil.nextAndVerifyErrorNotExists('Product Format');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Biosafety Level', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    // Displays for non-toxin
    await expect(await PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0)).toExist();

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Biosafety Level is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0), 'ACL');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Biosafety Level is required.');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Packaging Size', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size is required');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '0.0001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size must be up to 3 decimal places.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), 'abc', '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size is required');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Packaging Size Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size Unit of Measure is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'IU');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Packaging Size Unit');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Manufacturer', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Manufacturer is required.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Manufacturer');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Product Number / ATCC Number / ADDGENE Catalogue Number', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(201));
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Product Number / ATCC Number / ADDGENE Catalogue Number is too long. Maximum length is 200.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '>');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Product Number / ATCC Number / ADDGENE Catalogue Number contains invalid characters: >');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.productManufacturerNumberInput(0), '0'.repeat(50));
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Product Number / ATCC Number / ADDGENE Catalogue Number');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Concentration / Count (all except Arthropods)', async () => {
    // Verify activity concentration field does not exist for sealed.
    await prsUtil.addFreshSqrrLineItem(15, 0);
    await expect(await PrsAppPurchaseNewSqrrItems.bioNotationTypeReal(0, 'BIO-CONCENTRATION')).not.toExist();

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.addFreshSqrrLineItem(6, 0);
    await expect(await PrsAppPurchaseNewSqrrItems.bioNotationTypeReal(0, 'BIO-CONCENTRATION')).toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Concentration / Count Real', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.bioNotationTypeReal(0, 'BIO-CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION'), '0.00000000000000000000001');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count is invalid.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION'), '0.0000001');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count is');

    // Only required if unit is set.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioNotationTypeUnitSelect(0, 'BIO-CONCENTRATION'), 'g/ml');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION'), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count is required.');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Concentration / Count Real Unit', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    // Verify activity concentration field exists for Unsealed.
    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.bioNotationTypeReal(0, 'BIO-CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION'), '0.0000001');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioNotationTypeUnitSelect(0, 'BIO-CONCENTRATION'), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count Unit is required.');

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioNotationTypeUnitSelect(0, 'BIO-CONCENTRATION'), 'g/ml');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count Unit');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Concentration / Count Scientific Notation', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.bioNotationTypeScientific(0,  'BIO-CONCENTRATION'));

    // Verify real fields disappear and scientific fields appear.
    await expect(await PrsAppPurchaseNewSqrrItems.bioNotationTypeRealInput(0, 'BIO-CONCENTRATION')).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION')).toExist();
    await expect(await PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0,  'BIO-CONCENTRATION')).toExist();

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Concentration / Count Scientific Notation Value', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.clickElement(await PrsAppPurchaseNewSqrrItems.bioNotationTypeScientific(0, 'BIO-CONCENTRATION'));

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '-1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0, 'BIO-CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '0.0000001');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0, 'BIO-CONCENTRATION'), '-1');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count Coefficient is invalid.');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0,  'BIO-CONCENTRATION'), '-64.01');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count Exponent must be between -64 and 64 (inclusive)');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0, 'BIO-CONCENTRATION'), '64.01');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count Exponent must be between -64 and 64 (inclusive)');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0,  'BIO-CONCENTRATION'), '64');
    await prsUtil.nextAndVerifyErrorNotExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count is');

    // Only required if unit is set.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioNotationTypeUnitSelect(0, 'BIO-CONCENTRATION'), 'g/ml');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificCoefficientInput(0, 'BIO-CONCENTRATION'), '');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.bioNotationTypeScientificExponentInput(0, 'BIO-CONCENTRATION'), '');
    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Concentration / Count is required.');

    await prsUtil.clearLineItems();
  });

  /** Approved Quantity Calculations */
  it('should execute PrsAppPurchaseNewSqrrItems Chemical Approved Quantity', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'L');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0)).toHaveTextContaining('1.00 L');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'mL');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0)).toHaveTextContaining('0.00 L');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '100');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '2');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'mL');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0)).toHaveTextContaining('0.20 L');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '100');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '20');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'mL');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0)).toHaveTextContaining('2.00 L');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(0))).parentElement()).toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).toHaveElementClass('bg-danger');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Radioactive Approved Quantity', async () => {
    await prsUtil.addFreshSqrrLineItem(4, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(4)).toHaveTextContaining('1.00 Ea');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(4))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '2');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(4)).toHaveTextContaining('2.00 Ea');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(4))).parentElement()).toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).toHaveElementClass('bg-danger');

    await prsUtil.clearLineItems();
  });

  it('should execute PrsAppPurchaseNewSqrrItems Biological Approved Quantity', async () => {
    // Bio does not need to compare to approved quantity.
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(6)).toHaveTextContaining('1.00 EA');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(6))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '100');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await expect(await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(6)).toHaveTextContaining('100.00 EA');
    await expect((await (await PrsAppPurchaseNewSqrrItems.sqrrQuantityTd(6))).parentElement()).not.toHaveElementClass('bg-danger');
    await expect(await PrsAppPurchaseNewSqrrItems.lineItemDiv(0)).not.toHaveElementClass('bg-danger');

    await prsUtil.clearLineItems();
  });

  /** Biological Check Database */
  it('should execute PrsAppPurchaseNewSqrrItems Biological Exist in DB', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0), 'Yes');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0), 'BSL-2');

    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: - Product does not exist in LMMS.');

    await prsUtil.clearLineItems();
  });

  /** Internal Supplier Check */
  it('should execute PrsAppPurchaseNewSqrrItems Internal Supplier Check', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0), 'Yes');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Chemstore');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.nextAndVerifyErrorExists('KHAIRUL SCIENTIFIC NAME 1: Please supply a quote from an external supplier.');

    await prsUtil.clearLineItems();
  });

  /** Supplier Multi Currency Check */
  it('should execute PrsAppPurchaseNewSqrrItems Supplier Multiple Currency Check', async () => {
    await prsUtil.addFreshSqrrLineItem(6, 0);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0), 'Yes');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0), 'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(0), 'SGD - Singapore Dollar');

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.additionalChargeInput(1), 'test');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.currencySelect(1), 'USD - U.S. Dollar');

    await prsUtil.nextAndVerifyErrorExists('Multiple currencies selected for supplier Aik Moh Paints & Chemicals Pte Ltd: SGD, USD');

    await prsUtil.clearLineItems();
  });

  /** Duplicate line item Check */
  it('should execute PrsAppPurchaseNewSqrrItems Duplicate line item Check', async () => {
    await prsUtil.addFreshSqrrLineItem(0, 0);
    await prsUtil.addSqrrLineItem(0, 1);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0), '1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1), '5');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1), '1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.nextAndVerifyErrorExists('Items in lines 1, 2 are the same.');

    await prsUtil.clearLineItems();
  });
});