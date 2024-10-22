import { useGetProductQuery } from '@/store/Products/GetProductsApi';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import React, { FunctionComponent } from 'react';
import WishlistButton from '@/components/products/WishlistButton';
import Price from '@/components/products/Price';
import ProductRating from '@/components/products/ProductRating';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';
import { Product } from '@/data/products';
import { ToastContainer } from 'react-toastify';

interface Props {
    myBooking?: boolean;
    productData: Product;
}
const BestProducts: FunctionComponent<Product> = () => {
    const { data, error, isLoading } = useGetProductQuery();
    const router = useRouter();
    if (error || !data)
        return (
            <>
                <Loading />
            </>
        );

    const products = data.items;

    return (
        <div className="container">
            <div className="row">
                <ToastContainer />
                {isLoading && <Loading />}
                <h2 className="my-4 fw-bold">All Trips</h2>
                {products.map(product => (
                    <div key={product.code} className="col-md-4">
                        <Grid>
                            <Card
                                sx={{
                                    position: 'relative',
                                    height: '350px',
                                    width: '100%',
                                    boxShadow: 'unset',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="60%"
                                    image={product.img_path}
                                    alt="main Image"
                                />
                                <CardContent
                                    sx={{
                                        py: '16px !important',
                                        border: '1px solid #C7C7C7',
                                        borderRadius: '0 0 5px 5px',
                                    }}
                                >
                                    <Link
                                        onClick={() =>
                                            router.push(
                                                `/productDetails/${product.code}/${product.programyear}`
                                            )
                                        }
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
                                        <Price
                                            price={product.startprice ?? 0}
                                            offerPrice={product.offerPrice ?? 0}
                                        />
                                        <WishlistButton
                                            id={product.code.toString()}
                                            productData={product}
                                        />
                                    </Stack>

                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {product.programname}
                                    </Typography>

                                    <ProductRating rating={product.rate_review} readOnly />
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestProducts;
