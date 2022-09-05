/* NUS Restricted */
/* ----------------------------------------------------------------------
TABLE: PRS_LOCATION
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_LOCATION
(
	LOC_N 	  VARCHAR2 (11) NOT NULL ,
	LOC_ID 	  VARCHAR2 (50) NOT NULL,
	LOC_T     VARCHAR2 (100) NOT NULL,
  PR_ID     INTEGER NOT NULL,
	FAC_C     VARCHAR2 (3) NOT NULL,
  DEPT_C    VARCHAR2 (3) NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_LOCATION IS 'Table stores the location list for the Purchase Requisition System.' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.LOC_N IS 'Oracle generated sequence number' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.LOC_ID IS 'Location ID' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.LOC_T IS 'Location Description' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.PR_ID IS 'PR ID. Reference to Purchase Request table' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.FAC_C IS 'Faculty Code. Referenced to Faculty Table' ;
COMMENT ON COLUMN PRSDBM.PRS_LOCATION.DEPT_C IS 'Department Code. Referenced to Department Table' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_LOCATION ADD (
CONSTRAINT PRS_LOC_PK_LN
PRIMARY KEY (LOC_N)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_LOCATION ADD (
CONSTRAINT PRS_LOC_FK_PID
FOREIGN KEY (PR_ID)
REFERENCES PRSDBM.PRS_PR_PURCH_REQ(PR_ID_N)
);

ALTER TABLE PRSDBM.PRS_LOCATION ADD (
CONSTRAINT PRS_LOC_FK_FC
FOREIGN KEY (FAC_C)
REFERENCES IISDBM.FACULTY(FAC_C)
);

ALTER TABLE PRSDBM.PRS_LOCATION ADD (
CONSTRAINT PRS_LOC_FK_DC
FOREIGN KEY (DEPT_C)
REFERENCES IISDBM.DEPARTMENT(DEPT_C)
);

/* ----------------------------------------------------------------------
SEQUENCE: PRS_LOC_LN_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_LOC_LN_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

GRANT SELECT ON PRSDBM.PRS_LOC_LN_SEQ TO PRJPRS;

GRANT SELECT ON PRSDBM.PRS_LOC_LN_SEQ TO RPTPRS;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_LOCATION TO PRJPRS;

GRANT SELECT ON PRSDBM.PRS_LOCATION TO RPTPRS;
