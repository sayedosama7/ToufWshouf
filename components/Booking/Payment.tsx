import { Button, Grid, Typography, Stack, TextField, Paper } from '@mui/material';

import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentForm from './PaymentForm';
interface Props {
  handleBack: Function;
  handleNext: Function;
}
const Payment: FunctionComponent<Props> = ({ handleBack, handleNext }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="subtitle1">{t('Choose payment method')}</Typography>

      <Grid container spacing={5}>
        <Grid xs={7} item>
          <PaymentForm />
        </Grid>
        <Grid xs={5} item>
          <Paper elevation={1} sx={{ backgroundColor: '#FAFAFA', p: 2, mt: 5 }}>
            <Typography variant="h3">{t('The Egyptian Gulf')}</Typography>
            <Stack sx={{ mt: 3 }} direction="column" spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('Trip Date')}
                </Typography>
                <Typography variant="body2">{t('2/3/2022 at 18:00')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('Egyptians Number  x 1')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('Children Number  x 1')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('Total without additional services')}
                </Typography>
                <Typography variant="body2">{t(' 440 EGP')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('Total')}
                </Typography>
                <Typography variant="body2">{t('440 EGP')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('VAT')}
                </Typography>
                <Typography variant="body2">{t('17 EGP')}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                  {t('The total includes VAT')}
                </Typography>
                <Typography variant="subtitle2">{t('457 EGP')}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container sx={{ my: 3 }} justifyContent="space-between">
        <Grid item xs={3}>
          <Button onClick={() => handleNext()} variant="contained" fullWidth size="large">
            {t('Confirm')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" onClick={() => handleBack()} fullWidth size="large">
            {t('Back')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
