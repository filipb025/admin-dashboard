import {
  TEAM_DETAILS_FAIL,
  TEAM_DETAILS_REQUEST,
  TEAM_DETAILS_SUCCESS,
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

export const teamDetailsReducer = (state = { team: {} }, action) => {
  switch (action.type) {
    case TEAM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TEAM_DETAILS_SUCCESS:
      return { loading: false, team: action.payload };
    case TEAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
