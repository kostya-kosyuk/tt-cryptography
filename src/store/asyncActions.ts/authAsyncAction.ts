import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { AuthAction, AuthActionTypes } from "../actions/authAction";
import { login, logout, registration } from "../../api/auth";
import getErrors from "../../utils/getErrors";
import { removeCookie } from "../../utils/removeCookie";

export const loginAction = (userLogin: string, password: string): ThunkAction<
    void,
    RootState,
    null,
    AuthAction
> => async (dispatch) => {
    dispatch({
        type: AuthActionTypes.FETCH_AUTH_REQUEST,
        payload: {
            isLoading: true,
            errorMsg: [],
        }
    });

    try {
        const response = await login(userLogin, password);

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_SUCCESS,
            payload: {
                isLoading: false,
                login: userLogin,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_FAILURE,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};

export const registerAction = (userLogin: string, password: string): ThunkAction<
    void,
    RootState,
    null,
    AuthAction
> => async (dispatch) => {
    dispatch({
        type: AuthActionTypes.FETCH_AUTH_REQUEST,
        payload: {
            isLoading: true,
            errorMsg: [],
        }
    });

    try {
        const response = await registration(userLogin, password);

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_SUCCESS,
            payload: {
                isLoading: false,
                login: userLogin,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_FAILURE,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};

export const logoutAction = (): ThunkAction<
    void,
    RootState,
    null,
    AuthAction
> => async (dispatch) => {
    dispatch({
        type: AuthActionTypes.FETCH_AUTH_REQUEST,
        payload: {
            isLoading: true,
            errorMsg: [],
        }
    });

    try {
        const response = await logout();

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        removeCookie();

        dispatch({
            type: AuthActionTypes.LOG_OUT,
            payload: {
                isLoading: false,
                login: '',
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_FAILURE,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};