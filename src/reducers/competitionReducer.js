import {
  COMPETITION_LIST_FAIL,
  COMPETITION_LIST_REQUEST,
  COMPETITION_LIST_SUCCESS,
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
    default:
      return state;
  }
};
