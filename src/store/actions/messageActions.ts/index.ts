import { DeleteMessageAction } from "./deleteMessageActions";
import { GetMessageAction } from "./getMessageActions"
import { PatchMessageAction } from "./patchMessageActions";
import { PostMessageAction } from "./postMessageActions";

type MessageAction =
    | GetMessageAction
    | PostMessageAction
    | PatchMessageAction
    | DeleteMessageAction

export default MessageAction;