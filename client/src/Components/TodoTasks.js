import React from "react";
import { useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { getTasksAndUsers, updateTask } from "../redux/actions/Actions";

/**
 * Task Component
 * @param {string} name - Name of the task
 * @param {string} details - Details of the task
 * @param {string} id - id of the task
 * @param {string} user - id of the user to which task is assigned
 * @param {string} creator - id of the task creator
 * @param {function} func - The function to move the task to next stage or delete it
 * @param {string} funcName - Name of the function (to be displayed on the button)
 * @returns {Component} - A component which shows a task in form of a card
 */
function TodoTasks({ name, details, id, user, creator, func , funcName, css }) {

  const dispatch = useDispatch();

  const AllUsers = useSelector((state) => state.taskReducer.allUsers);
  const userId = useSelector(state => state.authReducer.userId);
  const [isEditable, setIsEditable] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskDetails, setTaskDetails] = useState(details);

  /**
   * Function to get name of the user from it's id
   * @param {string} userId - id of the user
   * @returns {string} - name of the user
   */
  function getUser(userId) {
    const user = AllUsers.filter((user) => user.id === userId);
    if (user.length === 0) {
      return "";
    }
    return user[0].name;
  }

  /**
   * Function to edit a task's detail
   * @param {string} id - id of the task which needs to be updated
   * @param {string} detail - updated detail
   */
  async function handleOnClick(id, detail) {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      const data = await dispatch(updateTask(id, detail));
      console.log(data);
      if(data.status==='ok'){
        dispatch(getTasksAndUsers());
      }
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
          <button className="Edit" onClick={() => handleOnClick(id, taskDetails)}>
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
