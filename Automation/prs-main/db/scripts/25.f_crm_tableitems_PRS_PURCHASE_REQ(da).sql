/* ----------------------------------------------------------------------
Purpose : update PO status for AOR >15K PO creation, add request submitted date
Date : 2019-08-30
---------------------------------------------------------------------- */

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_ISSUED_AOR_MORE_15K', 'PO Issued (for AOR > $15K)', 'N');

UPDATE PRS_PURCHASE_ORDER SET PO_STS_C = 'PO_ISSUED_AOR_MORE_15K' WHERE PO_STS_C = 'PO_ISSUED_NOT_PENDING_GR';

DELETE FROM PRSCTABLE WHERE CODE_C = 'PO_ISSUED_NOT_PENDING_GR';

ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD REQ_SUBM_DTM DATE;

COMMENT ON COLUMN PRSDBM.PRS_PURCHASE_REQ.REQ_SUBM_DTM IS 'Request submitted date.';

UPDATE PRSDBM.PRS_PURCHASE_REQ SET REQ_SUBM_DTM = REC_CREATE_DTM WHERE REQ_STS_C <> 'REQ_STS_DRAFT';