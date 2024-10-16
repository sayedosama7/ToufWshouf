import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FunctionComponent, Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Counter from './Counter';
import { useGetExtraQuery } from '@/store/Products/FetchExtraApi';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Service {
    title: string;
    subtitle: string;
    price: number;
}

interface Props {
    numberOfPeople: number | null;
    services: Service[];
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
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

const AdditionalServices: FunctionComponent<Props> = ({
    numberOfPeople,
    services,
    setTotalPrice,
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { code, programyear } = router.query;

    const { data: extraServicesData, error, isLoading } = useGetExtraQuery({ code, programyear });

    const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});

    const updatePrice = (
        serviceName: string,
        servicePrice: number,
        count: number,
        type: 'increase' | 'decrease'
    ) => {
        setSelectedServices(prevServices => {
            const currentCount = prevServices[serviceName] || 0;
            let newCount;

            if (type === 'increase') {
                newCount = currentCount + count;
            } else {
                newCount = Math.max(currentCount - count, 0);
            }

            return {
                ...prevServices,
                [serviceName]: newCount,
            };
        });

        if (type === 'increase') {
            setTotalPrice(prevPrice => prevPrice + servicePrice * count);
        } else if (type === 'decrease') {
            setTotalPrice(prevPrice => prevPrice - servicePrice * count);
        }
    };

    const handlePay = () => {
        const servicesToBook = Object.entries(selectedServices)
            .filter(([service, count]) => count > 0)
            .map(([service, count]) => ({
                service,
                count,
            }));

        if (servicesToBook.length === 0) {
            console.log('No services selected');
            return;
        }

        servicesToBook.forEach(({ service, count }) => {
            console.log(`Service: ${service}, Count: ${count}`);
        });
    };

    if (isLoading) return <Typography>Loading extra services...</Typography>;
    if (error) return <Typography>Error loading extra services.</Typography>;

    return (
        <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={6}>
                <Paper elevation={1} sx={{ backgroundColor: 'gray.light', p: 3 }}>
                    <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                        {t('Number of people')}
                        <span style={{ color: 'red', marginLeft: '8px' }}>
                            {numberOfPeople !== null ? numberOfPeople : 0}
                        </span>
                    </Typography>

                    {Array.isArray(services) && services.length > 0 ? (
                        services.map(({ title, subtitle, price }, index) => (
                            <Counter
                                key={index}
                                title={title}
                                subtitle={`${subtitle}  ${price} EGP`}
                                onChange={(count, type) => updatePrice(title, price, count, type)}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ color: 'gray.main' }}>
                            No services available
                        </Typography>
                    )}
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={1} sx={{ backgroundColor: 'gray.light', p: 3 }}>
                    <Typography variant="h5">{t('Additional Services')}</Typography>
                    {extraServicesData?.items.length > 0 ? (
                        extraServicesData.items.map(
                            (item: ExtraService, index: Key | null | undefined) => (
                                <Counter
                                    key={index}
                                    title={item.ext_srv}
                                    subtitle={`${item.ext_descr} - ${item.ext_price} EGP - for ${item.p_category}`}
                                    onChange={(count, type) =>
                                        updatePrice(item.ext_srv, item.ext_price, count, type)
                                    }
                                />
                            )
                        )
                    ) : (
                        <Typography variant="body2" sx={{ color: 'gray.main' }}>
                            No additional services available
                        </Typography>
                    )}
                </Paper>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handlePay}>
                    Pay
                </Button>
            </Stack>
        </Grid>
    );
};

export default AdditionalServices;
