import { Box, Grid, Typography, Button ,Container, Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  des: string;
  bookUrl?: string;
}
const BannerAds: FunctionComponent<Props> = (props) => {
  const { des, bookUrl, image, title } = props;
  const { t } = useTranslation();

  return (
    <Box
      sx={{ position: 'relative', width: '100%', zIndex: 200, height: '390px', my:12 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          backgroundColor: 'body.main',
          opacity: 0.3,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <Image
        src={image}
        alt="banner"
        style={{ zIndex: 0 }}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
      />
      <Stack
      direction="column"
      spacing={8}
      justifyContent="center"
      alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 3,
          color: 'body.light',
          height: '100%',

        }}
      >
        <Container maxWidth="md" sx={{textAlign: 'center' }}>

        <Typography variant="h2" sx={{mb:2}}>{t(title)}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'normal' }}>
          {t(des)}
        </Typography>
        </Container>
        <Grid item xs={3} container maxHeight={"45px"}>
          <Button variant="contained" fullWidth >
            {t('Book')}
          </Button>
        </Grid>
      </Stack>
    </Box>
  );
};

export default BannerAds;
