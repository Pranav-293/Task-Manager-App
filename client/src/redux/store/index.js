import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

// Configuration of redux store
 const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store;