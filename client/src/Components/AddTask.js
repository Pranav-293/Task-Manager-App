import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { assignTask, getTasksAndUsers } from "../redux/actions/Actions";

/**
 * Component to add a new task
 * @param {boolean} visibility - The component will be visible if set to true, otherwise hidden
 * @param {function} setVisibility - The function to change the value of visibility boolean
 * @returns A component to add a new task
 */
function AddTask({ visibility, setVisibility }) {

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [message, setMessage] = useState("");

   // Sets the error message to empty on change of name or details field
   useEffect(() => {
    setMessage("");
  },[name,detail]);

  const dispatch = useDispatch();

  /**
   * Function to add a new task
   */
  async function handleAdd() {
    if (name === "" || detail === "" ) {
      setMessage("Please fill the inputs");
    }
    else {
      const data = await dispatch(assignTask(name, detail));
      console.log(data);
      if(data.status === "ok") {
        dispatch(getTasksAndUsers());
        setName("");
      setDetail("");
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
        <div className="title">Add Task</div>
        <div className="AddInput">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Details</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
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
            Add
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default AddTask;
