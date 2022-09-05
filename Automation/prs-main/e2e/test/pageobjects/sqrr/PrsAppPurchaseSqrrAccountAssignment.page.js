const Page = require('../Page');

const chai = require('chai');
const assert = chai.assert;

class PrsAppPurchaseSqrrAccountAssignmentPage extends Page {
  get errorDiv () { return $('DIV.alert.alert-danger') }

  get backButton () { return $('#backButton') }
  get nextButton () { return $('#nextButton') }
  get saveAsDraftButton () { return $('#saveAsDraftButton') }

  get defaultWBSGLAccount() { return $('#defaultWBSGLAccount') }

  get approver1Select() { return $('#approver1Select') }
  get approver2Select() { return $('#approver2Select') }

  splitItemAssignmentButton(sIdx, idx) { return $('#splitItemAssignmentButton-' + sIdx + '-' + idx) }
  removeItemAssignmentButton(sIdx, idx, row) { return $('#removeItemAssignmentButton-' + sIdx + '-' + idx + '-' + row) }

  accountAssignmentWBSGLAccount(sIdx, idx, row) { return $('#aa-wbs-gl-' + sIdx + '-' + idx + '-' + row) }
  accountAssignmentQuantityInput(sIdx, idx, row) { return $('#aa-quantity-' + sIdx + '-' + idx + '-' + row) }
  accountAssignmentSubTotal(sIdx, idx, row) { return $('#aa-subtotal-' + sIdx + '-' + idx + '-' + row) }

  lineItemRow(sIdx, idx) { return $('#lineItemRow-' + sIdx + '-' + idx) }

  async getApprovedAccountRow(account) {
    let firstRow = await $('#prs-content-container > app-purchase-new > app-sqrr-account-assignment > div > div.desktop-min-content-height > div:nth-child(5) > div > div > div.panel-body > div > table > tbody > tr');
    await firstRow.waitForExist();

    let rows = await $$('#prs-content-container > app-purchase-new > app-sqrr-account-assignment > div > div.desktop-min-content-height > div:nth-child(5) > div > div > div.panel-body > div > table > tbody > tr');

    let idx = 0;
    for (let r of rows) {
      idx++;

      let accountTd = await r.$('td:nth-child(2) > p');
      let acct = (await accountTd.getText()) ?? '';
      acct = acct.trim();

      console.log('Account found: ', acct);

      if (acct.startsWith(account)) {
        return r;
      }
    }

    assert.fail('Could not find account row for account: ', account);
  }

  async getApprovedAccountSubTotals() {
    let res = {};

    for (let idx = 0; true; idx++) {
      let accountRow = await $('#accountSubtotalRow-' + idx);
      if (!(await accountRow.isExisting())) {
        break;
      }

      let wbs = await (await $('#account-wbs-' + idx)).getText();
      res[wbs] = await (await $('#account-subtotal-' + idx)).getText();
    }

    return res;
  }

  async getAvailableWBSGLAccount () {
    // Wait for the roles to show up.
    const toWait = await $('#defaultWBSGLAccount > option[value="0"]');
    await toWait.waitForExist();

    let wbsGlAccounts = [];
    let elements = await $$('#defaultWBSGLAccount > option');

    for (let r of elements) {
      let val = await r.getText();

      if (val !== 'Please Select') {
        wbsGlAccounts.push({
          gl:  val.substr(12, 7),
          wbs: val.substr(26, 15)
        });
      } else {
        wbsGlAccounts.push({});
      }
    }

    return wbsGlAccounts;
  }

  async getApprover1List () {
    // Wait for the roles to show up.
    const toWait = await $('#approver1Select > option[value="0"]');
    await toWait.waitForExist();

    let approvers = [];
    let elements = await $$('#approver1Select > option');

    for (let r of elements) {
      let val = await r.getText();

      if (val !== 'Please Select') {
        approvers.push(val);
      }
    }

    return approvers;
  }

  async getApprover2List () {
    // Wait for the roles to show up.
    const toWait = await $('#approver2Select > option[value="0"]');
    await toWait.waitForExist();

    let approvers = [];
    let elements = await $$('#approver2Select > option');

    for (let r of elements) {
      let val = await r.getText();

      if (val !== 'Please Select') {
        approvers.push(val);
      }
    }

    return approvers;
  }

} // end of class PrsAppPurchaseNewSqrrItemsPage

module.exports = new PrsAppPurchaseSqrrAccountAssignmentPage();

