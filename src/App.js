
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AccountMenu from './components/navbar/AccountMenu';
import Navbar from './components/navbar/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register'


function App() {
  return (
<div className="App">
      {/* <ToastContainer theme='colored' position='top-center'></ToastContainer> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
        <Route path='/createuser' element={<Register/>}></Route> 
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
