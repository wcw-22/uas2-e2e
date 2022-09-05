/* ----------------------------------------------------------------------
TABLE: PRS_FIX_DELVADDR
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_FIX_DELVADDR (
	FIX_DELVADDR_N VARCHAR2(11 BYTE) NOT NULL ENABLE, 
	FAC_C VARCHAR2(2 BYTE) NOT NULL ENABLE, 
	DEPT_C VARCHAR2(3 BYTE) NOT NULL ENABLE, 
	DELV_ADDR_T VARCHAR2(500 BYTE) NOT NULL ENABLE, 
	REC_UPDUSER_I VARCHAR2(12 BYTE) NOT NULL ENABLE, 
	REC_UPD_DTM DATE NOT NULL ENABLE 
);
--TABLESPACE S1_DAT;

COMMENT ON COLUMN PRS_FIX_DELVADDR.FIX_DELVADDR_N IS 'This value is unique.';
COMMENT ON COLUMN PRS_FIX_DELVADDR.FAC_C IS 'Faculty Code. Referenced to Faculty Table';
COMMENT ON COLUMN PRS_FIX_DELVADDR.DEPT_C IS 'Department Code. Referenced to Department Table';
COMMENT ON COLUMN PRS_FIX_DELVADDR.DELV_ADDR_T IS 'A Delivery Addres will be stored in this column for particular faculty code and department code.';
COMMENT ON COLUMN PRS_FIX_DELVADDR.REC_UPDUSER_I IS 'Staff Number or student matric ID of the staff or student who has updated the record most recently.';
COMMENT ON COLUMN PRS_FIX_DELVADDR.REC_UPD_DTM IS 'Date when record was last updated.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRS_FIX_DELVADDR ADD (
	CONSTRAINT PRS_PFD_PK_FDN
	PRIMARY KEY (FIX_DELVADDR_N)
		--USING INDEX
		--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_FIX_DELVADDR ADD (
	CONSTRAINT PRS_PFD_FK_FC
	FOREIGN KEY (FAC_C)
	REFERENCES IISDBM.FACULTY(FAC_C)
);

ALTER TABLE PRSDBM.PRS_FIX_DELVADDR ADD (
	CONSTRAINT PRS_PFD_FK_DC
	FOREIGN KEY (DEPT_C)
	REFERENCES IISDBM.DEPARTMENT(DEPT_C)
);

ALTER TABLE PRSDBM.PRS_FIX_DELVADDR ADD (
	CONSTRAINT PRS_PFD_UK_FCDC
	UNIQUE (FAC_C, DEPT_C)
);

CREATE INDEX PRSDBM.PRS_PFD_I_DC ON PRSDBM.PRS_FIX_DELVADDR (DEPT_C) TABLESPACE S1_IDX; 
CREATE INDEX PRSDBM.PRS_PFD_I_FC ON PRSDBM.PRS_FIX_DELVADDR (FAC_C) TABLESPACE S1_IDX; 

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_FIX_DELVADDR TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_FIX_DELVADDR TO RPTPRS;


/* ----------------------------------------------------------------------
SEQUENCE: PRS_FIX_DELVADDR_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_FIX_DELVADDR_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT SELECT ON PRSDBM.PRS_FIX_DELVADDR_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_FIX_DELVADDR_SEQ TO RPTPRS;



/* ----------------------------------------------------------------------
INSERT: Insert data in PRSCTABLE for PRS_FIX_DELVADDR transaction audit
---------------------------------------------------------------------- */
--INSERT INTO PRSDBM.PRSCTABLE (CODE_C,CODE_T,DEFUNCT_F) VALUES ('PROG_FN_FIXDELVADDR','Fixed Delivery Address','N');