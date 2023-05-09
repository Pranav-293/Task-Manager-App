import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import About from "./About";
import SuperAdminSidebar from "./SuperAdminSidebar";
import Organizations from "./Organizations";
import Admins from "./Admins";
import { useDispatch } from "react-redux";
import { getOrgsAndAdmins } from "../redux/actions/Actions";

function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok") {
          navigate("/login");
        }
      });
    });
    dispatch(getOrgsAndAdmins());
  },[]);
  return (
    <div className="Home">
      <div className="HomeContainer">
          <SuperAdminSidebar/>
        <div className="main">
          <Routes>
            <Route path="/admins" element={<Admins></Admins>}></Route>
            <Route
              path="/organizations"
              element={<Organizations></Organizations>}
            ></Route>
          </Routes>
        </div>
        <About />
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
