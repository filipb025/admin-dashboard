import {
  COMPETITION_LIST_FAIL,
  COMPETITION_LIST_REQUEST,
  COMPETITION_LIST_SUCCESS,
  COMPETITION_LIST_RESET,
  COMPETITION_DELETE_REQUEST,
  COMPETITION_DELETE_SUCCESS,
  COMPETITION_DELETE_FAIL,
} from "../constants/competitionConstants";

export const competitionListReducer = (
  state = { competitions: [] },
  action
) => {
  switch (action.type) {
    case COMPETITION_LIST_REQUEST:
      return { loading: true };
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
