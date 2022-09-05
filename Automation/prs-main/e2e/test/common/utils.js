const path = require("path");
const fs = require("fs");

async function waitForUrlEnding (browser, endUrl, maxWait) {
    const pauseForMs = 100;
    let curWait = 0;

    while (curWait < maxWait) {
        let currentUrl = await browser.getUrl();
        if (currentUrl.endsWith(endUrl)) {
            break;
        } else {
            await browser.pause(pauseForMs);
            curWait += pauseForMs;
        }
    }
}

async function clickElement(el) {
    await (await (await el)).waitForExist();
    await (await (await el)).waitForClickable();
    await (await (await el)).click();
}

async function setElementValue(el, val, expectedVal) {
    await setElementValueNoCheck(el, val);
    await expect(await el).toHaveValue(expectedVal ?? val);
}

async function setElementValueNoCheck(el, val) {
    await clickElement(el);
    await (await el).setValueByKeys(val);
}

async function selectElementValueByVisibleText(el, val) {
    await clickElement(el);
    await (await el).selectByVisibleText(val);
}

async function selectElementValueByIndex(el, idx) {
    await clickElement(el);
    await (await el).selectByIndex(idx);
}

async function addFreshSqrrLineItem(approvedIdx, expectedIdx) {
    await clearLineItems();
    await addSqrrLineItem(approvedIdx, expectedIdx);
}

async function clearLineItems() {
    while (await (await (await $('#removeLineItemButton-0'))).isExisting()) {
        await clickElement($('#removeLineItemButton-0'));
    }

    await expect(await $('#line-item-0')).not.toExist();
}

async function addSqrrLineItem(approvedIdx, expectedIdx) {
    await (await (await $('#addSqrrLineItemButton-' + approvedIdx))).waitForExist();
    await clickElement($('#addSqrrLineItemButton-' + approvedIdx));
    await expect(await $('#line-item-' + expectedIdx)).toExist();
}

async function nextAndVerifyErrorExists(...err) {
    await clickElement($('#nextButton'));
    await verifyErrorExists(...err);
}

async function verifyErrorExists(...err) {
    if (!!err && err.length > 0) {
        for (let e of err) {
            await expect(await $('DIV.alert.alert-danger')).toHaveTextContaining(e);
        }
    }
}

async function verifyErrorNotExists(...err) {
    if (!!err && err.length > 0) {
        for (let e of err) {
            await expect(await $('DIV.alert.alert-danger')).not.toHaveTextContaining(e);
        }
    } else {
        await expect(await $('DIV.alert.alert-danger')).not.toExist();
    }
}

async function nextAndVerifyErrorNotExists(...err) {
    await clickElement($('#nextButton'));
    await verifyErrorNotExists(...err);
}

// From https://blog.kevinlamping.com/downloading-files-using-webdriverio/
function waitForFileExists(file) {
    let timeout = 5000;
    let filePath = path.join(global.downloadDir, file);

    return new Promise(function (resolve, reject) {
        let timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                fs.rmSync(filePath);



                resolve();
            }
        });

        let dir = path.dirname(filePath);
        let basename = path.basename(filePath);
        let watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                fs.rmSync(filePath);
                resolve();
            }
        });
    });
}

module.exports = {
    waitForUrlEnding: waitForUrlEnding,
    clickElement: clickElement,
    setElementValue: setElementValue,
    setElementValueNoCheck: setElementValueNoCheck,
    selectElementValueByVisibleText: selectElementValueByVisibleText,
    selectElementValueByIndex: selectElementValueByIndex,
    addFreshSqrrLineItem: addFreshSqrrLineItem,
    clearLineItems: clearLineItems,
    addSqrrLineItem: addSqrrLineItem,
    nextAndVerifyErrorExists: nextAndVerifyErrorExists,
    verifyErrorExists: verifyErrorExists,
    verifyErrorNotExists: verifyErrorNotExists,
    nextAndVerifyErrorNotExists: nextAndVerifyErrorNotExists,
    waitForFileExists: waitForFileExists
}