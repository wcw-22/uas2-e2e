-- Purpose : PRS PURCHASE REQUEST TABLES
--     Date:        2019-03-21 
-- PRS PURCHASE REQUEST TABLES
-- PRS PURCHASE REQUEST TABLES
DROP TABLE PRSDBM.PRS_PR_PURCH_REQ CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_LINEITEM CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_LINEITEM_PRDC CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_AC_ASSIGN CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_QT CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_DOCU CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_QT_AWARD CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_DELIVERY_INFO CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_PR_SYSTEM_CHECK CASCADE CONSTRAINTS;
DROP TABLE PRSDBM.PRS_USER_PREF CASCADE CONSTRAINTS;
--PR
CREATE TABLE PRS_PR_PURCH_REQ (
    PR_ID_N                  INTEGER NOT NULL,
    REQ_N                    VARCHAR2(16) NOT NULL,
    FAC_C                    VARCHAR2(2),
    DEPT_C                   VARCHAR2(3),
    REQUESTOR_N              VARCHAR2(12),
    CURRENCY_C               VARCHAR2(50),
    TOTAL_AMT_A              NUMBER(20,4),
    EPV_C                    VARCHAR2(50),
    PR_DETL_T                CLOB CONSTRAINT ENSURE_JSON_PRDETAIL CHECK (PR_DETL_T IS JSON),
    STS_C                    VARCHAR2(50),
	PURCH_PPOSE              VARCHAR2(400),
	INVNT_OWNER              VARCHAR2(12),
    QT_JUSTIFICATION_RMK_T   CLOB,
	EXP_
    REC_CREATE_DTM           DATE,
    REC_UPD_DTM              DATE,
    REC_CREATEUSER_I         VARCHAR2(12),
    REC_UPDUSER_I            VARCHAR2(12)
)
;
COMMENT ON COLUMN prs_pr_purch_req.pr_id_n IS 'Surrogate key for purchase request.';
COMMENT ON COLUMN prs_pr_purch_req.requestor_n IS 'Staff number or sutdent matric id,for uniquely identify a staff or student.';
COMMENT ON COLUMN prs_pr_purch_req.pr_detl_t IS 'Contains content specific to this PR. PR belongs to different different category will have different details.'
;
COMMENT ON COLUMN prs_pr_purch_req.qt_justification_rmk_t IS 'For " purchase request" level scenarios where no enough quotations are provided or there are other special reasons.'
;
COMMENT ON COLUMN prs_pr_purch_req.rec_createuser_i IS 'Staff number or student matric ID.';
COMMENT ON COLUMN prs_pr_purch_req.rec_upduser_i IS 'Staff number or student matric ID.';
CREATE UNIQUE INDEX prs_pr_reqnumber__idx ON
    prs_pr_purch_req ( req_n ASC )
        ;
CREATE INDEX prs_pr_requestor__idx ON
    prs_pr_purch_req ( requestor_n ASC )
        ;
CREATE INDEX prs_pr_facdept__idx ON
    prs_pr_purch_req ( fac_c ASC,dept_c ASC )
        ;
ALTER TABLE prs_pr_purch_req ADD CONSTRAINT prs_pr_pk PRIMARY KEY ( pr_id_n );
ALTER TABLE prs_pr_purch_req ADD CONSTRAINT prs_pr_reqnumber__un UNIQUE ( req_n );
ALTER TABLE prs_pr_purch_req ADD CONSTRAINT prs_pr_fac_fk FOREIGN KEY ( fac_c )
    REFERENCES faculty ( fac_c )
;
ALTER TABLE prs_pr_purch_req ADD CONSTRAINT prs_pr__dept_fk FOREIGN KEY ( dept_c )
    REFERENCES department ( dept_c )
;

--Lineitem
CREATE TABLE PRS_PR_LINEITEM (
    LINEITEM_ID_N         INTEGER NOT NULL,
    PR_ID_N               INTEGER NOT NULL,
    LINEITEM_N            SMALLINT NOT NULL,
    QUANTITY_Q            NUMBER,
    UNIT_PRICE_N          NUMBER,
    SUBTOTAL_A            NUMBER,
    UNIT_C                VARCHAR2(3),
    QUANTITY_PER_UNIT_N   NUMBER,
    PRDC_ID_N             INTEGER
)
;
COMMENT ON COLUMN prs_pr_lineitem.lineitem_id_n IS 'The is the sequence number for this lineitem within the lineitem table.';
COMMENT ON COLUMN prs_pr_lineitem.pr_id_n IS 'One PR can have multiple lineitems.';
COMMENT ON COLUMN prs_pr_lineitem.lineitem_n IS 'This is the lineitem number within a purchase request. It is running number from 1 onwards within each purchase request.'
;
COMMENT ON COLUMN prs_pr_lineitem.prdc_id_n IS 'One and only one product in one lineitem.';
CREATE UNIQUE INDEX prs_lineitem__idx ON
    prs_pr_lineitem ( pr_id_n ASC,lineitem_n ASC )
        ;
