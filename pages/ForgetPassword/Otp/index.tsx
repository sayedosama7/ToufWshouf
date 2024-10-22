import React, { useState } from 'react';
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
import Loading from '@/components/Loading/Loading';
import { useVerifyPasswordMutation } from '@/store/ForgetPassword/VerifyPasswordApi';

const PasswordOtp: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [verifyPassword, { isLoading }] = useVerifyPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = sessionStorage.getItem('userEmailverify');

        if (!email) {
            toast.error(t('Please Enter Your Email') as string);
            return;
        } else if (!otp) {
            toast.error(t('Please Enter Otp Number') as string);
            return;
        }

        try {
            sessionStorage.setItem('Otp-Verify', otp);

            setTimeout(() => {
                sessionStorage.removeItem('Otp-Verify');
            }, 60000 * 2);

            const response = await verifyPassword({ V_OTP: parseInt(otp), Email: email }).unwrap();

            sessionStorage.setItem('Otp-TransNo', response.TransactionNo);

            setTimeout(() => {
                sessionStorage.removeItem('Otp-TransNo');
            }, 60000 * 2);

            toast.success(t('OTP verified successfully!') as string);
            router.push('./RestPassword');
        } catch (error: any) {
            const errorMessage = error?.data?.OTP || t('Failed to verify OTP. Please try again.');
            toast.error(errorMessage as string);
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
                {isLoading && <Loading />}
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Otp Number')}
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={3}>
                                {/* OTP Input */}
                                <Grid item xs={12}>
                                    <label htmlFor="otp">
                                        <Typography variant="subtitle1">
                                            {t('Chech Your Email And Enter Otp Number')}
                                        </Typography>
                                    </label>
                                    <TextField
                                        id="otp"
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('Enter otp number')}
                                        sx={{ mt: 1 }}
                                        type="text"
                                        value={otp}
                                        onChange={e => setOtp(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ py: '13px' }}
                                        fullWidth
                                        disabled={isLoading}
                                    >
                                        <Typography variant="button">
                                            {isLoading ? t('Sending...') : t('Send')}
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

export default PasswordOtp;
