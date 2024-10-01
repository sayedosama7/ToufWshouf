import {
  Box,
  Grid,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import LinkMui  from '@mui/material/Link';

import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { FacebookSharp, Instagram, Twitter } from '@mui/icons-material';

interface Props {}

const Index: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'body.main',
        width: '100%',
        color: 'body.light',
        py: 4,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{t('About Us')}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Contact Us')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Cities')}</Link>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{t('Information')}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('FAQs')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Vision')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Goals')}</Link>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {t('Related links')}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Ministry of Tourism')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Ministry of Antiquities')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Ministry of Environment')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Ministry of Education')}</Link>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Link href={''}>{t('Egyptian Government Portal')}</Link>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: '100%' }}
              >
                <div>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {t('Subscribe to our newsletter')}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      placeholder="Search"
                      sx={{
                        backgroundColor: 'body.light',
                        borderRadius: '5px 0 0 5px',
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{ borderRadius: '0 5px 5px 0', ml: '-5px', py: 2 }}
                    >
                      <Typography variant="button">{t('Send')}</Typography>
                    </Button>
                  </Stack>
                </div>
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {t('Social media')}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LinkMui  href="#" target="_blank"  underline="none" sx={{color:"body.light"}}>
                      <FacebookSharp />
                    </LinkMui>
                    <LinkMui  href="#" target="_blank" underline="none" sx={{color:"body.light"}}>
                      <Instagram />
                    </LinkMui>
                    <LinkMui  href="#" target="_blank" underline="none" sx={{color:"body.light"}}>
                      <Twitter />
                    </LinkMui>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{borderColor:"gray.main" , my:2}} />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">{t('Touf w Shof. 2022 - All Rights Reserved')}</Typography>
          <Typography variant="caption">{t('Created by ITD')}</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Index;
