import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';


function Header() {
  return (
    <div className="border w-100 py-2 px-5 d-flex align-items-center">
      <div className="m-auto">
        <img alt='' src={logo} height="56" />
      </div>
      <div className='d-flex align-items-center'>
        <FontAwesomeIcon icon={faBell} className ='mx-3' size='lg'/>
        <DropdownButton title="Admin" variant='outline-primary' >
          <Dropdown.Item as="button">Quản lý tài khoản</Dropdown.Item>
          <Dropdown.Item as="button">Đăng xuất</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

export default Header;
