
-- Add request types PR/AOR/SQRR
INSERT INTO PRSCTABLE VALUES ('REQ_TYPE_PR','Purchase Request','N');
INSERT INTO PRSCTABLE VALUES ('REQ_TYPE_AOR','AOR','N');
INSERT INTO PRSCTABLE VALUES ('REQ_TYPE_SQRR','SQRR','N');


ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD ( REQ_TP_C VARCHAR2 (50) DEFAULT 'REQ_TYPE_PR' NOT NULL);
COMMENT ON COLUMN PRSDBM.PRS_PURCHASE_REQ.REQ_TP_C IS 'Request type PR/AOR/SQRR.';

ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD (
CONSTRAINT PRS_PPR_FK_RT        
FOREIGN KEY (REQ_TP_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

ALTER TABLE PRSDBM.PRS_PURCHASE_REQ DROP CONSTRAINT PRS_PPR_UK_RN;
ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD (
CONSTRAINT PRS_PPR_UK_RN
UNIQUE (REQ_N, REQ_TP_C)
	USING INDEX
	TABLESPACE S1_IDX
);

ALTER TABLE PRS_APPV_STS ADD PER_AUTHUSER_I VARCHAR2(12);
COMMENT ON COLUMN PRSDBM.PRS_APPV_STS.PER_AUTHUSER_I IS 'Id of the person that this approver is the delegate for.';

ALTER TABLE PRS_PURCHASE_REQ ADD PER_AUTHUSER_I VARCHAR2(12);
COMMENT ON COLUMN PRSDBM.PRS_PURCHASE_REQ.PER_AUTHUSER_I IS 'Id of the person that the requestor is the delegate for.';

ALTER TABLE PRS_DOCUMENT DROP COLUMN QT_N;

CREATE TABLE PRS_QUOTATION_DOCUMENT (
  QT_N VARCHAR2(11) NOT NULL,
  DOCU_N VARCHAR2(11) NOT NULL
)TABLESPACE S1_IDX;

COMMENT ON TABLE PRSDBM.PRS_QUOTATION_DOCUMENT IS 'Table stores relationship between the qutations and the documents.';
COMMENT ON COLUMN PRSDBM.PRS_QUOTATION_DOCUMENT.QT_N IS 'Foreign key referring to item in quotation table.';
COMMENT ON COLUMN PRSDBM.PRS_QUOTATION_DOCUMENT.DOCU_N IS 'Foreign key referring to item in document table.';

ALTER TABLE PRSDBM.PRS_QUOTATION_DOCUMENT ADD (
CONSTRAINT PRS_PQD_PK_QTDN       
PRIMARY KEY (QT_N,DOCU_N)
	USING INDEX
	TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_QUOTATION_DOCUMENT ADD (
CONSTRAINT PRS_PQD_FK_QT          
FOREIGN KEY (QT_N)
REFERENCES PRSDBM.PRS_QUOTATION(QT_N)
);

ALTER TABLE PRSDBM.PRS_QUOTATION_DOCUMENT ADD (
CONSTRAINT PRS_PQD_FK_DN         
FOREIGN KEY (DOCU_N)
REFERENCES PRSDBM.PRS_DOCUMENT(DOCU_N)
);

CREATE TABLE PRS_REQ_DOCUMENT (
  PR_N VARCHAR2(11) NOT NULL,
  DOCU_N VARCHAR2(11) NOT NULL
)TABLESPACE S1_IDX;

COMMENT ON TABLE PRSDBM.PRS_REQ_DOCUMENT IS 'Table stores relationship between the requests and the documents.';
COMMENT ON COLUMN PRSDBM.PRS_REQ_DOCUMENT.QT_N IS 'Foreign key referring to item in quotation table.';
COMMENT ON COLUMN PRSDBM.PRS_REQ_DOCUMENT.DOCU_N IS 'Foreign key referring to item in document table.';

ALTER TABLE PRSDBM.PRS_REQ_DOCUMENT ADD (
CONSTRAINT PRS_PRD_PK_PNDN         
PRIMARY KEY (PR_N,DOCU_N)
	USING INDEX
	TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_REQ_DOCUMENT ADD (
CONSTRAINT PRS_PRD_FK_PN        
FOREIGN KEY (PR_N)
REFERENCES PRSDBM.PRS_PURCHASE_REQ(PR_N)
);

ALTER TABLE PRSDBM.PRS_REQ_DOCUMENT ADD (
CONSTRAINT PRS_PRD_FK_DN      
FOREIGN KEY (DOCU_N)
REFERENCES PRSDBM.PRS_DOCUMENT(DOCU_N)
);

CREATE TABLE PRS_APPV_LMT (
  APPV_LMT_N VARCHAR2(11) NOT NULL,
  PR_N VARCHAR2(11) NOT NULL,
  WBS_AC_N     	VARCHAR2(20),
  GL_AC_N         VARCHAR2(20),
  AMT_A           NUMBER(16,4)
)TABLESPACE S1_IDX;

COMMENT ON TABLE PRSDBM.PRS_APPV_LMT IS 'Table stores the WBS / GL account and approved amount for the request.';
COMMENT ON COLUMN PRSDBM.PRS_APPV_LMT.APPV_LMT_N IS 'Primary key. It is a sequence no.';
COMMENT ON COLUMN PRSDBM.PRS_APPV_LMT.PR_N IS 'Foreign key referring to request.';
COMMENT ON COLUMN PRSDBM.PRS_APPV_LMT.WBS_AC_N IS 'Foreign key referring to a WBS account';
COMMENT ON COLUMN PRSDBM.PRS_APPV_LMT.GL_AC_N IS 'Foreign key referring to a GL account.';
COMMENT ON COLUMN PRSDBM.PRS_APPV_LMT.AMT_A IS 'The limit amount approved.';

ALTER TABLE PRSDBM.PRS_APPV_LMT ADD (
CONSTRAINT PRS_PAL_PK_AL          
PRIMARY KEY (APPV_LMT_N)
	USING INDEX
	TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_APPV_LMT ADD (
CONSTRAINT PRS_PAL_PK_PN           
FOREIGN KEY (PR_N)
REFERENCES PRSDBM.PRS_PURCHASE_REQ(PR_N)
);
   
CREATE SEQUENCE PRSDBM.PRS_APPV_LMT_SEQ;

GRANT SELECT ON PRSDBM.PRS_APPV_LMT_SEQ TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_QUOTATION_DOCUMENT TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_REQ_DOCUMENT TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_APPV_LMT TO PRJPRS;

GRANT SELECT ON PRSDBM.PRS_APPV_LMT_SEQ TO RPTPRS; 
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_QUOTATION_DOCUMENT TO RPTPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_REQ_DOCUMENT TO RPTPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_APPV_LMT TO RPTPRS;

--create index
CREATE INDEX PRSDBM.PRS_WBS_I_AC  ON PRSDBM.PRS_WBS (WBS_AC_N ASC) TABLESPACE S1_IDX;
CREATE INDEX PRSDBM.PRS_WBS_I_STF  ON PRSDBM.PRS_WBS (PI1_STF_N ASC) TABLESPACE S1_IDX;
CREATE INDEX PRSDBM.PRS_WBS_I_DEPT  ON PRSDBM.PRS_WBS (OFN_DEPT_C ASC) TABLESPACE S1_IDX;

DROP INDEX PRS_PPL_I_PN;
CREATE INDEX PRSDBM.PRS_PPL_I_PLN  ON  PRSDBM.PRS_PURCHASE_LINEITEM (PR_N,ITEM_N ASC) TABLESPACE S1_IDX;

DROP INDEX PRS_PPOL_I_PN;
CREATE INDEX PRSDBM.PRS_PPOL_I_PLN  ON  PRSDBM.PRS_PO_LINEITEM (PO_N, PO_LINEITEM_N ASC) TABLESPACE S1_IDX;

CREATE INDEX PRSDBM.PRS_PAS_I_AUI  ON PRSDBM.PRS_APPV_STS (APPV_USER_I ASC) TABLESPACE S1_IDX;
CREATE INDEX PRSDBM.PRS_PAS_I_PAI  ON PRSDBM.PRS_APPV_STS (PER_AUTHUSER_I ASC) TABLESPACE S1_IDX;
CREATE INDEX PRSDBM.PRS_PUA_I_UI ON PRSDBM.PRS_USER_ACCESS (USER_I ASC) TABLESPACE S1_IDX;

CREATE INDEX PRSDBM.PRS_PPR_I_PAI  ON PRSDBM.PRS_PURCHASE_REQ (PER_AUTHUSER_I ASC)  TABLESPACE S1_IDX;