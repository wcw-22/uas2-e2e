/* NUS Restricted */

/* ----------------------------------------------------------------------
TABLE: USPA_JOB_INSTANCE
---------------------------------------------------------------------- */

CREATE TABLE PRSDBM.PRS_JOB_INSTANCE  (
	JOB_INSTANCE_ID NUMBER(19)  PRIMARY KEY ,
	VERSION NUMBER(19),
	JOB_NAME VARCHAR(100) NOT NULL ,
	JOB_KEY VARCHAR(2500)
);

COMMENT ON TABLE PRSDBM.PRS_JOB_INSTANCE IS 'This table holds all information relevant to a JobInstance, and serves as the top of the overall hierarchy.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_INSTANCE.JOB_INSTANCE_ID IS 'The unique id that will identify the job instance.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_INSTANCE.VERSION IS 'For keeping track whether a record has been updated.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_INSTANCE.JOB_NAME IS 'Name of the job obtained from the Job object.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_INSTANCE.JOB_KEY IS 'A serialization of the JobParameters that uniquely identifies separate instances of the same job from one another.';

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_JOB_INSTANCE TO PRJPRS;
--GRANT SELECT ON PRS_JOB_INSTANCE TO RPTUSPA;


/* ----------------------------------------------------------------------
TABLE: USPA_JOB_EXECUTION
---------------------------------------------------------------------- */

CREATE TABLE PRSDBM.PRS_JOB_EXECUTION  (
	JOB_EXECUTION_ID NUMBER(19)  PRIMARY KEY ,
	VERSION NUMBER(19),
	JOB_INSTANCE_ID NUMBER(19) NOT NULL,
	CREATE_TIME TIMESTAMP NOT NULL,
	START_TIME TIMESTAMP DEFAULT NULL,
	END_TIME TIMESTAMP DEFAULT NULL,
	STATUS VARCHAR(10),
	EXIT_CODE VARCHAR(20),
	EXIT_MESSAGE VARCHAR(2500),
	LAST_UPDATED TIMESTAMP,
	JOB_CONFIGURATION_LOCATION VARCHAR(2500) NULL
);

COMMENT ON TABLE PRSDBM.PRS_JOB_EXECUTION IS 'This table holds all information relevant to a JobInstance, and serves as the top of the overall hierarchy.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.JOB_EXECUTION_ID IS 'Primary key that uniquely identifies this execution.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.VERSION IS 'For keeping track whether a record has been updated.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.JOB_INSTANCE_ID IS 'Foreign key from the USPA_JOB_INSTANCE table indicating the instance to which this execution belongs.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.CREATE_TIME IS 'Timestamp representing the time that the execution was created.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.START_TIME IS 'Timestamp representing the time the execution was started.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.END_TIME IS 'Timestamp representing the time the execution was finished, regardless of success or failure.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.STATUS IS 'Character string representing the status of the execution.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.EXIT_CODE IS 'Character string representing the exit code of the execution.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.EXIT_MESSAGE IS 'Character string representing a more detailed description of how the job exited.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.LAST_UPDATED IS 'Timestamp representing the last time this execution was persisted.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION.JOB_CONFIGURATION_LOCATION IS 'Stores name of job execution configuration';

