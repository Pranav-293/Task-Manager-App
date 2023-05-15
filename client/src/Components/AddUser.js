import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, getTasksAndUsers } from "../redux/actions/Actions";

/**
 * Component to add a new user
 * @param {boolean} visibility - The component will be visible if set to true, otherwise hidden
 * @param {function} setVisibility - The function to change the value of visibility boolean
 * @returns A component to add a new user
 */
function AddUser({ visibility, setVisibility }) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  // Sets the error message to empty on change of name, email, username or password field
  useEffect(() => {
    setMessage("");
  },[name,email,username,password]);

  /**
   * Function to check if the entered email is a valid email of not
   * @param {string} email
   * @returns {boolean} true if the email is valid, otherwise false
   */
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /**
   * Function to add a new user
   */
  async function handleAdd() {
    if (name.trim() === "" || email.trim() === "" || username.trim() === "" || password.trim() === "") {
      setMessage("Please fill the inputs");
    }else if(!isValidEmail(email)){
      setMessage("Please enter a valid email");
    }
    else {
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
