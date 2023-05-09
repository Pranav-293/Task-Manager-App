import {React, useEffect} from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import About from './About';
import Tasks from "./Tasks"
import Users from "./Users"
import AdminSideBar from './AdminSideBar';
function AdminDashboard() {const navigate = useNavigate();
  useEffect(()=>{
     fetch("/isAuthenticated").then(res => {res.json().then(data => {
        if(data.status!=='ok'){
          navigate("/login");
        }
     })
     })});
   return (
      <div className="Home">
        <div className="HomeContainer">
        <AdminSideBar/>
         <div>
           Admin
         </div>
         <div className="main">
          <Routes>
            <Route path="/users" element={<Users></Users>}></Route>
            <Route
              path="/tasks"
              element={<Tasks></Tasks>}
            ></Route>
          </Routes>
        </div>
         <About/>
        </div>
      </div>
   )
}

export default AdminDashboard
