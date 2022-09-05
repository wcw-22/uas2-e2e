const Page = require('../Page');

class SwitchRolePage extends Page {
    async getAvailableRoles () {
        const selector = 'table[id="roleTable"]>tbody>tr>td>input[type="text"]';

        // Wait for the roles to show up.
        const toWait = await $(selector);
        await toWait.waitForExist();

        let roles = [];
        let elements = await $$(selector);
        for (let r of elements) {
            roles.push(await r.getValue());
        }

        return roles;
    }

    async switchRole (role) {
        const selector = 'table[id="roleTable"]>tbody>tr>td>input[type="text"]';

        // Wait for the roles to show up.
        const toWait = await $(selector);
        await toWait.waitForExist();

        let elements = await $$(selector);
        for (let r of elements) {
            let v = await r.getValue();

            if (v === role) {
                await r.click();
                return true;
            }
        }

        return false;
    }

    open () {
        return super.open('/prs/app/switchRole');
    }
}

module.exports = new SwitchRolePage();