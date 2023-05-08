import {React, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import About from './About';
function UserDashboard() {const navigate = useNavigate();
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
          <div className="sidebar">Sidebar</div>
           <div>
            User
           </div>
           <About/>
          </div>
        </div>
     )
}

export default UserDashboard