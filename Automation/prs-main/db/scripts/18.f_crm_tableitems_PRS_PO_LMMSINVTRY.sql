/* ----------------------------------------------------------------------
TABLE: PRS_PO_LMMSINVTRY    (have remove 'byte' 'enable' in the column)
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_PO_LMMSINVTRY (
	"LMMS_INVNTRY_N" VARCHAR2(20) NOT NULL ENABLE, 
	"RT_ITEM_N" VARCHAR2(20) NOT NULL ENABLE, 
	"SAP_PO_N" VARCHAR2(20) NOT NULL ENABLE, 
	"CONTAINER_I" VARCHAR2(20) NOT NULL ENABLE, 
	"INV_STS_C" VARCHAR2(20) NOT NULL ENABLE, 
	"REC_UPDUSER_I" VARCHAR2(12)  NOT NULL ENABLE, 
	"REC_UPD_DTM" DATE  NOT NULL ENABLE
);
--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_PO_LMMSINVTRY IS 'Table to store LMMS container IDs for goods return';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.LMMS_INVNTRY_N IS ' Primary key';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.RT_ITEM_N IS 'Goods Return PK referencing PRS_RECEIPT_LINEITEM';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.SAP_PO_N IS 'SAP PO number';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.CONTAINER_I IS 'Container ID of the LMMS containers to be returned';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.INV_STS_C IS 'Status of the LMMS inventory request (RESERVED/RESERVED-COMMIT/RESERVED-ROLLBACK';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.REC_UPDUSER_I IS 'Staff Number or student matric ID of the staff or student who has updated the record most recently.';
COMMENT ON COLUMN PRSDBM.PRS_PO_LMMSINVTRY.REC_UPD_DTM IS 'Date when record was last updated.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRS_PO_LMMSINVTRY ADD (
	CONSTRAINT PRS_POL_PK_LIN    
	PRIMARY KEY (LMMS_INVNTRY_N)
		--USING INDEX
		--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_PO_LMMSINVTRY ADD (
	CONSTRAINT PRS_POLI_FK_RIN
	FOREIGN KEY (RT_ITEM_N)
	REFERENCES PRSDBM.PRS_RECEIPT_LINEITEM (RT_ITEM_N) ENABLE
);

ALTER TABLE PRSDBM.PRS_PO_LMMSINVTRY ADD (
	CONSTRAINT PRS_POL_FK_ISC
	FOREIGN KEY (INV_STS_C)
	REFERENCES PRSDBM.PRSCTABLE (CODE_C) ENABLE
);

CREATE INDEX PRSDBM.PRS_POL_I_RIN ON PRSDBM.PRS_PO_LMMSINVTRY (RT_ITEM_N) TABLESPACE S1_IDX;
CREATE INDEX PRSDBM.PRS_PIS_I_ISC ON PRSDBM.PRS_PO_LMMSINVTRY (INV_STS_C) TABLESPACE S1_IDX;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PO_LMMSINVTRY TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PO_LMMSINVTRY TO RPTPRS;


/* ----------------------------------------------------------------------
SEQUENCE: PRS_PO_LMMSINVTRY_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_PO_LMMSINVTRY_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT SELECT ON PRSDBM.PRS_PO_LMMSINVTRY_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PO_LMMSINVTRY_SEQ TO RPTPRS;
