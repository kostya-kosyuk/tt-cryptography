import { Box, IconButton, Input, Typography } from "@mui/material";
import MessageList from "../MessageList/MessageList";
import SendIcon from '@mui/icons-material/Send'
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMessageAction } from "../../store/asyncActions.ts/messageAsyncActions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store";
import { CurrentMessageActionTypes } from "../../store/actions/currentMessageAction";

export const Chat = () => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();
    const messages = useAppSelector(state => state.messages.messages);
    const error = useAppSelector(state => state.messages.errorMsg);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        dispatch(getMessageAction());
    }, []);

    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleFormSubmit(event);
        }
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        const newMessage = {
            message: inputValue
        };

        dispatch({
            type: CurrentMessageActionTypes.SET_MESSAGE,
            payload: newMessage
        });

        setInputValue('');
    };

    return (
        <>
            <Box
                sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: '#343541',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
            }}>
                {messages.length !== 0
                    && <MessageList messages={messages} />}

            </Box>
            <Box
                width={'100vw'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    backgroundImage: 'linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)',
                    zIndex: 1
                }}
            >
                <Box
                    component="form"
                    noValidate
                    width={'750px'}
                    margin={'auto'}
                    onSubmit={(event) => handleFormSubmit(event)}
                >
                    <Box
                        sx={{
                            position: 'relative',
                        }}
                    >
                        <Input
                            required
                            fullWidth
                            autoComplete='false'
                            type="submit"
                            placeholder="Message is required"
                            value={inputValue}
                            onChange={handleChangeMessage}
                            onKeyDown={(event) => handleKeyDown(event)}
                            sx={{
                                mb: 1,
                                maxHeight: '200px',
                                overflow: 'hidden',
                                backgroundColor: '#40414F',
                                borderRadius: '8px',
                                padding: 1,
                                caretColor: 'white',
                                boxShadow: 2,
                                color: 'white',
                                '& textarea': {
                                    padding: '4px, 0px, 0px',
                                    pr: '30px',
                                    overflow: 'hidden',
                                },
                            }}
                            multiline
                            disableUnderline
                        />
                        <IconButton
                            type="submit"
                            sx={{
                                position: 'absolute',
                                right: 0,
                                bottom: '6px',
                                borderRadius: '40%'
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                    <Typography
                        color={'error.main'}
                        textAlign={'center'}
                        fontSize={12}
                        sx={{
                            mb: 1
                        }}
                    >
                        {error}
                    </Typography>
                    <Typography
                        color={'rgba(255, 255, 255, 0.5)'}
                        textAlign={'center'}
                        fontSize={14}
                        sx={{
                            mb: 1
                        }}
                    >
                        Write your message, choose cipher method and cipher key
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
