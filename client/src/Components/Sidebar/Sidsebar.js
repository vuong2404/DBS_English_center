import {Link} from'react-router-dom'

import logo from '../../assets/images/avatar.png';
import courseIcon from '../../assets/images/course-icon.png'
import gvIcon from '../../assets/images/gv-icon.png'
import hvIcon from '../../assets/images/hv-icon.png'

function Sidebar() {

  let path = window.location.pathname ;
  return (
    <div className="border py-2" style={{ width: 250, minHeight: '100vh' }}>
      <div className="d-flex flex-column justify-content-center align-items-center border-bottom py-2">
        <img src={logo} alt="avatar" width="40px" className="rounded-circle border mr-2" />
        <span className="py-2 font-weight-bold">Minh Vương</span>
      </div>
      <ul className="w-100 p-0 mt-5">
        <li className={`px-3 ${path ==='/courses' && 'bg-tab-sidebar'} d-flex align-items-center border-0 my-2 rounded`}>
            <Link to = '/courses'>
              <img src={courseIcon} width='50px' alt = ''/>
              <span className='px-2 text-dark'>Khoá học</span>
            </Link>
        </li>
        <li className={`px-3 ${path ==='/student' && 'bg-tab-sidebar'} d-flex align-items-center border-0 my-2 rounded`}>
            <Link to ='/student'>
              <img src={hvIcon} width='50px' alt = ''/>
              <span className='px-2 text-dark'>Học viên</span>
            </Link>
        </li>
        <li className={`px-3 ${path ==='/teacher' && 'bg-tab-sidebar'} d-flex align-items-center border-0 my-2 rounded`}>
            <Link to = '/teacher'>
              <img src={gvIcon} width='50px' alt = ''/>
              <span className='px-2 text-dark'>Giáo viên</span>
            </Link>
        </li>

        <li className={`px-3 ${path ==='/register-form' && 'bg-tab-sidebar'} d-flex align-items-center border-0 my-2 rounded`}>
            <Link to = '/register-form'>
              <img src={gvIcon} width='50px' alt = ''/>
              <span className='px-2 text-dark'>Phiếu đăng kí</span>
            </Link>
        </li>

        <li className={`px-3 ${path ==='/register' && 'bg-tab-sidebar'} d-flex align-items-center border-0 my-2 rounded`}>
            <Link to = '/register'>
              <img src={gvIcon} width='50px' alt = ''/>
              <span className='px-2 text-dark'>Đăng kí Khoá học</span>
            </Link>
        </li>
      </ul>
      
    </div>
  );
}

export default Sidebar;
