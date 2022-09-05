-- update billing and delivery addresss
UPDATE PRS_DELVORDER_INFO SET 
  DO_BILLADDR_T = 'Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14, 4 Engineering Drive 4, Singapore 117580, Attn: Yiling Zheng/Sun Qiming
  QUOTE NO. 2000396869', 
  DO_ADDR_T = 'Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14, 4 Engineering Drive 4, Singapore 117580, Attn: Yiling Zheng/Sun Qiming
  QUOTE NO. 2000396869' 
WHERE PR_N = '816';

--Update address in user preference
UPDATE PRS_USER_PREF SET USER_PREF_T='{"billingAddresses":["Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14\n4 Engineering Drive 4, Singapore 117585 Attn: Yiling Zheng/Sun Qiming","Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14, 4 Engineering Drive 4, Singapore 117580, Attn: Yiling Zheng/Sun Qiming\nQUOTE NO. 2000396869"],"deliveryAddresses":["Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14\n4 Engineering Drive 4, Singapore 117585 Attn: Yiling Zheng/Sun Qiming","Department of Chemical and Biomolecular Engineering, National University of Singapore, Blk E8 #5-13/14, 4 Engineering Drive 4, Singapore 117580, Attn: Yiling Zheng/Sun Qiming\nQUOTE NO. 2000396869"],"contacts":["65168436","81452334"]}'
WHERE PREF_N = '85' and USER_I = '00069512';