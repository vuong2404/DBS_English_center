import logo from '../../assets/images/avatar.png';
import courseIcon from '../../assets/images/course-icon.png'
import gvIcon from '../../assets/images/gv-icon.png'
import hvIcon from '../../assets/images/hv-icon.png'

function Sidebar() {

    console.log(window.location)
  return (
    <div className="border py-2" style={{ width: 250, minHeight: '100vh' }}>
      <div className="d-flex flex-column justify-content-center align-items-center border-bottom py-2">
        <img src={logo} alt="avatar" width="40px" className="rounded-circle border mr-2" />
        <span className="py-2 font-weight-bold">Minh Vương</span>
      </div>
      <ul className="w-100 p-0 mt-5">
        <li className='btn btn-outline-light d-flex align-items-center border-0 my-2'>
            <img src={courseIcon} width='50px' alt = ''/>
            <span className='px-2 text-dark'>Khoá học</span>
        </li>
        <li className='btn btn-outline-light d-flex align-items-center border-0 my-2'>
            <img src={hvIcon} width='50px' alt = ''/>
            <span className='px-2 text-dark'>Học viên</span>
        </li>
        <li className='btn btn-outline-light d-flex align-items-center border-0 my-2'>
            <img src={gvIcon} width='50px' alt = ''/>
            <span className='px-2 text-dark'>Giáo viên</span>
        </li>
      </ul>
      
    </div>
  );
}

export default Sidebar;
