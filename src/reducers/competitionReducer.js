import {
  COMPETITION_LIST_FAIL,
  COMPETITION_LIST_REQUEST,
  COMPETITION_LIST_SUCCESS,
  COMPETITION_LIST_RESET,
  COMPETITION_DELETE_REQUEST,
  COMPETITION_DELETE_SUCCESS,
  COMPETITION_DELETE_FAIL,
  COMPETITION_CREATE_REQUEST,
  COMPETITION_CREATE_SUCCESS,
  COMPETITION_CREATE_FAIL,
  COMPETITION_CREATE_RESET,
  COMPETITION_DETAILS_REQUEST,
  COMPETITION_DETAILS_SUCCESS,
  COMPETITION_DETAILS_FAIL,
  COMPETITION_UPDATE_REQUEST,
  COMPETITION_UPDATE_SUCCESS,
  COMPETITION_UPDATE_FAIL,
  COMPETITION_UPDATE_RESET,
} from "../constants/competitionConstants";

export const competitionListReducer = (
  state = { competitions: [] },
  action
) => {
  switch (action.type) {
    case COMPETITION_LIST_REQUEST:
      return { loading: true, competitions: [] };
    case COMPETITION_LIST_SUCCESS:
      return { loading: false, competitions: action.payload };
    case COMPETITION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_LIST_RESET:
      return { competitions: [] };
    default:
      return state;
  }
};

export const competitionDetailsReducer = (
  state = { competition: {} },
  action
) => {
  switch (action.type) {
    case COMPETITION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMPETITION_DETAILS_SUCCESS:
      return { loading: false, competition: action.payload };
    case COMPETITION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const competitionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPETITION_DELETE_REQUEST:
      return { loading: true };
    case COMPETITION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPETITION_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const competitionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPETITION_CREATE_REQUEST:
      return { loading: true };
    case COMPETITION_CREATE_SUCCESS:
      return { loading: false, success: true, competition: action.payload };
    case COMPETITION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const competitionUpdateReducer = (
  state = { competition: {} },
  action
) => {
  switch (action.type) {
    case COMPETITION_UPDATE_REQUEST:
      return { loading: true };
    case COMPETITION_UPDATE_SUCCESS:
      return { loading: false, success: true, competition: action.payload };
    case COMPETITION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPETITION_UPDATE_RESET:
      return { competition: {} };
    default:
      return state;
  }
};
