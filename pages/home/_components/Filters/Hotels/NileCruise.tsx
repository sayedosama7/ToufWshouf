import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import {
  Place,
  InsertInvitationRounded,
  WidgetsRounded,
  Restore
} from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {}
const NileCruise: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  const [personName, setPersonName] = React.useState<string[]>([]);
  
  
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <Grid container justifyContent="center" alignItems="end">
      <Grid item xs={2.8}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <OutlinedInput
            id="Destination"
            type="text"
            sx={{
              backgroundColor: 'body.light',
              borderRadius: '5px 0 0 5px',
            }}
            fullWidth
            placeholder={t('Destination')}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <Place />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2.8}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <OutlinedInput
            id="Departure"
            type="text"
            sx={{
              backgroundColor: 'body.light',
              borderRadius: '0',
            }}
            fullWidth
            placeholder={t('Departure Port')}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <WidgetsRounded />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <OutlinedInput
            id="date"
            sx={{
              backgroundColor: 'body.light',
              borderRadius: '0',
              color: 'main.lightGray',
            }}
            fullWidth
            type="date"
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <InsertInvitationRounded />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2.8}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <Select
            id="Trip type"
            sx={{ backgroundColor: 'body.light', borderRadius: '0' }}
            fullWidth
            displayEmpty
            input={<OutlinedInput />}
            value={personName}
            onChange={handleChange}
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return (
                  <span style={{ color: '#B7B7B7' }}>Cruise Length</span>
                );
              }

              return selected.join(', ');
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <Restore />
              </InputAdornment>
            }
          >
            <MenuItem disabled value="">
              <em>Trip type</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={1.5}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ borderRadius: '0 5px 5px 0', py: 1.9, boxShadow: 0 }}
        >
          {t('Search')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NileCruise;
