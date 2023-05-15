import { React, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import About from "./About";
import Users from "./Users";
import AdminSideBar from "./AdminSideBar";
import { getTasksAndUsers } from "../redux/actions/Actions";
import { useDispatch } from "react-redux";
import AssignedTasksDashboard from "./AssignedTasksDashboard";

/**
 * Admin Dashboard Component
 * @returns {Component} - Admin Dashboard where he can see and manage all the users and their tasks
 */
function AdminDashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //If the user is not logged in redirect it to the login page
  useEffect(() => {
    fetch("/auth-api/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok" || data.user.level!=="Admin") {
          navigate("/login");
        } else {
          dispatch(getTasksAndUsers());
        }
      });
    });
  });
  
  return (
    <div className="Home">
      <div className="HomeContainer">
        <AdminSideBar />
        <div className="main">
          <Routes>
            <Route path="/users" element={<Users></Users>}></Route>
            <Route path="/tasks" element={<AssignedTasksDashboard/>}></Route>
          </Routes>
        </div>
        <About />
      </div>
    </div>
  );
}

export default AdminDashboard;
