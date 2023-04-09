import { Box, IconButton, ListItem, Typography } from "@mui/material";
import { Message } from "../../types/Message";
import { DeleteOutline, SettingsApplications, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store";
import { CurrentMessageActionTypes } from "../../store/actions/currentMessageAction";
import { useAppDispatch } from "../../store/hooks";
import { deleteMessageAction } from "../../store/asyncActions.ts/messageAsyncActions";
import { decrypt } from "../../utils/cryptoMethods";

type Props = {
    msg: Message,
};

export const MessageItem = ({msg}: Props) => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();

    const {message, cipherMethod, cipherKey} = msg;
    const [isVisible, setVisible] = useState(false);

    const visibleContent = useMemo(() => {
        if (isVisible) {
            const decrypted = decrypt(cipherMethod, message, cipherKey);

            return decrypted;
        } else {
            return message;
        }
    }, [isVisible, message]);

    const handleToggleSettings = () => {
        dispatch({
            type: CurrentMessageActionTypes.SET_MESSAGE,
            payload: msg
        });
    };

    const handleDeleteMessage = () => {
        dispatch(deleteMessageAction(msg.id));
    };

    const handleToggleVisibility = () => {
        setVisible(prev => !prev);
    };

    return (
        <ListItem
            sx={{
                padding: 0,
                pt: '16px',
                pb: '16px',
                display: 'flex',
                justifyContent: 'center',
                '&:nth-last-of-type(odd)': {
                    backgroundColor: '#444654',
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    m: 'auto',
                    maxWidth: '750px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',

                    '&:hover div': {
                        opacity: 1,
                        transform: 'translateX(-5px)',
                    },
                }}
            >
                <Typography
                    maxWidth={'calc(100% - 40px - 20px)'}
                    sx={{
                        color: '#d1d5db',
                        overflowWrap: 'break-word',
                        ml: '20px',
                    }}
                >
                    {visibleContent}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',

                        opacity: 0,
                        transform: 'translateX(20px)',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    <IconButton
                        onClick={handleToggleSettings}
                        size="small"
                    >
                        <SettingsApplications />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={handleToggleVisibility}
                    >
                        {isVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton
                        onClick={handleDeleteMessage}
                        size="small"
                    >
                        <DeleteOutline/>
                    </IconButton>
                </Box>
            </Box>
        </ListItem>
    );
};