ALTER TABLE prs_pr_lineitem ADD CONSTRAINT prs_lineitem_pk PRIMARY KEY ( lineitem_id_n );
ALTER TABLE prs_pr_lineitem ADD CONSTRAINT prs_lineitem_pr_fk FOREIGN KEY ( pr_id_n )
    REFERENCES prs_pr_purch_req ( pr_id_n )
;

--Lineitem product
CREATE TABLE PRS_PR_LINEITEM_PRDC (
    PRDC_ID_N       INTEGER NOT NULL,
    PRDC_DETL_T     CLOB CONSTRAINT ENSURE_JSON_PRODDTL CHECK (PRDC_DETL_T IS JSON),
    PRDC_REF_N      VARCHAR2(20),
    CAT_C           VARCHAR2(50) NOT NULL,
    LINEITEM_ID_N   INTEGER NOT NULL
)
;
COMMENT ON COLUMN prs_pr_lineitem_prdc.prdc_ref_n IS 'Reference id to the product details based on the product category';
COMMENT ON COLUMN prs_pr_lineitem_prdc.lineitem_id_n IS 'One product is for one and only one lineitem.';
CREATE INDEX prs_prdc_lmmsrefid__idx ON
    prs_pr_lineitem_prdc ( prdc_ref_n ASC )
        ;
CREATE INDEX prs_prdc_lineitem__idx ON
    prs_pr_lineitem_prdc ( lineitem_id_n ASC )
        ;
ALTER TABLE prs_pr_lineitem_prdc ADD CONSTRAINT prs_lineitem_prdc_pk PRIMARY KEY ( prdc_id_n );
ALTER TABLE prs_pr_lineitem_prdc ADD CONSTRAINT prs_prdc_lineitem_fk FOREIGN KEY ( lineitem_id_n )
    REFERENCES prs_pr_lineitem ( lineitem_id_n )
;
ALTER TABLE prs_pr_lineitem_prdc ADD CONSTRAINT prs_prdc_prsctable_fk FOREIGN KEY ( cat_c )
    REFERENCES prsctable ( code_c )
;
ALTER TABLE prs_pr_lineitem ADD CONSTRAINT prs_lineitem_prdc_fk FOREIGN KEY ( prdc_id_n )
    REFERENCES prs_pr_lineitem_prdc ( prdc_id_n )
;

--account assignment
CREATE TABLE PRS_PR_AC_ASSIGN (
    ACASSIGN_ID_N   INTEGER NOT NULL,
    LINEITEM_ID_N   INTEGER NOT NULL,
    WBS_N           VARCHAR2(15),
    GL_N            VARCHAR2(10),
    QUANTITY_Q      NUMBER(16,4),
    AMT_A           NUMBER(16,4),
    SGD_AMT_A       NUMBER(16,4)
)
;

COMMENT ON COLUMN prs_pr_ac_assign.lineitem_id_n IS 'The lineitem the account assignment belongs to.';
COMMENT ON COLUMN prs_pr_ac_assign.wbs_n IS 'WBS account number.';
COMMENT ON COLUMN prs_pr_ac_assign.gl_n IS 'GL account number.';
COMMENT ON COLUMN prs_pr_ac_assign.sgd_amt_a IS 'For PR with foreign currency,respective SGD amount is provided by user for fund check. '
;

CREATE INDEX PRS_ACASSIGN_LINEITEM___IDX ON
    PRS_PR_AC_ASSIGN ( LINEITEM_ID_N ASC )
;

ALTER TABLE PRS_PR_AC_ASSIGN ADD CONSTRAINT PRS_AC_ASSIGN_PK PRIMARY KEY ( ACASSIGN_ID_N );
ALTER TABLE PRS_PR_AC_ASSIGN ADD CONSTRAINT PRS_ACASSIGN_LINEITEM_FK FOREIGN KEY ( LINEITEM_ID_N )
    REFERENCES PRS_PR_LINEITEM ( LINEITEM_ID_N )
;

