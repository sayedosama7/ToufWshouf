import { LocalOfferRounded } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  tags: string;
}
const Tags: FunctionComponent<Props> = ({ tags }) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      spacing={1}
      sx={{ my: 3, color: 'secondary.main' }}
    >
      <LocalOfferRounded />
      <Typography variant="body1">{t(tags)}</Typography>
    </Stack>
  );
};

export default Tags;
