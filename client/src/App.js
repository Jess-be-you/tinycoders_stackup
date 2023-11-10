
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Login from './components/account/Login';
import Home from './components/home/Home';

function App() {
  return (
    <BrowserRouter>
      <div style={{marginTop:64 }} >
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
