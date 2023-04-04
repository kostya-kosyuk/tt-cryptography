export enum AuthActionTypes {
    FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST",
    FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS",
    FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE",
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

export type AuthAction =
    | FetchAuthRequestAction
    | FetchAuthSuccessAction
    | FetchAuthFailureAction;
