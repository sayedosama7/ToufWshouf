import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { countries } from '@/constants/countries';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { RegisterProps } from '@/type/type';
const RegistrationForm: React.FC<RegisterProps> = ({
    handleAdd,
    values,
    handleChange,
    handleClickShowPassword,
    setValues,
}) => {
    const { t } = useTranslation();

    return (
        <Paper elevation={0}>
            <Container sx={{ py: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                    Register
                </Typography>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    {/* username */}
                    <Grid>
                        <Grid item xs={12} sx={{ mt: 4 }}>
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
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <label htmlFor="email">
                                <Typography variant="subtitle1">{t('Email Address')}</Typography>
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
                        <Grid item xs={12} sx={{ mt: 2 }}>
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
                        <Grid item xs={12} sx={{ mt: 2 }}>
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
                                        sx={{ mt: 1 }}
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
                        <Grid item xs={12} sx={{ mt: 2 }}>
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
                        <Grid item xs={12} sx={{ mt: 2 }}>
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
                            >
                                <Typography variant="button">{t('Sign up')}</Typography>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mt: 1 }}
                            >
                                <Typography variant="body1">
                                    {t('Do you have an account?')}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: 'primary.main', marginLeft: '4px' }}
                                >
                                    <Link href="/login">{t('Sign in')}</Link>
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Paper>
    );
};

export default RegistrationForm;
