/* Main page object containing all shared methods, selectors and functionality */
module.exports = class Page {
    open (path) {
        return browser.url('https://sit-aces.nus.edu.sg' + path);
    }
}