import { Message } from "../../../types/Message"

export enum PostMessageActionTypes {
    POST_MESSAGE_REQUEST = "POST_MESSAGE_REQUEST",
    POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS",
    POST_MESSAGE_FAILURE = "POST_MESSAGE_FAILURE",
}

interface PostMessageRequestAction {
    type: PostMessageActionTypes.POST_MESSAGE_REQUEST
    payload: {
        isLoading: boolean,
    }
}

interface PostMessageSuccessAction {
    type: PostMessageActionTypes.POST_MESSAGE_SUCCESS
    payload: {
        isLoading: boolean,
        message: Message,
        errorMsg: string[],
    }
}

interface PostMessageFailureAction {
    type: PostMessageActionTypes.POST_MESSAGE_FAILURE
    payload: {
        isLoading: boolean,
        errorMsg: string[],
    }
}

export type PostMessageAction =
    | PostMessageRequestAction
    | PostMessageSuccessAction
    | PostMessageFailureAction;