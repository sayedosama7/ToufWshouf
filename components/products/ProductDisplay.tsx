import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import Products from './Products';
import { Product } from '@/data/products';

interface Props {
    myBooking?: boolean;
    productData: Product;
}

const ProductDisplay: FunctionComponent<Props> = ({ myBooking = true, productData }) => {
    const { t } = useTranslation();

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
                <Grid item xs={12} sx={{ p: 3 }}>
                    <Stack direction="column" alignItems="start" spacing={2} sx={{ width: '100%' }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >
                            <Products {...productData} />

                            {myBooking ? (
                                <IconButton>
                                    <DeleteIcon sx={{ color: 'error.main' }} />
                                </IconButton>
                            ) : (
                                <Typography variant="subtitle1">{t('Rating: 4.5')}</Typography>
                            )}
                        </Stack>

                        <Typography variant="body1">
                            {t(
                                'Gravity Code is the Largest Adventure Park in Egypt that brings you joyfulness. Gravity Code is set to change the recreation landscape in Egypt.'
                            )}
                        </Typography>
                        <Button variant="contained" size="large">
                            {t('More Details')}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProductDisplay;
