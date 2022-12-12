use English_center

-- Function: Trả về số tiền cần phải thanh toán cho một khoá học
	-- Tham số đầu vào:
		-- Mã khoá học: c_id
		-- Mã khuyến mãi: promotion_id
	-- Trả về số tiền cần thanh toán sau khi tính toán
CREATE OR ALTER FUNCTION calcTotalPay (@c_id CHAR(7), @promotion_id CHAR(7)) 

RETURNs INT
AS
BEGIN
	DECLARE @fee int
	DECLARE @value int 
	DECLARE @type varchar(7)
	DECLARE @result int
	DECLARE @check int
	--kiem tra khoa hoc co duoc su dung khuyen mai do khong
	SELECT @check =count(*)	
	FROM P_apply
	WHERE P_apply.fk_c_ID=@c_id
	and P_apply.fk_p_ID=@promotion_id
	set @fee = (SELECT fee FROM Course WHERE Course.c_id = @c_id)

	-- ko
	if(@check = 0) SET @result=@fee

	-- co
	ELSE
	BEGIN
	SELECT @value = p_value, 
			@type = p_type	
	FROM Promotion 
	WHERE Promotion.p_ID = @promotion_id 

	IF (@type = 'cash') SET @result =  @fee - @value ;
	ELSE IF (@type = 'percen') SET @result = (SELECT (@fee - @fee*@value/100) AS INTEGER); 
	ELSE SET @result = @fee 
	END

	return @result 
END



--Function tính số khoá học mà học viên tham gia
use English_center
CREATE OR ALTER FUNCTION numOfCourses(@stu_id CHAR(7)) 
RETURNs INT
AS
BEGIN
	DECLARE @res int ;
	SET @res = (SELECT COUNT(*) FROM Reg_form WHERE @stu_id = fk_stu_ID);
	return @res ;
END

SELECT dbo.numOfCourses('STU1004')
GO


------------------------
--- Function tính tỉ lệ phần trăm học viên đăng kí khoá họcu tại  1 chi nhanh


UPDATE dbo.Course set fee = 2392136 where Course.c_id = 'LA1001'
INSERT into dbo.promotion values ('D1P3', 'percen', 31, '2022-12-01', '2023-04-01', 120, 'BRANCH1') 
select dbo.calcTotalPay('LA1001', 'D1P3') 





-------------------------------------------------------------
----------------------------TEST-----------------------------
select * from Course
select * from Promotion
select * from P_apply

select dbo.calcTotalPay('LA1002','D1P2');
select dbo.calcTotalPay('LA1002','D2P2');
select dbo.calcTotalPay('LA1003','D2P2');
select dbo.calcTotalPay('LA1004','D2P2');
select dbo.calcTotalPay('LA1004','D2P1');

DROp function calcTotalPay

UPDATE P_apply set discount_amount=10 where fk_c_ID = 'LA1002' and fk_p_ID='D1P2'

