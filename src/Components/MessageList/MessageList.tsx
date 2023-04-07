import { Box, List } from "@mui/material";
import { Message } from "../../types/Message";
import { MessageItem } from "../MessageItem/MessageItem";
import React from 'react';

type Props = {
    messages: Message[],
};


export const MessageList = ({messages}: Props) => {
    return (
        <List disablePadding sx={{
            zIndex: 1,
        }}>
            {messages.map(msg => <MessageItem key={msg.id} msg={msg} />)}
            <Box
                sx={{
                    position: 'relative',
                    height: '80px',
                    '&:nth-last-of-type(even) ::after': {
                        content: '""',
                        position: 'absolute',
                        display: 'inline-block',
                        width: '100vw',
                        height: '100%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#444654',
                        zIndex: -1
                    }
                }}
            >
            </Box>
        </List>
    );
};