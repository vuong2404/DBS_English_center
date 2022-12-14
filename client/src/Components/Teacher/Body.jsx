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
import {} from 'bootstrap'

const Body = () =>{
    const [message, setMessage] = useState('');
    const [ID, setID] = useState('');
    const [fname, setFname] = useState('');
    const [minit, setMinit] = useState('');
    const [name, setName] = useState('');
    const [sortState, setSortState] = useState('')
    const [teachers, setTeacher] = useState([]);
    const [editData, setEditData] = useState({
        fname: '',
        minit: '',
        lname: '',
        bdate: '',
        address: '',
        email: '',
        salary: ''
    })
    const handleEdit = (e) => {
        const newData = {...editData};
        newData[e.target.id] = e.target.value;
        setEditData(newData);
        console.log(newData);
    }
    const handleSend = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3003/teacher/${ID}`,{
            fname: editData.fname,
            minit: editData.minit,
            lname: editData.lname,
            bdate: editData.bdate,
            address: editData.address,
            email: editData.email,
            salary: editData.salary
        }).then((response) => {
            sortTeacher(sortState)
        }
        )
    }
    const fetchTeachers = async() => {
        const response = await axios.get("http://localhost:3003/teacher")
        const teachers = response.data;
        setTeacher(teachers[0])
    };

    useEffect(() => {
        fetchTeachers()
    }, []);

    const searchName = (name) => {
        axios.get(`http://localhost:3003/teacher?name=${name}`).then((response) => {
        setTeacher(response.data[0]);
        }
        );
    };

    const sortTeacher = (attr) => {
        axios.get(`http://localhost:3003/teacher/sort?key=${attr}`).then((response) =>
        setTeacher(response.data[0]),
        setSortState(attr)
        );
    };


    return (
        <BodyContainer>
            <div className="modal fade" id="editTeacher" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="title">
                                Ch???nh s???a th??ng tin gi??o vi??n {fname} {minit} {name}
                            </h5>
                            <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={(e) => {handleSend(e)}} className="was-validated">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="fname" className="col-form-label">H???</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.fname} className="form-control" id="fname" maxLength="15" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p h???!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="minit" className="col-form-label">T??n ?????m</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.minit} className="form-control" id="minit" maxLength="15"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lname" className="col-form-label">T??n</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.lname} className="form-control" id="lname" maxLength="15" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p t??n!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bdate" className="col-form-label">Ng??y sinh</label>
                                    <input type="date" onChange={(e) => handleEdit(e)} value={moment.utc(editData.bdate).format('YYYY-MM-DD')} placeholder="dd-mm-yyyy" className="form-control" id="bdate" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p ng??y sinh!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="col-form-label">?????a ch???</label>
                                    <input type="text" onChange={(e) => handleEdit(e)} value={editData.address} className="form-control" id="address" maxLength="100" required/>
                                    <div className="invalid-feedback">Vui l??ng nh???p ?????a ch???!</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input type="email" onChange={(e) => handleEdit(e)} value={editData.email} className="form-control" id="email" maxLength="50" required/>
                                    <div className="invalid-feedback">Email kh??ng h???p l???</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salary" className="col-form-label">L????ng</label>
                                    <input type="number" onChange={(e) => handleEdit(e)} value={editData.salary} className="form-control" id="salary" max="100000000" required/>
                                    <div className="invalid-feedback">L????ng kh??ng h???p l???</div>
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
            <div className='tag'>
                <div>Gi??o vi??n</div>
            </div>
            <div className="tool" >
                <div className="dropdown">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                    S???p x???p theo
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={() => sortTeacher('ID')}>M?? gi??o vi??n</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortTeacher('Bdate')}>Ng??y sinh</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortTeacher('Address')}>?????a ch???</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortTeacher('Email')}>Email</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => sortTeacher('salary')}>L????ng</button></li>                
                </ul>
                </div>
                <Search>
                    <input  type="text" 
                            placeholder="Nh???p t??n gi??o vi??n"         
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
                        <th>MSGV</th>      
                        <th>H???</th>      
                        <th>T??n ?????m</th>      
                        <th>T??n</th>      
                        <th>Ng??y sinh</th>      
                        <th>?????a ch???</th> 
                        <th>Email</th>      
                        <th>L????ng</th> 
                        <th className="text-nowrap">Ch???nh s???a</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher, idx) => (
                        <tr key={idx} style={{
                        }}>
                            <td>{teacher.teacher_ID}</td>
                            <td>{teacher.fname}</td>
                            <td>{teacher.minit}</td>
                            <td>{teacher.lname}</td>
                            <td>{moment.utc(teacher.bdate).format('YYYY-MM-DD')}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.salary}</td>
                            <td className="text-center">
                                <button className="btn btn-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#editTeacher"
                                        onClick={() => {setID(teacher.teacher_ID); 
                                                        setEditData({
                                                            fname: teacher.fname,
                                                            minit: teacher.minit,
                                                            lname: teacher.lname,
                                                            bdate: teacher.bdate,
                                                            address: teacher.address,
                                                            email: teacher.email,
                                                            salary: teacher.salary
                                                        });
                                                        setFname(teacher.fname); 
                                                        setMinit(teacher.minit); 
                                                        setName(teacher.lname);}}
                                        ><FaUserEdit/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BodyContainer>
    )
}
export default Body