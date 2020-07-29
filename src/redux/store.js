import { createStore, combineReducers, applyMiddleware } from "redux";
// import { compose } from "redux";
import thunk from "redux-thunk";

//Reducers
import authedUser from "./reducers/authedUser";
import users from "./reducers/users";
import questions from "./reducers/questions";
//Middleware
import logger from "./middleware/logger";

const initialState = {};

const middleware = [thunk, logger];

const reducers = combineReducers({
  authedUser,
  users,
  questions,
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)

  // Google Chrome extension - Redux DevTools
  // compose(
  //   applyMiddleware(...middleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
