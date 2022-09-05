-- Query to select duplicated user access records.

/*SELECT * FROM PRS_USER_ACCESS 
WHERE ACCESS_N NOT IN (
	SELECT * FROM (
			-- select first created from all records which has been duplicated
			SELECT MIN(ACCESS_N) 
			FROM PRS_USER_ACCESS 
			WHERE (USER_I, ACCESS_TP_C, FAC_C, DEPT_C ) IN (
				SELECT USER_I, ACCESS_TP_C, FAC_C, DEPT_C 
				FROM PRS_USER_ACCESS 
				GROUP BY USER_I, ACCESS_TP_C, FAC_C, DEPT_C 
				HAVING COUNT(USER_I) > 1
			)
			GROUP BY USER_I, ACCESS_TP_C, FAC_C, DEPT_C
		UNION 
			-- select all unique records which department and faculty both are NOT null
			SELECT ACCESS_N
			FROM PRS_USER_ACCESS 
			WHERE (USER_I, ACCESS_TP_C, FAC_C, DEPT_C ) IN (
				SELECT USER_I, ACCESS_TP_C, FAC_C, DEPT_C 
				FROM PRS_USER_ACCESS 
				GROUP BY USER_I, ACCESS_TP_C, FAC_C, DEPT_C 
				HAVING COUNT(USER_I) = 1
			)
		UNION
			-- select all unique records which department is null and faculty is NOT null
			SELECT ACCESS_N 
			FROM PRS_USER_ACCESS 
			WHERE (USER_I, ACCESS_TP_C, FAC_C ) IN (
				SELECT USER_I, ACCESS_TP_C, FAC_C 
				FROM PRS_USER_ACCESS 
				WHERE DEPT_C IS NULL
				GROUP BY USER_I, ACCESS_TP_C, FAC_C 
				HAVING COUNT(USER_I) = 1
			) 
		UNION
			-- select all unique records which department and faculty both are null
			SELECT ACCESS_N 
			FROM PRS_USER_ACCESS 
			WHERE (USER_I, ACCESS_TP_C ) IN (
				SELECT USER_I, ACCESS_TP_C 
				FROM PRS_USER_ACCESS 
				WHERE DEPT_C IS NULL AND FAC_C IS NULL
				GROUP BY USER_I, ACCESS_TP_C 
				HAVING COUNT(USER_I) = 1
			) 
	)
); */

-- 14 records
--683	00007280	ROLE_DEPT_ADMIN	43	550	MEDCPSR	29/08/19
--527	00001519	ROLE_REGULATORY	36	287	CHEFAMHK	18/07/19
--529	00003152	ROLE_REGULATORY	36	287	CHEFAMHK	18/07/19
--551	00009479	ROLE_QUOTATION_APPV_AUTH	36	287	CHEFAMHK	18/07/19
--751	00011531	ROLE_DEPT_ADMIN	3J	608	CPOLEX	09/09/19
--694	00018201	ROLE_DEPT_ADMIN	36	283	CPOYKX	29/08/19
--535	00003352	ROLE_GOODS_RECEIPT	36	287	CHEFAMHK	18/07/19
--538	00003696	ROLE_GOODS_RECEIPT	36	287	CHEFAMHK	18/07/19
--546	00014372	ROLE_GOODS_RECEIPT	36	287	CHEFAMHK	18/07/19
--555	00003860	ROLE_QUOTATION_APPV_AUTH	36	287	CHEFAMHK	18/07/19
--585	00008264	ROLE_QUOTATION_APPV_AUTH	36	287	CHEFAMHK	18/07/19
--748	00038901	ROLE_DEPT_ADMIN	50	718	CPOLEX	09/09/19
--685	00001452	ROLE_DEPT_ADMIN	43	550	MEDCPSR	29/08/19
--729	00055225	ROLE_REGULATORY	50	719	CPOLEX	06/09/19

-- Delete all duplicated access records.

DELETE FROM PRS_USER_ACCESS 
WHERE ACCESS_N IN ('683', '527', '529', '551', '751', '694', '535', '538', '546', '555', '585', '748', '685', '729');

SET DEFINE OFF;

-- REQ_N : PRS-2019-0000274
-- update delivery addresss
UPDATE PRS_DELVORDER_INFO SET DO_ADDR_T = 'Rashi Gupta
C/O The MacAry Lab (Bench 22)
Immunology Programme
Centre for Life Sciences #03-01
28 Medical Drive, Singapore 117456
NUS.' 
WHERE PR_N = '278';

--Update delivery address in user preference
UPDATE PRS_USER_PREF SET USER_PREF_T='{"billingAddresses":["Billing addresss \nNational University of Singapore\nDepartment of Microbiology & Immunology\nLevel 11, NUHS Tower Block, 1E Kent Ridge Road \nSingapore 119228"],"deliveryAddresses":["Rashi Gupta\nC/O The MacAry Lab (Bench 22)\nImmunology Programme\nCentre for Life Sciences #03-01\n28 Medical Drive, Singapore 117456\nNUS.","Rashi Gupta\t\t\t\nThe MacAry Lab Bench 22\t\t\t\nImmunology Programme\t\t\t\nNational University of Singapore\t\t\t\nCentre for Life Sciences\t\t\t\n03 01 \t\t\t\n28 Medical Drive\nSingapore 117456","IMMUNOLOGY PROGRAMME, CELS 28 Medical Dr CELS,#03-01 117456 Singapore"],"contacts":["65167584"]}'
WHERE PREF_N = '71' and USER_I = '00057349';

