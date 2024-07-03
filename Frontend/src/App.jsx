import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PrivateRoutes from './routes/PrivateRoutes';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Layout from './layout/Layout';
import ComposeMail from './pages/ComposeMail';
import Inbox from './pages/Inbox';
import Sentbox from './pages/Sentbox';
import Starred from './pages/Starred';
import Bin from './pages/Bin';



function App() {
  


  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path='/signin' element={<Signin />} />
      <Route path="/" element={<PrivateRoutes />}>
      <Route path="/" element={<Layout />}>
      <Route path="/compose-mail" element={<ComposeMail />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/sentbox" element={<Sentbox />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/bin" element={<Bin />} />
      </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
