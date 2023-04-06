import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { GetMessageAction, GetMessageActionTypes } from "../actions/messageActions.ts/getMessageActions";
import { createMessage, deleteMessage, getMessages, patchMessage } from "../../api/message";
import getErrors from "../../utils/getErrors";
import { PostMessageAction, PostMessageActionTypes } from "../actions/messageActions.ts/postMessageActions";
import { NewMessage } from "../../types/Message";
import { PatchMessageAction, PatchMessageActionTypes } from "../actions/messageActions.ts/patchMessageActions";
import { DeleteMessageAction, DeleteMessageActionTypes } from "../actions/messageActions.ts/deleteMessageActions";

export const getMessageAction = (): ThunkAction<
    void,
    RootState,
    null,
    GetMessageAction
> => async (dispatch) => {
    dispatch({
        type: GetMessageActionTypes.GET_MESSAGE_REQUEST,
        payload: {
            isLoading: true,
        }
    })

    try {
        const response = await getMessages();

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        const messages = await response.json();

        dispatch({
            type: GetMessageActionTypes.GET_MESSAGE_SUCCESS,
            payload: {
                isLoading: false,
                messages,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: GetMessageActionTypes.GET_MESSAGE_REQUEST,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};

export const postMessageAction = (newMsg: NewMessage): ThunkAction<
    void,
    RootState,
    null,
    PostMessageAction
> => async (dispatch) => {
    dispatch({
        type: PostMessageActionTypes.POST_MESSAGE_REQUEST,
        payload: {
            isLoading: true,
        }
    })

    try {
        const response = await createMessage(newMsg);

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        const message = await response.json();

        dispatch({
            type: PostMessageActionTypes.POST_MESSAGE_SUCCESS,
            payload: {
                isLoading: false,
                message,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: PostMessageActionTypes.POST_MESSAGE_REQUEST,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};

export const patchMessageAction = (id: number, newMsg: NewMessage): ThunkAction<
    void,
    RootState,
    null,
    PatchMessageAction
> => async (dispatch) => {
    dispatch({
        type: PatchMessageActionTypes.PATCH_MESSAGE_REQUEST,
        payload: {
            isLoading: true,
        }
    })

    try {
        const response = await patchMessage(id, newMsg);

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        const {updatedMessage} = await response.json();

        dispatch({
            type: PatchMessageActionTypes.PATCH_MESSAGE_SUCCESS,
            payload: {
                isLoading: false,
                message: updatedMessage,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: PatchMessageActionTypes.PATCH_MESSAGE_REQUEST,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};


export const deleteMessageAction = (id: number): ThunkAction<
    void,
    RootState,
    null,
    DeleteMessageAction
> => async (dispatch) => {
    dispatch({
        type: DeleteMessageActionTypes.DELETE_MESSAGE_REQUEST,
        payload: {
            isLoading: true,
        }
    })

    try {
        const response = await deleteMessage(id);

        if (!response.ok) {
            const errors = await response.json();
            throw errors;
        }

        dispatch({
            type: DeleteMessageActionTypes.DELETE_MESSAGE_SUCCESS,
            payload: {
                isLoading: false,
                id,
                errorMsg: [],
            }
        });
    } catch (error: any) {
        const errorMsg = getErrors(error);

        dispatch({
            type: DeleteMessageActionTypes.DELETE_MESSAGE_REQUEST,
            payload: {
                isLoading: false,
                errorMsg,
            },
        });
    }
};