import { SET_TASKS_AND_USERS, SET_NODES_AND_LINKS } from "../actions/ActionTypes";

//Initial State
const initialState = {
    allUsers:[],
    allTasks:[],
    allNodes:[],
    allLinks:[],
  };

  //Task Reducer
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TASKS_AND_USERS:
        return{
          ...state,
          allUsers : action.payload.users,
          allTasks : action.payload.tasks,
          allNodes: action.payload.nodes,
          allLinks: action.payload.links,
    };

    case SET_NODES_AND_LINKS:
      return{
        ...state,
        allNodes: action.payload.nodes,
        allLinks: action.payload.links,
      };

        default:
            return state;
    }
  }

  export default taskReducer;