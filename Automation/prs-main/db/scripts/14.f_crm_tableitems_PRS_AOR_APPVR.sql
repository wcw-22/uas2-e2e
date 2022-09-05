/* ----------------------------------------------------------------------
TABLE: PRS_AOR_APPVR    (have remove 'byte' 'enable' in the column)
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_AOR_APPVR (
	AOR_APPVR_N VARCHAR2(11) NOT NULL, 
	FAC_C VARCHAR2(2) NOT NULL, 
	DEPT_C VARCHAR2(3) NOT NULL, 
	REC_UPDUSER_I VARCHAR2(12) NOT NULL, 
	REC_UPD_DTM DATE NOT NULL 
);
--TABLESPACE S1_DAT;

[add]COMMENT ON TABLE PRSDBM.PRS_AOR_APPVR IS 'This table will keep the Approval of Requirement (AOR) Approver details';
COMMENT ON COLUMN PRSDBM.PRS_AOR_APPVR.AOR_APPVR_N IS ' This value is unique.';
COMMENT ON COLUMN PRSDBM.PRS_AOR_APPVR.FAC_C IS 'Faculty Code. Referenced to Faculty Table';
COMMENT ON COLUMN PRSDBM.PRS_AOR_APPVR.DEPT_C IS 'Department Code. Referenced to Department Table';
COMMENT ON COLUMN PRSDBM.PRS_AOR_APPVR.REC_UPDUSER_I IS 'Staff Number or student matric ID of the staff or student who has updated the record most recently.';
COMMENT ON COLUMN PRSDBM.PRS_AOR_APPVR.REC_UPD_DTM IS 'Date when record was last updated.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRS_AOR_APPVR ADD (
	CONSTRAINT PRS_PAA_PK_AP     
	PRIMARY KEY (AOR_APPVR_N)
		--USING INDEX
		--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_AOR_APPVR ADD (
	CONSTRAINT PRS_PAA_FK_FC
	FOREIGN KEY (FAC_C)
	REFERENCES IISDBM.FACULTY(FAC_C)
);

ALTER TABLE PRSDBM.PRS_AOR_APPVR ADD (
	CONSTRAINT PRS_PAA_FK_DC
	FOREIGN KEY (DEPT_C)
	REFERENCES IISDBM.DEPARTMENT(DEPT_C)
);

ALTER TABLE PRSDBM.PRS_AOR_APPVR ADD (
	CONSTRAINT PRS_PAA_UK_FCDC
	UNIQUE (FAC_C, DEPT_C)
);

CREATE INDEX PRSDBM.PRS_PAA_I_DC ON PRSDBM.PRS_AOR_APPVR (DEPT_C) TABLESPACE S1_IDX;; 
CREATE INDEX PRSDBM.PRS_PAA_I_FC ON PRSDBM.PRS_AOR_APPVR (FAC_C) TABLESPACE S1_IDX;; 

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_AOR_APPVR TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_AOR_APPVR TO RPTPRS;


/* ----------------------------------------------------------------------
SEQUENCE: PRS_AOR_APPVR_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_AOR_APPVR_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT SELECT ON PRSDBM.PRS_AOR_APPVR_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_AOR_APPVR_SEQ TO RPTPRS;
