/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: PRSGLAC
---------------------------------------------------------------------- */
CREATE TABLE PRSGLAC (
     GL_AC_N VARCHAR(20) NOT NULL,
     DEFAULT_F VARCHAR(1) NOT NULL,
     DEFUNCT_F VARCHAR(1) NOT NULL
);

COMMENT ON TABLE PRSDBM.PRSGLAC IS 'This table stores the GL account values that can be used in the LMPRS system.';
COMMENT ON COLUMN PRSDBM.PRSGLAC.GL_AC_N IS 'GL account. This value is unique.';
COMMENT ON COLUMN PRSDBM.PRSGLAC.DEFAULT_F IS 'Flag to denote if this GL account is to be selected as default.';
COMMENT ON COLUMN PRSDBM.PRSGLAC.DEFUNCT_F IS 'Flag to denote if this GL account has been defunct.';

/* ----------------------------------------------------------------------
CONSTRAINT:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */
ALTER TABLE PRSDBM.PRSGLAC ADD (
    CONSTRAINT PRS_PGA_PK_GA       
        PRIMARY KEY (GL_AC_N)
    );

ALTER TABLE PRSDBM.PRSGLAC ADD (
    CONSTRAINT PRS_PGA_CK_DF
        CHECK (DEFAULT_F IN ('Y','N'))
    );


ALTER TABLE PRSDBM.PRSGLAC ADD (
    CONSTRAINT PRS_PGA_CK_FF          
        CHECK (DEFUNCT_F IN ('Y','N'))
    );


/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRSDBM.PRSGLAC TO PRJPRS;
GRANT SELECT ON PRSDBM.PRSGLAC TO RPTPRS;


/* Population */
insert into prsglac (gl_ac_n, default_f, defunct_f) values ('710221', 'Y', 'N');
insert into prsglac (gl_ac_n, default_f, defunct_f) values ('710201', 'N', 'N');