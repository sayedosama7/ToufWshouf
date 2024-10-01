import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Place,
  WidgetsRounded,
  InsertInvitationRounded,
} from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { countries } from '@/constants/countries';

interface Props {}

const Outings: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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
      <Grid item xs={2.4}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <OutlinedInput
            id="city"
            type="text"
            sx={{ backgroundColor: 'body.light', borderRadius: '5px 0 0 5px' }}
            fullWidth
            placeholder={t('City')}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <Place />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2.4}>
        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          <Select
            id="Trip type"
            sx={{ backgroundColor: 'body.light', borderRadius: '0' }}
            fullWidth
            displayEmpty
            input={<OutlinedInput />}
            value={personName}
            onChange={handleChange}
            placeholder="Trip type"
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <span style={{ color: '#B7B7B7' }}>Trip type</span>;
              }

              return selected.join(', ');
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <WidgetsRounded />
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
      <Grid item xs={2.4}>
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
            placeholder={t('Pick a date')}
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                <InsertInvitationRounded />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={2.4}>
        <Autocomplete
          id="country"
          options={countries}
          autoHighlight
          sx={{
            backgroundColor: 'body.light',
            borderRadius: '0',
            color: 'main.lightGray',
            width: '100%',
            "& .MuiInputBase-root":{
              borderRadius: '0'
            }
          }}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Nationality"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
      <Button type="submit" variant="contained" size='large' fullWidth sx={{borderRadius:"0 5px 5px 0" , py:1.9 , boxShadow:0}}>
          {t('Search')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Outings;
