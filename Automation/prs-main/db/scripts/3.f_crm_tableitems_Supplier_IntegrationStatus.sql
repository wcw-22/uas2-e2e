/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: PRS_SUPPLIER
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_SUPPLIER
(
	SUPP_I 	  VARCHAR2 (20) NOT NULL ,
	SUPP_NM_T 	  VARCHAR2 (100) NOT NULL,
	CTRY_C VARCHAR2 (3) NOT NULL,
	DEFUNCT_F VARCHAR2(1) NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_SUPPLIER IS 'Table stores the list of suppliers for the Purchase Requisition System.' ;
COMMENT ON COLUMN PRSDBM.PRS_SUPPLIER.SUPP_I IS 'Supplier code is stored.Not Nullable.' ;
COMMENT ON COLUMN PRSDBM.PRS_SUPPLIER.SUPP_NM_T IS 'Supplier name is stored. Not Nullable.' ;
COMMENT ON COLUMN PRSDBM.PRS_SUPPLIER.CTRY_C IS 'Country Code of the supplier is stored. E.g. SG' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_SUPPLIER ADD (
CONSTRAINT PRS_PS_PK_SI
PRIMARY KEY (SUPP_I)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_SUPPLIER ADD (
CONSTRAINT PRS_PS_FK_CC
FOREIGN KEY (CTRY_C)
REFERENCES IISDBM.COUNTRY(SAP_CTRY_C)
);
/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_SUPPLIER TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_SUPPLIER TO RPTPRS;

/* ----------------------------------------------------------------------
TABLE: PRS_INTGR_STS
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_INTGR_STS
(
	INTGR_TRAN_N VARCHAR2(11) NOT NULL,
	CHANNEL_NM_T VARCHAR2(20) NOT NULL,
	URL_T VARCHAR2(500) NOT NULL,
    HOSTNAME_T VARCHAR2(255) NOT NULL,
	INTGR_STS_C VARCHAR2(10) NOT NULL,
	FUNC_NM_T VARCHAR2(50) NOT NULL,
	DUR_N NUMERIC(20) NOT NULL,
	PAYLOAD CLOB,
	INTGR_TRAN_DTM DATE NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_INTGR_STS IS 'Table stores Integration status of the inbound/outbound webservice calls for the Purchase Requisition System.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.INTGR_TRAN_N IS 'Transaction Number for Integration status record. Generated by Oracle sequence.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.CHANNEL_NM_T IS 'Channel to be Inbound/Outbound.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.URL_T IS ' End point url of the webservice. ';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.INTGR_STS_C IS 'Integration status code for Inbound/Outbound Channel.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.FUNC_NM_T IS 'Function Name used to access webservice';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.DUR_N IS 'Time taken to process the webservice request/response.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.RMK_T IS 'Remarks to.';
COMMENT ON COLUMN PRSDBM.PRS_INTGR_STS.INTGR_TRAN_DTM IS 'Date and time of the webservice request/response made.';

/* -----------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_INTGR_STS ADD (
CONSTRAINT PRS_PIS_PK_TN
PRIMARY KEY (INTGR_TRAN_N)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_INTGR_STS ADD (
CONSTRAINT PRS_PIS_FK_ISC
FOREIGN KEY (INTGR_STS_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

/* ----------------------------------------------------------------------
SEQUENCE: PRS_INTGR_STS_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_INTGR_STS_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_INTGR_STS_SEQ TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRS_INTGR_STS_SEQ TO RPTPRS;

/* ----------------------------------------------------------------------
TABLE: PRS_COUNTRY
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_COUNTRY
(
	CTRY_C 	  VARCHAR2 (3) NOT NULL ,
	CTRY_T 	  VARCHAR2 (100) NOT NULL,
);
--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_COUNTRY IS 'Table stores the Country list.' ;
COMMENT ON COLUMN PRSDBM.PRS_COUNTRY.CTRY_C IS 'Country code is stored.Not Nullable. E.g. SG' ;
COMMENT ON COLUMN PRSDBM.PRS_COUNTRY.CTRY_T IS 'Country Name is stored. Not Nullable.' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_COUNTRY ADD (
CONSTRAINT PRS_PC_PK_CC
PRIMARY KEY (CTRY_C)
	--USING INDEX
	--TABLESPACE S1_IDX
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_COUNTRY TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_COUNTRY TO RPTPRS;