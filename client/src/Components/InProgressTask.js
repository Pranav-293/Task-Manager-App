import React from "react";
import { useState } from "react";
import { completeTask} from "../redux/actions/Actions";
import { useDispatch } from "react-redux";
import { getAllTasks } from "../redux/actions/Actions";
function InProgressTask({ name, details, id, user = "" }) {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskDetails, setTaskDetails] = useState(details);
  async function CompleteTask(){
    const data = await dispatch(completeTask(id));
    if(data.status==='ok') dispatch(getAllTasks());
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
      {(user!=="")?<div className="taskUser">{user}</div>:<div></div>}
      <div className="taskInputs"><input
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
            <div>
              {taskDetails}
            </div>
          )}
        </div></div>
      <div className="taskBottomButtons">
        <button className="Edit" onClick={handleOnClick}>{isEditable ? "Save" : "Edit"}</button>
        <button className="Move" onClick = {CompleteTask}>Complete</button>
      </div>
    </div>
  );
}

export default InProgressTask;
