import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { VerificationFormProps } from '@/type/type';

const VerificationForm: React.FC<VerificationFormProps> = ({
    OTP,
    email,
    phone,
    setOTP,
    setEmail,
    setPhone,
    otpError,
    emailError,
    phoneError,
}) => {
    const { t } = useTranslation();

    return (
        <Grid container direction="column" spacing={3}>
            {/* Email Input */}
            <Grid item xs={12}>
                <label htmlFor="email">
                    <Typography variant="subtitle1">{t('Enter your Email')}</Typography>
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
                    <Typography variant="subtitle1">{t('Enter your Phone')}</Typography>
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
        </Grid>
    );
};

export default VerificationForm;
