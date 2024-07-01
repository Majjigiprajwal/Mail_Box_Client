import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './routes/PrivateRoutes';

import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';


function App() {
  


  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path='/signin' element={<Signin />} />
      <Route path="/" element={<PrivateRoutes />}>
      <Route path="/simple" element={<h1>hello</h1>} />
      </Route>
  
    </Routes>
    </>
  );
}

export default App;
