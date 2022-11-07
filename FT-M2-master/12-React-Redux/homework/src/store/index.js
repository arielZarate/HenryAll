import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

//ver esto
//const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_;

const store = createStore(
  rootReducer,
  //composeEn
  applyMiddleware(thunk)
);

export default store;
