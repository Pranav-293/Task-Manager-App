import { SET_TASKS_AND_USERS } from "../actions/ActionTypes";

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

        default:
            return state;
    }
  }

  export default taskReducer;