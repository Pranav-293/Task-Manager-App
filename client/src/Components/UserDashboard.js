import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/actions/Actions";
import TaskDashboard from "./TaskDashboard";
function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTasks = useSelector(state => state.taskReducer.allTasks);
  const userId = useSelector(state => state.authReducer.userId);
  useEffect(() => {
    console.log("User Dashboard Rendered")
    fetch("/auth-api/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok" || data.user.level !== "User") {
          navigate("/login");
        } else {
          dispatch(getAllTasks());
        }
      });
    });
  },[]);
  return (
    <div className="Home">
      <div className="UserHome">
      <TaskDashboard allTasks={allTasks.filter(task => task.userId === userId)} ></TaskDashboard>
        <About/>
      </div>
    </div>
  );
}

export default UserDashboard;
