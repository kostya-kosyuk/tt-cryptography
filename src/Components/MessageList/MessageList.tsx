import { Box, List } from "@mui/material";
import { Message } from "../../types/Message";
import { MessageItem } from "../MessageItem/MessageItem";
import React, { memo, useEffect, useRef } from 'react';

type Props = {
    messages: Message[],
};

export const MessageList = ({messages}: Props) => {
    const chatRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (!chatRef.current) {
            return;
        };
        const chatContainer = chatRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });

    useEffect(() => {
        if (!chatRef.current) {
            return;
        };

        const chatContainer = chatRef.current;
        if (chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 100) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <List
            ref={chatRef}
            disablePadding
            sx={{
                zIndex: 1,
                overflowY: 'scroll',
                overflowX: 'hidden',

                '&::-webkit-scrollbar': {
                    width: '0.5em'
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#343541',
                    borderRadius: '100%'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#565869',

                    borderRadius: '999px'
                }
        }}>
            {messages.map(msg => <MessageItem key={msg.id} msg={msg} />)}
            <Box
                sx={{
                    position: 'relative',
                    height: '100px',
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

export default memo(MessageList);