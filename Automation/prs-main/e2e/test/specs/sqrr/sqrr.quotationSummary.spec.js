// noinspection DuplicatedCode

const prsUtil = require('../../common/utils');

/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/sqrr/PrsLogin.page');
const PrsAppHomePage = require('../../pageobjects/sqrr/PrsAppHome.page');
const PrsAppPurchaseSearchPage = require('../../pageobjects/sqrr/PrsAppPurchaseSearch.page');
const PrsAppPurchaseViewPage = require('../../pageobjects/sqrr/PrsAppPurchaseView.page');
const PrsAppPurchaseNewSqrrItems = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrItems.page');
const PrsAppPurchaseNewSqrrAccountAssignment = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrAccountAssignment.page');
const PrsAppPurchaseSqrrQuotationSummary = require('../../pageobjects/sqrr/PrsAppPurchaseSqrrQuotationSummary.page');

describe('SQRR: Summary Quotation: Required fields', () => {
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

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);

    await prsUtil.nextAndVerifyErrorNotExists();
  });

  it('should execute billing address', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.billingAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
    await prsUtil.nextAndVerifyErrorExists('Billing Address is required');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.billingAddress, '0'.repeat(256));
    await prsUtil.nextAndVerifyErrorExists('Billing Address is too long. Maximum length is 255.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.billingAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.billingAddress, 'test');
    await prsUtil.nextAndVerifyErrorNotExists('Billing Address');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.billingAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
  });

  it('should execute delivery address', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, '');
    await prsUtil.nextAndVerifyErrorExists('Delivery Address is required');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, '0'.repeat(256));
    await prsUtil.nextAndVerifyErrorExists('Delivery Address is too long. Maximum length is 220.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, 'test');
    await prsUtil.nextAndVerifyErrorNotExists('Delivery Address');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
  });

  it('should execute same address as billing address.', async () => {
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.billingAddress, 'billing');
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, 'delivery');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.billingSameAsDeliveryCheckbox);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.deliveryAddress).toHaveAttribute('readOnly', 'true');
    await expect(await PrsAppPurchaseSqrrQuotationSummary.deliveryAddress).toHaveValue('billing');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.billingSameAsDeliveryCheckbox);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.deliveryAddress).not.toHaveAttribute('readOnly', 'true');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.billingAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.deliveryAddress, '');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
  });

  it('should execute requestor name.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.requestorName).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.requestorName).toHaveAttribute('readOnly', 'true');
  });

  it('should execute requestor email.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.requestorEmail).toExist();
  });

  it('should execute requestor phone.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.requestorPhone).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.requestorPhone, '');
    await prsUtil.nextAndVerifyErrorExists("Requestor's Phone is required");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.requestorPhone, '0'.repeat(21));
    await prsUtil.nextAndVerifyErrorExists("Requestor's Phone is too long. Maximum length is 20");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.requestorPhone, 'test phone');
    await prsUtil.nextAndVerifyErrorNotExists("Requestor's Phone");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.requestorPhone, '');
  });

  it('should execute quotation reference number.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0), '');
    await prsUtil.nextAndVerifyErrorExists("Quotation 1: Quotation Reference Number is required");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0), '0'.repeat(51));
    await prsUtil.nextAndVerifyErrorExists("Quotation 1: " + ('0'.repeat(51)) + " is too long. Maximum length is 50");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0), 'test qt no');
    await prsUtil.nextAndVerifyErrorNotExists("Quotation 1: Quotation Reference Number");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0), '');
  });

  it('should execute instruction to supplier.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '');

    let components = [
      await (await (await PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0))).getValue(),
      await (await (await PrsAppPurchaseSqrrQuotationSummary.deliveryAddress).getValue()),
      await (await (await PrsAppPurchaseSqrrQuotationSummary.requestorName).getValue()),
      await (await (await PrsAppPurchaseSqrrQuotationSummary.requestorPhone).getValue()),
      await (await (await PrsAppPurchaseSqrrQuotationSummary.requestorEmail).getValue())
    ];

    let componentLength = components
        .filter((v) => !!v)
        .join(',')
        .length;

    let maxLen = 255 - (componentLength + 1);
    console.log('maxLen', maxLen);

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '0'.repeat(maxLen + 1));
    await prsUtil.nextAndVerifyErrorExists("Quotation 1: Instruction to Supplier is too long. Maximum length is " + maxLen);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '');
    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '0'.repeat(maxLen));
    await prsUtil.nextAndVerifyErrorNotExists("Quotation 1: Instruction to Supplier is too long. Maximum length is " + maxLen);

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '😀');
    await prsUtil.nextAndVerifyErrorExists("Quotation 1: Instruction to Supplier contains invalid characters");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), 'instr');
    await prsUtil.nextAndVerifyErrorNotExists("Quotation 1: Instruction to Supplier");

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0), '');
  });

  it('should execute payment term.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0)).toExist();

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0), 'Please Select');
    await prsUtil.nextAndVerifyErrorExists("Quotation 1: Payment Term is required");

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0), '30 Days');
    await prsUtil.nextAndVerifyErrorNotExists("Quotation 1: Payment Term is required");

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0), 'Please Select');
  });

  it('should execute expected delivery date.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0), '');
    await prsUtil.nextAndVerifyErrorExists('Quotation 1: Expected Delivery Date is required.');

    let yesterday = new Date(Date.now() - 24*60*60*1000);
    let badInput = String(yesterday.getDate()).padStart(2, '0') + '/' + String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + yesterday.getFullYear();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0), badInput);
    await prsUtil.nextAndVerifyErrorExists('Quotation 1: Expected Delivery Date cannot be earlier than the current date.');

    let today = new Date();
    let goodInput = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0), goodInput);
    await prsUtil.nextAndVerifyErrorNotExists('Quotation 1: Expected Delivery Date');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0), '');
  });

  it('should execute attachment.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).not.toExist();
    await prsUtil.nextAndVerifyErrorExists('Quotation 1: Attachment is required');

    await PrsAppPurchaseSqrrQuotationSummary.doAttachmentUpload(0, "./test/pageobjects/sqrr/dummy.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocDescription(0, 0)).toExist();
    await prsUtil.nextAndVerifyErrorNotExists('Quotation 1: Attachment is required');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0));
    await prsUtil.waitForFileExists('dummy.pdf');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocDescription(0, 0)).not.toExist();
    await prsUtil.nextAndVerifyErrorExists('Quotation 1: Attachment is required');

    // Single Max size.
    await PrsAppPurchaseSqrrQuotationSummary.doAttachmentUpload(0, "./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    // Multi Max file Size.
    await PrsAppPurchaseSqrrQuotationSummary.doAttachmentUpload(0, "./test/pageobjects/sqrr/fullerton.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocDescription(0, 0)).toExist();
    await PrsAppPurchaseSqrrQuotationSummary.doAttachmentUpload(0, "./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocDescription(0, 0)).not.toExist();

    // Invalid file
    await PrsAppPurchaseSqrrQuotationSummary.doAttachmentUpload(0, "./test/pageobjects/sqrr/bad_upload.zip");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.attachmentDocDescription(0, 0)).not.toExist();
    await prsUtil.verifyErrorExists('File is invalid.');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.nextButton);
  });

  it('should execute other supplier', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton).toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).not.toExist();
  });

  it('should execute other supplier name', async () => {
    while (await (await (await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0))).isExisting()) {
      await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    }

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.nextButton);

    await expect(await PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton).toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).toExist();

    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Supplier is required.');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0), '0'.repeat(101));
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Supplier Name is too long. Maximum length is 100.');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0), '😀');
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Supplier Name contains invalid characters');

    await prsUtil.setElementValueNoCheck(PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0), 'Test');
    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.containerDiv);
    await prsUtil.nextAndVerifyErrorNotExists('Other Quotation 1: Supplier Name');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).not.toExist();
  });

  it('should execute other supplier total', async () => {
    while (await (await (await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0))).isExisting()) {
      await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    }

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.nextButton);

    await expect(await PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton).toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).toExist();

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0), '');
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Total Amount is required.');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0), '0');
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Total Amount must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0), '-1');
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Total Amount must be more than 0.');

    await prsUtil.setElementValue(PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0), '0.0001');
    await prsUtil.nextAndVerifyErrorNotExists('Other Quotation 1: Total Amount must be up to 3 decimal places.');
    // ^ There is front end code to force it to 2 dp.

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).not.toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.nextButton);
  });

  it('should execute other supplier attachment.', async () => {
    while (await (await (await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0))).isExisting()) {
      await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    }

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.backButton);
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrAccountAssignment.nextButton);

    await expect(await PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton).toExist();

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.addOtherSupplierButton);
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).toExist();

    await PrsAppPurchaseSqrrQuotationSummary.doOthSupplierAttachmentUpload(0, "./test/pageobjects/sqrr/dummy.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocDescription(0, 0)).toExist();
    await prsUtil.nextAndVerifyErrorNotExists('Other Quotation 1: Attachment is required');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0));
    await prsUtil.waitForFileExists('dummy.pdf');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocDescription(0, 0)).not.toExist();
    await prsUtil.nextAndVerifyErrorExists('Other Quotation 1: Attachment is required');

    // Single Max size.
    await PrsAppPurchaseSqrrQuotationSummary.doOthSupplierAttachmentUpload(0, "./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    // Multi Max file Size.
    await PrsAppPurchaseSqrrQuotationSummary.doOthSupplierAttachmentUpload(0, "./test/pageobjects/sqrr/fullerton.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocDescription(0, 0)).toExist();

    await PrsAppPurchaseSqrrQuotationSummary.doOthSupplierAttachmentUpload(0, "./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocDescription(0, 0)).not.toExist();

    // Invalid file
    await PrsAppPurchaseSqrrQuotationSummary.doOthSupplierAttachmentUpload(0, "./test/pageobjects/sqrr/bad_upload.zip");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocLink(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othRemoveAttachmentDocButton(0, 0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.othAttachmentDocDescription(0, 0)).not.toExist();
    await prsUtil.verifyErrorExists('File is invalid.');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeOthSupplierButton(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplier(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.otherSupplierTotalAmount(0)).not.toExist();
  });
});

describe('SQRR: Summary Quotation: Multiple Awarded Supplier', () => {
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

    // Chemical Item 1
    await prsUtil.addFreshSqrrLineItem(1, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    // Chemical Item 2
    await prsUtil.addSqrrLineItem(0, 1);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(1), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(1),'999');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(1),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(1), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(1), '01 COMPUTER SYSTEM PTE LTD');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);

    await prsUtil.nextAndVerifyErrorNotExists();
  });

  it('should execute multiple suppliers.', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(0)).toExist();

    await expect(await PrsAppPurchaseSqrrQuotationSummary.quotationReferenceNumber(1)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.instructionToSupplier(1)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.paymentTerm(1)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.expectedDeliveryDate(1)).toExist();

    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseSqrrQuotationSummary.paymentTerm(0), 'Please Select');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseSqrrQuotationSummary.paymentTerm(1), 'Please Select');

    await prsUtil.nextAndVerifyErrorExists(
        'Quotation 1: Quotation Reference Number is required',
        'Quotation 1: Payment Term is required',
        'Quotation 1: Expected Delivery Date is required.',
        'Quotation 1: Attachment is required',
        'Quotation 2: Quotation Reference Number is required',
        'Quotation 2: Payment Term is required',
        'Quotation 2: Expected Delivery Date is required.',
        'Quotation 2: Attachment is required',
    );
  });
});

