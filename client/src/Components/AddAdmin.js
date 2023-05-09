import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, getOrgsAndAdmins } from "../redux/actions/Actions";

function AddAdmin({ visibility, setVisibility }) {
  const dispatch = useDispatch();
  const allOrgs = useSelector((state) => state.authReducer.allOrgs);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [message, setMessage] = useState();
  async function handleAdd() {
    if (name === "" || email === "" || username === "" || password === "") {
      setMessage("Please fill the inputs");
    } else if (orgId === "") {
      setMessage("Please select organization");
    } else {
      const data = await dispatch(
        addAdmin(name, email, username, password, orgId)
      );
      if (data.status === "ok") {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setOrgId("");
        setVisibility(false);
        setMessage("");
        dispatch(getOrgsAndAdmins())
      } else {
        setMessage(data.message);
      }
    }
  }
  if (visibility) {
    return (
      <div className="AddOrg">
        <div className="title">
          <h3>Add Admin</h3>
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
          <label>Organization</label>
          <select
            name="organization"
            id="organization"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
          >
            <option>Select an Option</option>
            {
            allOrgs.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
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
              setName("");
              setEmail("");
              setUsername("");
              setPassword("");
              setOrgId("");
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

export default AddAdmin;
