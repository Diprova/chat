import { combineReducers } from "redux";
import authReducer from "./redux/auth/auth.slice";

console.log(authReducer,'----authReducer-')

export const rootReducers = combineReducers({
  auth: authReducer.reducer,
});
