import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getTasksAndUsers } from "../redux/actions/Actions";
import TaskDashboard from "./TaskDashboard";
function UserDashboard() {
  const [searchText, setSearchText] = useState("");
  const [isPersonalTask, setIsPersonalTask] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let allTasks = useSelector((state) => state.taskReducer.allTasks);
  const userId = useSelector((state) => state.authReducer.userId);
  if (searchText.trim() !== "") {
    allTasks = allTasks.filter((task) =>
      task.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );
  }
  useEffect(() => {
    console.log("User Dashboard Rendered");
    fetch("/auth-api/isAuthenticated").then((res) => {
      res.json().then((data) => {
        if (data.status !== "ok" || data.user.level !== "User") {
          navigate("/login");
        } else {
          dispatch(getTasksAndUsers());
        }
      });
    });
  }, []);
  return (
    <div className="Home">
      <div className="UserHome">
        <div className="dashboard">
          <div className="header">
            <div className="headerContent">
              <div className="headerButtons">
                <button className={isPersonalTask?"":"active"} onClick={ () => setIsPersonalTask(false)}>All</button>
                <button className={!isPersonalTask?"":"active"} onClick={() => setIsPersonalTask(true)}>Personal</button>
              </div>
              <div className="search">
                <input
                  type="text"
                  placeholder="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          {
            !isPersonalTask?
            <TaskDashboard
            allTasks={allTasks.filter((task) => task.userId === userId)}
          />
          :
          <TaskDashboard
            allTasks={allTasks.filter((task) => (task.userId === userId && task.createdBy === userId))}
          />
          }
          
        </div>
        <About />
      </div>
    </div>
  );
}

export default UserDashboard;
