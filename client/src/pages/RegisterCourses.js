import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getCourses } from '../api/courseAPI';
import axios from 'axios';
import StudentLayout from '../Layouts/StudentLayout/StudentLayout';

function RegisterCourses() {
  const [courses, setCourses] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [promotion, setPromotion] = useState('');
  const [applydDone, setApplydDone] = useState(false);
  const [reduceMoney, setReduceMoney] = useState(0);
  const [promotionMessage, setPromotionMessage] = useState({type: 'success', text: ''})

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [page, setPage] = useState('');

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, []);

  //show/hide moda

  //search Course
  const handleSearch = (key) => {
    axios.get(`http://localhost:3003/course?name=${key}`).then((res) => setCourses(res.data[0]));
  };

  //
  const handleChangePromotionInput = (e) => {
    setPromotion(e.target.value.toUpperCase());
    setPromotionMessage('');
  };

  const handleApplyPromotion = async () => {
    if (!promotion || !selectedCourses || !selectedCourses[0].c_ID) {
        console.log(promotion, selectedCourses, selectedCourses[0].c_ID);
        return ;
    }

    await axios
      .get(`http://localhost:3003/register/calcpay?id=${selectedCourses[0].c_ID}&pid=${promotion}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res)
        if (res.result === 0) {
            setPromotionMessage({type: 'error', text: res.message}) ;
        } else {
            setPromotionMessage({type: 'success', text: res.message}) ;
            setReduceMoney(res.reduce) ;
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let array = courses.find((item, index) => e.target.course[index].checked);

    if (!array) {
      alert('Vui lòng chọn khoá học cần đăng kí!');
      return;
    }
    setSelectedCourses(array ? [array] : []);

    setPage('register');
  };

  const totalCost = selectedCourses.reduce((res, item) => res + item.fee, 0);

  return (
    <StudentLayout>
      {page === '' && (
        <form onSubmit={(e) => handleSubmit(e)} className="px-5 mt-3">
          <h1>Danh sách khoá học</h1>
          <div className="my-3 d-flex align-items-center justify-content-between">
            <InputGroup className="w-50">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Tìm kiếm........."
                defaultValue={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.target.value);
                  }
                }}
              />
            </InputGroup>
          </div>
          {courses ? (
            <Table className="pt-3">
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th>Mã khoá học</th>
                  <th>Tên khoá học</th>
                  <th>Mã chi nhánh</th>
                  <th>Mã chương trình học</th>
                  <th>Học phí</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input name="course" type={'radio'} defaultChecked={false} onChange={(e) => {}} />
                    </td>
                    <td>{item.c_ID}</td>
                    <td>{item.c_name}</td>
                    <td>{item.fk_dnum}</td>
                    <td>{item.fk_syl_ID}</td>
                    <td>{item.fee}</td>
                    <td>{moment.utc(item.s_date).format('YYYY-MM-DD')}</td>
                    <td>{moment.utc(item.e_date).format('YYYY-MM-DD')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No record</p>
          )}
          <div className="d-flex position-sticky bottom-0 w-100 shadow p-2 mt-2 bg-white rounded">
            <Button variant="success" className="mx-auto px-5" type="submit">
              Tiếp tục
            </Button>
          </div>
        </form>
      )}

      {page === 'register' && (
        <div className="px-5 mt-3">
          <h4 className="text-center mb-5">Phiếu đăng kí</h4>
          <div className="container mt-3">
            <div className="row justify-content-center">
              <div className="col-7 border-end px-5 overflow-auto" style={{ height: '60vh', overflow: 'scroll' }}>
                <h5>Các khoá học đăng kí</h5>

                {selectedCourses.map((item, index) => (
                  <div key={index} className="border shadow px-3 py-2 mt-3 rounded">
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>Mã khoá học: </b> {item.c_ID}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>Tên khoá học: </b> {item.c_name}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>Học phí: </b> {item.fee}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>Ngày bắt đầu: </b> {moment.utc(item.s_date).format('YYYY-MM-DD')}
                    </p>
                    <p className="m-0 py-2 my-1 ">
                      <b>Ngày kết thúc </b> {moment.utc(item.e_date).format('YYYY-MM-DD')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="col-5 text-center px-5">
                <h5>Thông tin thanh toán</h5>
                <div className="input-group mb-3 mt-4">
                  <div className="input-group-prepend"></div>
                  <input
                    type="text"
                    className="form-control rounded-start"
                    placeholder="Nhập mã giảm giá..."
                    onChange={(e) => handleChangePromotionInput(e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleChangePromotionInput(e);
                        handleApplyPromotion();
                      }
                    }}
                  />
                  <button className="btn btn-outline-success" type="button" onClick={handleApplyPromotion}>
                    Áp dụng
                  </button>
                </div>
                  <p className={promotionMessage.type == 'error' ? 'text-danger': 'text-primary'}>{promotionMessage.text}</p>

                <div className="d-flex justify-content-between py-2 px-5 border-top">
                  <span className="me-4">Tạm tính:</span>
                  <span>{totalCost}</span>
                </div>
                <div className="d-flex justify-content-between py-2 px-5 border-bottom">
                  <span className="me-4">Giảm giá:</span>
                  <span>{reduceMoney}</span>
                </div>
                <div className="d-flex justify-content-between py-2 px-5 mb-5">
                  <span className="me-4">Tổng cộng</span>
                  <span>{totalCost - reduceMoney}</span>
                </div>
                <Button variant="success" className="mx-auto px-5" onClick={() => setPage('')}>
                  Đăng kí
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}

export default RegisterCourses;
