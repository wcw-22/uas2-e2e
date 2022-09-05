/* ----------------------------------------------------------------------
Purpose : To indicate if it is auto-approve; To keep approver role
Date : 2019-07-24
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRS_APPV_STS ADD AUTOAPPV_F VARCHAR2(1);
ALTER TABLE PRSDBM.PRS_APPV_STS ADD (CONSTRAINT PRS_PAS_CK_AAF  CHECK (AUTOAPPV_F IN ('Y','N')) );

ALTER TABLE PRSDBM.PRS_APPV_STS ADD APPVR_ACCESSTP_C VARCHAR2(50);
ALTER TABLE PRSDBM.PRS_APPV_STS ADD (
CONSTRAINT PRS_PAS_FK_AAC
FOREIGN KEY (APPVR_ACCESSTP_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);


COMMENT ON COLUMN PRSDBM.PRS_APPV_STS.AUTOAPPV_F IS 'Flag to indicate whether it is auto-approve.';

COMMENT ON COLUMN PRSDBM.PRS_APPV_STS.APPVR_ACCESSTP_C IS 'Role code to indicate approver's role.';
