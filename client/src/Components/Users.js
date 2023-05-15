import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/actions/Actions";
import AddUser from "./AddUser";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Users Component
 * @returns {Component} - A component to see and manage users under an admin
 */
function Users() {
  
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);
  const userId = useSelector(state => state.authReducer.userId);
  const AllUsers = useSelector((state) => state.taskReducer.allUsers).filter(user => user.reporting===userId);
  const [searchText, setSearchText] = useState("");
  
  return (
    <div className="Organizations">
      <div className="Heading">
        <div className="leftHeading">
          Users <div className="bracket"> ({AllUsers.length})</div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="scrollable">
        {
          (searchText==="") ? (AllUsers.map((user) => (
            <div key={user.id} className="card">
              <div className="title">{user.name}</div>
              <div className="text">{user.email}</div>
              <div className="delete">
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="deleteButton"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))) : (
            AllUsers.filter(item => (item.name).toLowerCase().includes(searchText.trim().toLowerCase())).map((user) => (
              <div key={user.id} className="card">
                <div className="title">{user.name}</div>
                <div className="text">{user.email}</div>
                <div className="delete">
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))
          )
        }
      </div>

      <AddUser
        visibility={visibility}
        setVisibility={setVisibility}
      ></AddUser>
      <button
        className="addOrgButton normalButton"
        onClick={() => setVisibility(!visibility)}
      >
        Add User
      </button>
    </div>
  );
}

export default Users;
