import { NewMessage, Message } from "../../types/Message";

export enum CurrentMessageActionTypes {
    SET_MESSAGE = "SET_MESSAGE",
    CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

interface SetMessageAction {
    type: CurrentMessageActionTypes.SET_MESSAGE;
    payload: NewMessage | Message,
}

interface ClearMessageAction {
    type: CurrentMessageActionTypes.CLEAR_MESSAGE;
}

export type CurrentMessageAction =
    | SetMessageAction
    | ClearMessageAction;
