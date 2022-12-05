import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const DELETE = 'delete';
const ADD = 'add';
const UPDATE = 'update';
const HIDDEN = 'hidden';

function Course() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState({type: HIDDEN, id : ''}); //

  const handleClose = () => setShowModal(prev => ({...prev, type: HIDDEN}));
  const handleOpen = (type, id) => setShowModal({type,id});
  const handleDeleteCourse = (id) => {

  }

  useEffect(() => {
    axios.get('http://localhost:3003/course').then((respone) => {
      console.log(respone);
      setCourses(respone.data[0]);
    });
  }, []);

  console.log(courses);

  return (
    <DefaultLayout>
      <div className="px-5 my-3">
        <h1>Khoá học</h1>
        <div className="my-3 d-flex align-items-center justify-content-between">
          <InputGroup className="w-50">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control placeholder="Tìm kiếm........." />
          </InputGroup>
          <Button variant="primary" onClick={() => handleOpen(ADD,'')}>
            Thêm khoá học
          </Button>
        </div>
        {courses ? (
          <Table className="pt-3">
            <thead>
              <tr>
                <th>Mã khoá học</th>
                <th>Tên khoá học</th>
                <th>Mã chi nhánh</th>
                <th>Mã chương trình học</th>
                <th>Học phí</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((item, index) => (
                <tr key={index}>
                  <td>{item.c_ID}</td>
                  <td>{item.c_name}</td>
                  <td>{item.fk_dnum}</td>
                  <td>{item.fk_syl_ID}</td>
                  <td>{item.fee}</td>
                  <td>{item.s_date}</td>
                  <td>{item.e_date}</td>
                  <td>
                    <Button variant="info" onClick={() => handleOpen(UPDATE, item.c_ID)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleOpen(DELETE, item.c_ID)}>
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

        {/* add new course modal */}
      </div>
      <Modal show={showModal.type === ADD} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Tạo khoá học mới</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group my-2">
              Tên khoá học
              <input className="form-control" placeholder="Tên khoá học" />
            </div>

            <div className="d-flex align-items-center">
              <div className="form-group me-3 w-50">
                Chi nhánh
                <select className="form-control" defaultValue={''}>
                  <option>Chi nhánh 1</option>
                  <option>Chi nhánh 2</option>
                </select>
              </div>

              <div className="form-group my-2 w-50">
                Chương trình học
                <select className="form-control" defaultValue={''}>
                  <option>Chương trình học</option>
                  <option>Chương trình học</option>
                </select>
              </div>
            </div>

            <div className="form-group my-2">
              Ngày bắt đầu
              <input type={'date'} className="form-control" placeholder="Tên khoá học" />
            </div>

            <div className="form-group my-2">
              Ngày kết thúc
              <input type={'date'} className="form-control" placeholder="Tên khoá học" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete course modal */}
      <Modal show={showModal.type === DELETE} onHide={handleClose} size="" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Xác nhận xoá khoá học</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Bạn chắc chắn chứ ?</h6>
          <p>Sau khi xoá dữ liệu về khoá học sẽ không thể khôi phục</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={() => handleDeleteCourse(showModal.id)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit course modal */}
      <Modal show={showModal === UPDATE} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Cập nhật khoá học</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group my-2">
              Tên khoá học
              <input className="form-control" placeholder="Tên khoá học" />
            </div>

            <div className="d-flex align-items-center">
              <div className="form-group me-3 w-50">
                Chi nhánh
                <select className="form-control" defaultValue={''}>
                  <option>Chi nhánh 1</option>
                  <option>Chi nhánh 2</option>
                </select>
              </div>

              <div className="form-group my-2 w-50">
                Chương trình học
                <select className="form-control" defaultValue={''}>
                  <option>Chương trình học</option>
                  <option>Chương trình học</option>
                </select>
              </div>
            </div>

            <div className="form-group my-2">
              Ngày bắt đầu
              <input type={'date'} className="form-control" placeholder="Tên khoá học" />
            </div>

            <div className="form-group my-2">
              Ngày kết thúc
              <input type={'date'} className="form-control" placeholder="Tên khoá học" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
}

export default Course;
