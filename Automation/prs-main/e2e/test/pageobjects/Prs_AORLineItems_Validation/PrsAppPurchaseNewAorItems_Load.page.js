const Page = require('./page')

class PrsAppPurchaseNewAorItems_Load extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_Load

module.exports = new PrsAppPurchaseNewAorItems_Load();

