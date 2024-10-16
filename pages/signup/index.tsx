import React from 'react';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { countries } from '@/constants/countries';
import { useAddUserMutation } from '@/store/Register/RegisterApi';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

interface State {
    p_Mail: string;
    CNAME: string;
    TEL: string;
    NAT: string | number;
    // NATLabel: string;
    C_ADDRESS: string;
    C_PASS: string;
    showPassword: boolean;
    RememberMe: boolean;
    emailError: string;
    errors: {
        p_Mail?: string;
        CNAME?: string;
        TEL?: string;
        NAT?: string;
        C_ADDRESS?: string;
        C_PASS?: string;
    };
}

interface Props {}

const Index: NextPage<Props> = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [values, setValues] = React.useState<State>({
        p_Mail: '',
        CNAME: '',
        TEL: '',
        NAT: '',
        // NATLabel: '', 
        C_ADDRESS: '',
        C_PASS: '',
        RememberMe: false,
        showPassword: false,
        emailError: '',
        errors: {},
    });

    const [addUser] = useAddUserMutation();

    const handleChange = (prop: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: e.target.value,
            emailError: '',
        });
    };

    const handleAdd = () => {
        const newErrors: State['errors'] = {};

        if (!values.p_Mail) newErrors.p_Mail = 'Email is required';
        if (!values.CNAME) newErrors.CNAME = 'Full name is required';
        if (!values.TEL) newErrors.TEL = 'Phone number is required';
        if (!values.NAT) newErrors.NAT = 'Nationality is required';
        if (!values.C_ADDRESS) newErrors.C_ADDRESS = 'Address is required';
        if (!values.C_PASS) newErrors.C_PASS = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setValues(prev => ({ ...prev, errors: newErrors }));
            toast.error('Please fill in all required fields.');
            return;
        }

        const formattedData = {
            p_Mail: values.p_Mail,
            TEL: String(values.TEL),
            CNAME: values.CNAME,
            NAT: String(values.NAT),
            C_ADDRESS: values.C_ADDRESS,
            C_PASS: values.C_PASS,
            RememberMe: values.RememberMe,
        };

        addUser(formattedData)
            .unwrap()
            .then(response => {
                if (response?.OTP === 'This Mail already Exist') {
                    setValues(prev => ({
                        ...prev,
                        emailError: response.OTP,
                        errors: { ...prev.errors, p_Mail: response.OTP },
                    }));
                    toast.error(response.OTP);
                } else if (response?.OTP === 'This Phone already Exist') {
                    setValues(prev => ({
                        ...prev,
                        errors: { ...prev.errors, TEL: response.OTP },
                    }));
                    toast.error(response.OTP);
                } else if (response?.OTP === 'Please Review Your Mail') {
                    console.log('User added successfully:', response);
                    localStorage.setItem('email', values.p_Mail);
                    localStorage.setItem('password', values.C_PASS);
                    // localStorage.setItem('natLabel', countries.find(c => c.value === values.NAT)?.label || '');
                    setValues({
                        p_Mail: '',
                        CNAME: '',
                        TEL: '',
                        NAT: '',
                        // NATLabel: '', 
                        C_ADDRESS: '',
                        C_PASS: '',
                        RememberMe: false,
                        showPassword: false,
                        emailError: '',
                        errors: {},
                    });

                    toast.success(
                        'Registration successful. Please check your email to verify your account.'
                    );
                    router.push('/VerifyEmail');
                } else {
                    console.warn('Unexpected response:', response);
                    toast.error('Unexpected response from the server.');
                }
            })

            .catch(error => {
                console.error('Error setting up request:', error.message);
                if (error.response) {
                    toast.error(`Server error: ${error.response.data.message}`);
                } else if (error.request) {
                    toast.error('Network error: No response received from the server');
                } else {
                    toast.error('Request error: ' + error.message);
                }
            });
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
                <ToastContainer />
                <Head>
                    <title> Sign Up </title>
                    <meta name="description" content="Sign Up Page" />
                </Head>
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            Register
                        </Typography>
                        <Grid container direction="column" spacing={3}>
                            {/* username */}
                            <Grid item xs={12}>
                                <label htmlFor="Fullname">
                                    <Typography variant="subtitle1">{t('Full name')}</Typography>
                                </label>
                                <TextField
                                    id="Fullname"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Full Name')}
                                    sx={{ mt: 1 }}
                                    value={values.CNAME}
                                    onChange={handleChange('CNAME')}
                                    error={!!values.errors.CNAME}
                                    helperText={values.errors.CNAME}
                                />
                            </Grid>
                            {/* email */}
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
                                    type="email"
                                    placeholder={t('Enter your email')}
                                    sx={{ mt: 1 }}
                                    value={values.p_Mail}
                                    onChange={handleChange('p_Mail')}
                                    error={!!values.errors.p_Mail || !!values.emailError}
                                    helperText={values.errors.p_Mail || values.emailError}
                                />
                            </Grid>
                            {/* phone number */}
                            <Grid item xs={12}>
                                <label htmlFor="phoneNumber">
                                    <Typography variant="subtitle1">{t('Phone number')}</Typography>
                                </label>
                                <TextField
                                    id="phoneNumber"
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                    placeholder={t('Enter your phone Number')}
                                    sx={{ mt: 1 }}
                                    value={values.TEL}
                                    onChange={handleChange('TEL')}
                                    error={!!values.errors.TEL}
                                    helperText={values.errors.TEL}
                                />
                            </Grid>
                            {/* nationality */}
                            <Grid item xs={12}>
                                <label htmlFor="country">
                                    <Typography variant="subtitle1">{t('Nationality')}</Typography>
                                </label>

                                <Autocomplete
                                    id="country"
                                    sx={{ width: '100%' }}
                                    options={countries}
                                    autoHighlight
                                    getOptionLabel={option => option.label}
                                    onChange={(event, newValue) => {
                                        setValues({
                                            ...values,
                                            NAT: newValue ? newValue.value : '',
                                            // NATLabel: newValue ? newValue.label : '',
                                        });
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            placeholder="Choose a country"
                                            error={!!values.errors.NAT}
                                            helperText={values.errors.NAT}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* address */}
                            <Grid item xs={12}>
                                <label htmlFor="Address">
                                    <Typography variant="subtitle1">{t('Address')}</Typography>
                                </label>
                                <TextField
                                    id="Address"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Address')}
                                    sx={{ mt: 1 }}
                                    value={values.C_ADDRESS}
                                    onChange={handleChange('C_ADDRESS')}
                                    error={!!values.errors.C_ADDRESS}
                                    helperText={values.errors.C_ADDRESS}
                                />
                            </Grid>
                            {/* password */}
                            <Grid item xs={12}>
                                <label htmlFor="password">
                                    <Typography variant="subtitle1">
                                        {t('Create your password')}
                                    </Typography>
                                </label>

                                <FormControl
                                    sx={{ mt: 1, width: '100%' }}
                                    variant="outlined"
                                    error={!!values.errors.C_PASS}
                                >
                                    <OutlinedInput
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.C_PASS}
                                        onChange={handleChange('C_PASS')}
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
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {!!values.errors.C_PASS && (
                                        <FormHelperText>{values.errors.C_PASS}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 4 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ py: '13px' }}
                                    fullWidth
                                    onClick={handleAdd}
                                >
                                    <Typography variant="button">{t('Sign Up')}</Typography>
                                </Button>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                    <Typography variant="body1">
                                        {t('do you have an account?')}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                                        <Link href="/login">{t('Sign in')}</Link>
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

export default Index;
