import { combineReducers } from "@reduxjs/toolkit";
import CreateUserReducer from "./UserSlice"
import LoginUserReducer from "./Login/LoginSlice"
const userReducer = combineReducers({
  create: CreateUserReducer,
  login : LoginUserReducer
 
});

export default userReducer;