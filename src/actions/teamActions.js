import {
  TEAM_LIST_FAIL,
  TEAM_LIST_REQUEST,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_RESET,
} from "../constants/teamConstants";
import axios from "axios";

export const listTeams = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEAM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    const { data } = await axios.get("/api/team", config);
    dispatch({
      type: TEAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
