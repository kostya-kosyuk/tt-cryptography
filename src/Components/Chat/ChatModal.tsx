import { Clear } from "@mui/icons-material";
import { Modal, Box, Typography, IconButton, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
    isModalOpen: boolean,
    handleToggleModal: () => void,
};

export const ChatModal = ({
    isModalOpen,
    handleToggleModal
}: Props) => {
    return(
        <Modal
            open={isModalOpen}
            onClose={handleToggleModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
                display: 'grid',
                '& > div:first-child': {
                    backgroundColor: 'rgba(52,53,65,.9)',
                },
            }}

        >
            <Box
                width={560}
                height={300}
                boxShadow={2}
                sx={{
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
                        border: '0.8px solid rgba(64,65,79, 1)',
                        borderRadius: '6px',
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
                        onClick={handleToggleModal}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.54)',
                            padding: 0,
                        }}
                    >
                        <Clear />
                    </IconButton>
                </Box>
                <FormControl
                    sx={{
                        m: 1,
                        minWidth: 120,
                        color: 'white'
                    }}
                >
                    <InputLabel>Method</InputLabel>
                    <Select
                        id="demo-simple-select-required"
                        value={'Caesar'}
                        label="Method *"
                        required
                        // onChange={handleChange}
                    >
                        <MenuItem value="Caesar">
                            Caesar
                        </MenuItem>
                        <MenuItem value={"XOR"}>
                            XOR
                        </MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
            </Box>
        </Modal>
    )
};