import { Message } from "../../types/Message";
import MessageAction from "../actions/messageActions.ts";
import { DeleteMessageActionTypes } from "../actions/messageActions.ts/deleteMessageActions";
import { GetMessageActionTypes } from "../actions/messageActions.ts/getMessageActions";
import { PatchMessageActionTypes } from "../actions/messageActions.ts/patchMessageActions";
import { PostMessageActionTypes } from "../actions/messageActions.ts/postMessageActions";

type MessageState = {
    isLoading: boolean,
    messages: Message[],
    errorMsg: string[],
};

const initialState: MessageState = {
    isLoading: false,
    messages: [],
    errorMsg: []
};

export const messagesReducer = (
    state: MessageState = initialState,
    action: MessageAction
): MessageState => {
    const {payload} = action;
        switch (action.type) {
            case GetMessageActionTypes.GET_MESSAGE_REQUEST:
                return {
                    ...state,
                    ...action.payload,
                };
            case GetMessageActionTypes.GET_MESSAGE_SUCCESS:
                return {
                    ...state,
                    isLoading: payload.isLoading,
                    messages: action.payload.messages,
                    errorMsg: []
                };
            case GetMessageActionTypes.GET_MESSAGE_FAILURE:
                return {
                    ...state,
                    ...action.payload,
                };

            case PostMessageActionTypes.POST_MESSAGE_REQUEST:
                return {
                    ...state,
                    ...action.payload,
                };
            case PostMessageActionTypes.POST_MESSAGE_SUCCESS:
                return {
                    ...state,
                    isLoading: payload.isLoading,
                    messages: [...state.messages, action.payload.message],
                    errorMsg: []
                };
            case PostMessageActionTypes.POST_MESSAGE_FAILURE:
                return {
                    ...state,
                    ...action.payload,
                };

            case PatchMessageActionTypes.PATCH_MESSAGE_REQUEST:
                return {
                    ...state,
                    ...action.payload,
                };
            case PatchMessageActionTypes.PATCH_MESSAGE_SUCCESS:
                const updatedMessage = action.payload.message;
                const newMessages = state.messages.map((msg) =>
                    msg.id === updatedMessage.id
                        ? { ...msg, ...updatedMessage }
                        : msg
                );

                return {
                    ...state,
                    isLoading: payload.isLoading,
                    messages: newMessages,
                    errorMsg: []
                };
            case PatchMessageActionTypes.PATCH_MESSAGE_FAILURE:
                return {
                    ...state,
                    ...action.payload,
                };

            case DeleteMessageActionTypes.DELETE_MESSAGE_REQUEST:
                return {
                    ...state,
                    ...action.payload,
                };
            case DeleteMessageActionTypes.DELETE_MESSAGE_SUCCESS:
                return {
                    ...state,
                    isLoading: payload.isLoading,
                    messages: state.messages.filter(({id}) => id !== action.payload.id),
                    errorMsg: []
                };
            case DeleteMessageActionTypes.DELETE_MESSAGE_FAILURE:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                return state;
        }
    };