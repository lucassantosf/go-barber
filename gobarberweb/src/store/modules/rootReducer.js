import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./auth/reducer";

export default combineReducers({ auth, user });
