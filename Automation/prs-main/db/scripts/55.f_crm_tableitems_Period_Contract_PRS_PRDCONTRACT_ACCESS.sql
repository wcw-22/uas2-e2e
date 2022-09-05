--Purpose : Period Contract Tables

 
 /* ----------------------------------------------------------------------
TABLE: PRS_PRDCNTRACT_ACCESS => PRS_PRDCONTRACT_ACCESS
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS
  (
    ACCESS_N       VARCHAR2 (11) NOT NULL ,
    PRDCON_SEQ_N   VARCHAR2 (11) NOT NULL ,
    FAC_C          VARCHAR2 (2) NOT NULL ,
    DEPT_C         VARCHAR2 (3)
  ) ;

COMMENT ON TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS IS
    'This table is used to store period contract access (applicable level) details. Eg Whether the period contract is applicable for a faculty or a department';

COMMENT ON COLUMN PRSDBM.PRS_PRDCONTRACT_ACCESS.ACCESS_N IS 'Auto generated unique identifying/sequence no for the access record' ;
COMMENT ON COLUMN PRSDBM.PRS_PRDCONTRACT_ACCESS.PRDCON_SEQ_N IS 'Contract Sequence no (Reference to PRS_PERIODCONTRACT_PARTICS)';
COMMENT ON COLUMN PRSDBM.PRS_PRDCONTRACT_ACCESS.FAC_C IS 'Faculty Code of the faculty that can access the period contract (Reference to FACULTY)' ;
COMMENT ON COLUMN PRSDBM.PRS_PRDCONTRACT_ACCESS.DEPT_C IS 'Department Code  of the faculty that can access the period contract (Reference to DEPARTMENT)' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
 ALTER TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS ADD CONSTRAINT PRS_PCA_PK_AN PRIMARY KEY ( ACCESS_N ) ;
 ALTER TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS ADD CONSTRAINT PRS_PCA_FK_DC FOREIGN KEY ( DEPT_C ) REFERENCES IISDBM.DEPARTMENT( DEPT_C ) ;
 ALTER TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS ADD CONSTRAINT PRS_PCA_FK_FC FOREIGN KEY ( FAC_C) REFERENCES IISDBM.FACULTY( FAC_C) ;
 ALTER TABLE PRSDBM.PRS_PRDCONTRACT_ACCESS ADD CONSTRAINT PRS_PCA_FK_PS FOREIGN KEY ( PRDCON_SEQ_N ) REFERENCES PRSDBMPRS_PERIODCONTRACT_PARTICS( PRDCON_SEQ_N ) ;
 
/* ----------------------------------------------------------------------
PRS_PRDCONTRACT_ACCESS_SEQ - Sequence for PRS_PRDCONTRACT_ACCESS
---------------------------------------------------------------------- */


CREATE SEQUENCE PRSDBM.PRS_PRDCONTRACT_ACCESS_SEQ START WITH 1 MINVALUE 1 NOCACHE ORDER ;
 
  /* ----------------------------------------------------------------------
GRANTS
---------------------------------------------------------------------- */
  GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PRDCONTRACT_ACCESS TO PRJPRS;  
  GRANT SELECT ON PRSDBM.PRS_PRDCONTRACT_ACCESS_SEQ TO PRJPRS;
  GRANT SELECT ON PRSDBM.PRS_PRDCONTRACT_ACCESS TO RPTPRS;  
  GRANT SELECT ON PRSDBM.PRS_PRDCONTRACT_ACCESS_SEQ TO RPTPRS; 
   
   
  /* ----------------------------------------------------------------------
SYNONYMS
---------------------------------------------------------------------- */
CREATE PUBLIC SYNONYM PRS_PRDCONTRACT_ACCESS FOR PRSDBM.PRS_PRDCONTRACT_ACCESS;
CREATE PUBLIC SYNONYM PRS_PRDCONTRACT_ACCESS_SEQ FOR PRSDBM.PRS_PRDCONTRACT_ACCESS_SEQ;