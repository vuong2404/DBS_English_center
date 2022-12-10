

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