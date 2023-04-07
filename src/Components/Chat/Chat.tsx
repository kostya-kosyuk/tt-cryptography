import { Box, IconButton, Input, Modal, Typography } from "@mui/material";
import { Message } from "../../types/Message";
import { MessageList } from "../MessageList/MessageList";
import Clear from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CipherMethod } from '../../types/Message'
import { useAppSelector } from "../../store/hooks";
import { ChatModal } from "./ChatModal";

const arr: Message[] = [];
for (let i = 0; i < 10; i++) {
    arr.push({
        id: i,
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloribus tenetur nemo sit reiciendis doloremque molestiae eius, consectetur sed deserunt dicta explicabo atque inventore illum, unde natus ad fugiat consequatur',
        cipherMethod: 'caesar',
        cipherKey: '12',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>(arr);
    // const messages = useAppSelector(state => state.messages.messages);
    const [inputValue, setInputValue] = useState('');
    const [cipherMethod, setCipherMethod] = useState<CipherMethod>('caesar');
    const [cipherKey, setCipherKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const containerRef =  useRef<HTMLElement | null>(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const isScrolledToBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
            if (isScrolledToBottom) {
                scrollToBottom();
            }
        }
    }, [messages]);


    const handleToggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleFormSubmit(event);
        }
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        handleToggleModal();
    };



    return (
        <>
            <Box ref={containerRef}
                sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: '#343541',
                overflowY: 'scroll',
                overflowX: 'hidden',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        position: 'relative',
                        m: 'auto',
                        width: '750px',
                        minHeight: '100vh',
                        backgroundColor: 'rgba(255,255,255, 0)'
                    }}
                >
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
                                position: 'relative'
                            }}
                        >
                            <Input
                                required
                                fullWidth
                                autoComplete='false'
                                type="submit"
                                placeholder="Send a message..."
                                value={inputValue}
                                onChange={handleChange}
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
                                        pr: '30px'
                                    }
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
                            color={'rgba(255, 255, 255, 0.5)'}
                            textAlign={'center'}
                            fontSize={12}
                            sx={{
                                mb: 1
                            }}
                        >
                            Write your message, choose cipher method and cipher key
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <ChatModal
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
            />
        </>
    );
};
