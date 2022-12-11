import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { getCourses } from '../api/courseAPI';
import axios from 'axios';

const DELETE = 'delete';
const ADD = 'add';
const UPDATE = 'update';
const HIDDEN = 'hidden';

function RegisterForms() {
  const [regForm, setRegForm] = useState([]);
  const [showModal, setShowModal] = useState({ type: HIDDEN, payload: '' }); //
  const [searchKey, setSearchKey] = useState('');

  // call APi
  const getData = async () => {
    return await axios.get(' http://localhost:3003/register').then((res) => setRegForm(res.data[0]));
  };

  useEffect(() => {
    getData();
  }, []);

  //search Regform
  const handleSearch = (key) => {
    axios.get(`http://localhost:3003/regform?name=${key}`).then((res) => setRegForm(res.data[0]));
  };
  const handleChangeStatus = async (id) => {
    axios({
      method: 'put',
      url: `http://localhost:3003/register/update/${id}`,
      data: {
        statusUpdate: 0,
      },
    }).then(res => getData());
  };

  return (
    <DefaultLayout>
      <div className="px-5 my-3">
        <h1>Phiếu đăng kí</h1>
        <div className="my-3 d-flex align-items-center justify-content-between">
          <InputGroup className="w-50">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm........."
              defaultValue={searchKey}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.target.value);
                }
              }}
            />
          </InputGroup>
        </div>
        {regForm ? (
          <Table className="pt-3">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Mã khoá học</th>
                <th>Mã học viên</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Xác nhận</th>
              </tr>
            </thead>

            <tbody>
              {regForm.map((item, index) => (
                <tr key={index}>
                  <td>{item.form_ID}</td>
                  <td>{item.fk_stu_ID}</td>
                  <td>{item.reg_time}</td>
                  <td>{item.total_fee}</td>
                  <td>{item.Status_Register}</td>
                  <td>
                    <Button variant="info" onClick={() => handleChangeStatus(item.form_ID)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>{' '}
                    <Button variant="danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No record</p>
        )}
      </div>
    </DefaultLayout>
  );
}

export default RegisterForms;
