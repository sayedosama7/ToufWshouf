import React from 'react';
import { useTranslation } from 'react-i18next';
import { useVerifyEmailMutation } from '@/store/Register/VerifyEmailApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { VerifyEmailHandlerProps } from '@/type/type';
import Grid from '@mui/material/Grid';
const VerifyHandler: React.FC<VerifyEmailHandlerProps> = ({
    OTP,
    email,
    phone,
    setOtpError,
    setEmailError,
    setPhoneError,
    setIsLoading,
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [verifyEmail] = useVerifyEmailMutation();

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

        setIsLoading(true);
        try {
            const response = await verifyEmail({
                OTP: Number(OTP),
                p_Mail: email,
                TEL: phone,
            }).unwrap();

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

            toast.success(t('Email verified successfully!') as string, {
                className: 'toast-orange',
                autoClose: 2000,
            });
            router.push('/login');
        } catch (error) {
            console.error(error);
            setOtpError(t('Verification failed. Please check the OTP.'));
            toast.error(t('Verification failed!') as string);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Grid item xs={12} sx={{ mt: 4 }}>
            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ py: '13px' }}
                fullWidth
                onClick={handleVerify}
            >
                <Typography variant="button">{t('Verify')}</Typography>
            </Button>
        </Grid>
    );
};

export default VerifyHandler;
