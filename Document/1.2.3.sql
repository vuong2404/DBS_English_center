-- Trả về danh sách giáo viên dạy tại một chi nhánh cho trước
use English_center
CREATE PROCEDURE getTeacherFromDept 
(@dnum CHAR(7)
)
AS
	SELECT	teacher_ID AS 'MSGV', fname AS N'Họ', minit AS N'Tên đệm', lname AS N'Tên'
	FROM	Teacher
	WHERE	Teacher.teacher_ID IN(	SELECT fk_teacher_ID
									FROM Lesson JOIN Course ON c_ID = fk_c_ID
									WHERE Course.fk_dnum = @dnum 
									)
	ORDER BY Teacher.lname
	IF @@ROWCOUNT = 0
		PRINT N'Không có giáo viên nào dạy tại chi nhánh'
GO

-- Hiển thị bảng dữ liệu các thông tin tóm tắt về học viên bao gồm: ID, tên, ngày sinh, địa chỉ, email, tổng số khóa học đăng kí
-- Tổng số khóa học chỉ tính các khóa học hiện nay đang diễn ra (ngày kết thúc > ngày hiện tại)
-- Người dùng có thể chỉ định giới hạn dưới cho tổng số khóa học(VD: tổng số khóa học >= 9)
-- Có aggreate function, group by, having, where và order by.  Liên quan đến việc lấy dữ liệu từ bảng trong câu 1.2.1: lấy e_date ở bảng course để kiểm tra điều kiện khóa học
CREATE PROCEDURE sumaryStudentInfo
(@numberCourse INT
)
AS 
BEGIN
	SELECT stu_ID, fname, minit, lname, bdate, address, email, COUNT(*) AS totalCouse
	FROM Reg_form, Student, Course
	WHERE fk_c_ID = c_ID AND fk_stu_ID =  stu_ID AND e_date > GETDATE()
	GROUP BY stu_ID, fname, minit, lname, bdate, address, email
	HAVING COUNT(*) >= @numberCourse
	ORDER BY stu_ID
END
GO



-----------------------------------------------------------------TEST
EXEC sumaryStudentInfo @numberCourse = 0
GO
EXEC sumaryStudentInfo @numberCourse = 2
GO
EXEC sumaryStudentInfo @numberCourse = 4
GO
EXEC sumaryStudentInfo @numberCourse = 6
GO

-- Test
EXEC getTeacherFromDept @dnum = 'BRANCH1'
EXEC getTeacherFromDept @dnum = 'BRANCH2'
GO