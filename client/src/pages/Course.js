import DefaultLayout from '../Layouts/DefaultLayout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {} from 'mdb-react-ui-kit';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { getBranches, getCourses, getSyllabuss } from '../api/courseAPI';
import axios from 'axios';

const DELETE = 'delete';
const ADD = 'add';
const UPDATE = 'update';
const HIDDEN = 'hidden';

function Course() {
  const [courses, setCourses] = useState([]);
  const [syllabuss, setSyllabuss] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState({ type: HIDDEN, payload: '' }); //
  const [searchKey, setSearchKey] = useState('');
  const [error, setError] = useState({ idErr: '', c_nameErr: '', feeErr: '', branchErr: '', syllErr: '', dateErr: '' });

  // call APi
  const getData = async () => {
    await getCourses().then((data) => setCourses(data));
    await getSyllabuss().then((data) => setSyllabuss(data));
    await getBranches().then((data) => setBranches(data));
  };

  useEffect(() => {
    getData();
  }, []);

  //show/hide modal
  const handleOpen = (type, payload) => {
    setShowModal({ type, payload });
  };
  const handleClose = () => setShowModal((prev) => ({ ...prev, type: HIDDEN }));
  const getCourseById = (id) => courses.find((item) => item.c_ID === id);

  //search Course
  const handleSearch = (key) => {
    axios.get(`http://localhost:3003/course?name=${key}`).then((res) => setCourses(res.data[0]));
  };
  //delelte course
  const handleDeleteCourse = (id) => {
    axios.delete(`http://localhost:3003/course/${id}`).then((res) => {
      handleClose();
      getCourses().then((data) => setCourses(data));
    });
  };

  const validateForm = (c_id, c_name, fee, branch, syllabus, s_date, e_date) => {
    console.log(branch);
    if (!c_id) {
      setError({ ...error, idErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }
    if (c_id.length !== 6) {
      setError({ ...error, idErr: 'M?? kho?? h???c ph???i c?? ????? d??i l?? 6' });
      return false;
    }
    if (!c_name) {
      setError({ ...error, c_nameErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }
    if (!fee) {
      setError({ ...error, feeErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    } else if (!Number(fee)) {
      setError({ ...error, feeErr: 'Tr?????ng n??y ph???i l?? s???' });
      return false;
    } else if (fee < 10000) {
      setError({ ...error, feeErr: 'H???c ph?? ph???i l???n h??n 10000' });
      return false;
    }

    if (!branch) {
      console.log(branch);
      setError({ ...error, branchErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }
    if (!syllabus) {
      setError({ ...error, syllErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }

    if (!s_date) {
      setError({ ...error, dateErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }
    if (!e_date) {
      setError({ ...error, dateErr: 'Tr?????ng n??y kh??ng th??? thi???u' });
      return false;
    }

    if (e_date <= s_date) {
      setError({ ...error, dateErr: 'Ng??y k???t th??c ph???i sau ng??y b???t ?????u' });
      return false;
    }
    return true;
  };
  // Edit course
  const handleUpdateCourse = (e, c_ID) => {
    e.preventDefault();
    let form = e.target;
    let c_name = form.c_name.value,
      branch = form.branch.value,
      syllabus = form.syllabus.value,
      s_date = form.s_date.value,
      e_date = form.e_date.value;

    if (!validateForm(c_ID, c_name, form.fee.value, branch, syllabus, s_date, e_date)) {
      console.log('Kh??ng h???p l???');
      return;
    }
    let fee = Number(form.fee.value);
    axios
      .put(`http://localhost:3003/course/${c_ID}`, {
        c_name: c_name,
        fee: fee,
        s_date: s_date,
        e_date: e_date,
        fk_syl_ID: syllabus,
        fk_dnum: branch,
      })
      .then((res) => {
        handleClose();
        alert('C???p nh???t th??nh c??ng!');
        getCourses().then((data) => setCourses(data));
      })
      .catch((err) => alert('???? x???y ra l???i: ', err));
  };

  // ADD course
  const handleAddCourse = (e) => {
    e.preventDefault();
    let form = e.target;
    let id = form.c_id.value,
      c_name = form.c_name.value,
      branch = form.branch.value,
      syllabus = form.syllabus.value,
      s_date = form.s_date.value,
      e_date = form.e_date.value;
    if (!validateForm(id, c_name, form.fee.value, branch, syllabus, s_date, e_date)) {
      console.log('Kh??ng h???p l???');
      return;
    }

    let fee = Number(form.fee.value);

    axios
      .post('http://localhost:3003/course', {
        c_ID: id,
        c_name: c_name,
        fee: fee,
        s_date: s_date,
        e_date: e_date,
        fk_syl_ID: syllabus,
        fk_dnum: branch,
      })
      .then((res) => {
        alert('Th??m kho?? h???c th??nh c??ng!');
        handleClose();
        getCourses().then((data) => setCourses(data));
      })
      .catch((err) => console.log('???? x???y ra l???i: ', err));
  };

  return (
    <DefaultLayout>
      <div className="px-5 my-3">
        <h1>Kho?? h???c</h1>
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
          <Button variant="primary" onClick={() => handleOpen(ADD, '')}>
            Th??m kho?? h???c
          </Button>
        </div>
        {courses ? (
          <Table striped className="pt-3">
            <thead>
              <tr>
                <th>M?? kho?? h???c</th>
                <th>T??n kho?? h???c</th>
                <th>M?? chi nh??nh</th>
                <th>M?? ch????ng tr??nh h???c</th>
                <th>H???c ph??</th>
                <th>Ng??y b???t ?????u</th>
                <th>Ng??y k???t th??c</th>
                <th>H??nh ?????ng</th>
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
                  <td>{moment.utc(showModal.payload.s_date).format('YYYY-MM-DD')}</td>
                  <td>{moment.utc(showModal.payload.e_date).format('YYYY-MM-DD')}</td>
                  <td>
                    <Button variant="info">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={() => handleOpen(UPDATE, getCourseById(item.c_ID))}
                      />
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
      </div>
      {/* add new course modal */}
      <Modal show={showModal.type === ADD} onHide={handleClose} size="lg" backdrop="static">
        <form onSubmit={(e) => handleAddCourse(e)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>T???o kho?? h???c m???i</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group my-2">
              ID
              <input
                name="c_id"
                className="form-control"
                placeholder="ID"
                onChange={() => setError({ ...error, idErr: '' })}
              />
              <p className="text-danger">{error.idErr}</p>
            </div>
            <div className="form-group my-2">
              T??n kho?? h???c
              <input
                name="c_name"
                className="form-control"
                placeholder="T??n kho?? h???c"
                onChange={() => setError({ ...error, c_nameErr: '' })}
              />
              <p className="text-danger">{error.c_nameErr}</p>
            </div>

            <div className="form-group my-2">
              H???c ph??
              <input
                name="fee"
                className="form-control"
                placeholder="H???c ph??"
                onChange={() => setError({ ...error, feeErr: '' })}
              />
              <p className="text-danger">{error.feeErr}</p>
            </div>

            <div className="d-flex align-items-center">
              <div className="form-group me-3 w-50">
                Chi nh??nh
                <select
                  className="form-select"
                  defaultValue={''}
                  name="branch"
                  onChange={() => setError({ ...error, branchErr: '' })}
                >
                  <option value="">----------</option>
                  {branches.map((item, index) => (
                    <option value={item.dnum} key={index}>
                      {item.dnum}
                    </option>
                  ))}
                </select>
                <p className="text-danger">{error.branchErr}</p>
              </div>

              <div className="form-group my-2 w-50">
                Ch????ng tr??nh h???c
                <select
                  className="form-select"
                  defaultValue={''}
                  name="syllabus"
                  onChange={() => setError({ ...error, syllErr: '' })}
                >
                  <option value="">----------</option>
                  {syllabuss.map((item, index) => (
                    <option value={item.syl_ID} key={index}>
                      {item.content}
                    </option>
                  ))}
                </select>
                <p className="text-danger">{error.syllErr}</p>
              </div>
            </div>

            <div className="d-flex">
              <div className="form-group my-2 me-3 w-100" onChange={() => setError({ ...error, feeErr: '' })}>
                Ng??y b???t ?????u
                <input
                  type={'date'}
                  className="form-control"
                  placeholder="T??n kho?? h???c"
                  name="s_date"
                  onChange={() => setError({ ...error, dateErr: '' })}
                />
              </div>

              <div className="form-group my-2 w-100">
                Ng??y k???t th??c
                <input
                  type={'date'}
                  className="form-control"
                  placeholder="T??n kho?? h???c"
                  name="e_date"
                  onChange={() => setError({ ...error, dateErr: '' })}
                />
              </div>
            </div>
            <p className="text-danger">{error.dateErr}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
              Hu???
            </Button>
            <Button variant="primary" type="submit">
              X??c nh???n
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* delete course modal */}
      <Modal show={showModal.type === DELETE} onHide={handleClose} size="" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>X??c nh???n xo?? kho?? h???c</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>B???n ch???c ch???n ch??? ?</h6>
          <p>Sau khi xo?? d??? li???u v??? kho?? h???c s??? kh??ng th??? kh??i ph???c</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
            Hu???
          </Button>
          <Button variant="danger" onClick={() => handleDeleteCourse(showModal.payload)}>
            X??c nh???n
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit course modal */}
      <Modal show={showModal.type === UPDATE} onHide={handleClose} size="lg" backdrop="static">
        <form onSubmit={(e) => handleUpdateCourse(e, showModal.payload.c_ID)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>C???p nh???t kho?? h???c</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group my-2">
              ID
              <input
                name="c_id"
                className="form-control opacity-50"
                readOnly
                defaultValue={showModal.payload.c_ID}
                data-toggle="tooltip"
                data-placement="top"
                title="Tr?????ng n??y kh??ng th??? s???a"
                onChange={() => setError({ ...error, idErr: '' })}
              />
              <p className="text-danger">{error.idErr}</p>
            </div>
            <div className="form-group my-2">
              T??n kho?? h???c
              <input
                name="c_name"
                className="form-control"
                placeholder="T??n kho?? h???c"
                defaultValue={showModal.payload.c_name}
                onChange={() => setError({ ...error, c_nameErr: '' })}
              />
              <p className="text-danger">{error.c_nameErr}</p>
            </div>

            <div className="form-group my-2">
              H???c ph??
              <input
                name="fee"
                className="form-control"
                placeholder="H???c ph??"
                defaultValue={showModal.payload.fee}
                onChange={() => setError({ ...error, feeErr: '' })}
              />
              <p className="text-danger">{error.feeErr}</p>
            </div>

            <div className="d-flex align-items-center">
              <div className="form-group me-3 w-50">
                Chi nh??nh
                <select
                  className="form-select"
                  defaultValue={showModal.payload.fk_dnum}
                  name="branch"
                  onChange={() => setError({ ...error, branchErr: '' })}
                >
                  <option value="0">----------</option>
                  {branches.map((item, index) => (
                    <option value={item.dnum} key={index}>
                      {item.dnum}
                    </option>
                  ))}
                </select>
                <p className="text-danger">{error.branchErr}</p>
              </div>

              <div className="form-group my-2 w-50">
                Ch????ng tr??nh h???c
                <select
                  className="form-select"
                  defaultValue={showModal.payload.fk_syl_ID}
                  name="syllabus"
                  onChange={() => setError({ ...error, syllErr: '' })}
                >
                  <option value="0">----------</option>
                  {syllabuss.map((item, index) => (
                    <option value={item.syl_ID} key={index}>
                      {item.content}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-danger">{error.syllErr}</p>
            </div>

           <div className ='d-flex'>
             <div className="form-group my-2 me-3">
               Ng??y b???t ?????u
               <input
                 type={'date'}
                 defaultValue={moment.utc(showModal.payload.s_date).format('YYYY-MM-DD')}
                 className="form-control"
                 placeholder="T??n kho?? h???c"
                 name="s_date"
                 onChange={() => setError({ ...error, dateErr: '' })}
               />
             </div>
            
            
             <div className="form-group my-2">
               Ng??y k???t th??c
               <input
                 type={'date'}
                 defaultValue={moment.utc(showModal.payload.e_date).format('YYYY-MM-DD')}
                 className="form-control"
                 placeholder="T??n kho?? h???c"
                 name="e_date"
                 onChange={() => setError({ ...error, dateErr: '' })}
               />
             </div>
           </div>
            <p className="text-danger">{error.dateErr}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="border font-weight-normal px-5" onClick={handleClose}>
              Hu???
            </Button>
            <Button variant="primary" type="submit">
              X??c nh???n
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </DefaultLayout>
  );
}

export default Course;
