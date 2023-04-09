import { DeleteMessageAction } from "./deleteMessageActions";
import { GetMessageAction } from "./getMessageActions"
import { PatchMessageAction } from "./patchMessageActions";
import { PostMessageAction } from "./postMessageActions";
import { MessageErrorAction } from "./setMessageErrorActions";

type MessageAction =
    | GetMessageAction
    | PostMessageAction
    | PatchMessageAction
    | DeleteMessageAction
    | MessageErrorAction

export default MessageAction;