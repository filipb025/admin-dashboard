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
import axios from "axios";

export const listCompetitionTeam = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPETITION_TEAM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    const { data } = await axios.get("/api/competition-team", config);
    dispatch({
      type: COMPETITION_TEAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_TEAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCompetitionTeamDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMPETITION_TEAM_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.auth.token}`,
        },
      };

      const { data } = await axios.get(`/api/competition-team/${id}`, config);

      dispatch({
        type: COMPETITION_TEAM_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPETITION_TEAM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCompetitionTeam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPETITION_TEAM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    await axios.delete(`/api/competition-team/${id}`, config);

    dispatch({
      type: COMPETITION_TEAM_DELETE_REQUEST,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_TEAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCompetitionTeam =
  (competitionTeams) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPETITION_TEAM_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.auth.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/competition-team/`,
        competitionTeams,
        config
      );

      dispatch({
        type: COMPETITION_TEAM_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPETITION_TEAM_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateCompetitionTeam =
  (competitionTeams) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPETITION_TEAM_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.auth.token}`,
        },
      };

      const { data } = await axios.patch(
        `/api/competition-team/${competitionTeams.id}`,
        competition,
        config
      );

      dispatch({
        type: COMPETITION_TEAM_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMPETITION_TEAM_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
