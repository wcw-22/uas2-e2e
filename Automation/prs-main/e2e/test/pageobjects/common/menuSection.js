const Page = require('../Page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MenuSection extends Page {
    async getTopLevelMenuItems () {
        const toWaitForExist = await $('div#prs-main-menu > ul > li')
        await toWaitForExist.waitForExist();

        const menuItems = [];

        const topLevelMenu = await $$('div#prs-main-menu > ul > li')
        for (let m of topLevelMenu) {
            let v = await m.getText();
            menuItems.push(v);
        }

        return menuItems;
    }
}

module.exports = new MenuSection();