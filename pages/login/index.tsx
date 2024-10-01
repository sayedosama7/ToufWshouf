import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  RememberMe: boolean;
}

interface Props {}

const Index: NextPage<Props> = () => {
  const { t } = useTranslation();

  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    RememberMe: false,
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <AuthLayout>
      <>
        <Head>
          <title> Login </title>
        </Head>
        <Paper elevation={0}>
          <Container sx={{ py: 2 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
              Sign in
            </Typography>
            <Grid container direction="column" spacing={4}>
              <Grid item xs={12}>
                <label htmlFor="email">
                  <Typography variant="subtitle1">
                    {t('Email Address')}
                  </Typography>
                </label>
                <TextField
                  id="email"
                  fullWidth
                  variant="outlined"
                  placeholder={t('Enter your email')}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="password">
                  <Typography variant="subtitle1">{t('Password')}</Typography>
                </label>

                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                  <OutlinedInput
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    fullWidth
                    placeholder={t('Enter your password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={t('Remember me')}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '12px',
                      },
                    }}
                  />

                  <Link href="/forgetPassword">
                    <Typography variant="caption">
                      {t('Forgot Password?')}
                    </Typography>
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{mt:4}}>
                <Button type="submit" variant="contained" size="large" sx={{py:"13px"}} fullWidth>
                  <Typography variant="button">{t('Sign in')}</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" justifyContent="center">

              <Typography variant="body1" > {t("Don't have an account?")}</Typography>
              <Typography variant="subtitle1" sx={{color:"primary.main"}} ><Link href='/signup' >{t('Sign up')}</Link></Typography>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </>
    </AuthLayout>
  );
};

export default Index;
