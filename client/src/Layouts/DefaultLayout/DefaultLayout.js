import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidsebar';

function DefaultLayout({ children }) {
  return (
    <div className="w-100 d-flex">
      <Sidebar />
      <div className="flex-fill">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
