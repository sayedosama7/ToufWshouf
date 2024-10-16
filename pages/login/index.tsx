import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { useLazyLoginUserQuery } from '@/store/Register/LoginApi';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/Register/userSlice';
interface State {
    Email: string;
    Pword: string;
    showPassword: boolean;
    rememberMe: boolean;
    errors: {
        Email?: string;
        Pword?: string;
    };
}

const Login: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

    const [values, setValues] = React.useState<State>({
        Email: '',
        Pword: '',
        rememberMe: false,
        showPassword: false,
        errors: {},
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (storedEmail && storedPassword) {
            setValues({
                ...values,
                Email: storedEmail,
                Pword: storedPassword,
            });

            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
    }, [values]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            toast.info('You are already logged in!');
            router.push('/home');
        }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    const [loginUser] = useLazyLoginUserQuery();

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleLogin = async () => {
        if (!values.Email || !values.Pword) {
            setValues({
                ...values,
                errors: {
                    Email: !values.Email ? 'Email is required' : '',
                    Pword: !values.Pword ? 'Password is required' : '',
                },
            });
            return;
        }

        try {
            const result = await loginUser({ Email: values.Email, Pword: values.Pword });
            if (result.data && result.data.Status) {
                if (result.data.Status === 'please insert Your Regestered Email') {
                    setSubmitError('Login failed. This email is not registered.');
                    toast.error('This email is not registered. Please check and try again.');
                    return;
                } else if (result.data.Status === 'Invalid Password') {
                    setSubmitError('Login failed. Invalid credentials.');
                    toast.error('Invalid password. Please try again.');
                    return;
                }
            }

            if (result.data && result.data.item && result.data.item.length > 0) {
                const user = result.data.item[0];

                const token = user['Token ']?.trim();
                const CustCode = user.CustCode;
                const NAME = user.NAME;
                const TELEPHONE = user.TELEPHONE;

                if (user.CustCode && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('custcode', CustCode);
                    localStorage.setItem('NAME', NAME);
                    localStorage.setItem('TELEPHONE', TELEPHONE);
                    localStorage.setItem('isAuthenticated', 'true');
                    setIsAuthenticated(true);

                    dispatch(
                        setUser({
                            CustCode: user.CustCode,
                            Email: user.EMAIL,
                            Token: token,
                        })
                    );

                    toast.success('Login successful!', {
                        autoClose: 2000,
                    });

                    setTimeout(() => {
                        router.push('/home');
                    }, 2000);
                } else {
                    setSubmitError('Invalid login response. Please try again.');
                    toast.error('Login failed. Please check your credentials.');
                }
            } else {
                setSubmitError('Login failed. Invalid credentials.');
                toast.error('Invalid email or password. Please try again.');
            }
        } catch (err) {
            console.log('Error:', err);
            setSubmitError('An unexpected error occurred.');
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>Login</title>
                    <meta name="description" content="Login Page" />
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
                                    value={values.Email}
                                    onChange={handleChange('Email')}
                                />
                                {values.errors.Email && (
                                    <FormHelperText sx={{ color: 'red' }}>
                                        {values.errors.Email}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="password">
                                    <Typography variant="subtitle1">{t('Password')}</Typography>
                                </label>

                                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                                    <OutlinedInput
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        onChange={handleChange('Pword')}
                                        fullWidth
                                        placeholder={t('Enter your password')}
                                        value={values.Pword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {values.errors.Pword && (
                                        <FormHelperText sx={{ color: 'red', marginLeft: '0' }}>
                                            {values.errors.Pword}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.rememberMe}
                                                onChange={e =>
                                                    setValues({
                                                        ...values,
                                                        rememberMe: e.target.checked,
                                                    })
                                                }
                                                size="small"
                                            />
                                        }
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
                            <Grid item xs={12} sx={{ mt: 4 }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    size="large"
                                    sx={{ py: '13px' }}
                                    fullWidth
                                    onClick={handleLogin}
                                >
                                    <Typography variant="button">{t('Sign in')}</Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                    <Typography variant="body1">
                                        {t("Don't have an account?")}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                                        <Link href="/signup">{t('Sign up')}</Link>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </>
        </AuthLayout>
    );
};

export default Login;
