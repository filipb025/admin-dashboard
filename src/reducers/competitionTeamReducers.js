import {
  COMPETITION_TEAM_LIST_REQUEST,
  COMPETITION_TEAM_LIST_FAIL,
  COMPETITION_TEAM_LIST_SUCCESS,
  COMPETITION_TEAM_LIST_RESET,
  COMPETITION_TEAM_DETAILS_FAIL,
  COMPETITION_TEAM_DETAILS_REQUEST,
  COMPETITION_TEAM_DETAILS_SUCCESS,
  COMPETITION_TEAM_DELETE_FAIL,
  COMPETITION_TEAM_DELETE_REQUEST,
  COMPETITION_TEAM_DELETE_SUCCESS,
  COMPETITION_TEAM_CREATE_FAIL,
  COMPETITION_TEAM_CREATE_REQUEST,
  COMPETITION_TEAM_CREATE_SUCCESS,
  COMPETITION_TEAM_CREATE_RESET,
  COMPETITION_TEAM_UPDATE_REQUEST,
  COMPETITION_TEAM_UPDATE_RESET,
  COMPETITION_TEAM_UPDATE_FAIL,
  COMPETITION_TEAM_UPDATE_SUCCESS,
} from "../constants/competitionTeamConstants";

export const competitionTeamListReducer = (
  state = { competitionTeams: [] },
  action
) => {
  switch (action.type) {
    case COMPETITION_TEAM_LIST_REQUEST:
      return { loading: true, competitionTeams: [] };
    case COMPETITION_TEAM_LIST_SUCCESS:
      return { loading: false, competitionTeams: action.payload };
    case COMPETITION_TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_TEAM_LIST_RESET:
      return { competitionTeams: [] };
    default:
      return state;
  }
};

export const competitionTeamDetailsReducer = (
  state = { competitionTeams: {} },
  action
) => {
  switch (action.type) {
    case COMPETITION_TEAM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMPETITION_TEAM_DETAILS_SUCCESS:
      return { loading: false, competitionTeams: action.payload };
    case COMPETITION_TEAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const competitionTeamDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPETITION_TEAM_DELETE_REQUEST:
      return { loading: true };
    case COMPETITION_TEAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPETITION_TEAM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const competitionTeamCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPETITION_TEAM_CREATE_REQUEST:
      return { loading: true };
    case COMPETITION_TEAM_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        competitionTeams: action.payload,
      };
    case COMPETITION_TEAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_TEAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const competitionTeamUpdateReducer = (
  state = { competitionTeams: {} },
  action
) => {
  switch (action.type) {
    case COMPETITION_TEAM_UPDATE_REQUEST:
      return { loading: true };
    case COMPETITION_TEAM_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        competitionTeams: action.payload,
      };
    case COMPETITION_TEAM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_TEAM_UPDATE_RESET:
      return { competitionTeams: {} };
    default:
      return state;
  }
};
