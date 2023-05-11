import { SET_TASKS_AND_USERS, SET_ALL_TASKS } from "../actions/ActionTypes";

const initialState = {
    allUsers:[],
    allTasks:[],
  };

  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TASKS_AND_USERS:
        return{
          ...state,
          allUsers : action.payload.users,
          allTasks : action.payload.tasks
    };

    case SET_ALL_TASKS:
      return{
        ...state,
        allTasks: action.payload
      }

        default:
            return state;
    }
  }

  export default taskReducer;