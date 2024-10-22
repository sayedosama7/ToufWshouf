import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Img from '@/assets/images/products/5.jpg';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import ImageWithPrice from '@/components/products/ImageWithPrice';

interface Props {
    price?: number;
    offerPrice?: number | undefined;
    offer?: boolean;
    myBooking?: boolean;
    IsUpcoming?: boolean;
}

const ReservationItem: FunctionComponent<Props> = ({
    offer = false,
    price = 850,
    offerPrice,
    IsUpcoming,
}) => {
    const { t } = useTranslation();
    const productData = {
        id: '1',
        code: 1234,
        programyear: 2024,
        programname: 'Gravity Code',
        rating: 4.5,
        startprice: price,
        img_path: '/path-to-image',
        offerPrice: offerPrice,
    };
    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                backgroundColor: 'gray.light',
                my: 5,
                borderRadius: '8px',
            }}
        >
            <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={3.5} sx={{ pt: '0 !important' }}>
                    <ImageWithPrice
                        price={price}
                        src={Img}
                        offerPrice={offerPrice}
                        wishlist={false}
                        code={productData.code}
                        productData={productData}
                    />{' '}
                </Grid>
                <Grid item xs={8.5} sx={{ p: 3 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: '100%' }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: '400', color: 'main.payment', mb: 2 }}
                        >
                            {t('Gravity Code')}
                        </Typography>
                        {IsUpcoming && (
                            <Typography variant="body1" color="error">
                                {t('Cancellation Deadline: 10/3/2022')}
                            </Typography>
                        )}
                    </Stack>

                    <Stack
                        direction="column"
                        alignItems="start"
                        spacing={1}
                        sx={{ width: '100%', color: 'main.payment' }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >
                            <Typography variant="body1">{t('Trip Date')}</Typography>
                            <Typography variant="body1">{t('2/3/2022 at 18:00')}</Typography>
                        </Stack>

                        <Typography variant="body1">{t('Egyptians Number  x 1')}</Typography>
                        <Typography variant="body1">{t('Children Number  x 1')}</Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >
                            <Typography variant="body1">{t('Trip Status')}</Typography>
                            <Typography variant="body1" color="error">
                                {t('Paid')}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >
                            <Typography variant="body1">{t('The total includes VAT ')}</Typography>
                            <Typography variant="body1">{t('440 EGP')}</Typography>
                        </Stack>
                    </Stack>

                    {IsUpcoming && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%', mt: 4 }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="start"
                                spacing={2}
                            >
                                <Button variant="contained" size="large" color="secondary">
                                    {t('Edit Trip')}
                                </Button>
                                <Button variant="contained" size="large" color="secondary">
                                    {t('Print')}
                                </Button>
                            </Stack>
                            <Button variant="contained" size="large" color="error">
                                {t('Cancel')}
                            </Button>
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ReservationItem;
