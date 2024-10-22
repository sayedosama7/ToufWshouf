import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import { ToastContainer, toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useLazyForgetPassQuery } from '@/store/ForgetPassword/FetchForgetPassDataApi';
import Loading from '@/components/Loading/Loading';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const ForgetPassword: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [triggerForgetPass, { data, error, isLoading }] = useLazyForgetPassQuery();

    useEffect(() => {
        if (data) {
            setLoading(false);
            if (data?.item[0]?.OTP) {
                toast.success('Please Review Your Mail', {
                    className: 'toast-orange',
                    autoClose: 2000,
                });

                setTimeout(() => {
                    router.push('/ForgetPassword/Otp');
                }, 2000);
            } else if (data?.item[0]?.Error) {
                setLoading(false);
                toast.error('Your Mail Not Found. Please check and try again.');
            }
        }

        if (error && 'status' in error) {
            setLoading(false);
            const fetchError = error as FetchBaseQueryError;

            if (fetchError.status === 404 && fetchError.data) {
                const errorData = fetchError.data as { item: [{ Error: string }] };
                toast.error(errorData.item[0].Error);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } else if (error) {
            toast.error('An unexpected error occurred.');
        }
    }, [data, error, router]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email) {
            toast.error('Email is required');
            return;
        }

        try {
            sessionStorage.setItem('userEmailverify', email);

            setLoading(true);
            await triggerForgetPass({ Email: email });
        } catch (err) {
            setLoading(false);
            console.log('Error:', err);
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Forget Password')}</title>
                    <meta name="description" content="Forget Password Page" />
                </Head>
                {loading && <Loading />}
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Forget Password')}
                        </Typography>

                        <form onSubmit={handleSubmit}>
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
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ py: '13px' }}
                                        fullWidth
                                        disabled={isLoading || loading}
                                    >
                                        <Typography variant="button">
                                            {isLoading || loading ? t('Sending...') : t('Send')}
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Paper>
            </>
        </AuthLayout>
    );
};

export default ForgetPassword;
