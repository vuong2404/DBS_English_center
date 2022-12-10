--PROCEDURE validateData
-- Check length of key: c_ID, fk_syl_ID, fk_dnum 
-- Check fee < 0 ?
-- Check s_date >= e_date ?  
-- If error return -1 else return 0
CREATE PROCEDURE validateData
(
	@c_ID_		CHAR(6),
	@c_name_	NVARCHAR(50),
	@fee_		INT	,
	@s_date_	DATE,
	@e_date_	DATE,
	@fk_syl_ID_	CHAR(7),
	@fk_dnum_	CHAR(7)
)
AS
BEGIN
	BEGIN TRY
		IF (LEN(@c_ID_) <> 6)
		BEGIN
			RAISERROR(N'Mã khóa học phải có độ dài là 6', 16, 1)
		END
		IF (LEN(@fk_syl_ID_) <> 7)
		BEGIN
			RAISERROR(N'Mã chương trình phải có độ dài là 7', 16, 1)
		END
		IF (LEN(@fk_dnum_) <> 7)
		BEGIN
			RAISERROR(N'Mã chi nhánh phải có độ dài là 7', 16, 1)
		END
		IF (@fee_ < 0)
		BEGIN
			RAISERROR(N'Học phí phải là số dương', 16, 1)
		END
		IF (@s_date_ >= @e_date_)
		BEGIN
			RAISERROR(N'Ngày bắt đầu khóa học phải nhỏ hơn ngày kết thúc', 16, 1)
		END
		RETURN 0
	END TRY

	BEGIN CATCH
		PRINT N'Lỗi #'+convert(varchar,ERROR_NUMBER())+': '+ERROR_MESSAGE()  
		PRINT N'tại dòng #'+convert(varchar,ERROR_LINE())
		RETURN -1
	END CATCH
END
GO

--PROCEDURE insertCourse
-- Check ID whether existed in Course table
-- Check valid data by PROCEDURE validateData
-- If no error ->  insert data
-- If insert successfully return 0 else return -1
CREATE PROCEDURE insertCourse
(
	@c_ID CHAR(6),
	@c_name		NVARCHAR(50),
	@fee		INT	,
	@s_date		DATE,
	@e_date		DATE,
	@fk_syl_ID	CHAR(7),
	@fk_dnum	CHAR(7)
)
AS
BEGIN
	BEGIN TRY
		IF (SELECT COUNT(*) FROM Course WHERE c_ID = @c_ID) = 1
		BEGIN
			RAISERROR(N'Môn học này đã tồn tại', 16, 1)
		END
		DECLARE @validate INT
		EXEC @validate = validateData 
								@c_ID_ = @c_ID, 
								@c_name_= @c_name, 
								@fee_ = @fee,
								@s_date_= @s_date, 
								@e_date_= @e_date, 
								@fk_syl_ID_= @fk_syl_ID, 
								@fk_dnum_= @fk_dnum 
		IF (@validate = 0)
		BEGIN
			INSERT INTO Course (c_ID, c_name, fee, s_date, e_date, fk_syl_ID, fk_dnum)
			VALUES(@c_ID, @c_name, @fee, @s_date, @e_date, @fk_syl_ID, @fk_dnum)
			RETURN 0
		END
		RETURN -1
	END TRY
	BEGIN CATCH
		PRINT N'Lỗi #'+convert(varchar,ERROR_NUMBER())+': '+ERROR_MESSAGE()  
		PRINT N'tại dòng #'+convert(varchar,ERROR_LINE())
		RETURN -1
	END CATCH
END
GO

--PROCEDURE deleteCourse
-- Check ID whether existed in Course table
-- If no error ->  delete data
-- If delete successfully return 0 else return -1
CREATE PROCEDURE deleteCourse
(
	@c_ID CHAR(6)
)
AS
BEGIN
	BEGIN TRY
		IF (SELECT COUNT(*) FROM Course WHERE c_ID = @c_ID) = 0
		BEGIN
			RAISERROR(N'Môn học này không tồn tại', 16, 1)
		END
		ELSE 
		BEGIN
			DELETE FROM P_apply WHERE fk_c_ID = @c_ID
			DELETE FROM Course WHERE c_ID = @c_ID
			RETURN 0
		END
		RETURN -1
	END TRY

	BEGIN CATCH
		PRINT N'Lỗi #'+convert(varchar,ERROR_NUMBER())+': '+ERROR_MESSAGE()  
		PRINT N'tại dòng #'+convert(varchar,ERROR_LINE())
		RETURN -1
	END CATCH
END
GO

