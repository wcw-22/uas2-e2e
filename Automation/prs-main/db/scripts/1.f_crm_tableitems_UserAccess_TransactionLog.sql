/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: PRSCTABLE
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRSCTABLE
(
	CODE_C 	  VARCHAR2 (50) NOT NULL ,
	CODE_T 	  VARCHAR2 (100) NOT NULL,
	DEFUNCT_F VARCHAR2 (1) NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRSCTABLE IS 'This exclusive code table stores the list of common defined codes that are used in the Purchase Requisition System.' ;
COMMENT ON COLUMN PRSDBM.PRSCTABLE.CODE_C IS 'Commonly defined code used in the system.' ;
COMMENT ON COLUMN PRSDBM.PRSCTABLE.CODE_T IS 'Description for the common defined code that is used in the system.' ;
COMMENT ON COLUMN PRSDBM.PRSCTABLE.DEFUNCT_F IS 'Flag to denote if code is no longer in use (Y, N).' ;

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRSCTABLE ADD (
CONSTRAINT PRS_PCT_PK_CC
PRIMARY KEY (CODE_C)
	--USING INDEX
	--TABLESPACE S1_IDX
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRSCTABLE TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRSCTABLE TO RPTPRS;

/* ----------------------------------------------------------------------
TABLE: PRS_USER_ACCESS
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_USER_ACCESS
(
	ACCESS_N VARCHAR2(11) NOT NULL,
	USER_I VARCHAR2(12) NOT NULL,
	ROLE_TP_C VARCHAR2(50) NOT NULL,
	FAC_C VARCHAR2(2),
	DEPT_C VARCHAR2(3),
	REC_UPDUSER_I VARCHAR2(12) NOT NULL,
	REC_UPD_DTM DATE NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_USER_ACCESS IS 'Table stores the user access records for the Purchase Requisition System.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.ACCESS_N IS 'ID for user access record. Generated by Oracle sequence.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.USER_I IS 'User ID of user granted access. Validated by the application.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.ROLE_TP_C IS 'The role type code the user is granted access as. E.g. ROLE_NUS_ADMIN, etc. ';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.FAC_C IS 'Faculty code for faculties user is granted access to. Nullable as user can be granted access as an NUS administrator.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.DEPT_C IS 'Department code that user is granted access to. Can be nullable as user can be granted access as an NUS administrator or Faculty administrator.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.REC_UPDUSER_I IS 'User ID of the user who last made changes to the record. Validated by the application.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ACCESS.REC_UPD_DTM IS 'Date and time of last update made to the record.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_USER_ACCESS ADD (
CONSTRAINT PRS_PUA_PK_AN
PRIMARY KEY (ACCESS_N)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_USER_ACCESS ADD (
CONSTRAINT PRS_PUA_FK_RTC
FOREIGN KEY (ROLE_TP_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

ALTER TABLE PRSDBM.PRS_USER_ACCESS ADD (
CONSTRAINT PRS_PUA_FK_FC
FOREIGN KEY (FAC_C)
REFERENCES FACULTY(FAC_C)
);

ALTER TABLE PRSDBM.PRS_USER_ACCESS ADD (
CONSTRAINT PRS_PUA_FK_DC
FOREIGN KEY (DEPT_C)
REFERENCES DEPARTMENT(DEPT_C)
);

/* ----------------------------------------------------------------------
SEQUENCE: PRS_USER_ACCESS_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_USER_ACCESS_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

GRANT SELECT ON PRSDBM.PRS_USER_ACCESS_SEQ TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_USER_ACCESS_SEQ TO RPTPRS;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_USER_ACCESS TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSCTABLE TO RPTPRS;


/* ----------------------------------------------------------------------
TABLE: PRS_USER_ATTR
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_USER_ATTR
(
	USER_ATTR_N VARCHAR2(11) NOT NULL,
	ACCESS_N VARCHAR2(11) NOT NULL,
	USER_ATTR_C VARCHAR2(50) NOT NULL
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_USER_ATTR IS 'Table stores additional user access attributes that are applied to the user access record. For example, whether user is the primary person, etc.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ATTR.USER_ATTR_N IS 'ID of user attribute record. Generated by Oracle Sequence.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ATTR.ACCESS_N IS 'Reference to the user access record this attribute applies to.';
COMMENT ON COLUMN PRSDBM.PRS_USER_ATTR.USER_ATTR_C IS 'Code of attribute to be applied to the user access record. E.g. USER_ATTR_PRIMARY, etc.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_USER_ATTR ADD (
CONSTRAINT PRS_PUAT_PK_UAN
PRIMARY KEY (USER_ATTR_N)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_USER_ATTR ADD (
CONSTRAINT PRS_PUAT_FK_AN
FOREIGN KEY (ACCESS_N)
REFERENCES PRSDBM.PRS_USER_ACCESS(ACCESS_N)
);

ALTER TABLE PRSDBM.PRS_USER_ATTR ADD (
CONSTRAINT PRS_PUAT_FK_UAC
FOREIGN KEY (USER_ATTR_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

/* ----------------------------------------------------------------------
SEQUENCE: PRS_USER_ACCESS_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_USER_ATTR_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

GRANT SELECT ON PRSDBM.PRS_USER_ATTR_SEQ TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_USER_ATTR_SEQ TO RPTPRS;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_USER_ATTR TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_USER_ATTR TO RPTPRS;


/* ----------------------------------------------------------------------
TABLE: PRS_TRAN_LOG
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_TRAN_LOG
(
	LOG_TRAN_N VARCHAR2(11) NOT NULL,
	TRAN_TP_C VARCHAR2(50),
	TRAN_DTM DATE NOT NULL,
	PROG_FUNC_C VARCHAR2(50) NOT NULL,
	USER_I VARCHAR2(12) NOT NULL,
	USER_IPADDR_T VARCHAR2(15) NOT NULL,
	TRAN_BF_T CLOB,
	TRAN_AF_T CLOB
)
;--TABLESPACE S1_DAT;

COMMENT ON TABLE PRSDBM.PRS_TRAN_LOG IS 'Transaction log table for the Purchase Requisition System.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.LOG_TRAN_N IS 'ID for the transaction log record. Generated by Oracle sequence.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.TRAN_TP_C IS 'Transaction type code for this transaction. E.g. Insert, Update, Delete. Nullable as Login and Logout updates no data.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.TRAN_DTM IS 'Date and time of transaction.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.PROG_FUNC_C IS 'Program function that the transaction applies to. E.g. Login, Logout, User Access, etc.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.USER_I IS 'User ID of user performing the transaction. Validated by the application.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.USER_IPADDR_T IS 'IP address of the machine the request originates from.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.TRAN_BF_T IS 'Before image of data involved in the transaction in the form of JSON. Nullable as transactions such as log in and log out have no data to save.';
COMMENT ON COLUMN PRSDBM.PRS_TRAN_LOG.TRAN_AF_T IS 'After image of data involved in the transaction in the form of JSON. Nullable as transactions such as log in and log out have no data to save.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_TRAN_LOG ADD (
CONSTRAINT PRS_PTL_PK_LTN
PRIMARY KEY (LOG_TRAN_N)
	--USING INDEX
	--TABLESPACE S1_IDX
);

ALTER TABLE PRSDBM.PRS_TRAN_LOG ADD (
CONSTRAINT PRS_PTL_FK_TTC
FOREIGN KEY (TRAN_TP_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

ALTER TABLE PRSDBM.PRS_TRAN_LOG ADD (
CONSTRAINT PRS_PTL_FK_PFC
FOREIGN KEY (PROG_FUNC_C)
REFERENCES PRSDBM.PRSCTABLE(CODE_C)
);

/* ----------------------------------------------------------------------
SEQUENCE: PRS_USER_ACCESS_SEQ
---------------------------------------------------------------------- */
CREATE SEQUENCE PRSDBM.PRS_TRAN_LOG_SEQ
    START WITH 1
    MINVALUE 1
    INCREMENT BY 1
    NOCYCLE
    NOCACHE;

GRANT SELECT ON PRSDBM.PRS_TRAN_LOG_SEQ TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_TRAN_LOG_SEQ TO RPTPRS;

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_TRAN_LOG TO PRJPRS;
-- TODO: No RPTPRS user yet.
-- GRANT SELECT ON PRSDBM.PRS_TRAN_LOG TO RPTPRS;


/* ----------------------------------------------------------------------
PRSCTABLE: Populate code table
---------------------------------------------------------------------- */
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_NUS_ADMIN', 'NUS Administrator', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_FAC_ADMIN', 'Faculty Administrator', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_DEPT_ADMIN', 'Department Administrator', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_REGULATORY', 'Regulatory Officer', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_PROCUREMENT', 'Procurement Officer', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_QUOTATION_APPV_AUTH', 'Quotation Approving Authority', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_GOODS_RECEIPT', 'Goods Receipt Officer', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_PRINCIPAL_INVESTIGATOR', 'Principal Investigator', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_RESEARCHER', 'Researcher', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_LAB_ADMIN', 'Laboratory Administrator', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_HEAD_OF_DEPARTMENT', 'Head of Department', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('ROLE_DEAN', 'Dean', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('USER_ATTR_PRIMARY', 'Primary', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('USER_ATTR_QAA_5K_TO_15K', 'EPV 5,001 to 15,000', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('USER_ATTR_QAA_15K_TO_100K','EPV 15,001 to 100,000', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('TRN_TP_INS', 'Insert', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('TRN_TP_UPD', 'Update', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('TRN_TP_DEL', 'Delete', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PROG_FN_LOGIN', 'User Login', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PROG_FN_LOGOUT', 'User Logout', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PROG_FN_USERACCESS', 'User Access', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PROG_FN_PURCHASEREQ', 'Purchase Requisition', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PROG_FN_AORAPPVR', 'AOR Approver', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PROG_FN_FIXDELVADDR', 'Fixed Delivery Address', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PRODUCT_CHEMICAL', 'Chemical Product', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PRODUCT_ADDITIONAL_CHARGE', 'Additional Charges', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_FUND', 'Fund Check', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_LICENCE', 'Licence Check', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_SUCCESS', 'Success', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_FAILURE', 'Failure', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('INTGR_INBOUND', 'Inbound', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('INTGR_OUTBOUND', 'Outbound', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_DRAFT', 'Draft', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_PENDING_APPROVAL_RO', 'Pending approval by Regulatory Officer', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_PENDING_APPROVAL_1', 'Pending approval by Approver 1 / Delegate', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_PENDING_APPROVAL_2', 'Pending approval by Approver 2 / Delegate', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_APPROVED', 'Approved', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_REJECTED', 'Rejected', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('REQ_STS_CANCELLED', 'Cancelled', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('EPV_TYPE_LESS_OR_EQUAL_5000', 'Purchase Request (EPV <= $5,000)', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('EPV_TYPE_ABOVE_5000', 'Approval of Requirement (EPV > $5,000)', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PAYMENT_TERM_PT00', 'Due Immediately', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PAYMENT_TERM_30', '30 Days', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PAYMENT_TERM_45', '45 Days', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PAYMENT_TERM_60', '60 Days', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_STS_APPROVED','Approved', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_STS_REJECTED','Rejected', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_STS_ONHOLD','On Hold', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_STS_PENDING','Pending', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_TP_REGULATORY_OFFICER','Regulatory Officer', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_TP_APPROVER_1','Approver 1', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('APPV_TP_APPROVER_2','Approver 2', 'N');

insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_PENDING_APPROVAL','PO Pending Approval', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_REJECTED_PS','PO Rejected by SESAMi', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_REJECTED','PO Rejected', 'N')    ;
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_APPROVED','PO Approved', 'N')   	;
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_CREATION_FAILED','PO Creation Failed', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('PO_CANCELLED','PO Cancelled', 'N')   ;

insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRS_PENDING_APPROVAL','Goods Receipt Pending Approval', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRN_PENDING_APPROVAL','Goods Return Pending Approval', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRS_REJECTED_PS','Goods Receipt Rejected by SESAMi', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRN_REJECTED_PS','Goods Return Rejected by SESAMi', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRS_APPROVED','Goods Receipt Approved', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRN_APPROVED','Goods Return Approved', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRS_CREATION_FAILED','Goods Receipt Creation Failed', 'N');
insert into PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) values ('GRN_CREATION_FAILED','Goods Return Creation Failed', 'N');


INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_FUND', 'Fund Check', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_LICENCE', 'Licence Check', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_SUCCESS', 'Success', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('SYSCHK_FAILURE', 'Failure', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_ITEM_NEW', 'New', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_ITEM_CHANGED', 'Changed', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_ITEM_CANCELLED', 'Cancelled', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('GR_GRS', 'Goods Receipt', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('GR_GRN', 'Goods Return', 'N');

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('AWARD_JUSTIFY_LOWEST', 'Lowest/Only Quote that meets requirements', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('AWARD_JUSTIFY_QUALITY', 'Quality considerations if not the lowest quote [Please describe how bids were evaluated]', 'N');

Insert into PRSCTABLE (CODE_C,CODE_T,DEFUNCT_F) values ('REQ_TYPE_PR','PR','N');
Insert into PRSCTABLE (CODE_C,CODE_T,DEFUNCT_F) values ('REQ_TYPE_AOR','AOR','N');
Insert into PRSCTABLE (CODE_C,CODE_T,DEFUNCT_F) values ('REQ_TYPE_SQRR','SQRR','N');


INSERT INTO PRS_CONTROL_PARAM (PARAM_N, PARAM_T, PARAM_VAL_T, PARAM_DESC_T, ST_DTM, END_DTM)
VALUES (PRS_CONTROL_PARAM_SEQ.nextVal, 'CFG_PARAM_GST', '0.07', 'GST', TO_DATE('2019-05-15 00:00:00', 'YYYY-MM-DD HH24:MI:SS'),
        TO_DATE('2099-12-31 11:59:00', 'YYYY-MM-DD HH24:MI:SS'));
        

INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_ISSUED', 'PO Issued and Pending Goods Receipt', 'N');
INSERT INTO PRSCTABLE (CODE_C, CODE_T, DEFUNCT_F) VALUES ('PO_GR_COMPLETED', 'Completed Goods Receipt', 'N');

DELETE FROM PRSCTABLE WHERE CODE_C = 'PO_APPROVED';

INSERT INTO "PRSDBM"."PRSCTABLE" (CODE_C, CODE_T, DEFUNCT_F) VALUES ('LMMS_INVNT_RESERVED', 'LMMS Inventory Reserved', 'N')
INSERT INTO "PRSDBM"."PRSCTABLE" (CODE_C, CODE_T, DEFUNCT_F) VALUES ('LMMS_INVNT_RESERVED_COMMIT', 'LMMS Inventory Reserved Commit', 'N')
INSERT INTO "PRSDBM"."PRSCTABLE" (CODE_C, CODE_T, DEFUNCT_F) VALUES ('LMMS_INVNT_RESERVED_ROLLBACK', 'LMMS Inventory Reserved Rollback', 'N')
