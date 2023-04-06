export enum DeleteMessageActionTypes {
    DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST",
    DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS",
    DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE",
}

interface DeleteMessageRequestAction {
    type: DeleteMessageActionTypes.DELETE_MESSAGE_REQUEST
    payload: {
        isLoading: boolean,
    }
}

interface DeleteMessageSuccessAction {
    type: DeleteMessageActionTypes.DELETE_MESSAGE_SUCCESS
    payload: {
        isLoading: boolean,
        id: number,
        errorMsg: string[],
    }
}

interface DeleteMessageFailureAction {
    type: DeleteMessageActionTypes.DELETE_MESSAGE_FAILURE
    payload: {
        isLoading: boolean,
        errorMsg: string[],
    }
}

export type DeleteMessageAction =
    | DeleteMessageRequestAction
    | DeleteMessageSuccessAction
    | DeleteMessageFailureAction;