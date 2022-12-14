CREATE TABLE PRS_RECEIPT_INVENTORY (
    RT_ITEM_INVNT_N    VARCHAR2(11) NOT NULL,
    RT_ITEM_N          VARCHAR2(11) NOT NULL,
    LMMS_INVENTORY_N   VARCHAR2(9)
);

COMMENT ON COLUMN PRS_RECEIPT_INVENTORY.RT_ITEM_INVNT_N IS 'SEQUENCE NUMBER';

COMMENT ON COLUMN PRS_RECEIPT_INVENTORY.RT_ITEM_N IS 'REFER TO A GOODS RECEIPT LINEITEM';

COMMENT ON COLUMN PRS_RECEIPT_INVENTORY.LMMS_INVENTORY_N IS 'LMMS INVENTORY KEY';

ALTER TABLE PRS_RECEIPT_INVENTORY ADD CONSTRAINT PRS_RECEIPT_INVENTORY_PK PRIMARY KEY ( RT_ITEM_INVNT_N );

ALTER TABLE PRS_RECEIPT_INVENTORY ADD CONSTRAINT PRS_RT_INVNT_RT_LINEITEM_FK FOREIGN KEY ( RT_ITEM_N )
    REFERENCES PRS_RECEIPT_LINEITEM ( RT_ITEM_N );
