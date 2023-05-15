import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getTasksAndUsers } from "../redux/actions/Actions";
import TaskDashboard from "./TaskDashboard";

/**
 * User Dashboard Component
 * @returns {Component} - A component where users can see all the tasks assigned to them
 */
function UserDashboard() {

  // If the user is not logged in redirect to login page
  // else fetch tasks and user's data from database
  useEffect(() => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [isPersonalTask, setIsPersonalTask] = useState(false);
  let allTasks = useSelector((state) => state.taskReducer.allTasks);
  const userId = useSelector((state) => state.authReducer.userId);

  // Filter the list of tasks based on search input
  if (searchText.trim() !== "") {
    allTasks = allTasks.filter((task) =>
      task.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );
  }

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
