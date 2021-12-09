import {
  TEAM_LIST_FAIL,
  TEAM_LIST_REQUEST,
  TEAM_LIST_RESET,
  TEAM_LIST_SUCCESS,
} from "../constants/teamConstants";

export const teamListReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case TEAM_LIST_REQUEST:
      return { loading: true, teams: [] };
    case TEAM_LIST_SUCCESS:
      return { loading: false, teams: action.payload };
    case TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case TEAM_LIST_RESET:
      return { teams: [] };
    default:
      return state;
  }
};
