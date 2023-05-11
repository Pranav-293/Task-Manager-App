import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasksAndUsers } from "../redux/actions/Actions";
import AssignTask from "./AssignTask";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Tasks() {
  useEffect(() => {
    console.log("Tasks page rendered");
  }, []);
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");
  const userId = useSelector((state) => state.authReducer.userId);
  const AllTasks = useSelector((state) => state.taskReducer.allTasks).filter(
    (task) => task.createdBy === userId
  );
  const AllUsers = useSelector((state) => state.taskReducer.allUsers).filter(
    (user) => user.reporting === userId
  );
  async function handleDelete(id) {
    const data = await dispatch(deleteTask(id));
    if (data.status === "ok") dispatch(getTasksAndUsers);
  }
  function getUser(userId) {
    const user = AllUsers.filter((user) => user.id === userId);
    if (user.length === 0) {
      return "";
    }
    return user[0].name;
  }
  return (
    <div className="Organizations">
      <div className="Heading">
        <div className="leftHeading">
          Tasks <div className="bracket"> ({AllTasks.length})</div>
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
        {searchText !== ""
          ? AllTasks.filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            ).map((task) => (
              <div key={task.id} className="card">
                <div className="title">{task.name}</div>
                <div className="text">{task.detail}</div>
                <div className="delete">
                  <div className="userName">
                    {AllUsers.filter((user) => user.id === task.userId)[0]}
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))
          : AllTasks.map((task) => (
              <div key={task.id} className="card">
                <div className="title">{task.name}</div>
                <div className="text">{task.detail}</div>
                <div className="delete">
                  <div className="userName">{getUser(task.userId)}</div>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      <AssignTask
        visibility={visibility}
        setVisibility={setVisibility}
      ></AssignTask>
      <button
        className="addOrgButton normalButton"
        onClick={() => setVisibility(!visibility)}
      >
        Assign Task
      </button>
    </div>
  );
}

export default Tasks;
