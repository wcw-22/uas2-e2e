const Page = require('../Page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HeaderSection extends Page {
    async getCurrentRole () {
        const currentRoleElem = await $('header.nus-header>div.container>div.row>div.col-sm-12>div.text-right>span')
        await currentRoleElem.waitForExist();

        let text = await currentRoleElem.getText();
        if (!!text) {
            return text.substring(1, text.length - 1);
        }
    }
}

module.exports = new HeaderSection();