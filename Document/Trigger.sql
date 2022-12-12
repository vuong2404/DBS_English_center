use English_center
-------------------------------------------------------------
--- set giá trị tiền ở phiếu đăng kí khi tao 1 đăng kí mới---
-------------------------------------------------------------
CREATE TRIGGER trg_Reg_form ON Reg_form AFTER INSERT AS 
BEGIN
	DECLARE @discount int
	DECLARE @check int
	--kiem tra khoa hoc co duoc su dung khuyen mai do khong
	SELECT @check =count(*)	
	FROM P_apply,inserted
		WHERE inserted.fk_c_ID = P_apply.fk_c_ID
if(@check=0)
begin
UPDATE Reg_form
	SET total_fee = (SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID)
	FROM Course
	JOIN inserted ON Course.c_ID = inserted.fk_c_ID
WHERE Reg_form.form_ID = inserted.form_ID
end
else
begin

	SELECT @discount=max(discount_amount) FROM P_apply,inserted
		WHERE inserted.fk_c_ID = P_apply.fk_c_ID
	if(@discount>100)
begin
	UPDATE Reg_form
	SET total_fee = (SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) - 
		@discount
	FROM Course
	JOIN inserted ON Course.c_ID = inserted.fk_c_ID
	WHERE Reg_form.form_ID = inserted.form_ID
end
	else
begin
	UPDATE Reg_form
	SET total_fee = (SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) - 
		(SELECT fee FROM Course,inserted
		WHERE inserted.fk_c_ID = Course.c_ID) *
		@discount/100
	FROM Course
	JOIN inserted ON Course.c_ID = inserted.fk_c_ID
	WHERE Reg_form.form_ID = inserted.form_ID
end
end
END
GO


-------------------------------------------------------------
-- cap nhat si so cua lop hoc sau khi them hoc vien thuoc ve
-------------------------------------------------------------
CREATE TRIGGER trg_Belong ON Belong AFTER INSERT AS 
BEGIN
	UPDATE Class
	SET numb_student = numb_student+1
	FROM Class
	JOIN inserted ON Class.class_ID = inserted.fk_class_ID and Class.fk_c_ID=inserted.fk_c_ID
END
GO



-------------------------------------------------------------
-- cap nhat si so cua lop hoc sau khi xoa hoc vien thuoc ve
-------------------------------------------------------------
CREATE TRIGGER trg_Belong_del ON Belong AFTER DELETE AS 
BEGIN
	UPDATE Class
	SET numb_student = numb_student - 1
	FROM Class
	JOIN deleted ON Class.class_ID = deleted.fk_class_ID and Class.fk_c_ID=deleted.fk_c_ID
END
GO

-------------------------------------------------------------
----------------------------TEST1-----------------------------

select * from Promotion
select * from Course
select * from Reg_form
select * from P_apply
select * from Student

INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, reg_time) VALUES
	('REG1011', 'LA1002','STU1011', '2022-11-27T14:25:10')
go
INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, reg_time) VALUES
	('REG1012', 'LA1002','STU1012', '2022-11-27T14:25:10')
go
INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, reg_time) VALUES
	('REG1013', 'LA1003','STU1013', '2022-11-27T14:25:10')
go
INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, reg_time) VALUES
	('REG1014', 'LA1004','STU1014', '2022-11-27T14:25:10')
go
INSERT INTO Reg_form(form_ID, fk_c_ID,fk_stu_ID, reg_time) VALUES
	('REG1015', 'LA1005','STU1015', '2022-11-27T14:25:10')
go

drop TRIGGER trg_Reg_form
DELETE FROM Reg_form WHERE form_ID='REG1011';
DELETE FROM Reg_form WHERE form_ID='REG1012';
DELETE FROM Reg_form WHERE form_ID='REG1013';
DELETE FROM Reg_form WHERE form_ID='REG1014';
DELETE FROM Reg_form WHERE form_ID='REG1015';
-------------------------------------------------------------
----------------------------TEST2----------------------------
select * from Class 
select * from Belong 
select * from Student

insert into Belong values 
	('STU1000', 'L01','LA1002')
Go
insert into Belong values 
	('STU1001', 'L01','LA1002')
Go
insert into Belong values 
	('STU1002', 'L01','LA1002')
Go
insert into Belong values 
	('STU1003', 'L01','LA1002')
Go
insert into Belong values 
	('STU1004', 'L01','LA1002')
Go
insert into Belong values 
	('STU1005', 'L01','LA1002')
Go
insert into Belong values 
	('STU1006', 'L01','LA1002')
Go



drop TRIGGER trg_Belong

-------------------------------------------------------------
----------------------------TEST3----------------------------
select * from Class 
select * from Belong 
select * from Student

DELETE FROM Belong WHERE fk_stu_ID ='STU1000' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1001' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1002' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1003' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1004' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1005' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';
DELETE FROM Belong WHERE fk_stu_ID ='STU1006' and fk_class_ID = 'L01' and fk_c_ID = 'LA1002';

drop TRIGGER trg_Belong_del

