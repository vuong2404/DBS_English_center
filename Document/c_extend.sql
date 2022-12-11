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
EXEC updateStatusReg @form_ID= 'REG1063'
