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
    COMPETITION_DETAILS_SUCCESS,
    COMPETITION_DETAILS_FAIL,
    COMPETITION_UPDATE_FAIL,
    COMPETITION_UPDATE_SUCCESS,
    COMPETITION_UPDATE_REQUEST,
} from "../constants/competitionConstants";
import axios from "axios";

export const listCompetitions =
    (type, isPrivate) => async (dispatch, getState) => {
        try {
            dispatch({
                type: COMPETITION_LIST_REQUEST,
            });

            const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auth.token}`,
                },
                params: {
                    isPrivate,
                    type,
                },
            };

            const {data} = await axios.get(`/api/competition`, config);

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

export const listCompetitionDetails = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.auth.token}`,
            },
        };

        const {data} = await axios.get(`/api/competition/${id}`, config);

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
            userLogin: {userInfo},
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

export const createCompetition =
    (competition) => async (dispatch, getState) => {
        try {
            dispatch({
                type: COMPETITION_CREATE_REQUEST,
            });

            const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auth.token}`,
                },
            };

            const {data} = await axios.post(
                `/api/competition/`,
                competition,
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

export const updateCompetition =
    (competition) => async (dispatch, getState) => {
        try {
            dispatch({
                type: COMPETITION_UPDATE_REQUEST,
            });

            const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.auth.token}`,
                },
            };

            const {data} = await axios.patch(
                `/api/competition/${competition.id}`,
                competition,
                config
            );

            dispatch({
                type: COMPETITION_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: COMPETITION_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
