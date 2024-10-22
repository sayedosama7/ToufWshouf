import { useResetPasswordMutation } from '@/store/ForgetPassword/ResetPasswordApi';
import React, { useState } from 'react';
import AuthLayout from '@/components/AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Loading from '@/components/Loading/Loading';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';

const ResetPasswordComponent = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length <= 5) {
            toast.error('Please Enter At Least 6 Charachters');
            return;
        }
        const email = sessionStorage.getItem('userEmailverify');
        const Otp = sessionStorage.getItem('Otp-Verify');
        const transNoString = sessionStorage.getItem('Otp-TransNo');

        const vOtp = Otp ? parseInt(Otp, 10) : null;
        const transNumber = transNoString ? parseInt(transNoString, 10) : null;

        if (email && vOtp !== null && transNumber !== null) {
            try {
                const result = await resetPassword({
                    V_OTP: vOtp,
                    Email: email,
                    TransNo: transNumber,
                    pass: newPassword,
                }).unwrap();

                toast.success('Password Updated Successfully', {
                    className: 'toast-orange',
                    autoClose: 2000,
                });

                sessionStorage.removeItem('Otp-TransNo');
                sessionStorage.removeItem('Otp-Verify');
                sessionStorage.removeItem('userEmailverify');

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } catch (err) {
                console.error('API response error:', err);
                toast.error('unexpected error please try again');
            }
        } else {
            console.error('Missing required session storage values');
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Reset Password')}</title>
                    <meta name="description" content="Reset Password Page" />
                </Head>
                {isLoading && <Loading />}
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Reset Your Password')}
                        </Typography>

                        <form onSubmit={handleResetPassword}>
                            <Grid container direction="column" spacing={3}>
                                {/* Password Input */}
                                <Grid item xs={12}>
                                    <label htmlFor="password">
                                        <Typography variant="subtitle1">
                                            {t('Enter Your New Password')}
                                        </Typography>
                                    </label>
                                    <TextField
                                        id="V_password"
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('Enter password')}
                                        sx={{ mt: 1 }}
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOffIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
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
                                            {isLoading ? t('Updateing...') : t('Update')}
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

export default ResetPasswordComponent;
