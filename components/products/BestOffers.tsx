import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Products from './Products';
import { useGetProductQuery } from '@/store/Products/GetProductsApi';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';

interface Props {
    title: string;
    offers?: boolean;
}

const BestOffers: FunctionComponent<Props> = ({ title }) => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetProductQuery();
    const Router = useRouter();

    if (error || !data) {
        return <Typography></Typography>;
    }

    const handleMoreDetails = () => {
        Router.push('/ProductDisplay');
    };

    const products = data.items;

    return (
        <Box sx={{ mt: 11, mb: 3 }}>
            {isLoading && <Loading />}
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {title}
            </Typography>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                {products.slice(4, 8).map(product => (
                    <Products
                        key={product.code}
                        code={product.code}
                        programyear={product.programyear}
                        programname={product.programname}
                        rating={product.rate_review}
                        startprice={product.startprice}
                        img_path={product.img_path}
                        rate_review={product.rate_review}
                        offerPrice={0}
                    />
                ))}
            </Stack>
            <Grid container item xs={12} justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={3}>
                    <Button onClick={handleMoreDetails} variant="contained" size="large" fullWidth>
                        {t('See all')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BestOffers;
