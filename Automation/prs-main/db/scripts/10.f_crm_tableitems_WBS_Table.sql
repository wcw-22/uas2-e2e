/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: PRS_WBS
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_WBS
(
	WBS_N VARCHAR2(11) NOT NULL,
    WBS_ELEMT VARCHAR2(50) NOT NULL,
    WBS_DESC_T VARCHAR2(50),
    CTRL_AREA VARCHAR2(50) NOT NULL,
    COST_CTR VARCHAR2(50) NOT NULL,
    PI1_ID VARCHAR2(12),
    OFN_DEPT_C VARCHAR2(3)NOT NULL,
    WBS_USER_STS VARCHAR2(50) NOT NULL,
    WBS_ACTIV_F VARCHAR2(1) NOT NULL,
    DEFUNCT_F VARCHAR2(1) NOT NULL
    
)
;

COMMENT ON TABLE PRSDBM.PRS_WBS IS 'This table stores wbs accounts.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.WBS_N IS 'Primary key of record. Generated by Oracle sequence.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.WBS_ELEMT IS 'WBS number.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.WBS_DESC_T IS 'WBS description.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.CTRL_AREA IS 'Controlling area.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.COST_CTR IS 'Responsible Cost Center.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.PI1_ID IS 'ID of the PI1.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.OFN_DEPT_C IS 'WBS department code.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.WBS_USER_STS IS 'WBS user status.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.WBS_ACTIV_F IS 'Active status. Y-Active, N-Inactive.';
COMMENT ON COLUMN PRSDBM.PRS_WBS.DEFUNCT_F IS 'To indicate if the record is deleted.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_WBS ADD (
CONSTRAINT PRS_WBS_PK_PWN
PRIMARY KEY (WBS_N)
);

/*
ALTER TABLE PRS_WBS ADD 
CONSTRAINT PRS_WBS_UK_PWE 
UNIQUE (WBS_ELEMT);*/

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_WBS TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_WBS TO RPTPRS;

/*
 * Sequences
 */
CREATE SEQUENCE PRSDBM.PRS_WBS_SEQ;
GRANT SELECT ON PRSDBM.PRS_WBS_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_WBS_SEQ TO RPTPRS;