// noinspection DuplicatedCode

const chai = require('chai');
const assert = chai.assert;

const prsUtil = require('../../common/utils');

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/sqrr/PrsLogin.page');
const PrsAppHomePage = require('../../pageobjects/sqrr/PrsAppHome.page');
const PrsAppPurchaseSearchPage = require('../../pageobjects/sqrr/PrsAppPurchaseSearch.page');
const PrsAppPurchaseViewPage = require('../../pageobjects/sqrr/PrsAppPurchaseView.page');
const PrsAppPurchaseNewSqrrItems = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrItems.page');
const PrsAppPurchaseNewSqrrAccountAssignment = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrAccountAssignment.page');

describe('SQRR: Account Assignment: Single WBS: Single Supplier', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'chekawis');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '693');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should execute setup line items', async () => {
    await prsUtil.clearLineItems();

    // Chemical Item
    await prsUtil.addFreshSqrrLineItem(0, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Radioactive item
    await prsUtil.addSqrrLineItem(4, 1);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1),'999');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(1),'Solid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1),'1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(1),'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Biological item
    await prsUtil.addSqrrLineItem(15, 2);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(2), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(2),'1000');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(2),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(2), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(2), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(2),'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute default wbs gl account', async () => {
    // No account selected.
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Please Select selected.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Account selected.
    let availableAccounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    console.log('Accounts:\n\t', availableAccounts.map(a => 'wbs=' + a.wbs + ', gl=' + a.gl).join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');

    let approver1 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    console.log('Approver 1:\n\t', approver1.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 2 is required.');

    let approver2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    console.log('Approver 2: ', approver2.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 1 must not be the same person as Approver 2.');

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);
    await prsUtil.nextAndVerifyErrorNotExists();
  });
});

describe('SQRR: Account Assignment: Multiple WBS: Single Supplier', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'chekawis');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '726');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should execute setup line items', async () => {
    await prsUtil.clearLineItems();

    // Chemical Item
    await prsUtil.addFreshSqrrLineItem(0, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Radioactive item
    await prsUtil.addSqrrLineItem(4, 1);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1),'999');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(1),'Solid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1),'1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(1),'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Biological item
    await prsUtil.addSqrrLineItem(15, 2);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(2), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(2),'1000');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(2),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(2), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(2), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(2),'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);

    // TODO: Validate line item descriptions
  });

  it('should execute default wbs gl account', async () => {
    // No account selected.
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Please Select selected.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Account selected.
    let availableAccounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    console.log('Accounts:\n\t', availableAccounts.map(a => 'wbs=' + a.wbs + ', gl=' + a.gl).join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');
  });

  it('should execute account splitting', async () => {
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).not.toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();
  });

  it('should execute account splitting quantity color check', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5317 = -1;
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        idx5317 = i;
      }
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '2');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).toHaveElementClass('danger');

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '1');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).not.toHaveElementClass('danger');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).toExist();

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1), '0.01');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).toHaveElementClass('danger');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();
  });

  it('should execute account subtotal over color check', async () => {
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);

    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx = 0;
    for (let i = 0; i < accounts.length; i++, idx++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        break;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx);
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountRow(accounts[idx].wbs))).toHaveElementClass('danger');

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 0);
  });

  it('should execute account splitting subtotal check', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5317 = -1;
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        idx5317 = i;
      }
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5317);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '2');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 1));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 1, 0), idx5317);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 1, 0), '1');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 1));

    let subTotals = await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountSubTotals();
    console.log('Subtotals: ', subTotals);
    assert.equal(subTotals['A-0005298-00-00'], 'SGD 1,000.00', 'Subtotal for A-0005298-00-00 not as expected.');
    assert.equal(subTotals['A-0005317-00-00'], 'SGD 2,331.00', 'Subtotal for A-0005317-00-00 not as expected.');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 1, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));

    let subTotals2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountSubTotals();
    assert.equal(subTotals2['A-0005298-00-00'], 'SGD 2,665.00', 'Subtotal for A-0005298-00-00 not as expected.');
    console.log('Subtotals: ', subTotals);
  });

  it('should execute approvers', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');

    let approver1 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    console.log('Approver 1:\n\t', approver1.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 2 is required.');

    let approver2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    console.log('Approver 2: ', approver2.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 1 must not be the same person as Approver 2.');

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);
    await prsUtil.nextAndVerifyErrorNotExists();
  });
});

describe('SQRR: Account Assignment: Single WBS: Multiple Supplier', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'chekawis');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '693');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should execute setup line items', async () => {
    await prsUtil.clearLineItems();

    // Chemical Item
    await prsUtil.addFreshSqrrLineItem(0, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Radioactive item
    await prsUtil.addSqrrLineItem(4, 1);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1),'999');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(1),'Solid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1),'1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(1),'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), '01 COMPUTER SYSTEM PTE LTD');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Biological item
    await prsUtil.addSqrrLineItem(15, 2);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(2), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(2),'1000');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(2),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(2), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(2), '1 PLUS PRIVATE LIMITED');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(2),'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(1, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(1, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(2, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(2, 1)).not.toExist();
  });

  it('should execute default wbs gl account', async () => {
    // No account selected.
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Please Select selected.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Account selected.
    let availableAccounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    console.log('Accounts:\n\t', availableAccounts.map(a => 'wbs=' + a.wbs + ', gl=' + a.gl).join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');

    let approver1 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    console.log('Approver 1:\n\t', approver1.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 2 is required.');

    let approver2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    console.log('Approver 2: ', approver2.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 1 must not be the same person as Approver 2.');

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);
    await prsUtil.nextAndVerifyErrorNotExists();
  });
});

