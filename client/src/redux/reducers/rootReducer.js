import { combineReducers } from "redux";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

// Root reducer
export default combineReducers(
    {
        authReducer,
        taskReducer
    }
);