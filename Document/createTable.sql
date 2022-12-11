use English
go 
DROP DATABASE  English_center
go
create database English_center
go
use English_center
go



CREATE TABLE Account
(	
	UserName	VARCHAR(20)	NOT NULL	PRIMARY KEY,
	Password	VARCHAR(20)	NOT NULL
);
-- User
CREATE TABLE User_info
(	
	user_ID		CHAR(7)	NOT NULL,
    fname		NVARCHAR(15)	NOT NULL,
	minit		NVARCHAR(15),					
	lname		NVARCHAR(15)	NOT NULL,
	bdate		DATE,
	address		NVARCHAR(100)	NOT NULL,
	email		VARCHAR(50)	NOT NULL,
	fk_UserName	VARCHAR(20)	NOT NULL,
	PRIMARY KEY(user_ID)
);




-- Số điện thoại
CREATE TABLE Phone_number
(	
	phone		CHAR(10)	NOT NULL,
	fk_user_ID	CHAR(7)	NOT NULL,
	PRIMARY KEY (phone, fk_user_ID)
);

-- Nhân viên
CREATE TABLE Clerk
(	
	ID			CHAR(7)			NOT NULL,
	fname		NVARCHAR(15)	NOT NULL,
	minit		NVARCHAR(15)			,					
	lname		NVARCHAR(15)	NOT NULL,
	bdate		DATE,
	address		NVARCHAR(100)	NOT NULL,
	email		VARCHAR(50)		NOT NULL,
	citizen_ID	VARCHAR(12)		NOT NULL UNIQUE,
	fk_superID	CHAR(7)			NOT NULL,
	fk_dnum		CHAR(7)			NOT NULL,

	PRIMARY KEY (ID)
);
 --Chi nhánh
CREATE TABLE Department
(	
	dnum		CHAR(7)			NOT NULL,
    dname		NVARCHAR(50)	NOT NULL,
	address		NVARCHAR(100)	NOT NULL,
	contactInfo	NVARCHAR(100)	NOT NULL,
	fk_leaderID	CHAR(7)			NOT NULL,

	PRIMARY KEY(dnum)
);


-- Chương trình học
CREATE TABLE Syllabus
(	
	syl_ID		CHAR(7)			NOT NULL,
	content		NVARCHAR(100)	NOT NULL,
	total_ses	INT			    NOT NULL,
	target		NVARCHAR(100)	NOT NULL,

	PRIMARY KEY (syl_ID)
);
-- Khóa học
CREATE TABLE Course
(	
	c_ID		CHAR(6)		 NOT NULL,
	c_name		NVARCHAR(50) NOT NULL,
	fee			INT			 NOT NULL,
	s_date		DATE		 NOT NULL,
	e_date		DATE		 NOT NULL,
	fk_syl_ID	CHAR(7)		 NOT NULL,
	fk_dnum		CHAR(7)		 NOT NULL, 

	PRIMARY KEY (c_ID)
);

-- Tài liệu
CREATE TABLE Document
(	
	doc			CHAR(7)		NOT NULL,
	fk_syl_ID	CHAR(7)		NOT NULL,
	PRIMARY KEY (doc, fk_syl_ID)
);

-- Lớp học
CREATE TABLE Class
(	
	class_ID		CHAR(7)		NOT NULL,
	numb_student	INT			NOT NULL,
	fk_c_ID			CHAR(6)		NOT NULL,
	PRIMARY KEY (class_ID, fk_c_ID)
);
-- Khuyến mãi
CREATE TABLE Promotion
(	
	p_ID		CHAR(7)		NOT NULL,
	p_type		CHAR(7)		NOT NULL,
	p_value     int			NOT NULL,
	s_date		DATE		NOT NULL,
	e_date		DATE		NOT NULL,
	duration	INT			,
	fk_dnum		CHAR(7)		NOT NULL,

	PRIMARY KEY (p_id)
);
-- Thuộc về
CREATE TABLE Belong
(	
	fk_stu_ID	CHAR(7)		NOT NULL,
	fk_class_ID CHAR(7)		NOT NULL,
	fk_c_ID		CHAR(6)		NOT NULL
	PRIMARY KEY (fk_stu_ID, fk_class_ID, fk_c_ID)
)

