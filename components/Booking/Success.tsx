import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useRouter } from 'next/router';
interface Props {}

const Success: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Grid container justifyContent="center" sx={{ my: 4 }}>
      <Grid item xs={6}>
        <Paper
          elevation={1}
          sx={{
            backgroundColor: '#FAFAFA',
            p: 3,
            mt: 5,
          }}
        >
          <CheckCircleRoundedIcon
            sx={{
              fontSize: 177,
              color: 'secondary.main',
              mx: 'auto',
              width: '100%',
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
            }}
          >
            {t('Booking Successful')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'main.payment',
              mt: 1,
            }}
          >
            {t('Thank you for Choosing Touf w shof')}
          </Typography>
          <Stack
            sx={{
              mt: 5,
            }}
            direction="column"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 2,
              }}
            >
              <Typography variant="h5">{t('The Egyptian Gulf')}</Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'error.main',
                }}
              >
                {t('Cancellation Deadline: 10/3/2022')}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Booking date')}
              </Typography>
              <Typography variant="body2">{t('2/3/2022')}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Trip Date')}
              </Typography>
              <Typography variant="body2">{t('2/3/2022 at 18:00')}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Egyptians Number  x 1')}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Children Number  x 1')}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                pb: 5,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Total without additional services')}
              </Typography>
              <Typography variant="body2">{t(' 440 EGP')}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('Total')}
              </Typography>
              <Typography variant="body2">{t('440 EGP')}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('VAT')}
              </Typography>
              <Typography variant="body2">{t('17 EGP')}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  color: 'main.payment',
                }}
              >
                {t('The total includes VAT')}
              </Typography>
              <Typography variant="subtitle2">{t('457 EGP')}</Typography>
            </Stack>
          </Stack>
        </Paper>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={{
            mt: 4,
          }}
        >
          <Button variant="contained" fullWidth onClick={() => router.push('/')}>
            {t('Make another booking')}
          </Button>
          <Button variant="outlined" fullWidth onClick={() => router.push('/')}>
            {t('Return home')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Success;
