import React from "react";
import { useState } from "react";
import {  useSelector } from "react-redux";
function TodoTasks({ name, details, id, user, creator, func , funcName, css }) {
  const AllUsers = useSelector((state) => state.taskReducer.allUsers);
  const userId = useSelector(state => state.authReducer.userId);
  const [isEditable, setIsEditable] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskDetails, setTaskDetails] = useState(details);
  function getUser(userId) {
    const user = AllUsers.filter((user) => user.id === userId);
    if (user.length === 0) {
      return "";
    }
    return user[0].name;
  }
  function handleOnClick() {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      //Todo
      //update task
      setIsEditable(false);
    }
  }
  return (
    <div className="taskCard">
      <div className="taskCardTop">
        {user !== userId ? (
          <div className="taskUser">{getUser(user)}</div>
        ) : (
            <div></div>
        )}
        {user === creator ? <div className="taskCreator"> Self </div> : <div/>}
      </div>

      <div className="taskInputs">
        <input
          className="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={isEditable ? false : true}
        ></input>
        <div className="taskDetails">
          {isEditable ? (
            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              disabled={isEditable ? false : true}
            ></textarea>
          ) : (
            <div>{taskDetails}</div>
          )}
        </div>
        <div className="taskBottomButtons">
          <button className="Edit" onClick={handleOnClick}>
            {isEditable ? "Save" : "Edit"}
          </button>
          <button className= {css} onClick={() => func(id)}>
            {funcName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoTasks;