-- Áp dụng
CREATE TABLE P_apply
(	
	discount_amount	INT			DEFAULT 0,
	fk_p_ID			CHAR(7)		NOT NULL,
	fk_c_ID			CHAR(6)		NOT NULL,
	PRIMARY KEY (fk_p_ID, fk_c_ID)
)


-- Tham gia
CREATE TABLE Attend
(
	attendance	CHAR(1)		    NOT NULL, -- P for present, L for late, A for absent
	note		NVARCHAR(100)	NOT NULL,
	fk_class_ID	CHAR(7)		    NOT NULL,
	fk_c_ID		CHAR(6)			NOT NULL,
	fk_stu_ID	CHAR(7)			NOT NULL,
	fk_lesson_id int			NOT NULL,

	PRIMARY KEY (fk_class_ID, fk_c_ID, fk_lesson_id, fk_stu_ID)
)
-- Học viên
CREATE TABLE Student
(	
	stu_ID		CHAR(7)			NOT NULL,
	fname		NVARCHAR(15)	NOT NULL,
	minit		NVARCHAR(15)			,					
	lname		NVARCHAR(15)	NOT NULL,
	bdate		DATE,
	address		NVARCHAR(100)	NOT NULL,
	email		VARCHAR(50)		NOT NULL,

	PRIMARY KEY (stu_id)
)
-- Người dạy
CREATE TABLE Instructor
(	
	instructor_ID		CHAR(7)		NOT NULL,
	citizen_ID		VARCHAR(12)		NOT NULL UNIQUE,
	classification	VARCHAR(30)		NOT NULL,		
	fname			NVARCHAR(15)	NOT NULL,
	minit			NVARCHAR(15)			,					
	lname			NVARCHAR(15)	NOT NULL,
	bdate			DATE,
	address			NVARCHAR(100)	NOT NULL,
	email			VARCHAR(50)		NOT NULL,
	salary			INT				NOT NULL,

	PRIMARY KEY (instructor_id)
)
-- Giáo viên
CREATE TABLE Teacher
(	
	teacher_ID		CHAR(7)			NOT NULL,
	fk_citizen_ID	VARCHAR(12)		NOT NULL,
	classification	VARCHAR(30)		NOT NULL,		
	fname			NVARCHAR(15)	NOT NULL,
	minit			NVARCHAR(15)			,					
	lname			NVARCHAR(15)	NOT NULL,
	bdate			DATE					,
	address			NVARCHAR(100)	NOT NULL,
	email			VARCHAR(50)		NOT NULL,
	salary			INT				NOT NULL,
	PRIMARY KEY (teacher_ID)
)

-- Trợ giảng
CREATE TABLE Tutor
(	
	tutor_ID		CHAR(7)			NOT NULL,
	fk_citizen_ID	VARCHAR(12)		NOT NULL,
	classification	VARCHAR(30)		NOT NULL,		
	fname			NVARCHAR(15)	NOT NULL,
	minit			NVARCHAR(15)			,					
	lname			NVARCHAR(15)	NOT NULL,
	bdate			DATE,
	address			NVARCHAR(100)	NOT NULL,
	email			VARCHAR(50)		NOT NULL,
	salary			INT				NOT NULL,
	PRIMARY KEY (tutor_ID)
)


-- Bằng cấp chứng chỉ
CREATE TABLE Degree
(	
	fk_instructorID		CHAR(7)		NOT NULL,
	kind				VARCHAR(20) NOT NULL,   -- IELTS, TOEIC, TOEFL,... 
	score				VARCHAR(10) NOT NULl, -- '6.5', '700',....
	PRIMARY KEY (fk_instructorID, kind),
)

-- Phiếu đăng ký
CREATE TABLE Reg_form
(	
	form_ID			CHAR(7)		NOT NULL	PRIMARY KEY,
	fk_c_ID			CHAR(6)		NOT NULL,
	fk_stu_ID		CHAR(7)		NOT NULL,
	total_fee		INT	,
	reg_time		DATETIME	NOT NULL,
	Status_Register NVARCHAR(50) DEFAULT N'Chưa xác nhận'

)

