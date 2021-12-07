import {
  COMPETITION_DELETE_FAIL,
  COMPETITION_DELETE_REQUEST,
  COMPETITION_DELETE_SUCCESS,
  COMPETITION_LIST_FAIL,
  COMPETITION_LIST_REQUEST,
  COMPETITION_LIST_SUCCESS,
  COMPETITION_CREATE_REQUEST,
  COMPETITION_CREATE_FAIL,
  COMPETITION_CREATE_SUCCESS,
  COMPETITION_CREATE_RESET,
  COMPETITION_DETAILS_SUCCESS,
  COMPETITION_DETAILS_FAIL,
  COMPETITION_DETAILS_REQUEST,
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

export const listCompetitionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPETITION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/competition/${id}`);

    dispatch({
      type: COMPETITION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCompetition = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPETITION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.auth.token}`,
      },
    };

    await axios.delete(`/api/competition/${id}`, config);

    dispatch({
      type: COMPETITION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCompetition = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPETITION_CREATE_REQUEST,
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
      `/api/competition/`,
      {
        name: "test",
        startDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        endDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        private: "",
      },
      config
    );

    dispatch({
      type: COMPETITION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPETITION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
