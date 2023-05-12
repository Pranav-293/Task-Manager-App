import React from "react";
import TodoTasks from "./TodoTasks";
import { useSelector, useDispatch } from "react-redux";
import AssignTask from "./AssignTask";
import AddTask from "./AddTask";
import { useState } from "react";
import InProgressTask from "./InProgressTask";
import CompletedTask from "./CompleteTask";
import { markInProgress, getTasksAndUsers, deleteTask, completeTask } from "../redux/actions/Actions";
function TaskDashboard({allTasks=[]}) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.authReducer.Role);
  const [visibility, setVisibility] = useState(false);
  async function moveToInprogress(id) {
    const data = await dispatch(markInProgress(id));
    console.log(data);
    if (data.status === "ok") dispatch(getTasksAndUsers());
  }
  async function DeleteTask(id){
    const data = await dispatch(deleteTask(id));
    console.log(data)
    if(data.status==='ok') dispatch(getTasksAndUsers());
  }
  async function CompleteTask(id){
    const data = await dispatch(completeTask(id));
    if(data.status==='ok') dispatch(getTasksAndUsers());
  }
  return (
    <div className="kanban">
        <div className="taskStack">
          <div className="taskHeading">
            <div className="redDot"></div> Todo
          </div>
          <div className="addTask">
              <button onClick={() => setVisibility(!visibility)}>+</button>
            </div>
            <div className="assignTask">
              {userRole === "Admin" ? (
                <AssignTask
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              ) : (
                <AddTask
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              )}
            </div>
          <div className="taskComponent">
            {allTasks
              .filter(
                (task) => task.status === "todo"
              )
              .map((task) => (
                <TodoTasks
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                  user={task.userId}
                  creator={task.createdBy}
                  func={moveToInprogress}
                  funcName="Move to InProgress"
                  css = "MoveTodo"
                />
              ))}
          </div>
        </div>
        <div className="taskStack">
          <div className="taskHeading">
            <div className="greyDot"></div> InProgress
          </div>
          <div className="taskComponent">{allTasks
              .filter(
                (task) =>  task.status === "in-progress"
              )
              .map((task) => (
                <TodoTasks
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                  user={task.userId}
                  creator={task.createdBy}
                  func={CompleteTask}
                  funcName="Complete"
                  css = "Move"
                />
              ))}</div>
        </div>
        <div className="taskStack">
          <div className="taskHeading">
            <div className="greenDot"></div> Complete
          </div>
          <div className="taskComponent">{allTasks
              .filter(
                (task) => task.status === "completed"
              )
              .map((task) => (
                <TodoTasks
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  details={task.detail}
                  user={task.userId}
                  creator={task.createdBy}
                  func={DeleteTask}
                  funcName="Delete"
                  css = "DeleteTodo"
                />
              ))}</div>
        </div>
      </div>
  );
}

export default TaskDashboard;
