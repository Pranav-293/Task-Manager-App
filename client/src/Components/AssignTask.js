import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTask, getTasksAndUsers } from "../redux/actions/Actions";

/**
 * Component to assign a new task
 * @param {boolean} visibility - The component will be visible if set to true, otherwise hidden
 * @param {function} setVisibility - The function to change the value of visibility boolean
 * @returns A component to assign a new task
 */
function AssignTask({ visibility, setVisibility }) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const adminId = useSelector(state => state.authReducer.userId);
  const AllUsers = useSelector(state => state.taskReducer.allUsers).filter(user => user.reporting===adminId);

  /**
   * Function to assign the new task
   */
  async function handleAdd() {
    if (name === "" || details === "" ) {
      setMessage("Please fill the inputs");
    } else if(userId===""){
        setMessage("Please select a user");
    }
    else {
      const data = await dispatch(assignTask(name, details,userId));
      if(data.status === "ok") {
        dispatch(getTasksAndUsers());
        setName("");
      setDetails("");
      setUserId("");
      setVisibility(false);
      setMessage("");
      }else{
        setMessage(data.message)
      }
    }
  }
  
  if (visibility) {
    return (
      <div className="AddOrg">
        <div className="title">Assign Task</div>
        <div className="AddInput">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <label>User</label>
          <select
            name="user"
            id="user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option>Select an Option</option>
            {
            AllUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))
            }
          </select>
        </div>

        <div className="message">{message}</div>
        <div className="formButtons">
          <button
            className="closeButton normalButton"
            onClick={() => {
              setVisibility(false);
              setMessage("");
            }}
          >
            close
          </button>
          <button className="addButton normalButton" onClick={handleAdd}>
            Assign
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default AssignTask;
