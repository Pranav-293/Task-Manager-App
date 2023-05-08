import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Components/Login';
import SuperAdminDashboard from './Components/SuperAdminDashboard';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import store from './redux/store';
import {Provider} from "react-redux";
const style = import("./App.css");


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route exact path='/*' element={<App/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path="/super-admin-dashboard/*" element={<SuperAdminDashboard/>} />
      <Route path="/admin-dashboard/*" element={<AdminDashboard/>} />
      <Route path="/user-dashboard/*" element={<UserDashboard/>} />
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
