const Page = require('../Page');

class PrsAppPurchaseSqrrQuotationSummaryPage extends Page {
  get containerDiv() { return $('#prs-content-container') }

  get errorDiv () { return $('DIV.alert.alert-danger') }

  get backButton () { return $('#backButton') }
  get nextButton () { return $('#nextButton') }
  get saveAsDraftButton () { return $('#saveAsDraftButton') }

  get billingAddress() { return $('#forBa')}
  get billingSameAsDeliveryCheckbox() { return $('#billingSameAsDeliveryCheckbox')}
  get deliveryAddress() { return $('#forDa')}

  get requestorName() { return $('#requestorName') }
  get requestorEmail() { return $('#requestorEmail') }
  get requestorPhone() { return $('#requestorPhone') }

  quotationReferenceNumber(idx) { return $('#quotationReferenceNumber_' + idx) }
  instructionToSupplier(idx) { return $('#instructionToSupplier_' + idx) }
  paymentTerm(idx) { return $('#paymentTerm_' + idx) } // Due Immediately, 30 Days, 45 Days, 60 Days
  expectedDeliveryDate(idx) { return $('#expectedDeliveryDate_' + idx) }

  attachmentDocLink(sIdx, aIdx) { return $('#attachmentDocLink-' + sIdx + '-' + aIdx) }
  removeAttachmentDocButton(sIdx, aIdx) { return $('#removeAttachmentDocButton-' + sIdx + '-' + aIdx ) }
  attachmentDocDescription(sIdx, aIdx) { return $('#attachmentDocDescription-' + sIdx + '-' + aIdx) }
  async doAttachmentUpload(sIdx, file) {
    let upload = await this.attachmentUpload;
    await browser.execute(
        (el, idx) => {
          el.parentNode.className = '';
          el.setAttribute('data-quote-index', idx);
        },
        upload,
        sIdx
    );

    await upload.waitForDisplayed();
    await upload.setValue(process.cwd() + '/' + file);
  }

  get addOtherSupplierButton() {
    return $('#addOtherSupplierButton');
  }

  removeOthSupplierButton (sIdx) { return $('#removeOthSupplierButton-' + sIdx) }
  otherSupplier(sIdx) { return $('#otherSupplier-' + sIdx) }
  otherSupplierTotalAmount(sIdx) { return $('#otherSupplier-totalAmount-' + sIdx) }

  othAttachmentDocLink(sIdx, aIdx) { return $('#othAttachmentDocLink-' + sIdx + '-' + aIdx) }
  othRemoveAttachmentDocButton(sIdx, aIdx) { return $('#othRemoveAttachmentDocButton-' + sIdx + '-' + aIdx) }
  othAttachmentDocDescription(sIdx, aIdx) { return $('#othAttachmentDocDescription-' + sIdx + '-' + aIdx) }

  async doOthSupplierAttachmentUpload(sIdx, file) {
    let upload = await this.attachmentOtherSupplierUpload;
    await browser.execute(
        (el, idx) => {
          el.parentNode.className = '';
          el.setAttribute('data-quote-index', idx);
        },
        upload,
        sIdx
    );

    await upload.waitForDisplayed();
    await upload.setValue(process.cwd() + '/' + file);
  }

  get sealedSourceSafety() {
    return $('#sealedSourceSafetyPanel');
  }
  sealedSourceLink(idx) { return $('#sealedSourceLink-' + idx) }
  removeSealedSourceButton(idx) { return $('#removeSealedSourceButton-' + idx) }
  async doSealedSourceSafetyUpload(file) {
    let upload = await this.attachmentSafetyUpload;
    await browser.execute(
        (el) => {
          el.parentNode.className = '';
        },
        upload
    );

    await upload.waitForDisplayed();
    await upload.setValue(process.cwd() + '/' + file);
  }

  get bioDeclaration() {
    return $('#bioDeclarationPanel');
  }

  get mohAVSProduct() { return $('#mohAVSProduct') }
  get geneticallyModified() { return $('#geneticallyModified') }

  get attachmentUpload() { return $('#prs-content-container > app-purchase-new > app-sqrr-quotation > div > div:nth-child(4) > input[type=file]:nth-child(1)') }
  get attachmentOtherSupplierUpload() { return $('#prs-content-container > app-purchase-new > app-sqrr-quotation > div > div:nth-child(4) > input[type=file]:nth-child(2)') }
  get attachmentSafetyUpload() { return $('#prs-content-container > app-purchase-new > app-sqrr-quotation > div > div:nth-child(4) > input[type=file]:nth-child(3)') }

} // end of class PrsAppPurchaseSqrrQuotationSummaryPage

module.exports = new PrsAppPurchaseSqrrQuotationSummaryPage();