--delivery info
CREATE TABLE PRS_PR_DELIVERY_INFO (
    DELVINFO_ID_N       INTEGER NOT NULL,
    PR_ID_N             INTEGER NOT NULL,
    PAYMT_TERM_C        VARCHAR2(500),
    DADDR_T             VARCHAR2(500),
    BADDR_T             VARCHAR2(500),
    REQUESTOR_EMAIL_T   VARCHAR2(500),
    REQUESTOR_PHONE_T   VARCHAR2(20),
	EXP_DELV_DTM        DATE,
    INSTRN_TO_SUPP_T    CLOB
)
;
COMMENT ON COLUMN prs_pr_delivery_info.paymt_term_c IS 'PRSCTABLE? ';
COMMENT ON COLUMN prs_pr_delivery_info.daddr_t IS 'Maximum X number of  recently entered unique options will be kept in the preference table; the chosen or the newly entered will be stored in the delivery info.'
;
COMMENT ON COLUMN prs_pr_delivery_info.baddr_t IS 'Maximum X number of  recently entered unique options will be kept in the preference table; the chosen or the newly entered will be stored in the delivery info.'
;
COMMENT ON COLUMN prs_pr_delivery_info.requestor_email_t IS 'The chosen email from multiple available emails for this requestor.';
COMMENT ON COLUMN prs_pr_delivery_info.requestor_phone_t IS 'Maximum X number of  recently entered unique options will be kept in the preference table; the chosen or the newly entered will be stored in the delivery info.'
;
CREATE INDEX prs_delvinfo_pr__idx ON
    prs_pr_delivery_info ( pr_id_n ASC )
        ;
ALTER TABLE prs_pr_delivery_info ADD CONSTRAINT prs_delv_info_pk PRIMARY KEY ( delvinfo_id_n );
ALTER TABLE prs_pr_delivery_info ADD CONSTRAINT prs_delvinfo_pr_fk FOREIGN KEY ( pr_id_n )
    REFERENCES prs_pr_purch_req ( pr_id_n )
;

--quotation
CREATE TABLE PRS_PR_QT (
    QT_ID_N    INTEGER NOT NULL,
    PR_ID_N    INTEGER NOT NULL,
    SUPP_C     VARCHAR2(50),
    QT_AMT_A   NUMBER
)
;
CREATE INDEX prs_qt_pr__idx ON
    prs_pr_qt ( pr_id_n ASC )
        ;
ALTER TABLE prs_pr_qt ADD CONSTRAINT prs_qt_pk PRIMARY KEY ( qt_id_n );
ALTER TABLE prs_pr_qt ADD CONSTRAINT prs_qt_pr_fk FOREIGN KEY ( pr_id_n )
    REFERENCES prs_pr_purch_req ( pr_id_n )
;
ALTER TABLE prs_pr_qt ADD CONSTRAINT prs_qt_supplier_fk FOREIGN KEY ( supp_c )
    REFERENCES prs_supplier ( supp_i )
;

--quotation document
CREATE TABLE PRS_PR_DOCU (
    DOCU_ID_N      INTEGER NOT NULL,
    QT_ID_N        INTEGER NOT NULL,
    DOCU_DESC_T    VARCHAR2(250),
    DOCU_NAME_T    VARCHAR2(500),
    DOCU_TYPE_C    VARCHAR2(50),
    DOCU_CONT_IM   BLOB
)
;
COMMENT ON COLUMN prs_pr_docu.docu_type_c IS 'The type can be PDF,JPG,WORD,Excel etc. The full list can be found in PRSCTABLE';
CREATE INDEX prs_docu_qt__idx ON
    prs_pr_docu ( qt_id_n ASC )
        ;
ALTER TABLE prs_pr_docu ADD CONSTRAINT prs_docu_pk PRIMARY KEY ( docu_id_n );
ALTER TABLE prs_pr_docu ADD CONSTRAINT prs_docu_qt_fk FOREIGN KEY ( qt_id_n )
    REFERENCES prs_pr_qt ( qt_id_n )
;

--quotation award
CREATE TABLE PRS_PR_QT_AWARD (
    AWARD_ID_N               INTEGER NOT NULL,
    PR_ID_N                  INTEGER NOT NULL,
    QT_ID_N                  INTEGER NOT NULL,
    AWARD_JUSTIFICATION_C    VARCHAR2(50),
    JUSTIFICATION_REMARK_T   CLOB
)
;
COMMENT ON COLUMN prs_pr_qt_award.award_justification_c IS 'Award justifications are defined in the code table.';
CREATE INDEX prs_award_pr__idx ON
    prs_pr_qt_award ( pr_id_n ASC )
        ;
