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
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalServices from './AdditionalServices';
import { useRouter } from 'next/router';
import { useGetProgramGroupQuery } from '@/store/Products/FetchProgramGroupsApi';
import { useGetGroupPriceQuery } from '@/store/Products/FetchGroupPriceApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAddReservationMutation } from '@/store/Reservation/AddReservationApi';
import { useAddExtraMutation } from '@/store/Reservation/AddExtraApi';
import { useGetExtraQuery } from '@/store/Products/FetchExtraApi';
import Loading from '../Loading/Loading';
import { useAddReservationDetailsMutation } from '@/store/Reservation/AddReservationDetailsApi';
import { store } from '@/store/store';
import { toast } from 'react-toastify';

const names = ['18:00', '19:00', '20:00', '22:00', '15:00'];

interface ProgramGroupItem {
    prog_grp_no: number;
    prog_grp_from: string;
    pax_aval: number;
}
interface ExtraService {
    ext_sp: number;
    ext_srv: string;
    ext_descr: string;
    ext_price: number;
    p_category: string;
    ext_comm: number;
    ext_tax: number;
    prog_code: number;
    prog_year: number;
    item_ref: string;
}
interface Props {
    handleNext: Function;
    setTripDate: (date: string | null) => void;
}

const PassengerData: FunctionComponent<Props> = ({ handleNext, setTripDate }) => {
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

    const productGroup: ProgramGroupItem[] = useMemo(
        () => programGroupData?.items || [],
        [programGroupData]
    );

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
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (productGroup.length > 0) {
            const defaultDate = productGroup[0].prog_grp_from;
            setSelectedDate(defaultDate);
            setTripDate(defaultDate);
        }
    }, [productGroup, setTripDate]);

    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setSelectedDate(selectedValue);
        setTripDate(selectedValue);
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
    const [addReservationDetails] = useAddReservationDetailsMutation();
    const [addExtra] = useAddExtraMutation();
    const { data: extra } = useGetExtraQuery({ code, programyear });
    const extraData = extra?.items[0];

    const [errorMessage, setErrorMessage] = useState('');

    const isBrowser = typeof window !== 'undefined';

    const customerData = {
        CustCode: isBrowser ? localStorage.getItem('custcode') : null,
        TELEPHONE: isBrowser ? localStorage.getItem('TELEPHONE') : null,
    };

    useEffect(() => {
        if (programGroupData?.items?.length) {
            const firstDate = programGroupData.items[0].prog_grp_from;
            setSelectedDate(firstDate);

            const selectedGroup = programGroupData.items.find(
                (item: { prog_grp_from: string }) => item.prog_grp_from === firstDate
            );
            if (selectedGroup) {
                setSelectedPaxAval(selectedGroup.pax_aval);
                setGroupNumber(selectedGroup.prog_grp_no);
            }
        }
    }, [programGroupData]);

    if (groupPriceData && groupPriceData.items && groupPriceData.items.length > 0) {
    }

    const handlePayment = async (selectedServices: { [key: string]: number }) => {
        try {
            const progGrpNo = groupPriceData?.items?.[0]?.prog_grp_no;
            if (!progGrpNo) {
                console.error('No program group number found.');
                return;
            }

            const reservationResponse = await addReservation({
                CUST_REF: localStorage.getItem('custcode'),
                TELEPHONE: localStorage.getItem('TELEPHONE'),
                PROG_GRP_NO: progGrpNo,
                PROG_CODE: code,
                PROG_YEAR: programyear,
            }).unwrap();

            console.log('Reservation added:', reservationResponse);

            if (reservationResponse.REF_NO) {
                const REF_NO = reservationResponse.REF_NO;
                const RESSP = reservationResponse.RESSP;
                sessionStorage.setItem('ref_no', REF_NO);
                sessionStorage.setItem('Res_sp', RESSP);

                const servicesToBook = Object.entries(selectedServices).filter(
                    ([service, count]) => Number(count) > 0
                );

                if (servicesToBook.length > 0) {
                    const extraRequests = [];

                    for (const [serviceName, count] of servicesToBook) {
                        const paxData = groupPriceData.items.find(
                            (item: { pax_type: string }) => item.pax_type === serviceName
                        );

                        if (!paxData) {
                            continue;
                        }

                        let paxType: string;

                        switch (paxData.pax_type) {
                            case 'CHILD FROM 1 TO 6':
                                paxType = 'CH1';
                                break;
                            case 'CHILD FROM 6 TO 12':
                                paxType = 'CH2';
                                break;
                            case 'ADULT':
                                paxType = 'A';
                                break;
                            default:
                                console.error(`Unknown pax type: ${paxData.pax_type}`);
                                continue;
                        }

                        const reservationDetailsResponse = await addReservationDetails({
                            REF_NO: sessionStorage.getItem('ref_no'),
                            RESSP: sessionStorage.getItem('Res_sp'),
                            CUST_REF: localStorage.getItem('custcode'),
                            CODE: code,
                            YEAR: programyear,
                            PAX_TYPE: paxType,
                            PAX_COUNT: count,
                        }).unwrap();

                        if (
                            reservationDetailsResponse.Error &&
                            reservationDetailsResponse.Error === 'You insert this type last'
                        ) {
                            console.error('Error: This type was added previously.');
                            toast.error('Error: This type was added previously.');
                            return;
                        }

                        if (extraData?.ext_srv && extraData?.p_category && extraData?.item_ref) {
                            extraRequests.push({
                                CUST_REF: localStorage.getItem('custcode'),
                                REF_NO: sessionStorage.getItem('ref_no'),
                                RES_SP: sessionStorage.getItem('Res_sp'),
                                SRV_TYPE: extraData.ext_srv,
                                PAX_TYPE: extraData.p_category,
                                PAX_COUNT: count,
                                ITEM_REF: extraData.item_ref,
                            });
                        }
                    }

                    if (extraRequests.length > 0) {
                        for (const extraRequest of extraRequests) {
                            const extraResponse = await addExtra({
                                code: code,
                                year: programyear,
                                ...extraRequest,
                            }).unwrap();

                            if (
                                extraResponse.Error &&
                                extraResponse.Error === 'You insert this type last'
                            ) {
                                console.error(
                                    'Error: This type was added previously for extra services.'
                                );
                                toast.error(
                                    'Error: This type was added previously for extra services.'
                                );
                                return;
                            }
                        }
                    }
                }

                handleNext();
            } else {
                console.error('Reservation was not successful:', reservationResponse);
            }
        } catch (error) {
            console.error('Error during payment process:', error);
        }
    };

    return (
        <Box sx={{ mt: 5 }}>
            {programGroupLoading || groupPriceLoading ? (
                <Loading />
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
                        setTotalPrice={setTotalPrice}
                        services={additionalServices}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
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
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handlePayment(selectedServices);
                                }}
                            >
                                {t('Proceed to Payment')}
                            </Button>
                        </Grid>
                        {errorMessage && (
                            <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
                                {errorMessage}
                            </Typography>
                        )}
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
