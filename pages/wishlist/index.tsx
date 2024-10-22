import React, { useEffect } from 'react';
import { removeFromWishlist, setWishlist } from '@/store/wishlistSlice';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ProductRating from '@/components/products/ProductRating';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Head from 'next/head';
import BackgroundImage from '@/components/ui/BackgroundImage';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import bgSearch from '@/assets/images/search.jpg';
import { useTranslation } from 'react-i18next';

const Wishlist = () => {
    const wishlistItems = useAppSelector(state => state.wishlist.items);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const handleRemoveFromWishlist = (code: number) => {
        dispatch(removeFromWishlist(code));
        toast.error('removed successfully');
    };

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
        dispatch(setWishlist(storedItems));
    }, [dispatch]);

    const totalPrice = wishlistItems.reduce((total, item) => total + item.startprice, 0);

    return (
        <div>
            <Head>
                <title> Wishlist </title>
            </Head>
            <ToastContainer />
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" sx={{ color: 'body.light' }}>
                        {t('My Shopping list')}
                    </Typography>
                </Stack>
            </BackgroundImage>
            <Container maxWidth="lg">
                <Grid container spacing={5} justifyContent="center" sx={{ p: 5 }}>
                    {wishlistItems.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                Your wishlist is empty
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Link href="/" passHref>
                                    <Button variant="contained">Go to Home</Button>
                                </Link>
                            </Box>
                        </Grid>
                    ) : (
                        wishlistItems.map(item => (
                            <Grid item xs={12} sm={12} md={12} key={item.code}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.img_path}
                                        alt={item.programname}
                                        sx={{
                                            width: { xs: '100%', sm: '30%' },
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    <CardContent
                                        sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1">
                                                {item.programname}
                                            </Typography>
                                            <Typography variant="body2">
                                                Price: {item.startprice}
                                            </Typography>
                                            <ProductRating rating={item.rate_review} readOnly />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mt: 'auto',
                                            }}
                                        >
                                            <Link
                                                href={`/productDetails/${item.code}/${item.programyear}`}
                                                passHref
                                            >
                                                <Button
                                                    sx={{ mt: 2, color: 'white' }}
                                                    variant="contained"
                                                    size="large"
                                                >
                                                    More Details
                                                </Button>
                                            </Link>
                                            <IconButton
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleRemoveFromWishlist(item.code);
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: 'error.main' }} />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                    {wishlistItems.length > 0 && (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 'auto',
                            }}
                        >
                            <Typography variant="h3">Total Price:</Typography>
                            <Typography variant="h3">{totalPrice}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default Wishlist;
