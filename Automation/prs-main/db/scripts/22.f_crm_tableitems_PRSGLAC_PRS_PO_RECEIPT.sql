/* ----------------------------------------------------------------------
Purpose : For GR de-link and GL account descriptions
Date : 2019-07-19
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRSGLAC ADD GL_AC_T VARCHAR2(100);
COMMENT ON COLUMN PRSDBM.PRSGLAC.GL_AC_T IS 'Description of the GL account.';

UPDATE PRSDBM.PRSGLAC SET GL_AC_T = 'Consumables' WHERE GL_AC_N = '710221';
UPDATE PRSDBM.PRSGLAC SET GL_AC_T = 'Teaching Materials' WHERE GL_AC_N = '710201';

ALTER TABLE PRSDBM.PRSGLAC MODIFY (GL_AC_T NOT NULL);

ALTER TABLE PRSDBM.PRS_PO_RECEIPT ADD RT_SEND_DTM DATE;
COMMENT ON COLUMN PRSDBM.PRS_PO_RECEIPT.RT_SEND_DTM IS 'Date and time the GR request was sent to SESAMi.';