describe('SQRR: Summary Quotation: Genetically Modified', () => {
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

    // Biological Item
    await prsUtil.addFreshSqrrLineItem(15, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'100');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityCodeSelect(0),'g');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.geneticallyModifiedSelect(0),'Yes');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0), 'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);

    await prsUtil.nextAndVerifyErrorNotExists();
  });

  it('should execute genetically modified declaration', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.geneticallyModified).toExist();

    await prsUtil.nextAndVerifyErrorExists('Please read and accept the declaration to proceed.');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.geneticallyModified);
    await prsUtil.nextAndVerifyErrorNotExists('Please read and accept the declaration to proceed.');
  });
});

describe('SQRR: Summary Quotation: Overseas Supplier MOH AVS Product', () => {
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

    // Biological Item
    await prsUtil.addFreshSqrrLineItem(13, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), '3M TECHNOLOGIES (S) PTE LTD');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.bioSafetyLevelSelect(0), 'BSL-1');

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);

    await prsUtil.nextAndVerifyErrorNotExists();
  });

  it('should execute overseas supplier MOH AVS product declaration', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.mohAVSProduct).toExist();

    await prsUtil.nextAndVerifyErrorExists('Please read and accept the declaration to proceed.');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.mohAVSProduct);
    await prsUtil.nextAndVerifyErrorNotExists('Please read and accept the declaration to proceed.');
  });
});

