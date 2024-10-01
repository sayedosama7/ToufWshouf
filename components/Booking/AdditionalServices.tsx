import { Grid, Paper, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Counter from './Counter';
interface Props {}
const AdditionalServices: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  const CounterPeople = [
    {
      title: 'Baby',
      subtitle: '20 EGP from 8 to 13 (year)',
    },
    {
      title: 'Child',
      subtitle: '30 EGP From 14 to 19 (year)',
    },
    {
      title: 'Baby',
      subtitle: '50 EGP From 20 to 50 (year)',
    },
  ];
  const CounterAdditionalServices = [
    {
      title: 'Dinner',
      subtitle: 'A Dinner meal in 5 starts resturant',
    },
    {
      title: 'Child',
      subtitle: 'A Bus to drive you to your destination',
    },
    {
      title: '12 working hours Kia Carens',
      subtitle: '',
    },
  ];
  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={6}>
        <Paper elevation={1} sx={{ backgroundColor: 'gray.light', p: 3 }}>
          <Typography variant='h5'>{t('Number of people')}</Typography>
          {CounterPeople.map(({ title, subtitle }, index) => (
            <Counter title={title} subtitle={subtitle} key={index} />
          ))}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={1} sx={{ backgroundColor: 'gray.light', p: 3 }}>
          <Typography variant='h5'>{t('Additional Services')}</Typography>
          {CounterAdditionalServices.map(({ title, subtitle }, index) => (
            <Counter title={title} subtitle={subtitle} key={index} />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdditionalServices;
