import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, getTasksAndUsers } from "../redux/actions/Actions";

function AddUser({ visibility, setVisibility }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  async function handleAdd() {
    if (name === "" || email === "" || username === "" || password === "") {
      setMessage("Please fill the inputs");
    }else {
      const data = await dispatch(
        addUser(name, email, username, password)
      );
      if (data.status === "ok") {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setVisibility(false);
        setMessage("");
        dispatch(getTasksAndUsers())
      } else {
        setMessage(data.message);
      }
    }
  }
  if (visibility) {
    return (
      <div className="AddOrg">
        <div className="title">
          <h3>Add User</h3>
        </div>
        <div className="AddInput">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="message">{message}</div>
        <div className="formButtons">
          <button
            className="closeButton normalButton"
            onClick={() => {
              setName("");
              setEmail("");
              setUsername("");
              setPassword("");
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

export default AddUser;