describe('SQRR: Summary Quotation: Sealed Source', () => {
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

    // Radioactive Item
    await prsUtil.addFreshSqrrLineItem(2, 0);
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.quantityInput(0), '1');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.priceInput(0),'666');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.physicalFormSelect(0), 'Solid');
    await prsUtil.setElementValue(PrsAppPurchaseNewSqrrItems.originalQuantityInput(0),'1');
    await prsUtil.selectElementValueByVisibleText(PrsAppPurchaseNewSqrrItems.originalQuantityUnitSelect(0), 'EA');
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.manufacturerTextInput(0), 'khairul-manufacturer');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstManufacturerSpan);
    await prsUtil.setElementValueNoCheck(PrsAppPurchaseNewSqrrItems.supplierTextInput(0), 'Aik Moh Paints & Chemicals Pte Ltd');
    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.firstSupplierSpan);

    await prsUtil.clickElement(PrsAppPurchaseNewSqrrItems.nextButton);
  });

  it('should execute approvers', async () => {
    await PrsAppPurchaseNewSqrrAccountAssignment.getAvailableWBSGLAccount();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.defaultWBSGLAccount, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover1List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver1Select, 1);

    await PrsAppPurchaseNewSqrrAccountAssignment.getApprover2List();
    await prsUtil.selectElementValueByIndex(PrsAppPurchaseNewSqrrAccountAssignment.approver2Select, 2);

    await prsUtil.nextAndVerifyErrorNotExists();
  });

  it('should execute sealed source safety review', async () => {
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceSafety).toExist();

    await prsUtil.nextAndVerifyErrorExists('Safety file upload is mandatory for sealed source radiological item.');

    await PrsAppPurchaseSqrrQuotationSummary.doSealedSourceSafetyUpload("./test/pageobjects/sqrr/dummy.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0)).toExist();
    await prsUtil.nextAndVerifyErrorNotExists('Safety file upload is mandatory for sealed source radiological item.');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0, 0));
    await prsUtil.waitForFileExists('dummy.pdf');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0)).not.toExist();
    await prsUtil.nextAndVerifyErrorExists('Safety file upload is mandatory for sealed source radiological item.');

    // Single Max size.
    await PrsAppPurchaseSqrrQuotationSummary.doSealedSourceSafetyUpload("./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    // Multi Max file Size.
    await PrsAppPurchaseSqrrQuotationSummary.doSealedSourceSafetyUpload("./test/pageobjects/sqrr/fullerton.pdf");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0)).toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0)).toExist();
    await PrsAppPurchaseSqrrQuotationSummary.doSealedSourceSafetyUpload("./test/pageobjects/sqrr/aia.pdf");
    await prsUtil.verifyErrorExists('File size exceeded the maximum file size of 10MB');

    await prsUtil.clickElement(PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0));
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0)).not.toExist();

    // Invalid file
    await PrsAppPurchaseSqrrQuotationSummary.doSealedSourceSafetyUpload( "./test/pageobjects/sqrr/bad_upload.zip");
    await expect(await PrsAppPurchaseSqrrQuotationSummary.sealedSourceLink(0)).not.toExist();
    await expect(await PrsAppPurchaseSqrrQuotationSummary.removeSealedSourceButton(0)).not.toExist();
    await prsUtil.verifyErrorExists('File is invalid.');
  });
});
