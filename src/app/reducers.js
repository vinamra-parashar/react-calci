import { combineReducers } from "redux";
import calculatorReducer from "../features/calculator/calculatorSlice";
import toggleReducer from "../features/toggle/toggleSlice";
import authReducer from "../features/auth/authSlice";

const reducers = combineReducers({
  calculator: calculatorReducer,
  toggle: toggleReducer,
  auth: authReducer,
});

export default reducers;
