import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { AuthAction, AuthActionTypes } from "../actions/authAction";
import { login } from "../../api/auth";

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
        const errorMsg = [];
        if (error['errors']) {
            const messages = error.errors.errors.map((err: { msg: string; }) => {
                return err.msg;
            });

            errorMsg.push(...messages);
        } else {
            if (error['message']) {
                errorMsg.push(error['message']);
            }
        }

        dispatch({
            type: AuthActionTypes.FETCH_AUTH_FAILURE,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};