-- Hóa đơn
CREATE TABLE Bill
(	
	bill_ID			CHAR(7)		NOT NULL,	
	fk_form_ID		CHAR(7)		NOT NULL,
	fk_stu_ID		CHAR(7)		NOT NULL,
	remaining_fee	INT			NOT NULL,	
	paid_amount		INT			NOT NULL,
	payment_method	VARCHAR(7)	NOT NULL, -- 'BANKING' or 'CASH' 
	p_time			DATETIME	NOT NULL,
	PRIMARY KEY (bill_id)
)

go

-- Hỗ trợ
CREATE TABLE Support
(	
	fk_class_ID		CHAR(7)		NOT NULL,
	fk_c_ID			CHAR(6)		NOT NULL,
	fk_lesson_id    int			NOT NULL,
	fk_tutor_ID		CHAR(7)		NOT NULL,
	attendance		CHAR(1)		NOT NULL,
	PRIMARY KEY(fk_class_ID, fk_c_ID, fk_lesson_id, fk_tutor_ID)
)
-- Buổi học
CREATE TABLE Lesson
(	
	lesson_id		int			IDENTITY (1,1),
	fk_class_ID		CHAR(7)		NOT NULL,
	fk_c_ID			CHAR(6)		NOT NULL,
	fk_teacher_ID	CHAR(7)		NOT NULL,
	fk_room_id      CHAR(7)		NOT NULL,
	fk_dnum			CHAR(7)		NOT NULL,
	tea_attendance	CHAR(1)		NOT NULL,
	s_time			TIME		NOT NULL,
	f_time			TIME		NOT NULL,
	l_date			DATE		NOT NULL,
	PRIMARY KEY	(fk_class_ID, fk_c_id, lesson_id)
)

-- Phòng học
CREATE TABLE Room
(
	fk_dnum		CHAR(7)		NOT NULL,
	room_ID		CHAR(7)		NOT NULL,
	func		VARCHAR(30)	NOT NULL,
	room_name	VARCHAR(15)	NOT NULL,
	capacity	TINYINT		NOT NULL,
	PRIMARY KEY (fk_dnum, room_ID)
)

go

-----------------------------------------------ADD CONSTRAINTS-----------------------------------------------------

-- SĐT
ALTER TABLE Phone_number
ADD CONSTRAINT fk_phone_user_uid FOREIGN KEY (fk_user_ID) REFERENCES User_info (user_ID)
	ON DELETE CASCADE ON UPDATE CASCADE


