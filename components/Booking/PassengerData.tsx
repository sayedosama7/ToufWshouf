import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalServices from './AdditionalServices';
import { useRouter } from 'next/router';
import { useGetProgramGroupQuery } from '@/store/Products/FetchProgramGroupsApi';
import { useGetGroupPriceQuery } from '@/store/Products/FetchGroupPriceApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAddReservationMutation } from '@/store/Reservation/AddReservationApi';
import { useAddExtraMutation } from '@/store/Reservation/AddExtraApi';
import { useGetExtraQuery } from '@/store/Products/FetchExtraApi';
// import axios from 'axios';

const names = ['18:00', '19:00', '20:00', '22:00', '15:00'];

interface ProgramGroupItem {
    prog_grp_no: number;
    prog_grp_from: string;
    pax_aval: number;
}

interface Props {
    handleNext: Function;
}

const PassengerData: FunctionComponent<Props> = ({ handleNext }) => {
    const { t } = useTranslation();
    const [personName, setPersonName] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPaxAval, setSelectedPaxAval] = useState<number | null>(null);
    const [groupNumber, setGroupNumber] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const router = useRouter();
    const { code, programyear } = router.query;
    const programYear = typeof programyear === 'string' ? Number(programyear) : undefined;

    const {
        data: programGroupData,
        error: programGroupError,
        isLoading: programGroupLoading,
    } = useGetProgramGroupQuery({ code, programyear });

    const {
        data: groupPriceData,
        isLoading: groupPriceLoading,
        error: groupPriceError,
    } = useGetGroupPriceQuery(
        groupNumber !== null ? { code, programyear, groupNo: groupNumber } : skipToken
    );

    const productGroup: ProgramGroupItem[] = programGroupData?.items || [];

    useEffect(() => {
        if (programGroupData?.items && programGroupData.items.length > 0) {
            const firstDate = programGroupData.items[0].prog_grp_from;
            setSelectedDate(firstDate);

            const selectedGroup = programGroupData.items.find(
                (item: ProgramGroupItem) => item.prog_grp_from === firstDate
            );

            if (selectedGroup) {
                setSelectedPaxAval(selectedGroup.pax_aval);
                setGroupNumber(selectedGroup.prog_grp_no);
            }
        }
    }, [programGroupData?.items]);

    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setSelectedDate(selectedValue);

        const selectedGroup = productGroup.find(item => item.prog_grp_from === selectedValue);

        if (selectedGroup) {
            setSelectedPaxAval(selectedGroup.pax_aval);
            setGroupNumber(selectedGroup.prog_grp_no);
        } else {
            console.error('No group found for the selected date');
            setGroupNumber(null);
        }
    };

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
    };

    const additionalServices = groupPriceData?.items.map((item: any) => ({
        title: item.pax_type,
        subtitle: `Price : `,
        price: item.p_price,
    }));

    const [addReservation] = useAddReservationMutation();
    const [addExtra] = useAddExtraMutation();
    const { data: extra } = useGetExtraQuery({ code, programyear });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const customerData = {
        CustCode: localStorage.getItem('custcode'),
        TELEPHONE: localStorage.getItem('TELEPHONE'),
    };

    useEffect(() => {
        if (programGroupData?.items && programGroupData.items.length > 0) {
            const firstDate = programGroupData.items[0].prog_grp_from;
            setSelectedDate(firstDate);

            const selectedGroup = programGroupData.items.find(
                (item: ProgramGroupItem) => item.prog_grp_from === firstDate
            );

            if (selectedGroup) {
                setSelectedPaxAval(selectedGroup.pax_aval);
                setGroupNumber(selectedGroup.prog_grp_no);
            }
        }
    }, [programGroupData?.items]);

    if (groupPriceData && groupPriceData.items && groupPriceData.items.length > 0) {
    }

    const handlePay = async () => {
        const progGrpNo = groupPriceData.items[0].prog_grp_no; 
    
        setIsLoading(true);
        setErrorMessage('');
    
        try {
            // إرسال بيانات الحجز
            const reservationResponse = await addReservation({
                CUST_REF: customerData.CustCode,
                TELEPHONE: customerData.TELEPHONE,
                PROG_GRP_NO: progGrpNo,
                PROG__CODE: code,
                PROG_YEAR: programyear,
                PAX_TYPE: groupPriceData.items[0].pax_type,
                PAX_COUNT: selectedPaxAval,
            }).unwrap();
    
            console.log('Reservation added successfully:', reservationResponse);
    
            // بعد نجاح الحجز، إرسال البيانات الإضافية
            const extraServiceResponse = await addExtra({
                CUST_REF: customerData.CustCode,
                REF_NO: reservationResponse.REF_NO,
                RES_SP: reservationResponse.RESSP,
                SRV_TYPE: reservationResponse.p_category,
                PAX_TYPE: groupPriceData.items[0].pax_type,
                PAX_COUNT: selectedPaxAval,
                ITEM_REF: extra.item_ref, 
            }).unwrap();
    
            console.log('Extra services added successfully:', extraServiceResponse);
    
            handleNext();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error during reservation or extra service:', error.message);
                setErrorMessage('Failed to complete the reservation. Please try again.');
            } else if (typeof error === 'object' && error !== null && 'response' in error) {
                console.error('API Error:', (error as any).response?.data || error);
                setErrorMessage('Failed to complete the reservation. Please try again.');
            } else {
                console.error('Unexpected error:', error);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    // const handlePay = async () => {
    //     try {
    //         const code = '9'; // مثال لقيمة code
    //         const year = '2024'; // مثال لقيمة year

    //         const url = `http://app.misrtravelco.net:4444/ords/invoice/programes/ExtraProgram/${code}/${year}`;

    //         const body = new FormData();
    //         body.append('CUST_REF', '10');
    //         body.append('REF_NO', '770060');
    //         body.append('RES_SP', '48');
    //         body.append('SRV_TYPE', 'TOR');
    //         body.append('PAX_TYPE', 'CH1');
    //         body.append('PAX_COUNT', '2');
    //         body.append('ITEM_REF', 'TOU-102024E1148CH1');
            

    //         // تمرير code و year كـ query parameters
    //         const response = await axios.post(url, body, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });
            
    //         console.log('Reservation added successfully:', response.data);
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             // تعامل مع أخطاء Axios فقط
    //             if (error.response) {
    //                 console.error('Server error:', error.response.data);
    //                 alert('There was an issue with the request. Please try again later or contact support.');
    //             } else if (error.request) {
    //                 console.error('No response from server:', error.request);
    //             } else {
    //                 console.error('Error setting up the request:', error.message);
    //             }
    //         } else {
    //             // إذا كان الخطأ ليس من Axios، تعامل معه هنا
    //             console.error('An unexpected error occurred:', error);
    //         }}
    // };

    return (
        <Box sx={{ mt: 5 }}>
            {programGroupLoading || groupPriceLoading ? (
                <p>Loading...</p>
            ) : programGroupError || groupPriceError ? (
                <p>Error loading details.</p>
            ) : (
                <>
                    <Grid container spacing={4}>
                        <Grid item xs={2.5}>
                            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                                <Select
                                    id="date-select"
                                    sx={{ backgroundColor: 'body.light' }}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    displayEmpty
                                    input={<OutlinedInput />}
                                    fullWidth
                                    placeholder={t('Pick a date')}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            sx={{ color: 'main.lightGray' }}
                                        >
                                            <InsertInvitationRoundedIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem disabled value="">
                                        <em>{t('Pick a date')}</em>
                                    </MenuItem>
                                    {productGroup.map((item: ProgramGroupItem) => (
                                        <MenuItem key={item.prog_grp_no} value={item.prog_grp_from}>
                                            {new Date(item.prog_grp_from).toLocaleDateString()}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2.5}>
                            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                                <Select
                                    id="Trip type"
                                    sx={{ backgroundColor: 'body.light' }}
                                    displayEmpty
                                    input={<OutlinedInput />}
                                    fullWidth
                                    value={personName}
                                    onChange={handleChange}
                                    placeholder="Trip type"
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <Box sx={{ color: '#B7B7B7' }}>Time</Box>;
                                        }
                                        return selected.join(', ');
                                    }}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            sx={{ color: 'main.lightGray' }}
                                        >
                                            <UpdateIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem disabled value="">
                                        <em>Time</em>
                                    </MenuItem>
                                    {names.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <AdditionalServices
                        numberOfPeople={selectedPaxAval}
                        services={additionalServices}
                        setTotalPrice={setTotalPrice}
                    />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ py: 2, mt: 3 }}
                    >
                        <Typography variant="subtitle1">{t('Total')}</Typography>
                        <Typography variant="subtitle1">{totalPrice} EGP</Typography>
                    </Stack>
                    <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                        {t('The total includes VAT')}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="I Accept Terms And Conditions and Cancellation policy"
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: 'secondary.main', ml: '-5px' }}
                        >
                            <Link href="/">Read Terms and conditions</Link>
                        </Typography>
                    </Stack>

                    <Grid container sx={{ my: 3 }} justifyContent="space-between">
                        <Grid item xs={3}>
                            <Button onClick={handlePay} variant="contained" fullWidth size="large">
                                {t('Pay')}
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="outlined"
                                onClick={() => handleNext()}
                                sx={{ mr: 1 }}
                                fullWidth
                                size="large"
                            >
                                {t('Add to my shopping cart')}
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default PassengerData;