ALTER TABLE prs_pr_qt_award ADD CONSTRAINT prs_qt_award_pk PRIMARY KEY ( award_id_n );
ALTER TABLE prs_pr_qt_award ADD CONSTRAINT prs_award_pr_fk FOREIGN KEY ( pr_id_n )
    REFERENCES prs_pr_purch_req ( pr_id_n )
;
ALTER TABLE prs_pr_qt_award ADD CONSTRAINT prs_award_qt_fk FOREIGN KEY ( qt_id_n )
    REFERENCES prs_pr_qt ( qt_id_n )
;

--System Check
CREATE TABLE PRS_PR_SYSTEM_CHECK (
    SYSCHK_ID_N         INTEGER NOT NULL,
    PR_ID_N             INTEGER NOT NULL,
    SYS_CHK_TY_C        VARCHAR2(50) NOT NULL,
    SYS_CHK_OUTCOME_C   VARCHAR2(50),
    SYS_CHECK_RSLT_T    CLOB CONSTRAINT ENSURE_JSON_RESULT CHECK (SYS_CHECK_RSLT_T IS JSON),
)
;
COMMENT ON COLUMN prs_pr_system_check.sys_chk_ty_c IS 'Code to uniquely identify a system check such as chemical licence check,or fund check. The code shall be defined in the code table before it can be used.'
;
COMMENT ON COLUMN prs_pr_system_check.sys_chk_outcome_c IS 'System check result - "success"/"failure".The result shall be defined in the code table before it can be used.'
;
COMMENT ON COLUMN prs_pr_system_check.sys_check_rslt_t IS 'JSON format of syste check response details (transformed from the raw response body).'
;
CREATE INDEX prs_syschk_pr__idx ON
    prs_pr_system_check ( pr_id_n ASC )
        ;
ALTER TABLE prs_pr_system_check ADD CONSTRAINT prs_system_check_pk PRIMARY KEY ( syschk_id_n );
ALTER TABLE prs_pr_system_check ADD CONSTRAINT prs_syschk_prsctable_fk FOREIGN KEY ( sys_chk_ty_c )
    REFERENCES prsctable ( code_c )
;
ALTER TABLE prs_pr_system_check ADD CONSTRAINT prs_syschk_pr_fk FOREIGN KEY ( pr_id_n )
    REFERENCES prs_pr_purch_req ( pr_id_n )
;

--User Preference
CREATE TABLE PRS_USER_PREF (
    PREF_ID_N     INTEGER NOT NULL,
    USER_I        VARCHAR2(12) NOT NULL,
    USER_PREF_T   CLOB CONSTRAINT USER_PREF_T_JSON_CHK CHECK (USER_PREF_T IS JSON)
)
;
COMMENT ON COLUMN PRS_USER_PREF.user_pref_t IS 'User preferences stored in JSON format.'
;
ALTER TABLE PRS_USER_PREF ADD CONSTRAINT PRS_USER_PREF_PK PRIMARY KEY ( PREF_ID_N );
CREATE INDEX PRS_PREF_USER__IDX ON PRS_USER_PREF ( USER_I ASC );



--GRANT	
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_AC_ASSIGN TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_DOCU TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_LINEITEM TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_LINEITEM_PRDC TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_PURCH_REQ TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_QT TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_QT_AWARD TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_DELIVERY_INFO TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PR_SYSTEM_CHECK TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_USER_PREF TO PRJPRS;
--SEQUENCES
DROP SEQUENCE PRSDBM.PRS_PR_PURCHASE_REQUEST_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_LINEITEM_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_LINEITEM_PRODUCT_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_ACASSIGN_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_QUOTATION_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_DOCUMENT_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_AWARD_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_DELVINFO_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_SYSCHK_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_PRNUMBER_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_AORNUMBER_SEQ;
DROP SEQUENCE PRSDBM.PRS_PR_USERPREF_SEQ;
CREATE SEQUENCE PRSDBM.PRS_PR_PURCHASE_REQUEST_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_LINEITEM_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_LINEITEM_PRODUCT_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_ACASSIGN_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_QUOTATION_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_DOCUMENT_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_AWARD_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_DELVINFO_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_SYSCHK_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_PRNUMBER_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_AORNUMBER_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
CREATE SEQUENCE PRSDBM.PRS_PR_USERPREF_SEQ START WITH 1 INCREMENT BY 1 MINVALUE 1;
GRANT SELECT ON PRSDBM.PRS_PR_PURCHASE_REQUEST_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_LINEITEM_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_LINEITEM_PRODUCT_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_ACASSIGN_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_QUOTATION_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_DOCUMENT_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_AWARD_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_DELVINFO_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_SYSCHK_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_PRNUMBER_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_AORNUMBER_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PR_USERPREF_SEQ TO PRJPRS;