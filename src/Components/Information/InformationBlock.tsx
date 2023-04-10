import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    text: string
};

export const InformationBlock = ({Icon, text}: Props) => (
    <Box
        sx={{
            mb: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Icon
            sx={{
                fontSize: "30px",
                color: 'white',
            }}
        />
        <Box
            bgcolor={'#3E3F4B'}
            borderRadius={'6px'}
            padding={'12px'}
            margin={'8px'}
            width={'250px'}
            height={'60px'}
            sx={{
                display: 'grid',
            }}
        >
            <Typography
                textAlign={'center'}
                sx={{
                    placeSelf: 'center',
                    color: 'lightgray',
                    overflowWrap: 'break-word',
                }}
            >
                {text}
            </Typography>
        </Box>
    </Box>
);