--PROCEDURE updateCourse
-- Check ID whether existed in Course table
-- Check valid data by PROCEDURE validateData
-- If no error ->  update data
-- If update successfully return 0 else return -1
CREATE PROCEDURE updateCourse
(
	@c_ID		CHAR(6),
	@c_name		NVARCHAR(50) = NULL , 
	@fee		INT	= NULL,
	@s_date		DATE = NULL,
	@e_date		DATE = NULL,
	@fk_syl_ID	CHAR(7) = NULL,
	@fk_dnum	CHAR(7)	= NULL
)
AS
BEGIN
	BEGIN TRY
		IF (SELECT COUNT(*) FROM Course WHERE c_ID = @c_ID) = 0
		BEGIN
			RAISERROR(N'Môn học này không tồn tại', 16, 1)
		END
		ELSE
		BEGIN
			IF (@c_name IS NULL OR @fee IS NULL OR @s_date IS NULL OR @e_date IS NULL OR @fk_syl_ID IS NULL OR @fk_dnum IS NULL)
			BEGIN
				IF (@c_name IS NULL)
				BEGIN
					SET @c_name = (SELECT c_name FROM Course WHERE c_ID = @c_ID) 
				END

				IF (@fee IS NULL)
				BEGIN
					SET @fee = (SELECT fee FROM Course WHERE c_ID = @c_ID) 
				END

				IF (@s_date IS NULL)
				BEGIN
					SET @s_date = (SELECT s_date FROM Course WHERE c_ID = @c_ID) 
				END

				IF (@e_date IS NULL)
				BEGIN
					SET @e_date = (SELECT e_date FROM Course WHERE c_ID = @c_ID) 
				END

				IF (@fk_syl_ID IS NULL)
				BEGIN
					SET @fk_syl_ID = (SELECT fk_syl_ID FROM Course WHERE c_ID = @c_ID) 
				END

				IF (@fk_dnum IS NULL)
				BEGIN
					SET @fk_dnum = (SELECT fk_dnum FROM Course WHERE c_ID = @c_ID) 
				END
			END

			DECLARE @validate INT
			EXEC @validate = validateData 
									@c_ID_ = @c_ID, 
									@c_name_= @c_name, 
									@fee_ = @fee,
									@s_date_= @s_date, 
									@e_date_= @e_date, 
									@fk_syl_ID_= @fk_syl_ID, 
									@fk_dnum_= @fk_dnum 
			IF (@validate = 0)
			BEGIN
				UPDATE Course
				SET c_name = @c_name, fee= @fee, s_date = @s_date, e_date = @e_date, fk_syl_ID= @fk_syl_ID, fk_dnum= @fk_dnum
				WHERE c_ID= @c_ID
				RETURN 0
			END
			RETURN -1
		END
	END TRY

	BEGIN CATCH
		PRINT N'Lỗi #'+convert(varchar,ERROR_NUMBER())+': '+ERROR_MESSAGE()  
		PRINT N'tại dòng #'+convert(varchar,ERROR_LINE())
		RETURN -1
	END CATCH
END
GO







----------------------------------------------------------------TEST-------------------------------------------------------
---------------------------------------------------INSERT
--length of c_ID < 6
EXEC insertCourse
@c_ID = 'AB123',
@c_name = 'English 7',
@fee = '1',
@s_date = '2022-02-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

--length of fk_syl_ID < 7
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = '1',
@s_date = '2022-02-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E11',
@fk_dnum = 'BRANCH1'
GO

--length of @fk_dnum  < 7
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = '1',
@s_date = '2022-02-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH'
GO

--fee < 0
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = -3,
@s_date = '2022-02-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

-- s_date >= e_date
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = 1,
@s_date = '2022-10-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

-- Valid
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = 1,
@s_date = '2022-04-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

-- ID existed
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = 1,
@s_date = '2022-04-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

---------------------------------------------------------------------DELETE
--ID not existed
EXEC deleteCourse
@c_ID = 'AB1238'
GO

--Valid
EXEC deleteCourse
@c_ID = 'LA1001'
GO

---------------------------------------------------UPDATE
EXEC insertCourse
@c_ID = 'AB1234',
@c_name = 'English 7',
@fee = 1,
@s_date = '2022-04-01',
@e_date = '2022-05-12',
@fk_syl_ID = 'S1E1000',
@fk_dnum = 'BRANCH1'
GO

-- ID not exist
EXEC updateCourse
@c_ID = 'AB1238',
@s_date = '2022-04-01',
@c_name = 'English 10',
@fk_dnum = 'BRANCH1',
@fee = 123
GO

-- Update fee
EXEC updateCourse
@c_ID = 'AB1234',
@fee = 123
GO

EXEC updateCourse
@c_ID = 'AB1234',
@fee = -123
GO

--update s_date and e_date
EXEC updateCourse
@c_ID = 'AB1234',
@s_date = '2022-05-01',
@e_date = '2022-06-01'
GO

EXEC updateCourse
@c_ID = 'AB1234',
@s_date = '2022-09-01',
@e_date = '2022-06-01'
GO

DROP PROCEDURE updateCourse
DROP PROCEDURE insertCourse
DROP PROCEDURE deleteCourse
DROP PROCEDURE validateData

