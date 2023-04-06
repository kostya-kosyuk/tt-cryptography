import { Message } from "../../../types/Message"

export enum PatchMessageActionTypes {
    PATCH_MESSAGE_REQUEST = "PATCH_MESSAGE_REQUEST",
    PATCH_MESSAGE_SUCCESS = "PATCH_MESSAGE_SUCCESS",
    PATCH_MESSAGE_FAILURE = "PATCH_MESSAGE_FAILURE",
}

interface PatchMessageRequestAction {
    type: PatchMessageActionTypes.PATCH_MESSAGE_REQUEST
    payload: {
        isLoading: boolean,
    }
}

interface PatchMessageSuccessAction {
    type: PatchMessageActionTypes.PATCH_MESSAGE_SUCCESS
    payload: {
        isLoading: boolean,
        message: Message,
        errorMsg: string[],
    }
}

interface PatchMessageFailureAction {
    type: PatchMessageActionTypes.PATCH_MESSAGE_FAILURE
    payload: {
        isLoading: boolean,
        errorMsg: string[],
    }
}

export type PatchMessageAction =
    | PatchMessageRequestAction
    | PatchMessageSuccessAction
    | PatchMessageFailureAction;