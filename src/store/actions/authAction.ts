export enum AuthActionTypes {
    FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST",
    FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS",
    FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE",
    SET_LOGIN = "SET_LOGIN",
}

interface FetchAuthRequestAction {
    type: AuthActionTypes.FETCH_AUTH_REQUEST;
    payload: {
        isLoading: boolean;
        errorMsg: string[];
    };
}

interface FetchAuthSuccessAction {
    type: AuthActionTypes.FETCH_AUTH_SUCCESS;
    payload: {
        isLoading: boolean;
        login: string,
        errorMsg: string[];
    };
}

interface FetchAuthFailureAction {
    type: AuthActionTypes.FETCH_AUTH_FAILURE;
    payload: {
        isLoading: boolean;
        errorMsg: string[];
    };
}

interface SetLoginAction {
    type: AuthActionTypes.SET_LOGIN;
    payload: {
        login: string;
    }
}

export type AuthAction =
    | FetchAuthRequestAction
    | FetchAuthSuccessAction
    | FetchAuthFailureAction
    | SetLoginAction;
