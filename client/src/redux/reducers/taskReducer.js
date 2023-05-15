import { SET_TASKS_AND_USERS } from "../actions/ActionTypes";

//Initial State
const initialState = {
    allUsers:[],
    allTasks:[],
  };

  //Task Reducer
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