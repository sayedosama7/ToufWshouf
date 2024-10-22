import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/AuthLayout';
import { ToastContainer } from 'react-toastify';
import VerifyHandler from './_components/VerifyHandler';
import VerificationForm from './_components/VerificationForm';
import Loading from '@/components/Loading/Loading';

interface Props {}
const VerifyEmail: NextPage<Props> = () => {
    const { t } = useTranslation();
    const [OTP, setOTP] = useState<number | ''>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Verify Email')}</title>
                    <meta name="description" content="Verify Email Page" />
                </Head>
                {isLoading && <Loading />}

                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Verify Email')}
                        </Typography>
                        <VerificationForm
                            OTP={OTP}
                            email={email}
                            phone={phone}
                            setOTP={setOTP}
                            setEmail={setEmail}
                            setPhone={setPhone}
                            otpError={otpError}
                            emailError={emailError}
                            phoneError={phoneError}
                            setOtpError={setOtpError}
                            setEmailError={setEmailError}
                            setPhoneError={setPhoneError}
                        />
                        <VerifyHandler
                            OTP={OTP}
                            email={email}
                            phone={phone}
                            setOtpError={setOtpError}
                            setEmailError={setEmailError}
                            setPhoneError={setPhoneError}
                            setIsLoading={setIsLoading}
                        />
                    </Container>
                </Paper>
            </>
        </AuthLayout>
    );
};

export default VerifyEmail;
