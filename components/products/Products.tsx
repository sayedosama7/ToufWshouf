import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Price from './Price';
import ProductRating from './ProductRating';
import WishlistButton from './WishlistButton';

import type { Product } from '@/data/products';

const Products: FunctionComponent<Product> = ({
    code,
    programname,
    rate_review,
    startprice,
    img_path,
    offerPrice,
    programyear,
    rating,
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const productData = {
        code,
        programname,
        rate_review,
        rating,
        startprice,
        img_path,
        offerPrice,
        programyear,
    };

    return (
        <Grid item container xs={3}>
            <Card
                sx={{
                    position: 'relative',
                    height: '350px',
                    width: '100%',
                    boxShadow: 'unset',
                }}
            >
                <CardMedia component="img" height="60%" image={img_path} alt="main Image" />
                <CardContent
                    sx={{
                        py: '16px !important',
                        border: '1px solid #C7C7C7',
                        borderRadius: '0 0 5px 5px',
                    }}
                >
                    <Link
                        onClick={() => router.push(`/productDetails/${code}/${programyear}`)}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: '2',
                            cursor: 'pointer',
                        }}
                    >
                        {' '}
                    </Link>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={'center'}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            zIndex: 100,
                            left: 0,
                            right: 0,
                        }}
                    >
                        <Price price={startprice ?? 0} offerPrice={offerPrice ?? 0} />
                        <WishlistButton id={code.toString()} productData={productData} />
                    </Stack>

                    <Typography gutterBottom variant="subtitle1" component="div">
                        {t(programname)}
                    </Typography>

                    <ProductRating rating={rate_review} readOnly />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Products;