describe('SQRR: Account Assignment: Multiple WBS: Multiple Supplier', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open();

    await prsUtil.setElementValue(PrsLoginPage.loginAsInput, 'chekawis');
    await prsUtil.clickElement(PrsLoginPage.loginButton);
  });

  it('should execute PrsAppHome_01Page', async () => {
    await prsUtil.clickElement(PrsAppHomePage.searchRequestLink);
  });

  it('should execute PrsAppPurchaseSearchPage', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSearchPage.prAorSqrrNumberInput, '726');
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.searchButton);
    await prsUtil.clickElement(PrsAppPurchaseSearchPage.firstSearchResult);
  });

  it('should execute PrsAppPurchaseViewPage', async () => {
    await prsUtil.clickElement(PrsAppPurchaseViewPage.submitSqrrButton);
  });

  it('should execute setup line items', async () => {
    await prsUtil.clearLineItems();

    // Chemical Item
    await prsUtil.addFreshSqrrLineItem(0, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Radioactive item
    await prsUtil.addSqrrLineItem(4, 1);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1),'999');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(1),'Solid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1),'1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(1),'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), '01 COMPUTER SYSTEM PTE LTD');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Biological item
    await prsUtil.addSqrrLineItem(15, 2);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(2), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(2),'1000');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(2),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(2), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(2), '1 PLUS PRIVATE LIMITED');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(2),'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(1, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(1, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(2, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(2, 1)).not.toExist();

    // TODO: Validate line item descriptions
  });

  it('should execute default wbs gl account', async () => {
    // No account selected.
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Please Select selected.
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 'Please Select');
    await prsUtil.nextAndVerifyErrorExists('WBS is required.');

    // Account selected.
    let availableAccounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    console.log('Accounts:\n\t', availableAccounts.map(a => 'wbs=' + a.wbs + ', gl=' + a.gl).join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');
  });

  it('should execute account splitting', async () => {
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).not.toExist();

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();
  });

  it('should execute account splitting quantity color check', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5317 = -1;
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        idx5317 = i;
      }
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).toExist();

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '2');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).toHaveElementClass('danger');

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '1');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).not.toHaveElementClass('danger');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1)).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 1)).toExist();

    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 1), idx5298);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 1), '0.01');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0))).toHaveElementClass('danger');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0)).not.toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0)).not.toExist();
  });

  it('should execute account subtotal over color check', async () => {
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);

    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx = 0;
    for (let i = 0; i < accounts.length; i++, idx++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        break;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx);
    console.log('Checking for:', accounts[idx].wbs)
    await expect(await (await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountRow(accounts[idx].wbs))).toHaveElementClass('danger');

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 0);
  });

  it('should execute account splitting subtotal check', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5317 = -1;
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005317-00-00') {
        idx5317 = i;
      }
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }

    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(0, 0));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(0, 0, 0), idx5317);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(0, 0, 0), '2');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(0, 0));

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.splitItemAssignmentButton(1, 0));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentWBSGLAccount(1, 0, 0), idx5317);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrAccountAssignment.accountAssignmentQuantityInput(1, 0, 0), '1');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.lineItemRow(1, 0));

    let subTotals = await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountSubTotals();
    console.log('Subtotals: ', subTotals);
    assert.equal(subTotals['A-0005298-00-00'], 'SGD 1,000.00', 'Subtotal for A-0005298-00-00 not as expected.');
    assert.equal(subTotals['A-0005317-00-00'], 'SGD 2,331.00', 'Subtotal for A-0005317-00-00 not as expected.');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(1, 0, 0));
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.removeItemAssignmentButton(0, 0, 0));

    let subTotals2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprovedAccountSubTotals();
    assert.equal(subTotals2['A-0005298-00-00'], 'SGD 2,665.00', 'Subtotal for A-0005298-00-00 not as expected.');
    console.log('Subtotals: ', subTotals);
  });

  it('should execute approvers', async () => {
    let accounts = await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    let idx5298 = -1;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].wbs === 'A-0005298-00-00') {
        idx5298 = i;
      }
    }
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, idx5298);

    // Now that account is selected, verify approvers pop up.
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver1Select).toExist();
    await expect(await PrsAppPurchaseNewSqrrAccountAssignment.approver2Select).toExist();
    await prsUtil.nextAndVerifyErrorExists('Approver 1 is required.', 'Approver 2 is required.');

    let approver1 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    console.log('Approver 1:\n\t', approver1.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 2 is required.');

    let approver2 = await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    console.log('Approver 2: ', approver2.join('\n\t'));
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 1);
    await prsUtil.nextAndVerifyErrorExists('Approver 1 must not be the same person as Approver 2.');

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);
    await prsUtil.nextAndVerifyErrorNotExists();
  });
});