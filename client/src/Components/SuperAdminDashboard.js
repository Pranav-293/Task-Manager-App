import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import About from "./About";
import SuperAdminSidebar from "./SuperAdminSidebar";
import Organizations from "./Organizations";
import Admins from "./Admins";
import { useDispatch } from "react-redux";
import { getOrgsAndAdmins, getTasksAndUsers } from "../redux/actions/Actions";
import OrganizationTree from "./OrganizationTree";

/**
 * Super Admin Component
 * @returns {Component} - Component to see and manage Admins and Organizations
 */
function SuperAdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If the user is not logged in redirect to login page
  // else fetch all organizations and admins
  useEffect(() => {
    fetch("/auth-api/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok" || data.user.level!=="Super Admin") {
          navigate("/login");
        }
      });
    });
    dispatch(getOrgsAndAdmins());
    dispatch(getTasksAndUsers());
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
            <Route
              path="/organization-tree"
              element={<OrganizationTree></OrganizationTree>}
            ></Route>
          </Routes>
        </div>
        <About />
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
