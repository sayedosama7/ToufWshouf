import { useGetProductQuery } from '@/store/Products/GetProductsApi';
import { Grid, Stack, Typography, CardMedia, CardContent, Link, Card } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Product } from '@/data/products';
import WishlistButton from '@/components/products/WishlistButton';
import Price from '@/components/products/Price';
import ProductRating from '@/components/products/ProductRating';
import { useRouter } from 'next/router';

interface Props {
    myBooking?: boolean;
    productData: Product;
}

const BestProducts: FunctionComponent<Props> = () => {
    const { data, error, isLoading } = useGetProductQuery();
    const router = useRouter();

    if (isLoading) return <p>Loading...</p>;
    if (error || !data) return <p>Error loading products</p>;

    const products = data.items;

    return (
        <div className="container">
            <div className="row">
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
                                            router.push(`productDetails/${product.code}`)
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
                                        <WishlistButton id={''} />
                                    </Stack>

                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {product.programname}
                                    </Typography>

                                    <ProductRating rating={product.rating} readOnly />
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
