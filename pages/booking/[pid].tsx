import React from 'react';
import { Box, Grid, Stack, Typography, Container } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import productDetailsImg from '@/assets/images/products/productDetails.jpg';

import BackgroundImage from '@/components/ui/BackgroundImage';
import BookingStepper from '@/components/Booking/Stepper';

interface Props {}
const Book: NextPage<Props> = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title> Booking </title>
      </Head>
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
            <Typography variant="h2">
              {t('The Egyptian Gulf (Hospice of  the Sultan)')}
            </Typography>
          </Container>
        </Stack>
      </BackgroundImage>
      <Container maxWidth="lg" sx={{mt:4}}>
        <BookingStepper />
      </Container>
    </div>
  );
};

export default Book;
