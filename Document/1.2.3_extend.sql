CREATE VIEW studentInfoView
AS
	SELECT stu_ID, fname, minit, lname, bdate, address, email, COUNT(*) AS totalCouse
	FROM Reg_form, Student, Course
	WHERE fk_c_ID = c_ID AND fk_stu_ID =  stu_ID AND e_date > GETDATE()
	GROUP BY stu_ID, fname, minit, lname, bdate, address, email
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