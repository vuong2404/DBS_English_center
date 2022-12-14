import {
    React,
    useEffect,
    useState
} from "react";
import moment from "moment/moment";
import axios from 'axios'
import { BodyContainer, Search } from "./Body.styled";
import { BiSearch } from 'react-icons/bi'
import { FaUserEdit } from 'react-icons/fa'
import { BsFillPersonXFill, BsExclamationCircle } from 'react-icons/bs'
import {} from 'bootstrap'

const Body = () =>{
    const [message, setMessage] = useState('');
    const [ID, setID] = useState('');
    const [fname, setFname] = useState('');
    const [minit, setMinit] = useState('');
    const [name, setName] = useState('');
    const [sortState, setSortState] = useState('')
    const [students, setStudent] = useState([]);
    const [editData, setEditData] = useState({
        fname: '',
        minit: '',
        lname: '',
        bdate: '',
        address: '',
        email: ''
    })
    const handleEdit = (e) => {
        const newData = {...editData};
        newData[e.target.id] = e.target.value;
        setEditData(newData);
        console.log(newData);
    }
    const handleSend = (e) => {
        e.preventDefault();
        e.stopPropagation()

        axios.put(`http://localhost:3003/student/${ID}`,{
            fname: editData.fname,
            minit: editData.minit,
            lname: editData.lname,
            bdate: editData.bdate,
            address: editData.address,
            email: editData.email
        }).then((response) => {
            sortStudent(sortState)
            
        }
        )
    }
    const fetchStudents = async() => {
        const response = await axios.get("http://localhost:3003/student")
        const students = response.data;
        setStudent(students[0])
    };

    useEffect(() => {
        fetchStudents()
    }, []);

    const searchName = (name) => {
        axios.get(`http://localhost:3003/student?name=${name}`).then((response) => {
        setStudent(response.data[0]);
        }
        );
    };

    const sortStudent = (attr) => {
        axios.get(`http://localhost:3003/student/sort?key=${attr}`).then((response) =>
        setStudent(response.data[0]),
        setSortState(attr)
        );
    };

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:3003/student/${id}`).then((response) => {
            sortStudent(sortState);
        })
    };

    return (
        <BodyContainer>
            <div className="modal fade" id="editStudent" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="title">
                                Ch???nh s???a th??ng tin h???c vi??n {fname} {minit} {name}
                            </h5>
                            <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={(e) => {handleSend(e)}} className="was-validated">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="fname" className="col-form-label">H???</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.fname} className="form-control" id="fname" maxlength="15" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p h???!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="minit" className="col-form-label">T??n ?????m</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.minit} className="form-control" id="minit" maxlength="15"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lname" className="col-form-label">T??n</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.lname} className="form-control" id="lname" maxlength="15" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p t??n!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bdate" className="col-form-label">Ng??y sinh</label>
                                    <input type="date" onChange={(e) => handleEdit(e)} value={moment.utc(editData.bdate).format('YYYY-MM-DD')} placeholder="dd-mm-yyyy" className="form-control" id="bdate" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p ng??y sinh!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="col-form-label">?????a ch???</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.address} className="form-control" id="address" maxlength="100" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p ?????a ch???!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input type="email" onChange={(e) => handleEdit(e)} value={editData.email} className="form-control" id="email" maxlength="50" required/>
                                    <div className="invalid-feedback">Email kh??ng h???p l???</div>
                                </div>
                                <div className="modal-footer d-flex justify-content-around">
                                <button type="button" className="btn btn-secondary" 
                                        data-bs-dismiss="modal" 
                                        style={{backgroundColor: "grey", borderColor:"grey", width:"120px"}}>H???y</button>
                                <button type="submit" className="btn btn-primary"
                                        style={{ width:"120px"}}>L??u</button>
                                <button type="button" className="btn btn-primary"
                                        data-bs-dismiss="modal" 
                                        style={{ width:"120px"}}>Ho??n th??nh</button>
                                </div>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="deleteStudent" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{width:"400px", height: "350px"}}>
                        <div className="modal-body d-flex flex-column justify-content-around align-items-center font-weight-bold">
                        <div className="noti">X??a h???c vi??n {fname} {minit} {name} kh???i danh s??ch</div>
                        <BsExclamationCircle className="icon"/>
                        <div className="rework">B???n s??? kh??ng ???????c ho??n t??c</div>
                        </div>
                            <div className="modal-footer d-flex justify-content-around">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{backgroundColor: "grey", borderColor:"grey", width:"100px"}}>H???y</button>
                                <button type="button" className="btn btn-primary" onClick={() => deleteStudent(ID)} data-bs-dismiss="modal" style={{backgroundColor: "red", borderColor:"red", width:"100px"}}>X??a</button>
                            </div>
                    </div>
                </div>
            </div>

            <div className='tag'>
                <div>H???c vi??n</div>
            </div>
            <div className="tool" >
                <div className="dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                    S???p x???p theo
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('ID')}>M?? sinh vi??n</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('Name')}>T??n sinh vi??n</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('Bdate')}>Ng??y sinh</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('Address')}>?????a ch???</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('Email')}>Email</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortStudent('numCourse')}>S??? kh??a h???c</button></li>                
                </ul>
                </div>
                <Search>
                    <input  type="text" 
                            placeholder="Nh???p t??n h???c vi??n"         
                            defaultValue={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  searchName(event.target.value);
                                }
                            }}
                            />
                    <button className="search-button" onClick={() => searchName(message)}>
                        <BiSearch style={{color:"white"}}/>
                    </button>
                </Search>
            </div>
            <table>
                <thead>
                    <tr style={{
                            backgroundColor: 'white',
                        }}>
                        <th width='5%'>MSHV</th>      
                        <th width='5%'>H???</th>      
                        <th width='5%'>T??n ?????m</th>      
                        <th width='5%'>T??n</th>      
                        <th width='10%'>Ng??y sinh</th>      
                        <th width='100%'>?????a ch???</th> 
                        <th width='10%'>Email</th>      
                        <th width='10%'>S??? kh??a h???c</th> 
                        <th width='10%'>Ch???nh s???a</th>
                        <th width='10%'>X??a</th>     
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, idx) => (
                        <tr key={idx} style={{
                        }}>
                            <td width={'5%'} className='text-center'>{student.stu_ID}</td>
                            <td width={'5%'} className='text-center'>{student.fname}</td>
                            <td width={'5%'} className='text-center'>{student.minit}</td>
                            <td width={'5%'} className='text-center'>{student.lname}</td>
                            <td width={'10%'} className='text-center'>{moment.utc(student.bdate).format('YYYY-MM-DD')}</td>
                            <td width={'30%'}>{student.address}</td>
                            <td width={'10%'} >{student.email}</td>
                            <td width={'10%'} className="text-center">{student.totalCouse}</td>
                            <td width={'10%'} className="text-center">
                                <button className="btn btn-info" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#editStudent"
                                        onClick={() => {setID(student.stu_ID); 
                                                        setEditData({
                                                            fname: student.fname,
                                                            minit: student.minit,
                                                            lname: student.lname,
                                                            bdate: student.bdate,
                                                            address: student.address,
                                                            email: student.email
                                                        });
                                                        setFname(student.fname); 
                                                        setMinit(student.minit); 
                                                        setName(student.lname);}}
                                        ><FaUserEdit/></button>
                            </td>
                            <td width={'10%'} className="text-center">
                                <button className="btn btn-danger" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#deleteStudent"
                                        onClick={() => {setID(student.stu_ID); setFname(student.fname); setMinit(student.minit); setName(student.lname);}}
                                ><BsFillPersonXFill/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BodyContainer>
    )
}
export default Body