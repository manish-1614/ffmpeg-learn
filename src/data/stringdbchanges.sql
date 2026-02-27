-- Delete statements
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_attr_not_exist';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_file_not_found';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_wrong_filename';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_invalid_format';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_blank_row';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_tmpl_missing';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_attr_missing';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_tmpl_not_exist';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_attr_duplicate';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_failed';
Delete from TABLE_STRING_DB where NAME = 'x_9_attrused_bulk_success';

-- Insert statements (ID values in permissible range 25600-26099; same ID for both locales 1041 and 1033 per name)
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25662,'反映失敗：指定の「ATTRIBUTE_NAME」はDB未登録です。[未登録の「ATTRIBUTE_NAME」の一覧を出力]',1041,3,1,0,'x_9_attrused_bulk_attr_not_exist');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25662,'Bulk reflect failed: The specified "ATTRIBUTE_NAME" does not exist in the database. [Output list of unregistered ATTRIBUTE_NAME]',1033,3,1,0,'x_9_attrused_bulk_attr_not_exist');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25663,'反映失敗：指定のファイルが見つかりません。',1041,3,1,0,'x_9_attrused_bulk_file_not_found');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25663,'Bulk reflect failed: Failed to load the file.',1033,3,1,0,'x_9_attrused_bulk_file_not_found');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25664,'反映失敗：ファイル名は「editContactFAUsedList.csv」、「editCaseFAUsedList.csv」、「editSubcaseFAUsedList.csv」のいずれかを指定してください。',1041,3,1,0,'x_9_attrused_bulk_wrong_filename');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25664,'Bulk reflect failed: Please specify the file name as one of the following: "editContactFAUsedList.csv", "editCaseFAUsedList.csv", or "editSubcaseFAUsedList.csv".',1033,3,1,0,'x_9_attrused_bulk_wrong_filename');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25665,'反映失敗：対象ファイルのフォーマットが不正です。[不正な行番号の一覧を出力]]',1041,3,1,0,'x_9_attrused_bulk_invalid_format');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25665,'Bulk reflect failed: Target CSV file format is invalid. [Output list of invalid row numbers]',1033,3,1,0,'x_9_attrused_bulk_invalid_format');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25667,'反映失敗：空白行があったため、処理を中断しました。',1041,3,1,0,'x_9_attrused_bulk_blank_row');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25667,'Bulk reflect failed: Since a record with all empty values exists, the process ends.',1033,3,1,0,'x_9_attrused_bulk_blank_row');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25668,'反映失敗：「TMPL_NAME」が指定されていません。[指定されていない行番号の一覧を出力]',1041,3,1,0,'x_9_attrused_bulk_tmpl_missing');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25668,'Bulk reflect failed: "TMPL_NAME" is not specified in the CSV file. [Output list of row numbers where not specified]',1033,3,1,0,'x_9_attrused_bulk_tmpl_missing');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25669,'反映失敗：「ATTRIBUTE_NAME」が指定されていません。[指定されていない行番号の一覧を出力]',1041,3,1,0,'x_9_attrused_bulk_attr_missing');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25669,'Bulk reflect failed: "ATTRIBUTE_NAME" is not specified. [Output list of row numbers where not specified]',1033,3,1,0,'x_9_attrused_bulk_attr_missing');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25670,'反映失敗：指定の「TMPL_NAME」はDB未登録です。[未登録の「TMPL_NAME」の一覧を出力]',1041,3,1,0,'x_9_attrused_bulk_tmpl_not_exist');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25670,'Bulk reflect failed: The specified "TMPL_NAME" does not exist in the database. [Output list of unregistered TMPL_NAME]',1033,3,1,0,'x_9_attrused_bulk_tmpl_not_exist');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25673,'反映失敗：csvファイル内に重複している「ATTRIBUTE_NAME」が存在します。[重複している「ATTRIBUTE_NAME」の一覧を出力]',1041,3,1,0,'x_9_attrused_bulk_attr_duplicate');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25673,'Bulk reflect failed: Duplicate "ATTRIBUTE_NAME" values exist in the CSV file. [Output list of duplicate ATTRIBUTE_NAME]',1033,3,1,0,'x_9_attrused_bulk_attr_duplicate');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25674,'反映失敗：n行目の反映に失敗し、処理を中断しました。',1041,3,1,0,'x_9_attrused_bulk_failed');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25674,'Bulk reflecting Failed: Since No.n records failed to reflect, the process ends at that record.',1033,3,1,0,'x_9_attrused_bulk_failed');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25675,'正常に反映されました',1041,3,1,0,'x_9_attrused_bulk_success');
Insert into TABLE_STRING_DB (OBJID,ID,STRING,LOCALE,TYPE,DEV,TRANSLATE_IND,NAME) values ((select max(objid)+1 from table_string_db),25675,'Bulk reflecting process completed',1033,3,1,0,'x_9_attrused_bulk_success');