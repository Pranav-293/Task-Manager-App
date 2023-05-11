import { React, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import About from "./About";
import Tasks from "./Tasks";
import Users from "./Users";
import AdminSideBar from "./AdminSideBar";
import { getTasksAndUsers } from "../redux/actions/Actions";
import { useDispatch } from "react-redux";
function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            <Route path="/tasks" element={<Tasks></Tasks>}></Route>
          </Routes>
        </div>
        <About />
      </div>
    </div>
  );
}

export default AdminDashboard;
