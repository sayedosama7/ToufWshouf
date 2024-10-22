import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useGetPaymentQuery } from '@/store/Reservation/FetchPaymentApi';
import PaymentForm from '@/components/Booking/PaymentForm';

interface Props {
    handleBack: Function;
    handleNext: Function;
    tripDate: string | null;
}

const Payment: React.FC<Props> = ({ handleBack, handleNext, tripDate }) => {
    const { t } = useTranslation();
    const ref = sessionStorage.getItem('ref_no');
    const sp = sessionStorage.getItem('Res_sp');
    const customer_ref = localStorage.getItem('custcode');

    const { data } = useGetPaymentQuery(ref && sp ? { ref, sp } : { skip: true });
    const paymentData = data?.items || [];
    console.log(paymentData);

    const total = paymentData[6]?.['Total '] || 0;
    const vat = paymentData[6]?.['Vat '] || 0;
    const totalWithVat = paymentData[6]?.['TheTotalincludesVat '] || 0;
    const trimmedTotal = typeof total === 'number' ? total : total.trim();
    const trimmedVat = typeof vat === 'number' ? vat : vat.trim();
    const trimmedTotalWithVat =
        typeof totalWithVat === 'number' ? totalWithVat : totalWithVat.trim();
    const totalWithoutAdditionalService = paymentData[4]?.TheTotalwithoutadditionalservice || 0;
    const totalAdditionalService = paymentData[5]?.TheTotaladditionalservice || 0;
    const numberOfAdults = paymentData[1]?.TheNumberOfADULTX || 0;
    const numberOfChildrenUnder6 = paymentData[2]?.['TheNumberOfCHILD FROM 1 TO 6X'] || 0;
    const numberOfChildrenBetween6And12 = paymentData[3]?.['TheNumberOfCHILD FROM 6 TO 12X'] || 0;
    const programname = paymentData[0]?.programname || 'null';

    return (
        <div>
            <Grid container spacing={5}>
                <Grid xs={7} item>
                    <PaymentForm />
                </Grid>
                <Grid xs={5} item>
                    <Paper elevation={1} sx={{ backgroundColor: '#FAFAFA', p: 2, mt: 5 }}>
                        <Typography variant="h3">{programname}</Typography>
                        <Stack sx={{ mt: 3 }} direction="column" spacing={2}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Trip Date ')}:</Typography>
                                <Typography variant="body2">
                                    {tripDate
                                        ? new Date(tripDate).toLocaleDateString()
                                        : t('No date selected')}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Customer Ref')}:</Typography>
                                <Typography variant="body1">{customer_ref}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Reservation Ref')}:</Typography>
                                <Typography variant="body1">{ref}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Number of Adult:')}</Typography>
                                <Typography variant="body1">{numberOfAdults}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Number of Children (1-6):')}
                                </Typography>
                                <Typography variant="body1">{numberOfChildrenUnder6}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Number of Children (6-12):')}
                                </Typography>
                                <Typography variant="body1">
                                    {numberOfChildrenBetween6And12}
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Total Without Additional Services')}:
                                </Typography>
                                <Typography variant="body1">
                                    {totalWithoutAdditionalService}
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Additional Service Total')}:
                                </Typography>
                                <Typography variant="body1">{totalAdditionalService}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Total')}:</Typography>
                                <Typography variant="body1">{trimmedTotal}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('VAT')}:</Typography>
                                <Typography variant="body1">{trimmedVat}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Total with VAT')}:</Typography>
                                <Typography variant="body1">{trimmedTotalWithVat}</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container sx={{ my: 3 }} justifyContent="space-between">
                <Grid item xs={3}>
                    <Button onClick={() => handleNext()} variant="contained" fullWidth size="large">
                        {t('Confirm')}
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" onClick={() => handleBack()} fullWidth size="large">
                        {t('Back')}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Payment;
