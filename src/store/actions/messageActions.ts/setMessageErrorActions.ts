export enum SetMessageErrorActionTypes {
    SET_MESSAGE_ERROR = "SET_MESSAGE_ERROR",
}

interface SetMessageErrorAction  {
    type: SetMessageErrorActionTypes.SET_MESSAGE_ERROR,
    payload: {
        error: string
    }
}

export type MessageErrorAction =
    | SetMessageErrorAction