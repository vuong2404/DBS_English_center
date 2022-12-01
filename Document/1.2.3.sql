-- Trả về danh sách giáo viên dạy tại một chi nhánh cho trước
ALTER PROCEDURE getTeacherFromDept @dnum CHAR(7)
AS
	SELECT	fname AS N'Họ', minit AS N'Tên đệm', lname AS N'Tên', teacher_ID AS 'MSGV'
	FROM	Teacher
	WHERE	Teacher.teacher_ID IN(	SELECT fk_teacher_ID
									FROM Lesson JOIN Course ON c_ID = fk_c_ID
									WHERE Course.fk_dnum = @dnum 
									)
	ORDER BY Teacher.lname
	IF @@ROWCOUNT = 0
		PRINT N'Không có giáo viên nào dạy tại chi nhánh'
GO
-- Xóa
DROP PROCEDURE getTeacherFromDept
GO
-- Test
EXEC getTeacherFromDept @dnum = 'BRANCH1'
GO


-- Kiểm tra sĩ số và thời gian học của từng lớp học (Chỉ liệt kê ra các lớp có sĩ số lớn hơn hoặc bằng 5 - đủ điều kiện học)
CREATE PROCEDURE getTotalTime
AS
	SELECT		class_ID AS 'Lớp', c_ID AS 'Khóa', COUNT(DISTINCT stu_ID) AS 'Số học sinh của lớp', DATEDIFF(day, s_date, e_date) AS 'Tổng thời gian học của khóa học'
	FROM		Course, Class, Student
	WHERE		class_ID = fk_class_ID AND Class.fk_c_ID = c_ID AND Student.fk_c_ID = c_ID
	GROUP BY	class_ID, c_ID, DATEDIFF(day, s_date, e_date)	
	HAVING		COUNT(DISTINCT stu_ID) >= 5
	ORDER BY	class_ID ASC
	IF @@ROWCOUNT = 0
		PRINT N'Không có lớp học nào có nhiều hơn 5 sinh viên'
GO
-- Xóa
DROP PROCEDURE getTotalTime
GO
-- Test

EXEC getTotalTime