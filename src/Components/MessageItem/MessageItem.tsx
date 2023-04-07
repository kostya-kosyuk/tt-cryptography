import { Box, ListItem, Typography } from "@mui/material";
import { Message } from "../../types/Message";

type Props = {
    msg: Message,
};

export const MessageItem = ({msg}: Props) => {
    const {id, message, cipherMethod, cipherKey} = msg;
    return (
        <ListItem
            sx={{
                position: 'relative',
                pl: 2,
                pr: 2,
                paddingTop: '24px',
                paddingBottom: '24px',
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
            <Typography
                sx={{
                    color: '#d1d5db'
                }}
            >
                {id}  {message}
            </Typography>
        </ListItem>
    );
};