-- Nhân viên
ALTER TABLE Clerk 
ADD CONSTRAINT fk_clerk_acc_uid FOREIGN KEY (ID) REFERENCES User_info (user_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Clerk 
ADD CONSTRAINT fk_clerk_dept_dnum FOREIGN KEY (fk_dnum) REFERENCES Department (dnum)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Clerk
ADD CONSTRAINT fk_clerk_clerk_id FOREIGN KEY (fk_superID) REFERENCES Clerk (ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION

-- Chi nhánh
ALTER TABLE Department
ADD CONSTRAINT fk_dept_clerk_uid FOREIGN KEY (fk_leaderID) REFERENCES Clerk (ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION

-- Khóa học
ALTER TABLE Course 
ADD CONSTRAINT fk_course_dept_dnum FOREIGN KEY (fk_dnum) REFERENCES Department (dnum)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Course 
ADD CONSTRAINT fk_course_syl_id FOREIGN KEY (fk_syl_ID) REFERENCES Syllabus (syl_ID)
	ON DELETE CASCADE ON UPDATE CASCADE


-- Tài liệu
ALTER TABLE Document
ADD CONSTRAINT fk_doc_syl_id FOREIGN KEY (fk_syl_ID) REFERENCES Syllabus (syl_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Class
ALTER TABLE Class 
ADD CONSTRAINT fk_class_course_id FOREIGN KEY (fk_c_ID) REFERENCES Course (c_ID)
	ON DELETE CASCADE ON UPDATE CASCADE


-- Khuyễn mãi
ALTER TABLE Promotion 
ADD CONSTRAINT fk_pro_dept_name FOREIGN KEY (fk_dnum) REFERENCES Department (dnum)
	ON DELETE CASCADE ON UPDATE CASCADE


-- Thuộc về
ALTER TABLE Belong
ADD CONSTRAINT fk_be_stu_uid FOREIGN KEY (fk_stu_ID) REFERENCES Student (stu_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Belong
ADD CONSTRAINT fk_be_class_id FOREIGN KEY (fk_class_ID, fk_c_ID) REFERENCES Class (class_ID, fk_c_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Áp dung
ALTER TABLE P_apply
ADD CONSTRAINT fk_apply_pro_id FOREIGN KEY (fk_p_ID) REFERENCES Promotion (p_ID)
	ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE P_apply 
ADD CONSTRAINT fk_apply_course_id FOREIGN KEY (fk_c_ID) REFERENCES Course (c_ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION

-- Tham gia
ALTER TABLE Attend
ADD CONSTRAINT fk_att_lesson_id FOREIGN KEY (fk_class_ID, fk_c_ID, fk_lesson_id) REFERENCES lesson(fk_class_ID, fk_c_ID, lesson_id)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Attend
ADD CONSTRAINT fk_att_stu_uid FOREIGN KEY (fk_stu_ID) REFERENCES Student (stu_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Học viên
ALTER TABLE Student
ADD CONSTRAINT fk_stu_user_uid FOREIGN KEY (stu_ID) REFERENCES User_info (user_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Người dạy
ALTER TABLE Instructor
ADD CONSTRAINT fk_ins_user_uid FOREIGN KEY (instructor_ID) REFERENCES User_info (user_ID)	
	ON DELETE CASCADE ON UPDATE CASCADE

-- Giáo viên
ALTER TABLE Teacher
ADD CONSTRAINT fk_teach_ins_uid FOREIGN KEY (teacher_id) REFERENCES Instructor (instructor_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Trợ giảng
ALTER TABLE Tutor
ADD CONSTRAINT fk_tut_ins_uid FOREIGN KEY (tutor_ID) REFERENCES Instructor (instructor_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- BCCC
ALTER TABLE Degree
ADD CONSTRAINT fk_deg_teach_uid FOREIGN KEY (fk_instructorID) REFERENCES Instructor (instructor_ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION

-- Phiếu đăng ký
ALTER TABLE Reg_form
ADD CONSTRAINT fk_reg_stu_uid FOREIGN KEY (fk_stu_ID) REFERENCES Student (stu_ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE Reg_form 
ADD CONSTRAINT fk_reg_course_id FOREIGN KEY (fk_c_ID) REFERENCES Course (c_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Hóa đơn
ALTER TABLE Bill 
ADD CONSTRAINT fk_bill_reg_name FOREIGN KEY (fk_form_ID) REFERENCES Reg_form (form_ID)
	ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE Bill 
ADD CONSTRAINT fk_bill_stu_ID FOREIGN KEY (fk_stu_ID) REFERENCES Student(stu_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Hỗ trợ
ALTER TABLE Support 
ADD CONSTRAINT fk_sp_class_id FOREIGN KEY (fk_class_ID, fk_c_ID, fk_lesson_id) REFERENCES Lesson (fk_class_ID, fk_c_ID, lesson_id)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Support
ADD CONSTRAINT fk_sp_tut_uid FOREIGN KEY (fk_tutor_ID) REFERENCES Tutor (tutor_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

-- Phòng học
ALTER TABLE Room 
ADD CONSTRAINT fk_room_dept_id FOREIGN KEY (fk_dnum) REFERENCES Department (dnum)
	ON DELETE NO ACTION ON UPDATE NO ACTION

-- Buổi học
ALTER TABLE Lesson 
ADD CONSTRAINT fk_les_class_id FOREIGN KEY (fk_class_ID, fk_c_ID) REFERENCES Class (class_ID, fk_c_ID)
	ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE Lesson
ADD CONSTRAINT fk_les_teach_uid FOREIGN KEY (fk_teacher_ID) REFERENCES Teacher(teacher_ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION

ALTER TABLE Lesson 
	Add constraint fk_lesson_room foreign key (fk_dnum, fk_room_id) REFERENCES Room(fk_dnum, room_ID)
	ON DELETE CASCADE ON UPDATE CASCADE




------------------------- Tạo dữ liệu mẫu-----------------------------------------------------------
