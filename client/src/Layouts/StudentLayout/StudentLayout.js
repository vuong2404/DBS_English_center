import Header from '../../Components/Header/Header';
import {Link} from'react-router-dom'

import logo from '../../assets/images/avatar.png';
import gvIcon from '../../assets/images/gv-icon.png'

function StudentLayout({ children }) {
  return (
    <div className="w-100 d-flex">
      <div className="border py-2" style={{ width: 250, minHeight: '100vh' }}>
        <div className="d-flex flex-column justify-content-center align-items-center border-bottom py-2">
          <img src={logo} alt="avatar" width="40px" className="rounded-circle border mr-2" />
          <span className="py-2 font-weight-bold">Minh Vương</span>
        </div>
        <ul className="w-100 p-0 mt-5">
          <li className="btn btn-outline-light d-flex align-items-center border-0 my-2">
            <Link to="/register">
              <img src={gvIcon} width="50px" alt="" />
              <span className="px-2 text-dark">Đăng kí khoá học</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-fill">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default StudentLayout;
