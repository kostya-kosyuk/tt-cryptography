import { Clear } from "@mui/icons-material";
import { Modal, Box, Typography, IconButton, FormControl, InputLabel, MenuItem, Select, Input, SelectChangeEvent } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import * as Yup from "yup";
import { CipherMethod, NewMessage } from "../../types/Message";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { patchMessageAction, postMessageAction } from "../../store/asyncActions.ts/messageAsyncActions";
import { CurrentMessageActionTypes } from "../../store/actions/currentMessageAction";
import { decrypt, encrypt } from "../../utils/cryptoMethods";
import { checkMessage } from "../../utils/regExp";
import { SetMessageErrorActionTypes } from "../../store/actions/messageActions.ts/setMessageErrorActions";

type Props = {
    isModalOpen: boolean,
};

const xorKeyValidationSchema = Yup.object().shape({
    cipherKey: Yup.string()
        .required("Key is required")
        .min(1, "Key must be between 1 and 32 characters")
        .max(32, "Caesar key must be between number 1 and 32")
});

const caesarKeyValidationSchema = Yup.object().shape({
    cipherKey: Yup
        .number().typeError("Caesar key must be a number")
        .integer("Caesar key must be a number")
        .min(1, "Caesar key must be between number 1 and 32")
        .max(32, "Caesar key must be between number 1 and 32")
});

export const SettingsModal = ({
    isModalOpen
}: Props) => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();

    const currentMessage = useAppSelector(state => state.currentMessage.message);

    const [cipherKey, setCipherKey] = useState('');
    const [cipherMethod, setCipherMethod] = useState<CipherMethod>('caesar');

    const handleCloseModal = () => dispatch({
        type: CurrentMessageActionTypes.CLEAR_MESSAGE,
    });

    useEffect(() => {
        if (currentMessage?.cipherKey) {
            setCipherKey(currentMessage.cipherKey);
        }
        if (currentMessage?.cipherMethod) {
            setCipherMethod(currentMessage.cipherMethod);
        }
    }, [currentMessage]);

    const validationError = useMemo(() => {
        const schema = cipherMethod === 'caesar' ? caesarKeyValidationSchema : xorKeyValidationSchema;

        if (cipherMethod === 'caesar' && !Number.isInteger(+cipherKey)) {
            return 'Caesar key must be a number';
        }

        try {
            schema.validateSync({ cipherKey }, { abortEarly: false });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const error = err.errors[0];

                return error;
            }

            return null;
        }
        return null;
    }, [cipherKey, cipherMethod]);

    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        if (validationError !== null || !currentMessage) {
            return;
        }

        try {
            checkMessage(currentMessage.message);
        } catch (err: any) {
            dispatch({
                type: SetMessageErrorActionTypes.SET_MESSAGE_ERROR,
                payload: {
                    error: err.message
                }
            });
            handleCloseModal();
            return;
        }

        const newMsg: NewMessage = {
            message: currentMessage.message,
            cipherMethod,
            cipherKey
        };

        //if message id exists then message exist, and it will be patched. If no id, then we need to create message :)
        if (currentMessage.id) {
            const decryptedMessage = decrypt(currentMessage.cipherMethod, currentMessage.message, currentMessage.cipherKey);

            const newEncryptedMessage = encrypt(newMsg.cipherMethod, decryptedMessage, newMsg.cipherKey);

            newMsg.message = newEncryptedMessage;

            dispatch(patchMessageAction(currentMessage.id, newMsg));
        } else {
            const encryptedMessage = encrypt(newMsg.cipherMethod, newMsg.message, newMsg.cipherKey);

            newMsg.message = encryptedMessage;

            dispatch(postMessageAction(newMsg));
        }

        handleCloseModal();
    };

    const handleChangeKey = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const key = event.target.value;
        setCipherKey(key);
    }

    const handleChangeMethod = (event: SelectChangeEvent<string>
) => {
        const method = event.target.value;

        if (method === 'caesar' || method === 'xor') {
            setCipherMethod(method);
        } else {
            return;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleFormSubmit(event);
        }
    };

    return(
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
                display: 'grid',
                '& > div:first-of-type': {
                    backgroundColor: 'rgba(52,53,65,.9)',
                },
            }}

        >
            <Box
                maxWidth='400px'
                boxShadow={2}
                sx={{
                    marginX: '10px',
                    'placeSelf': 'center',
                    color: 'white',
                    backgroundColor: 'rgba(32,33,35, 1)',
                    border: '0.8px solid rgba(64,65,79, 1)',
                    borderRadius: '6px'
                }}
            >
                <Box
                    sx={{
                        color: 'white',
                        borderBottom: '0.8px solid rgba(64,65,79, 1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: '12px',
                        pb: '12px',
                        pl: '16px',
                        pr: '16px',

                    }}
                >
                    <Typography>
                        Message settings
                    </Typography>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.54)',
                            padding: 0,
                        }}
                    >
                        <Clear />
                    </IconButton>
                </Box>
                <Box
                    component="form"
                    noValidate
                    maxWidth={'100%'}
                    height={'100%'}
                    padding= {'10px'}
                    onSubmit={(event) => handleFormSubmit(event)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <FormControl
                        sx={{
                            m: 1,
                            minWidth: 120,
                            borderColor: 'white',
                            '& fieldset': {
                                borderColor: 'rgba(64,65,79, 1)',
                            }
                        }}
                    >
                        <InputLabel
                            sx={{
                                color: 'white',
                            }}>Method *</InputLabel>
                        <Select
                            value={cipherMethod}
                            label="Method *"
                            required
                            onChange={(event) => handleChangeMethod(event)}
                            sx={{
                                color: 'white',
                            }}
                        >
                            <MenuItem value="caesar">
                                Caesar
                            </MenuItem>
                            <MenuItem value={"xor"}>
                                XOR
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <Box
                            sx={{
                                position: 'relative',
                                maxWidth: '180px',
                            }}
                        >
                            <Input
                                required
                                fullWidth
                                autoComplete='false'
                                type="submit"
                                placeholder="Secret key"
                                value={cipherKey}
                                onChange={(event) => handleChangeKey(event)}
                                onKeyDown={(event) => handleKeyDown(event)}
                                sx={{
                                    mt: 1,
                                    overflow: 'hidden',
                                    backgroundColor: 'inherit',
                                    border: '0.8px solid rgba(64,65,79, 1)',
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
                                maxRows={2}
                                disableUnderline
                            />
                            <IconButton
                                type="submit"
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '40%'
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                        {validationError && (
                                <Typography
                                    color={'error.main'}
                                    sx={{
                                        ml: '4px',
                                        mt: '1px',
                                        fontSize: '12px'
                                    }}
                                >
                                {validationError}
                                </Typography>
                            )}
                    </Box>
            </Box>
            </Box>
        </Modal>
    )
};