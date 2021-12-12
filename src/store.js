import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  competitionListReducer,
  competitionDeleteReducer,
  competitionCreateReducer,
  competitionDetailsReducer,
  competitionUpdateReducer,
} from "./reducers/competitionReducer";
import {
  teamListReducer,
  teamDetailsReducer,
  teamDeleteReducer,
  teamCreateReducer,
  teamUpdateReducer,
} from "./reducers/teamReducers";
import {
  competitionTeamListReducer,
  competitionTeamDetailsReducer,
  competitionTeamDeleteReducer,
  competitionTeamCreateReducer,
  competitionTeamUpdateReducer,
} from "./reducers/competitionTeamReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  competitionDetails: competitionDetailsReducer,
  competitionList: competitionListReducer,
  competitionDelete: competitionDeleteReducer,
  competitionCreate: competitionCreateReducer,
  competitionUpdate: competitionUpdateReducer,
  competitionTeamList: competitionTeamListReducer,
  competitionTeamDetails: competitionTeamDetailsReducer,
  competitionTeamDelete: competitionTeamDeleteReducer,
  competitionTeamCreate: competitionTeamCreateReducer,
  competitionTeamUpdate: competitionTeamUpdateReducer,
  teamList: teamListReducer,
  teamDetails: teamDetailsReducer,
  teamDelete: teamDeleteReducer,
  teamCreate: teamCreateReducer,
  teamUpdate: teamUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
