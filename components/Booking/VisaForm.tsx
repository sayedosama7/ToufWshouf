import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {}
const VisaForm: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12} sx={{ pl: 'unset !important' }}>
        <label htmlFor="CreditCard">
          <Typography variant="subtitle1">{t('Credit Card')}</Typography>
        </label>
        <TextField
          id="CreditCard"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} sx={{ pl: 'unset !important' }}>
        <label htmlFor="Name on card">
          <Typography variant="subtitle1">{t('Name on card')}</Typography>
        </label>
        <TextField
          id="Name on card"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </Grid>
      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        <Grid item xs={12} sx={{ pl: 'unset !important' }}>
          <label htmlFor="Expiration date">
            <Typography variant="subtitle1">{t('Expiration date')}</Typography>
          </label>
          <TextField
            id="Expiration date"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={12} sx={{ pl: 'unset !important' }}>
          <label htmlFor="CVV">
            <Typography variant="subtitle1">{t('CVV')}</Typography>
          </label>
          <TextField
            id="CVV"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            type="number"
          />
        </Grid>
      </Stack>
      <FormControlLabel
        sx={{ mt: 3 }}
        control={<Checkbox defaultChecked />}
        label="Save my payment details for future booking "
      />
    </Grid>
  );
};

export default VisaForm;
