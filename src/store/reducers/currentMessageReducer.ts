import { NewMessage } from "../../types/Message";
import { CurrentMessageAction, CurrentMessageActionTypes } from "../actions/currentMessageAction";

type CurrentMessageState = {
    message: NewMessage | null,
};

const initialState: CurrentMessageState = {
    message: null,
};

export const currentMessageReducer = (
    state: CurrentMessageState = initialState,
    action: CurrentMessageAction
): CurrentMessageState => {
    switch (action.type) {
        case CurrentMessageActionTypes.SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case CurrentMessageActionTypes.CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
            };

        default:
            return state;
    }
};