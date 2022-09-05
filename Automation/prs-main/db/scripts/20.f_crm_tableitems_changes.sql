/* ----------------------------------------------------------------------
CONSTRAINT AND ALTER:  Format is SYSTEM_TABLE_KEY_COL(S)
KEY Type: PK (Primary Key), FK (Foreign Key), UK (Unique Key), CK (Constraint), I (INDEX)
---------------------------------------------------------------------- */

/* --------------------------------- PRS_PURCHASE_ORDER related Changes ------------------------------ */
-- Creating index for SAP_PO_N of PRS_PURCHASE_ORDER table
	CREATE INDEX PRSDBM.PRS_PPO_I_SPN ON PRSDBM.PRS_PURCHASE_ORDER (SAP_PO_N) TABLESPACE S1_IDX;

/* --------------------------------- PRS_INBOUND_STG related Changes --------------------------------- */
-- Deleting all records from PRS_INBOUND_STG table
	DELETE FROM PRSDBM.PRS_INBOUND_STG;

-- Adding of new column INTGR_TRAN_N to PRS_INBOUND_STG table
	ALTER TABLE PRSDBM.PRS_INBOUND_STG ADD INTGR_TRAN_N VARCHAR2(11);
	COMMENT ON COLUMN PRSDBM.PRS_INBOUND_STG.INTGR_TRAN_N IS 'Integration status id. Reference to Integration Status table';

-- Enabling NOT NULL
	ALTER TABLE PRSDBM.PRS_INBOUND_STG MODIFY (INTGR_TRAN_N NOT NULL);

-- Adding FOREIGN KEY constraint to INTGR_TRAN_N
	ALTER TABLE PRSDBM.PRS_INBOUND_STG ADD (
		CONSTRAINT PRS_PIS_FK_ITN
		FOREIGN KEY (INTGR_TRAN_N)
		REFERENCES PRSDBM.PRS_INTGR_STATUS(INTGR_TRAN_N)
	);
-- Creating Index for INTGR_TRAN_N of PRS_INBOUND_STG table.
	CREATE INDEX PRSDBM.PRS_PIS_I_ITN ON PRSDBM.PRS_INBOUND_STG (INTGR_TRAN_N) TABLESPACE S1_IDX;

-- Dropping of INBOUND_PAYLOAD_T column from PRS_INBOUND_STG table
	ALTER TABLE PRSDBM.PRS_INBOUND_STG DROP COLUMN INBOUND_PAYLOAD_T;



/* --------------------------------- PRS_PURCHASE_REQ related Changes -------------------------------- */
-- Adding REQ_ROLETP_C column to PRS_PURCHASE_REQ table
	ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD REQ_ROLETP_C VARCHAR2(50);
	COMMENT ON COLUMN PRSDBM.PRS_PURCHASE_REQ.REQ_ROLETP_C IS 'Role Type Code of Requestor. Referenced to PRSCTABLE  Table';
-- Updating existing records with a default value
	UPDATE PRSDBM.PRS_PURCHASE_REQ SET REQ_ROLETP_C = 'ROLE_PRINCIPAL_INVESTIGATOR';

-- Enabling NOT NULL 
	ALTER TABLE PRSDBM.PRS_PURCHASE_REQ MODIFY (REQ_ROLETP_C NOT NULL);

-- Adding FOREIGN KEY constraint to REQ_ROLETP_C 
	ALTER TABLE PRSDBM.PRS_PURCHASE_REQ ADD (
		CONSTRAINT PRS_PPR_FK_RRC 
		FOREIGN KEY (REQ_ROLETP_C)
		REFERENCES PRSDBM.PRSCTABLE(CODE_C)
	);
	
-- Creating Index for REQ_ROLETP_C of PRS_PURCHASE_REQ table.
	CREATE INDEX PRSDBM.PRS_PPR_I_RRC ON PRSDBM.PRS_PURCHASE_REQ (REQ_ROLETP_C) TABLESPACE S1_IDX;
	
-- Setting Max value and Specifing CYCLE to REQ_ROLETP_C of PRS_PURCHASE_REQ table.
	ALTER SEQUENCE PRS_PR_PURCHASE_REQ_REQN_SEQ 
		MAXVALUE 9999999
		CYCLE;

	
/* --------------------------------- PRS_JOB_EXECUTION related Changes -------------------------------- */
-- Creating Index for STATUS of PRS_JOB_EXECUTION table.
	CREATE INDEX PRSDBM.PRS_PJE_I_STS ON PRSDBM.PRS_JOB_EXECUTION (STATUS) TABLESPACE S1_IDX;
	


