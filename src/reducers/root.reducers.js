import { combineReducers } from "redux";
import authReducer from "./redux/auth/auth.slice";
import userReducer from "./redux/user/user.slice"

export const rootReducers = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer
});
