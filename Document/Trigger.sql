
-- xét giá trị tiền ở phiếu đăng kí
CREATE TRIGGER trg_Reg_form ON Reg_form AFTER INSERT AS 
BEGIN
	UPDATE Reg_form
	SET total_fee = (SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) - 
		(SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) *
		(SELECT max(discount_amount) FROM P_apply,inserted
		WHERE inserted.fk_c_ID = P_apply.fk_c_ID)
	FROM Course
	JOIN inserted ON Course.c_ID = inserted.fk_c_ID
END
GO

/* cập nhật Tiền phải trả ở phiếu đăng kí sau khi thay đổi giá trị khuyến mãi  */
CREATE TRIGGER trg_P_apply on P_apply after update AS
BEGIN
   UPDATE Reg_form
	SET total_fee = (SELECT Course.fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) - 
		(SELECT Course.fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) *
		(SELECT max(discount_amount) FROM P_apply,inserted
		WHERE inserted.fk_c_ID = P_apply.fk_c_ID)
	FROM Course
	JOIN inserted ON Course.c_ID = inserted.fk_c_ID
end
GO

/* cập nhật Tiền còn lại sau khi thực hiện thanh toán */
CREATE TRIGGER trg_Bill ON Bill AFTER INSERT AS 
BEGIN
	UPDATE inserted
	SET remaining_fee = (SELECT Bill.remaining_fee FROM Bill,inserted
		WHERE Bill.fk_form_ID = inserted.fk_form_ID
		and Bill.p_time in (SELECT TOP 1 *
							FROM Bill,inserted
							WHERE Bill.fk_form_ID = inserted.fk_form_ID
							AND Bill.p_time < @CurrentDate
							ORDER BY Bill.p_time DESC)
		)-
		(SELECT remaining_fee FROM inserted)

	FROM Bill
	JOIN inserted ON Bill.fk_form_ID = inserted.fk_form_ID
END
GO