ALTER TABLE PRSDBM.PRS_JOB_EXECUTION ADD (
CONSTRAINT PRS_PJE_FK_JII
FOREIGN KEY (JOB_INSTANCE_ID)
REFERENCES PRSDBM.PRS_JOB_INSTANCE(JOB_INSTANCE_ID)
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_JOB_EXECUTION TO PRJPRS;
--GRANT SELECT ON USPA_JOB_EXECUTION TO RPTUSPA;

/* ----------------------------------------------------------------------
TABLE: USPA_JOB_EXECUTION_PARAMS
---------------------------------------------------------------------- */

CREATE TABLE PRSDBM.PRS_JOB_EXECUTION_PARAMS  (
	JOB_EXECUTION_ID NUMBER(19) NOT NULL ,
	TYPE_CD VARCHAR(6) NOT NULL ,
	KEY_NAME VARCHAR(100) NOT NULL ,
	STRING_VAL VARCHAR(250) ,
	DATE_VAL TIMESTAMP DEFAULT NULL ,
	LONG_VAL NUMBER(19) ,
	DOUBLE_VAL NUMBER,
	IDENTIFYING CHAR(1) NOT NULL
) ;

COMMENT ON TABLE PRSDBM.PRS_JOB_EXECUTION_PARAMS IS 'This table holds all information relevant to the JobParameters object. It contains 0 or more key/value pairs passed to a Job and serve as a record of the parameters a job was run with.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.JOB_EXECUTION_ID IS 'Foreign Key from the USPA_JOB_EXECUTION table that indicates the job execution the parameter entry belongs to.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.TYPE_CD IS 'String representation of the type of value stored, which can be either a string, date, long, or double.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.KEY_NAME IS 'The parameter key.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.STRING_VAL IS 'Parameter value, if the type is string.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.DATE_VAL IS 'Parameter value, if the type is date.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.LONG_VAL IS 'Parameter value, if the type is a long.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.DOUBLE_VAL IS 'Parameter value, if the type is double.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_PARAMS.IDENTIFYING IS 'Flag indicating if the parameter contributed to the identity of the related JobInstance.';

ALTER TABLE PRSDBM.PRS_JOB_EXECUTION_PARAMS ADD (
CONSTRAINT PRS_PJEP_FK_JEI
FOREIGN KEY (JOB_EXECUTION_ID)
REFERENCES PRSDBM.PRS_JOB_EXECUTION(JOB_EXECUTION_ID)
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_JOB_EXECUTION_PARAMS TO PRJPRS;
--GRANT SELECT ON USPA_JOB_EXECUTION_PARAMS TO RPTUSPA;


/* ----------------------------------------------------------------------
TABLE: USPA_JOB_EXECUTION_CONTEXT
---------------------------------------------------------------------- */

CREATE TABLE PRSDBM.PRS_JOB_EXECUTION_CONTEXT  (
	JOB_EXECUTION_ID NUMBER(19) PRIMARY KEY,
	SHORT_CONTEXT VARCHAR(2500) NOT NULL,
	SERIALIZED_CONTEXT CLOB
);


COMMENT ON TABLE PRSDBM.PRS_JOB_EXECUTION_CONTEXT IS 'This table holds all information relevant to a Job''s ExecutionContext.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_CONTEXT.JOB_EXECUTION_ID IS 'Foreign key representing the JobExecution to which the context belongs.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_CONTEXT.SHORT_CONTEXT IS 'A string version of the SERIALIZED_CONTEXT.';
COMMENT ON COLUMN PRSDBM.PRS_JOB_EXECUTION_CONTEXT.SERIALIZED_CONTEXT IS 'The entire context, serialized.';

ALTER TABLE PRSDBM.PRS_JOB_EXECUTION_CONTEXT ADD (
CONSTRAINT PRS_PJEC_FK_JEI
FOREIGN KEY (JOB_EXECUTION_ID)
REFERENCES PRSDBM.PRS_JOB_EXECUTION(JOB_EXECUTION_ID)
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_JOB_EXECUTION_CONTEXT TO PRJPRS;
--GRANT SELECT ON USPA_JOB_EXECUTION_CONTEXT TO RPTUSPA;


/* ----------------------------------------------------------------------
TABLE: USPA_STEP_EXECUTION
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_STEP_EXECUTION  (
	STEP_EXECUTION_ID NUMBER(19)  PRIMARY KEY ,
	VERSION NUMBER(19) NOT NULL,
	STEP_NAME VARCHAR(100) NOT NULL,
	JOB_EXECUTION_ID NUMBER(19) NOT NULL,
	START_TIME TIMESTAMP NOT NULL ,
	END_TIME TIMESTAMP DEFAULT NULL,
	STATUS VARCHAR(10),
	COMMIT_COUNT NUMBER(19) ,
	READ_COUNT NUMBER(19) ,
	FILTER_COUNT NUMBER(19) ,
	WRITE_COUNT NUMBER(19) ,
	READ_SKIP_COUNT NUMBER(19) ,
	WRITE_SKIP_COUNT NUMBER(19) ,
	PROCESS_SKIP_COUNT NUMBER(19) ,
	ROLLBACK_COUNT NUMBER(19) ,
	EXIT_CODE VARCHAR(20) ,
	EXIT_MESSAGE VARCHAR(2500) ,
	LAST_UPDATED TIMESTAMP
);

COMMENT ON TABLE PRSDBM.PRS_STEP_EXECUTION IS 'This table holds all information relevant to the StepExecution object.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.STEP_EXECUTION_ID IS 'Primary key that uniquely identifies this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.VERSION IS 'For keeping track whether a record has been updated.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.STEP_NAME IS 'The name of the step to which this execution belongs.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.JOB_EXECUTION_ID IS 'Foreign key from the USPA_JOB_EXECUTION table indicating the JobExecution to which this StepExecution belongs.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.START_TIME IS 'Timestamp representing the time the execution was started.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.END_TIME IS 'Timestamp representing the time the execution was finished, regardless of success or failure.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.STATUS IS 'Character string representing the status of the execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.COMMIT_COUNT IS 'The number of times in which the step has committed a transaction during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.READ_COUNT IS 'The number of items read during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.FILTER_COUNT IS 'The number of items filtered out of this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.WRITE_COUNT IS 'The number of items written and committed during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.READ_SKIP_COUNT IS 'The number of items skipped on read during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.WRITE_SKIP_COUNT IS 'The number of items skipped on write during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.PROCESS_SKIP_COUNT IS 'The number of items skipped during processing during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.ROLLBACK_COUNT IS 'The number of rollbacks during this execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.EXIT_CODE IS 'Character string representing the exit code of the execution.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.EXIT_MESSAGE IS 'Character string representing a more detailed description of how the job exited.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION.LAST_UPDATED IS 'Timestamp representing the last time this execution was persisted.';

ALTER TABLE PRSDBM.PRS_STEP_EXECUTION ADD (
CONSTRAINT PRS_PSE_FK_JEI
FOREIGN KEY (JOB_EXECUTION_ID)
REFERENCES PRSDBM.PRS_JOB_EXECUTION(JOB_EXECUTION_ID)
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_STEP_EXECUTION TO PRJPRS;
--GRANT SELECT ON USPA_STEP_EXECUTION TO RPTUSPA;
 	 

/* ----------------------------------------------------------------------
TABLE: USPA_STEP_EXECUTION_CONTEXT
---------------------------------------------------------------------- */
CREATE TABLE PRSDBM.PRS_STEP_EXECUTION_CONTEXT  (
	STEP_EXECUTION_ID NUMBER(19) PRIMARY KEY,
	SHORT_CONTEXT VARCHAR(2500) NOT NULL,
	SERIALIZED_CONTEXT CLOB
);

COMMENT ON TABLE PRSDBM.PRS_STEP_EXECUTION_CONTEXT IS 'This table holds all information relevant to an Step''s ExecutionContext.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION_CONTEXT.STEP_EXECUTION_ID IS 'Foreign key representing the StepExecution to which the context belongs.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION_CONTEXT.SHORT_CONTEXT IS 'A string version of the SERIALIZED_CONTEXT.';
COMMENT ON COLUMN PRSDBM.PRS_STEP_EXECUTION_CONTEXT.SERIALIZED_CONTEXT IS 'The entire context, serialized.';

ALTER TABLE PRSDBM.PRS_STEP_EXECUTION_CONTEXT ADD (
CONSTRAINT PRS_PSEC_FK_SEI
FOREIGN KEY (STEP_EXECUTION_ID)
REFERENCES PRSDBM.PRS_STEP_EXECUTION(STEP_EXECUTION_ID)
);

/* ----------------------------------------------------------------------
GRANT: Who and what privilege to grant
---------------------------------------------------------------------- */
GRANT DELETE, INSERT, SELECT, UPDATE ON PRS_STEP_EXECUTION_CONTEXT TO PRJPRS;
--GRANT SELECT ON USPA_STEP_EXECUTION_CONTEXT TO RPTUSPA;



/*
 * Sequences
 */
CREATE SEQUENCE PRSDBM.PRS_JOB_SEQ;
GRANT SELECT ON PRSDBM.PRS_JOB_SEQ TO PRJPRS;

CREATE SEQUENCE PRSDBM.PRS_JOB_EXECUTION_SEQ;
GRANT SELECT ON PRSDBM.PRS_JOB_EXECUTION_SEQ TO PRJPRS;

CREATE SEQUENCE PRSDBM.PRS_STEP_EXECUTION_SEQ;
GRANT SELECT ON PRSDBM.PRS_STEP_EXECUTION_SEQ TO PRJPRS;