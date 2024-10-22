import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import productDetailsImg from '@/assets/images/products/productDetails.jpg';
import BackgroundImage from '@/components/ui/BackgroundImage';
import BookingStepper from '@/components/Booking/Stepper';
import { useGetDetailsQuery } from '@/store/Products/FetchDetailsApi';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';

const Book: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { code, programyear } = router.query;

    const queryParams = code && programyear ? { code, programyear } : null;
    const { data, error, isLoading } = useGetDetailsQuery(queryParams);

    if (error) {
        return <p>Error loading details.</p>;
    }
    const productData = data?.items?.[0];

    return (
        <div>
            <Head>
                <title>Booking</title>
            </Head>
            {isLoading && <Loading />}

            <BackgroundImage imageSrc={productDetailsImg}>
                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="end"
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        color: 'body.light',
                        height: '100%',
                        pb: 5,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography variant="h2">{t(productData?.ProgramName)}</Typography>
                    </Container>
                </Stack>
            </BackgroundImage>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <BookingStepper />
            </Container>
        </div>
    );
};

export default Book;
