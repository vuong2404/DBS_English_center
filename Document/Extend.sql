------------------------------------------------------------------------ 1.2.3 EXTEND ----------------------------------------------------------------

CREATE VIEW studentInfoView
AS
	SELECT stu_ID, fname, minit, lname, bdate, address, email, COUNT(*) AS totalCouse
	FROM Reg_form, Student, Course
	WHERE fk_c_ID = c_ID AND fk_stu_ID =  stu_ID AND e_date > GETDATE()
	GROUP BY stu_ID, fname, minit, lname, bdate, address, email
GO


CREATE PROCEDURE searchStudentInfo
(@name NVARCHAR(50)
)
AS 
BEGIN
	SELECT stu_ID, fname, minit, lname, bdate, address, email, COUNT(*) AS totalCouse
	FROM Reg_form, Student, Course
	WHERE fk_c_ID = c_ID AND fk_stu_ID =  stu_ID AND e_date > GETDATE() AND CONCAT(fname, ' ', minit, ' ', lname) LIKE CONCAT(N'%', @name ,'%')
	GROUP BY stu_ID, fname, minit, lname, bdate, address, email
	ORDER BY stu_ID
END
GO

CREATE PROCEDURE sortStudentInfo
(
@property NVARCHAR(50)
)
AS 
BEGIN
	SELECT *
	FROM studentInfoView
	ORDER BY 
	(CASE
		WHEN @property= 'ID' THEN CAST(stu_ID AS NVARCHAR(30))
		WHEN @property= 'Name' THEN CAST(fname AS NVARCHAR(30))
		WHEN @property= 'Bdate' THEN CAST(bdate AS NVARCHAR(30))
		WHEN @property= 'Address' THEN CAST(address AS NVARCHAR(30))
		WHEN @property= 'Email' THEN CAST(email AS NVARCHAR(30))
		WHEN @property= 'numCourse' THEN CAST(totalCouse AS NVARCHAR(30))
		ELSE CAST(stu_ID AS NVARCHAR(30))
	END), fname, lname
END
GO

CREATE PROCEDURE updateStudentInfo
(
	@stu_ID		CHAR(7),
	@fname		NVARCHAR(15),
	@minit		NVARCHAR(15),					
	@lname		NVARCHAR(15),
	@bdate		DATE,
	@address	NVARCHAR(100),
	@email		VARCHAR(50)
)
AS 
BEGIN
	BEGIN TRY
		
		UPDATE Student
		SET fname= @fname, minit= @minit, lname= @lname, bdate= @bdate, address= @address, email= @email
		WHERE stu_ID= @stu_ID
		RETURN 0
	END TRY
	BEGIN CATCH
		RETURN -1
	END CATCH
END
GO

CREATE PROCEDURE deleteStudent
( 
	@stu_ID		CHAR(7)
)
AS
BEGIN
	BEGIN TRY
		DELETE FROM Reg_form
		WHERE fk_stu_ID = @stu_ID
		DELETE FROM Student
		WHERE stu_ID= @stu_ID
		RETURN 0
	END TRY
	BEGIN CATCH
		RETURN -1
	END CATCH
END
GO
---------------------------------------------TEST

EXEC sortStudentInfo @property= 'numCourse'
EXEC updateStudentInfo 	@stu_ID= 'STU1011', @fname= N'Mai',	@minit= N'Văn',	@lname= N'Việt', @bdate= '2022-02-27', @address= N'410 Su Van Hanh, Phường 9, Quận 10, Thành phố Hồ Chí Minh', @email= 'HngThu83@gmail.com'
EXEC deleteStudent @stu_ID= 'STU1011'








------------------------------------------------------------------------ Function EXTEND ----------------------------------------------------------------


-- kiểm tra mã khuyến mãi có hợp lệ k, hoặc nó có được áp dụng cho khóa học này không
-- có: return 1
-- không: return 0
CREATE OR ALTER FUNCTION CheckApply (@c_id CHAR(7), @promotion_id CHAR(7)) 
RETURNs INT
AS
BEGIN
	
	DECLARE @result int
	DECLARE @check int
	--kiem tra khoa hoc co duoc su dung khuyen mai do khong
	SELECT @check =count(*)	
	FROM P_apply
	WHERE P_apply.fk_c_ID = @c_id
	and P_apply.fk_p_ID = @promotion_id

	-- ko
	if(@check = 0) SET @result=0
	-- co
	ELSE SET @result=1

	return @result 
END
GO


-------------------------------------------------------------
-------------------------------------------------------------

-- tính số tiền được giảm nhờ áp dụng khuyến mãi
CREATE OR ALTER FUNCTION calcReduce (@c_id CHAR(7), @promotion_id CHAR(7)) 
RETURNs INT
AS
BEGIN
	
	DECLARE @fee int
	DECLARE @value int 
	DECLARE @result int

	
	set @fee = (SELECT fee FROM Course WHERE Course.c_id = @c_id)
	set @value = (select dbo.calcTotalPay(@c_id,@promotion_id));
	set @result = @fee - @value;

	return @result 
END
GO



------------------------------------------------------------------------ C EXTEND  -------------------------------------------------------------------------- 
CREATE PROCEDURE addRegFORM 
(
@form_ID	CHAR(7),
@fk_c_ID	CHAR(6),
@fk_stu_ID	CHAR(7)
)
AS 
BEGIN
	BEGIN TRY
	DECLARE @total_fee INT
	SET @total_fee = (SELECT fee FROM Course WHERE c_ID= @fk_c_ID)
	
	DECLARE @reg_time DATETIME
	SET @reg_time = GETDATE()

	IF (SELECT COUNT(*) FROM Reg_form WHERE form_ID = @form_ID) = 1
	BEGIN
		RETURN -1
	END
	ELSE
	BEGIN
		INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, total_fee, reg_time) VALUES
			(@form_ID, @fk_c_ID, @fk_stu_ID, @total_fee, @reg_time)
		RETURN 0
		
	END
	END TRY
	BEGIN CATCH
		RETURN -1
	END CATCH
END
GO

CREATE PROCEDURE updateStatusReg
(
@form_ID	CHAR(7),
@statusUpdate	INT
)
AS
BEGIN
	BEGIN TRY
	IF (@statusUpdate = 0)
	BEGIN
		UPDATE Reg_form
		SET Status_Register = N'Đã xác nhận'
		WHERE form_ID = @form_ID
		RETURN 0
	END
	ELSE 
	BEGIN
		UPDATE Reg_form
		SET Status_Register = N'Chưa xác nhận'
		WHERE form_ID = @form_ID
		RETURN 0
	END
	END TRY
	BEGIN CATCH
		RETURN -1
	END CATCH

END
GO

EXEC addRegFORM @form_ID= 'REG1063', @fk_c_ID= 'LA1001', @fk_stu_ID= 'STU1000'
EXEC updateStatusReg @form_ID= 'REG1063', @statusUpdate= 0