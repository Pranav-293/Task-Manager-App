import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getTasksAndUsers } from "../redux/actions/Actions";
import TaskDashboard from "./TaskDashboard";
function AssignedTasksDashboard() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  let allTasks = useSelector((state) => state.taskReducer.allTasks);
  const userId = useSelector((state) => state.authReducer.userId);
  const allUsers = useSelector((state) => state.taskReducer.allUsers);
  const [user, setUser] = useState("");
  if (searchText.trim() !== "") {
    allTasks = allTasks.filter((task) =>
      task.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );
  }
  useEffect(() => {
    console.log("Assigned Tasks Dashboard Rendered");
    dispatch(getTasksAndUsers());
  }, []);
  return (
    <div className="AssignedTasksHome">
      <div className="UserHome">
        <div className="dashboard">
          <div className="header">
            <div className="headerContent">
              <div className="headerButtons">
                <div className="filter">
                  <label>Filter by user</label>
                  <select
                    name="user"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  >
                    <option value="">All</option>
                    {allUsers
                      .filter((user) => user.reporting === userId)
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>
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
          {user === "" ? (
            <TaskDashboard
              allTasks={allTasks.filter((task) => task.createdBy === userId)}
            />
          ) : (
            <TaskDashboard
              allTasks={allTasks.filter(
                (task) => task.createdBy === userId && task.userId === user
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignedTasksDashboard;
