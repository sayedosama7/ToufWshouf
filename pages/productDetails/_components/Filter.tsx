import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    OutlinedInput,
  } from '@mui/material';
  import React, { FunctionComponent } from 'react';
  import { useTranslation } from 'react-i18next';
  import {
    Place,
    InsertInvitationRounded,
    WidgetsRounded,
  } from '@mui/icons-material';
  
  interface Props {}
  
  const Filter: FunctionComponent<Props> = () => {
    const { t } = useTranslation();
  
  
    return (
      <Grid container justifyContent="center" alignItems="end">
        <Grid item xs={3.33}>
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
        <Grid item xs={3.33}>
          <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
            <OutlinedInput
              id="Trip type"
              type="text"
              sx={{ backgroundColor: 'body.light', borderRadius: '0' }}
              fullWidth
              placeholder={t('Trip type')}
              startAdornment={
                <InputAdornment position="start" sx={{ color: 'main.lightGray' }}>
                  <WidgetsRounded />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={3.33}>
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
        <Grid item xs={2}>
        <Button type="submit" variant="contained" size='large' fullWidth sx={{borderRadius:"0 5px 5px 0" , py:1.9 , boxShadow:0}}>
            {t('Search')}
          </Button>
        </Grid>
      </Grid>
    );
  };
  
  export default Filter;
  