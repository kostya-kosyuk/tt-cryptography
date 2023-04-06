import { Message } from "../../../types/Message"

export enum GetMessageActionTypes {
    GET_MESSAGE_REQUEST = "GET_MESSAGE_REQUEST",
    GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS",
    GET_MESSAGE_FAILURE = "GET_MESSAGE_FAILURE",
}

interface GetMessageRequestAction {
    type: GetMessageActionTypes.GET_MESSAGE_REQUEST
    payload: {
        isLoading: boolean,
    }
}

interface GetMessageSuccessAction {
    type: GetMessageActionTypes.GET_MESSAGE_SUCCESS
    payload: {
        isLoading: boolean,
        messages: Message[],
        errorMsg: string[],
    }
}

interface GetMessageFailureAction {
    type: GetMessageActionTypes.GET_MESSAGE_FAILURE
    payload: {
        isLoading: boolean,
        errorMsg: string[],
    }
}

export type GetMessageAction =
    | GetMessageRequestAction
    | GetMessageSuccessAction
    | GetMessageFailureAction;