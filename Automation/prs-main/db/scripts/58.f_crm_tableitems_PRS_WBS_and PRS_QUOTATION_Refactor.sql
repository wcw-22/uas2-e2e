/* ----------------------------------------------------------------------
TABLE: PRS_QUOTATION (New Column)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_QUOTATION
  ADD SUPP_T VARCHAR2(100);

COMMENT ON COLUMN PRSDBM.PRS_QUOTATION.SUPP_T IS
  'Supplier name keyed in by end user that is not managed by SESAMi';

/* ----------------------------------------------------------------------
TABLE: PRS_WBS (New Columns)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_WBS
  ADD SRCE_SYS_C VARCHAR2(50);

COMMENT ON COLUMN PRSDBM.PRS_WBS.SRCE_SYS_C IS
  'Source system code sent to LMPRS by FS2 S4 Hana. E.g: LMPRS_PO, LMPRS_JL';