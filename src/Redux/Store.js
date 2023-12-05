import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { EmployeeReducer } from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer=combineReducers({employee:EmployeeReducer})
const compstore=configureStore({reducer:rootreducer,middleware:[thunk,logger]})
export default compstore;