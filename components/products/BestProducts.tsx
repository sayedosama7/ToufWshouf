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

interface Props {
    title: string;
    offers?: boolean;
}

const BestProducts: FunctionComponent<Props> = ({ title }) => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetProductQuery();
    const Router = useRouter();
    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error || !data) {
        return <Typography>Error loading products</Typography>;
    }
    const handleMoreDetails = () => {
        Router.push('/ProductDisplay');
    };

    const products = data.items;

    return (
        <Box sx={{ mt: 11, mb: 3 }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {title}
            </Typography>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                {products.slice(6, 9).map(product => (
                    <Products
                        key={product.code}
                        code={product.code}
                        programname={product.programname}
                        rating={product.rating}
                        startprice={product.startprice}
                        img_path={product.img_path}
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

export default BestProducts;
