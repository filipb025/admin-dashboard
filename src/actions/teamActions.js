import {
  TEAM_LIST_FAIL,
  TEAM_LIST_REQUEST,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_RESET,
  TEAM_DETAILS_REQUEST,
  TEAM_DETAILS_SUCCESS,
  TEAM_DETAILS_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
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

export const listTeamDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };
    const { data } = await axios.get(`/api/team/${id}`, config);
    dispatch({
      type: TEAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTeam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEAM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    await axios.delete(`/api/team/${id}`, config);

    dispatch({
      type: TEAM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TEAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
