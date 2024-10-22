import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    title: string;
    subtitle: string;
    onChange: (count: number, type: 'increase' | 'decrease') => void;
}

const Counter: FunctionComponent<Props> = ({ title, subtitle, onChange }) => {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
        setCount(count + 1);
        onChange(1, 'increase');
    };

    const handleDecrease = () => {
        if (count > 0) {
            setCount(count - 1);
            onChange(1, 'decrease');
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 4, mb: subtitle === '' ? 2.2 : 0 }}
        >
            <Box>
                <Typography variant="subtitle1">{t(title)}</Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                    {t(subtitle)}
                </Typography>
            </Box>
            <Stack direction="row" alignItems="center">
                <IconButton sx={{ p: 0, mr: '-10px' }} size="large" onClick={handleIncrease}>
                    <AddCircleIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                </IconButton>
                <Typography
                    variant="body2"
                    sx={{
                        backgroundColor: 'main.counter',
                        px: 2,
                        width: '60px',
                        textAlign: 'center',
                    }}
                >
                    {count}
                </Typography>
                <IconButton sx={{ p: 0, ml: '-10px' }} size="large" onClick={handleDecrease}>
                    <RemoveCircleIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default Counter;
