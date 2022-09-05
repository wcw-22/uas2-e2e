-- update request approval status
UPDATE PRS_APPV_STS SET 
  APPVR_ACCESSTP_C = 'ROLE_DEAN'
WHERE APPV_N = 3952;

commit;
