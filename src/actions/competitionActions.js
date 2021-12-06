import {
  COMPETITION_LIST_FAIL,
  COMPETITION_LIST_REQUEST,
  COMPETITION_LIST_SUCCESS,
} from "../constants/competitionConstants";
import axios from "axios";

export const listCompetitions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPETITION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    const { data } = await axios.get(`/api/competition`, config);

    dispatch({
      type: COMPETITION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
