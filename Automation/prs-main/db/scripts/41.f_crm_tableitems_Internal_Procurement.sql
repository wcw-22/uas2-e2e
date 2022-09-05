/* ----------------------------------------------------------------------
Purpose : add internal store for NUMI
Date : 2019-11-07
---------------------------------------------------------------------- */

INSERT INTO PRS_INTERNAL_STORE (INTL_STORE_N, SUPP_C, WBS_AC_N, GL_AC_N, CHM_LOC_N, FAC_C, DEPT_C, DEFUNCT_F, REC_CREATEUSER_I, REC_CREATE_DTM, REC_UPDUSER_I, REC_UPD_DTM) 
VALUES (PRS_INTERNAL_STORE_SEQ.nextVal, 'NUSNTP0000110137', 'C-171-014-000-001', '539407', '100000870-100000207', '43', '546', 'N', 'LMPRS', sysdate, 'LMPRS', sysdate);

update PRS_INTERNAL_STORE set CHM_LOC_N = '100000189-100000718' where SUPP_C = 'NUSNTP0000109667';

commit;