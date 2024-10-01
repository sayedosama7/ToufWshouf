import { Typography, Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import ProductRating from '@/components/products/ProductRating';

interface Props {
  title: string;
  rating: number;
}
const TitleAndRating: FunctionComponent<Props> = ({ title, rating }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t(title)}
      </Typography>
      <ProductRating rating={rating} readOnly />
    </Stack>
  );
};

export default TitleAndRating;
