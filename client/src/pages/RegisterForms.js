import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass , faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CANCEL = 'cancel';
const CONFIRM = 'confirm';
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
  const handleConfirm = async (id) => {
    await axios({
      method: 'put',
      url: `http://localhost:3003/register/update/${id}`,
      data: {
        statusUpdate: 0,
      },
    }).then(res => getData()).catch(err => alert(err));
    handleClose();
  };

  const handleCancel = async (id) => {
    await axios({
      method: 'put',
      url: `http://localhost:3003/register/update/${id}`,
      data: {
        statusUpdate: 1,
      },
    }).then(res => getData()).catch(err => alert(err));
    handleClose();
  };

  const handleOpen = (type, payload) => {
    setShowModal({ type, payload });
  };
  const handleClose = () => setShowModal((prev) => ({ ...prev, type: HIDDEN }));

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
          <Table striped  className="pt-3">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Mã khoá học</th>
                <th>Mã học viên</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th className='text-center'>Xác nhận</th>
              </tr>
            </thead>

            <tbody>
              {regForm.map((item, index) => (
                <tr key={index}>
                  <td>{item.form_ID}</td>
                  <td>{item.fk_stu_ID}</td>
                  <td>{item.total_fee}</td>
                  <td>{moment.utc(showModal.payload.s_date).format('YYYY-MM-DD HH:MM:SS')}</td>
                  <td>{item.Status_Register}</td>
                  <td className='text-center'>
                    <Button variant="info" disabled = {item.Status_Register === 'Đã xác nhận'} onClick={() => handleOpen(CONFIRM,item)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>{'  '}
                    <Button variant="danger" onClick={() => handleOpen(CANCEL,item)}>
                      <FontAwesomeIcon icon={faBan} />
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

      {/* confirm modal */}
      <Modal show={showModal.type === CONFIRM} onHide={handleClose} size="" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Xác nhận thanh toán {showModal.payload.c_name}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Xác nhận đã thanh toán cho phiếu đăng kí {showModal.payload.form_ID}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(showModal.payload.form_ID)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Cancel modal */}
      <Modal show={showModal.type === CANCEL} onHide={handleClose} size="" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Huỷ phiếu đăng kí ?</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn chắc chắn muốn huỷ phiếu đăng kí {showModal.payload.form_ID} chứ ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={() => handleCancel(showModal.payload.form_ID)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
}

export default RegisterForms;
