import React from "react";
import TodoTasks from "./TodoTasks";
import { useSelector } from "react-redux";
import AssignTask from "./AssignTask";
import AddTask from "./AddTask";
import { useState } from "react";
import InProgressTask from "./InProgressTask";
import CompletedTask from "./CompleteTask";
function TaskDashboard({allTasks=[]}) {
  const userRole = useSelector((state) => state.authReducer.Role);
  const [visibility, setVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");
  if(searchText!==""){
    allTasks = allTasks.filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()));
  }
  return (
    <div className="dashboard">
      <div className="header">
        <div className="headerContent">
          Header
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
      <div className="kanban">
        <div className="taskStack">
          <div className="taskHeading">
            <div className="redDot"></div> Todo
          </div>
          <div className="addTask">
              <button onClick={() => setVisibility(!visibility)}>+</button>
            </div>
            <div className="assignTask">
              {userRole === "Admin" ? (
                <AssignTask
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              ) : (
                <AddTask
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              )}
            </div>
          <div className="taskComponent">
            {allTasks
              .filter(
                (task) => task.status === "todo"
              )
              .map((task) => (
                <TodoTasks
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                />
              ))}
          </div>
        </div>
        <div className="taskStack">
          <div className="taskHeading">
            <div className="greyDot"></div> InProgress
          </div>
          <div className="taskComponent">{allTasks
              .filter(
                (task) =>  task.status === "in-progress"
              )
              .map((task) => (
                <InProgressTask
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                />
              ))}</div>
        </div>
        <div className="taskStack">
          <div className="taskHeading">
            <div className="greenDot"></div> Complete
          </div>
          <div className="taskComponent">{allTasks
              .filter(
                (task) => task.status === "completed"
              )
              .map((task) => (
                <CompletedTask
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                />
              ))}</div>
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
