import { Box, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import { Lock, DriveFileRenameOutline, VpnKey } from '@mui/icons-material';
import { InformationBlock } from "./InformationBlock";

type InfoBlock = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    text: string
};

const info: InfoBlock[] = [
    {
        Icon: Lock,
        text: 'Keep your messages in safe'
    },
    {
        Icon: DriveFileRenameOutline,
        text: 'Write your message'
    },
    {
        Icon: VpnKey,
        text: 'Choose an encryption method and come up with a secret key'
    },
];

export const Information = () =>
<Box
    height={'100%'}
    maxWidth={'750px'}
    margin={'auto'}
    sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}
>
    {info.map((el) => <InformationBlock
        Icon={el.Icon}
        text={el.text}
    />)}
</Box>