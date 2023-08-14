import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
    compose(applyMiddleware(thunk))
);

export default store;
