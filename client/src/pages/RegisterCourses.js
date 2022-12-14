import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getCourses } from '../api/courseAPI';
import axios from 'axios';
import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';

function RegisterCourses() {
  const [courses, setCourses] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [promotion, setPromotion] = useState('');
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
      alert('Vui l??ng ch???n kho?? h???c c???n ????ng k??!');
      return;
    }
    setSelectedCourses(array ? [array] : []);

    setPage('register');
  }; 

  console.log(selectedCourses[0])

  const handleRegisterCourse = async () => {
      await axios({
        method: 'post',
        url: 'http://localhost:3003/register/add',
        data: {
          fk_c_ID: selectedCourses[0].c_ID,
          fk_stu_ID: 'STU1001'
        }
      }).then(res => {
        alert('????ng k?? th??nh c??ng!')
        setPage('')
      })
  }

  const totalCost = selectedCourses.reduce((res, item) => res + item.fee, 0);

  return (
    <DefaultLayout>
      {page === '' && (
        <form onSubmit={(e) => handleSubmit(e)} className="px-5 mt-3">
          <h1>Danh s??ch kho?? h???c</h1>
          <div className="my-3 d-flex align-items-center justify-content-between">
            <InputGroup className="w-50">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
              <Form.Control
                placeholder="T??m ki???m........."
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
            <Table striped  className="pt-3">
              <thead>
                <tr>
                  <th>Ch???n</th>
                  <th>M?? kho?? h???c</th>
                  <th>T??n kho?? h???c</th>
                  <th>M?? chi nh??nh</th>
                  <th>M?? ch????ng tr??nh h???c</th>
                  <th>H???c ph??</th>
                  <th>Ng??y b???t ?????u</th>
                  <th>Ng??y k???t th??c</th>
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
              Ti???p t???c
            </Button>
          </div>
        </form>
      )}

      {page === 'register' && (
        <div className="px-5 mt-3">
          <h4 className="text-center mb-5">Phi???u ????ng k??</h4>
          <div className="container mt-3">
            <div className="row justify-content-center">
              <div className="col-7 border-end px-5 overflow-auto" style={{ height: '60vh', overflow: 'scroll' }}>
                <h5>C??c kho?? h???c ????ng k??</h5>

                {selectedCourses.map((item, index) => (
                  <div key={index} className="border shadow px-3 py-2 mt-3 rounded">
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>M?? kho?? h???c: </b> {item.c_ID}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>T??n kho?? h???c: </b> {item.c_name}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>H???c ph??: </b> {item.fee}
                    </p>
                    <p className="m-0 py-2 my-1 border-bottom">
                      <b>Ng??y b???t ?????u: </b> {moment.utc(item.s_date).format('YYYY-MM-DD')}
                    </p>
                    <p className="m-0 py-2 my-1 ">
                      <b>Ng??y k???t th??c </b> {moment.utc(item.e_date).format('YYYY-MM-DD')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="col-5 text-center px-5">
                <h5>Th??ng tin thanh to??n</h5>
                <div className="input-group mb-3 mt-4">
                  <div className="input-group-prepend"></div>
                  <input
                    type="text"
                    className="form-control rounded-start"
                    placeholder="Nh???p m?? gi???m gi??..."
                    onChange={(e) => handleChangePromotionInput(e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleChangePromotionInput(e);
                        handleApplyPromotion();
                      }
                    }}
                  />
                  <button className="btn btn-outline-success" type="button" onClick={handleApplyPromotion}>
                    ??p d???ng
                  </button>
                </div>
                  <p className={promotionMessage.type === 'error' ? 'text-danger': 'text-primary'}>{promotionMessage.text}</p>

                <div className="d-flex justify-content-between py-2 px-5 border-top">
                  <span className="me-4">T???m t??nh:</span>
                  <span>{totalCost}</span>
                </div>
                <div className="d-flex justify-content-between py-2 px-5 border-bottom">
                  <span className="me-4">Gi???m gi??:</span>
                  <span>{reduceMoney}</span>
                </div>
                <div className="d-flex justify-content-between py-2 px-5 mb-5">
                  <span className="me-4">T???ng c???ng</span>
                  <span>{totalCost - reduceMoney}</span>
                </div>
                <Button variant="success" className="mx-auto px-5" onClick={() =>handleRegisterCourse()}>
                  ????ng k??
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default RegisterCourses;
