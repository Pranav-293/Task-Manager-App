import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path='/*' element={<App/>}/>
      <Route path ='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
