import React from "react";
import { useState } from "react";
import { completeTask} from "../redux/actions/Actions";
import { useDispatch } from "react-redux";
import { getTasksAndUsers } from "../redux/actions/Actions";
import { useSelector } from "react-redux";
function InProgressTask({ name, details, id, user, creator, admin }) {
  const dispatch = useDispatch();
  const AllUsers = useSelector((state) => state.taskReducer.allUsers);
  const [isEditable, setIsEditable] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskDetails, setTaskDetails] = useState(details);
  const userId = useSelector(state => state.authReducer.userId);
  function getUser(userId) {
    const user = AllUsers.filter((user) => user.id === userId);
    if (user.length === 0) {
      return "";
    }
    return user[0].name;
  }
  async function CompleteTask(){
    const data = await dispatch(completeTask(id));
    if(data.status==='ok') dispatch(getTasksAndUsers());
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
