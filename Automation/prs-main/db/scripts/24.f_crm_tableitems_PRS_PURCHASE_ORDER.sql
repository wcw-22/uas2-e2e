/* ----------------------------------------------------------------------
Purpose : For AOR >15K PO creation
Date : 2019-07-24
---------------------------------------------------------------------- */

ALTER TABLE PRS_PURCHASE_ORDER MODIFY (PO_BILLADDR_T NULL);
ALTER TABLE PRS_PURCHASE_ORDER MODIFY (PO_DELVADDR_T NULL);


Insert into PRSCTABLE (CODE_C,CODE_T,DEFUNCT_F) values ('PO_ISSUED_NOT_PENDING_GR','PO Issued','N');