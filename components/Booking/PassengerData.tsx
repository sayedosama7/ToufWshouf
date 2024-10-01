import { InsertInvitationRounded, Update } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalServices from './AdditionalServices';
const names = ['18:00', '19:00', '20:00', '22:00', '15:00'];

interface Props {
  handleNext: Function;
}

const PassengerData: FunctionComponent<Props> = ({ handleNext }) => {
  const { t } = useTranslation();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={2.5}>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <OutlinedInput
              id="date"
              sx={{
                backgroundColor: 'body.light',
                color: 'main.lightGray',
              }}
              type="date"
              fullWidth
              placeholder={t('Pick a date')}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: 'main.lightGray' }}
                >
                  <InsertInvitationRounded />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <Select
              id="Trip type"
              sx={{ backgroundColor: 'body.light' }}
              displayEmpty
              input={<OutlinedInput />}
              fullWidth
              value={personName}
              onChange={handleChange}
              placeholder="Trip type"
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <Box sx={{ color: '#B7B7B7' }}>Time</Box>;
                }

                return selected.join(', ');
              }}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: 'main.lightGray' }}
                >
                  <Update />
                </InputAdornment>
              }
            >
              <MenuItem disabled value="">
                <em>Time</em>
              </MenuItem>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <AdditionalServices />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2, mt: 3 }}
      >
        <Typography variant="subtitle1">{t('Total')}</Typography>
        <Typography variant="subtitle1">{t('2200 EGP')}</Typography>
      </Stack>
      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
        {t('The total includes VAT')}
      </Typography>
      <Stack direction="row" alignItems="center">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="I Accept Terms And Conditions and Cancellation policy"
        />
        <Typography variant="subtitle1" sx={{ color: "secondary.main", ml:"-5px"}}>
        <Link href="/">Read Terms and conditions</Link>
        </Typography>
      </Stack>

      <Grid container sx={{ my: 3 }} justifyContent="space-between">
        <Grid item xs={3}>
          <Button
            onClick={() => handleNext()}
            variant="contained"
            fullWidth
            size="large"
          >
            {t('Pay')}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            onClick={() => handleNext()}
            sx={{ mr: 1 }}
            fullWidth
            size="large"
          >
            {t('Add to my shopping cart')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassengerData;
