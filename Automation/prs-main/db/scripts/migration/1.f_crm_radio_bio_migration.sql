-- New Product Types
INSERT INTO PRSCTABLE(CODE_C, CODE_T, DEFUNCT_F) VALUES('PRODUCT_RADIOACTIVE', 'Radioactive Product', 'N');
INSERT INTO PRSCTABLE(CODE_C, CODE_T, DEFUNCT_F) VALUES('PRODUCT_BIOLOGICAL', 'Biological Product', 'N');

-- Add Document Type for Documents.
insert into prsctable (code_c, code_t, defunct_f) values ('DOCUMENT_SUPPORTING', 'Supporting Document', 'N');
insert into prsctable (code_c, code_t, defunct_f) values ('DOCUMENT_QUOTATION', 'Quotation Document', 'N');
insert into prsctable (code_c, code_t, defunct_f) values ('DOCUMENT_SEALED_SOURCE_SAFETY', 'Sealed Source Safety Form', 'N');

UPDATE prs_document d SET
    docu_tp_c = 'DOCUMENT_SUPPORTING'
WHERE
        d.docu_n IN (SELECT docu_n FROM prs_req_document);

UPDATE prs_document d SET
    docu_tp_c = 'DOCUMENT_QUOTATION'
WHERE
        d.docu_n IN (SELECT docu_n FROM prs_quotation_document);

-- Update Code
UPDATE prsctable SET code_t = 'Purchase Request (EPV <= $5,000) / Catalog Buy' WHERE code_c = 'EPV_TYPE_LESS_OR_EQUAL_5000';

-- New System Check Types

UPDATE PRSCTABLE set CODE_T='Chemical Licence Check' where CODE_C='SYSCHK_LICENCE';
INSERT INTO PRSCTABLE(CODE_C, CODE_T, DEFUNCT_F) VALUES('SYSCHK_LICENCE_RADIOACTIVE', 'Radioactive Licence Check', 'N');
INSERT INTO PRSCTABLE(CODE_C, CODE_T, DEFUNCT_F) VALUES('SYSCHK_LICENCE_BIOLOGICAL', 'Biological Licence Check', 'N');


