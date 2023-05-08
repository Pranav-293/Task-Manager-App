import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import About from "./About";
import SuperAdminSidebar from "./SuperAdminSidebar";
import Organizations from "./Organizations";
import Admins from "./Admins";

function SuperAdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok") {
          navigate("/login");
        }
      });
    });
  },[]);
  return (
    <div className="Home">
      <div className="HomeContainer">
          <SuperAdminSidebar />
        <div>
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
