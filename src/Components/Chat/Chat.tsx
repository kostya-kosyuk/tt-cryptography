import { Box, FormControl, IconButton, Input, Typography } from "@mui/material";
import { Message } from "../../types/Message";
import { MessageList } from "../MessageList/MessageList";

import SendIcon from '@mui/icons-material/Send';

const messages: Message[] = [];

for (let i = 0; i < 10; i++) {
    messages.push({
        id: i,
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloribus tenetur nemo sit reiciendis doloremque molestiae eius, consectetur sed deserunt dicta explicabo atque inventore illum, unde natus ad fugiat consequatur',
        cipherMethod: 'caesar',
        cipherKey: '12',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

export const Chat = () => {
    return (
        <Box sx={{
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
                    backgroundColor: 'rgba(255,255,255, 0)'}}
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
                    width={'750px'}
                    margin={'auto'}
                >
                    <FormControl
                        component="form"
                        noValidate
                    >
                        <Input
                            required
                            fullWidth
                            autoComplete="false"
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
                                '& input': {
                                    padding: '4px, 0px, 0px',
                                },
                            }}
                            multiline
                            disableUnderline
                        />
                        <IconButton type="submit">
                            <SendIcon />
                        </IconButton>
                    </FormControl>
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
    );
};
