# DBS-ASSIGNMENT

## Server
### *Lưu ý khi run server*
    - Khi pull code từ GitHub về chúng ta sẽ thay đổi db.server trong file app.js thành tên server mssql chạy trên máy của mình
    - Server chấp nhận truy cập của client có địa chỉ http://localhost:3000
### *Cách sử dụng API*
    1. Câu a
        1.1 Hiển thị danh sách khóa học(Method: GET)
            API: http://localhost:3003/course
        1.2 Tìm kiếm khóa học theo tên(Method: GET) 
            API: http://localhost:3003/course?name=
            Đặt từ khóa mn muốn tìm kiếm vào sau name=
            VD mn muốn tìm kiếm tên của khóa học có chứa English thì mn sẽ dùng API http://localhost:3003/course?name=English
        1.3 Thêm khóa học mới(Method: POST)
            API: http://localhost:3003/course + body
            body ở đây sẽ có định dạng : 
                {
                    c_ID: value,
                    c_name: value,
                    fee: value,
                    s_date: value,
                    e_date: value,
                    fk_syl_ID: value,
                    fk_dnum: value
                }
            Mn test trong POSTMAN thì chuyển về kiểu JSON
        1.4 Update khóa học(Method: PUT) 
            API: http://localhost:3003/course/:id + body
            id là mã khóa học muốn update. VD mn muốn cập nhật khóa học có mã LG1001 sẽ dùng API http://localhost:3003/course/LG1001
            body ở đây sẽ có định dạng : 
                {
                    c_name: value,
                    fee: value,
                    s_date: value,
                    e_date: value,
                    fk_syl_ID: value,
                    fk_dnum: value
                }
            Mn test trong POSTMAN thì chuyển về kiểu JSON
        1.5 Xóa khóa học(Method: DELETE)
            API: http://localhost:3003/course/:id 
            id là mã khóa học muốn xóa. VD mn muốn xóa khóa học có mã LA1002 sẽ dùng API http://localhost:3003/course/LA1002
        1.6 Lấy dữ liệu về chi nhánh -  bảng Department(Method: GET)
            API: http://localhost:3003/branch
        1.7 Lấy dữ liệu về chương trình học - bảng Syllabus(Method: GET)
            API: http://localhost:3003/syll
    2. Câu b
        2.1 Hiển thị thông tin sinh viên(Method: GET)
            API: http://localhost:3003/student
        2.2 Tìm kiếm thông tin sinh viên theo tên(Method: GET)
            API: http://localhost:3003/student?name=
            Đặt từ khóa mn muốn tìm kiếm vào sau name=
            VD mn muốn tìm kiếm tên của sinh viên có chứa Phạm thì mn sẽ dùng API http://localhost:3003/student?name=Phạm
        2.3 Update thông tin sinh viên(Method: PUT)
            API: http://localhost:3003/student/:id + body
            id là mã sinh viên muốn update. VD mn muốn cập nhật sinh viên có mã STU1000 sẽ dùng API http://localhost:3003/course/STU1000
            body ở đây sẽ có định dạng : 
                {
                    fname: value,
                    minit: value,
                    lname: value,
                    bdate: value,
                    address: value,
                    email: value
                }
            Mn test trong POSTMAN thì chuyển về kiểu JSON
        2.4 Xóa sinh viên(Method: DELETE)
            API: http://localhost:3003/student/:id
            id là mã sinh viên muốn xóa. VD mn muốn xóa sinh viên có mã STU1000 sẽ dùng API http://localhost:3003/student/STU1000
        2.3 Sort sinh viên theo thuộc tính(METHOD: GET)
            - Sort theo mã sinh viên
                API: http://localhost:3003/student/sort?key=ID
            - Sort theo tên sinh viên
                API: http://localhost:3003/student/sort?key=Name
            - Sort theo ngày sinh
                API: http://localhost:3003/student/sort?key=Bdate
            - Sort theo địa chỉ
                API: http://localhost:3003/student/sort?key=Address
            - Sort theo email
                API: http://localhost:3003/student/sort?key=Email
            - Sort theo số khóa học
                API: http://localhost:3003/student/sort?key=numCourse

    3. câu c
        3.1 Giao diện và tính tiền sau khuyến mãi
            - Những cái đầu tương tự câu a
            - Tính toán tiền sau khi sử dụng khuyến mãi(METHOD: GET):
                API: http://localhost:3003/student/calcpay/makhoahoc?pid=makhuyenmai
        3.2 Hiển thị thông tin phiếu đăng kí (METHOD: GET)
            API: http://localhost:3003/register
        3.3 Thêm phiếu đăng ký mới (METHOD: POST)
            API: http://localhost:3003/register/add/:id + body
            body ở đây có định dạng
                {
                    "fk_c_ID": value,
                    "fk_stu_ID": value
                }
        3.4 Cập nhật thông tin phiếu đăng ký (METHOD: PUT)
            API: http://localhost:3003/register/update/:id + body
            body ở đây cs định dạng
                {
                    "statusUpdate": value
                }

        

