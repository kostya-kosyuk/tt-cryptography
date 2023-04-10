import { AuthAction, AuthActionTypes } from "../actions/authAction";

type authState = {
    isLoading: boolean,
    login: string,
    errorMsg: string[],
};

const initialState: authState = {
    isLoading: false,
    login: '',
    errorMsg: []
};

export const authReducer = (
    state: authState = initialState,
    action: AuthAction
): authState => {
    switch (action.type) {
        case AuthActionTypes.FETCH_AUTH_REQUEST:
            return {
                ...state,
                ...action.payload
            };
        case AuthActionTypes.FETCH_AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case AuthActionTypes.FETCH_AUTH_FAILURE:
            return {
                ...state,
                ...action.payload
            };
        case AuthActionTypes.SET_LOGIN:
            return {
                ...state,
                ...action.payload
            };
        case AuthActionTypes.LOG_OUT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
