import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => console.log("STATE IDK", store.getState()));

export default store;
