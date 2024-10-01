import { Box, Container, Grid, Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import productDetailsImg from "@/assets/images/products/1.jpg";;
import Filter from './Filter';
import BackgroundImage from '@/components/ui/BackgroundImage';

interface Props {}
const FilterContent: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <BackgroundImage imageSrc={productDetailsImg}>
      <Stack
        direction="column"
        justifyContent="top"
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 3,
          color: 'body.light',
          height: '100%',
          pt: 5,
        }}
      >
        <Container maxWidth="lg">
          <Filter />
        </Container>
      </Stack>
    </BackgroundImage>
  );
};

export default FilterContent;
