import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LoginProps } from '@/type/type';
const LoginForm: React.FC<LoginProps> = ({
    values,
    handleChange,
    handleClickShowPassword,
    handleSubmit,
    setRememberMe,
}) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={0}>
            <Container sx={{ py: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                    Sign in
                </Typography>
                <Grid container direction="column" spacing={4}>
                    <Grid item xs={12}>
                        <label htmlFor="email">
                            <Typography variant="subtitle1">{t('Email Address')}</Typography>
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
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.rememberMe}
                                        onChange={e => setRememberMe(e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={t('Remember me')}
                                sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}
                            />
                            <Link href="/ForgetPassword">
                                <Typography
                                    variant="caption"
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'primary.main',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {t('Forgot Password?')}
                                </Typography>
                            </Link>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="button"
                            variant="contained"
                            size="large"
                            sx={{ py: '13px' }}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            <Typography variant="button">{t('Sign in')}</Typography>
                        </Button>
                    </Grid>

                    <Grid item>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <Typography variant="body1">{t("Don't have an account?")}</Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: 'primary.main', marginLeft: '4px' }}
                            >
                                <Link href="/signup">{t('Sign up')}</Link>
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default LoginForm;
