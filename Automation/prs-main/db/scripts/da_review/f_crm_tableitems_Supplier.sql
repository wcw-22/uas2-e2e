/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: PRSSUPPLIER
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRSSUPPLIER
(
	SUPP_C 	  VARCHAR2 (30) NOT NULL ,
	SUPP_T 	  VARCHAR2 (100) NOT NULL,
	CTRY_C VARCHAR2 (3) NOT NULL,
	DEFUNCT_F VARCHAR2(1) NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRSSUPPLIER IS 'Table stores the list of suppliers for the Purchase Requisition System.' ;
COMMENT ON COLUMN PRSDBM.PRSSUPPLIER.SUPP_C IS 'Supplier code' ;
COMMENT ON COLUMN PRSDBM.PRSSUPPLIER.SUPP_T IS 'Supplier name' ;
COMMENT ON COLUMN PRSDBM.PRSSUPPLIER.CTRY_C IS 'Reference to the Country Table. Country Code of  the Supplier' ;
COMMENT ON COLUMN PRSDBM.PRSSUPPLIER.DEFUNCT_F IS 'Flag to denote if code is no longer in use (Y, N).' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRSSUPPLIER ADD (
CONSTRAINT PRS_PS_PK_SC
PRIMARY KEY (SUPP_C)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRSSUPPLIER ADD (
CONSTRAINT PRS_PS_FK_CC
FOREIGN KEY (CTRY_C)
REFERENCES IISDBM.COUNTRY(SAP_CTRY_C)
);

ALTER TABLE PRSDBM.PRSSUPPLIER ADD (
CONSTRAINT PRS_PS_CK_DF
CHECK (DEFUNCT_F IN ('Y', 'N'))
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRSSUPPLIER TO PRJPRS;

GRANT SELECT ON PRSDBM.PRSSUPPLIER TO RPTPRS;

GRANT SELECT ON PRSDBM.PRSSUPPLIER TO PRJHMMS;