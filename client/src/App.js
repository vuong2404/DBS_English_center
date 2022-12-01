import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './Routes';

function App() {
  return (
   
       <Router>
          <Routes>
              {
                routes.map((item, index) => {
                  let Page = item.component;
                  return (<Route key={index} path={item.path} element ={ <Page />} />)
                })
              }
          </Routes>
       </Router>
  
  );
}

export default App;
