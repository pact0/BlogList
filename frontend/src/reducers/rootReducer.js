import { combineReducers } from "redux";
import userReducer from "./userReducer";
import blogReducer from "./blogReducer";

const reducer = combineReducers({ user: userReducer, blogs: blogReducer });

export default reducer;
