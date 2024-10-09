import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import { useVerifyEmailMutation } from '@/store/Register/VerifyEmailApi';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

interface Props {}
const VerifyEmail: NextPage<Props> = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [OTP, setOTP] = useState<number | ''>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    const [otpError, setOtpError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const handleVerify = async () => {
        let isValid = true;

        if (OTP === '') {
            setOtpError(t('OTP is required'));
            isValid = false;
        } else {
            setOtpError(null);
        }

        if (email === '') {
            setEmailError(t('Email is required'));
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (phone === '') {
            setPhoneError(t('Phone is required'));
            isValid = false;
        } else {
            setPhoneError(null);
        }

        if (!isValid) return;
        try {
            const response = await verifyEmail({
                OTP: Number(OTP), 
                p_Mail: email,
                TEL: phone,
            }).unwrap();

            console.log(response);

            if (response.OTP === 'This Phone already Exist') {
                setPhoneError(t('This phone number already exists. Please use another number.'));
                toast.error(t('This phone number already exists!') as string);
                return;
            }

            if (response.OTP === 'OTP is Invalid/Expired') {
                setOtpError(t('The OTP is invalid or has expired. Please request a new one.'));
                toast.error(t('The OTP is invalid or has expired!') as string);
                return;
            }

            if (response.OTP === 'This Mail already Exist') {
                setEmailError(t('This email already exists. Please use another email.'));
                toast.error(t('This email already exists!') as string);
                return;
            }

            toast.success(t('Email verified successfully!') as string);
            router.push('/login');
        } catch (error) {
            console.error(error);
            setOtpError(t('Verification failed. Please check the OTP.'));
            toast.error(t('Verification failed!') as string);
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Verify Email')}</title>
                </Head>
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Verify Email')}
                        </Typography>
                        <Grid container direction="column" spacing={3}>
                            {/* Email Input */}
                            <Grid item xs={12}>
                                <label htmlFor="email">
                                    <Typography variant="subtitle1">
                                        {t('Enter your Email')}
                                    </Typography>
                                </label>
                                <TextField
                                    id="email"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your email')}
                                    sx={{ mt: 1 }}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    error={!!emailError}
                                    helperText={emailError}
                                    type="email"
                                />
                            </Grid>

                            {/* Phone Input */}
                            <Grid item xs={12}>
                                <label htmlFor="phone">
                                    <Typography variant="subtitle1">
                                        {t('Enter your Phone')}
                                    </Typography>
                                </label>
                                <TextField
                                    id="phone"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your phone number')}
                                    sx={{ mt: 1 }}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    error={!!phoneError}
                                    helperText={phoneError}
                                    type="text"
                                />
                            </Grid>

                            {/* OTP Input */}
                            <Grid item xs={12}>
                                <label htmlFor="otp">
                                    <Typography variant="subtitle1">{t('Enter OTP')}</Typography>
                                </label>
                                <TextField
                                    id="otp"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter OTP sent to your email')}
                                    sx={{ mt: 1 }}
                                    value={OTP}
                                    onChange={e => {
                                        const value = e.target.value;
                                        if (value === '' || /^\d+$/.test(value)) {
                                            setOTP(value === '' ? '' : Number(value));
                                        }
                                    }}
                                    error={!!otpError}
                                    helperText={otpError}
                                    type="number"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ py: '13px' }}
                                    fullWidth
                                    onClick={handleVerify}
                                    disabled={isLoading}
                                >
                                    <Typography variant="button">
                                        {isLoading ? t('Verifying...') : t('Verify Your Email')}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </>
        </AuthLayout>
    );
};

export default VerifyEmail;
