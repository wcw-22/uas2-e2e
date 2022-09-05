/* ----------------------------------------------------------------------
Purpose : add Quotation Reference Number
Date : 2019-10-11
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_DELVORDER_INFO ADD QT_REF_NUM VARCHAR2(50 BYTE);

COMMENT ON COLUMN PRSDBM.PRS_DELVORDER_INFO.QT_REF_NUM IS 'Quotation reference number';