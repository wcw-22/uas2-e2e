'use strict';

const Page = require('../Page')

class UasServletUpdateapplnparticulars_02Page extends Page {
  get nolabel_h2 () { return $('TABLE:nth-of-type(1) > TBODY > TR > TD:nth-of-type(1) > H2') } 
  get _33000576OngZhiPing_h2 () { return $('TD:nth-of-type(3) > H2') } 
  get _9999_b () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(1) > TD:nth-of-type(2) > B') } 
  get _24082022_b () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(2) > TD:nth-of-type(2) > B') } 
  get received_b () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(3) > TD:nth-of-type(2) > B') } 
  get normalFee_b () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(4) > TD:nth-of-type(2) > B') } 
  get nolabel_td1 () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(5) > TD:nth-of-type(2)') } 
  get nolabel_td2 () { return $('TD > TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(6) > TD:nth-of-type(2)') } 
  get nolabel_td3 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(7) > TD:nth-of-type(2)') } 
  get nolabel_td4 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(8) > TD:nth-of-type(2)') } 
  get nolabel_td5 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(9) > TD:nth-of-type(2)') } 
  get nolabel_td6 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(10) > TD:nth-of-type(2)') } 
  get documentsUploaded_b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(11) > TD:nth-of-type(2) > B') } 
  get awaitingPayment_b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(12) > TD:nth-of-type(2) > B') } 
  get nolabel_td7 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(13) > TD:nth-of-type(2)') } 
  get nolabel_td8 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(14) > TD:nth-of-type(2)') } 
  get nolabel_td9 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(15) > TD:nth-of-type(2)') } 
  get nolabel_td10 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(16) > TD:nth-of-type(2)') } 
  get nolabel_td11 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(17) > TD:nth-of-type(2)') } 
  get nolabel_td12 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(18) > TD:nth-of-type(2)') } 
  get _2024_b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(19) > TD:nth-of-type(2) > B') } 
  get nolabel_td13 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(20) > TD:nth-of-type(2)') } 
  get nolabel_td14 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(21) > TD:nth-of-type(2)') } 
  get nolabel_td15 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(22) > TD:nth-of-type(2)') } 
  get nolabel_td16 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(23) > TD:nth-of-type(2)') } 
  get n_b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(24) > TD:nth-of-type(2) > B') } 
  get scHaveNotReceivedAnyTg_b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(25) > TD:nth-of-type(2) > B') } 
  get nolabel_td17 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(26) > TD:nth-of-type(2)') } 
  get nolabel_td18 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(27) > TD:nth-of-type(2)') } 
  get _b () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(28) > TD:nth-of-type(2) > B') } 
  get nolabel_td19 () { return $('TABLE:nth-of-type(4) > TBODY > TR:nth-of-type(29) > TD:nth-of-type(2)') } 

  open() {
    return super.open('/uas/servlet/UpdateApplnParticulars') // update as needed
  }
} // end of class UasServletUpdateapplnparticulars_02Page

module.exports = new UasServletUpdateapplnparticulars_02Page();

