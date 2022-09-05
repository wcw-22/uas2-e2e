/* ----------------------------------------------------------------------
TABLE: PRS_PERIODCONTRACT_CONTACT
---------------------------------------------------------------------- */

CREATE TABLE PRSDBM.PRS_PERIODCONTRACT_CONTACT (
    PRD_CONTACT_N   VARCHAR2(11) NOT NULL,
    PRDCON_SEQ_N    VARCHAR2(11) NOT NULL,
    CONTACT_T       VARCHAR2(200) NOT NULL,
    ORDER_N         INTEGER  NOT NULL
)
TABLESPACE PRS_DAT;

COMMENT ON TABLE PRSDBM.PRS_PERIODCONTRACT_CONTACT IS
    'This table stores the point of contact emails for the period contracts.';

COMMENT ON COLUMN PRSDBM.PRS_PERIODCONTRACT_CONTACT.PRD_CONTACT_N IS
    'Sequence number. Populated by Oracle sequence.';

COMMENT ON COLUMN PRSDBM.PRS_PERIODCONTRACT_CONTACT.PRDCON_SEQ_N IS
    'Reference to the period contract this contact record belongs to.';

COMMENT ON COLUMN PRSDBM.PRS_PERIODCONTRACT_CONTACT.CONTACT_T IS
    'Email address for point of contact.';

COMMENT ON COLUMN PRSDBM.PRS_PERIODCONTRACT_CONTACT.ORDER_N IS
    'Order of display for point of contact.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRS_PERIODCONTRACT_CONTACT ADD CONSTRAINT PRS_PCC_PK_PC PRIMARY KEY ( PRD_CONTACT_N )
    USING INDEX TABLESPACE PRS_IDX;

ALTER TABLE PRSDBM.PRS_PERIODCONTRACT_CONTACT
    ADD CONSTRAINT PRS_PCC_FK_PS FOREIGN KEY ( PRDCON_SEQ_N )
        REFERENCES PRSDBM.PRS_PERIODCONTRACT_PARTICS ( PRDCON_SEQ_N );

/* ----------------------------------------------------------------------
SEQUENCE
---------------------------------------------------------------------- */

CREATE SEQUENCE PRSDBM.PRS_PERIODCONTRACT_CONTACT_SEQ START WITH 1 MINVALUE 1 NOCACHE ORDER ;

/* ----------------------------------------------------------------------
GRANTS
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PERIODCONTRACT_CONTACT TO PRJPRS;
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRS_PERIODCONTRACT_CONTACT_SEQ TO PRJPRS;
GRANT SELECT ON PRSDBM.PRS_PERIODCONTRACT_CONTACT TO RPTPRS;
GRANT SELECT ON PRSDBM.PRS_PERIODCONTRACT_CONTACT_SEQ TO RPTPRS;


/* ----------------------------------------------------------------------
UPDATE table PRS_CONTRACT_UTILISATION
---------------------------------------------------------------------- */

ALTER TABLE PRSDBM.PRS_CONTRACT_UTILISATION RENAME COLUMN CON_N TO PRDCON_SEQ_N;

ALTER TABLE PRSDBM.PRS_CONTRACT_UTILISATION MODIFY PRDCON_SEQ_N VARCHAR2(11) NOT NULL;

COMMENT ON COLUMN PRSDBM.PRS_CONTRACT_UTILISATION.PRDCON_SEQ_N IS
    'Reference to the period contract this utilisation record belongs to.';

ALTER TABLE PRSDBM.PRS_CONTRACT_UTILISATION ADD CONSTRAINT PRS_PCU_FK_CSN FOREIGN KEY ( PRDCON_SEQ_N ) REFERENCES PRSDBM.PRS_PERIODCONTRACT_PARTICS ( PRDCON_SEQ_N );



