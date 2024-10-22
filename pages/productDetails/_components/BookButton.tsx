import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

interface Props {
    code: string | number | undefined;
    programyear: string | number | undefined;
}

const BookButton: FunctionComponent<Props> = ({ code, programyear }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleBooking = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        } else {
            router.push(`/booking/${code}/${programyear}`);
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, color: 'body.main' }}
        >
            <Button variant="contained" size="large" onClick={handleBooking}>
                {t('Book Now')}
            </Button>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body1">{t('Share via')}</Typography>
                <IconButton>
                    <FacebookOutlinedIcon sx={{ color: 'body.main' }} />
                </IconButton>
                <IconButton>
                    <TwitterIcon sx={{ color: 'body.main' }} />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default BookButton;
