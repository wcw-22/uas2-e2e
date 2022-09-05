const Page = require('../Page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('input[type="text"][name="loginAs"]') }
    get btnSubmit () { return $('button[type="submit"]') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username) {
        await (await this.inputUsername).setValue(username);
        await (await this.btnSubmit).click();

        // Either ends up at access denied, dashboard or switch role.
        while(true) {
            let resultingUrl = await browser.getUrl();
            if (resultingUrl.endsWith('/accessDenied')
                || resultingUrl.endsWith('/switchRole')
                || resultingUrl.endsWith('/home')) {
                break
            } else {
                await browser.pause(100);
            }
        }

    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('/prs/login');
    }
}

module.exports = new LoginPage();