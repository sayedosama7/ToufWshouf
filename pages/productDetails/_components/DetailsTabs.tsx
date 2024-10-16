/* eslint-disable react-hooks/exhaustive-deps */
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Avatar from '@mui/material/Avatar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetImgQuery } from '@/store/Products/FetchImagesApi';
import BookButton from './BookButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetReviewQuery } from '@/store/Products/FetchReviewApi';
import { useGetSupplementQuery } from '@/store/Products/FetchSupplementApi';
import UserRating from '@/components/products/UserRating';
import ReviewForm from '../ReviewForm';
interface Props {
    id: string | number | undefined;
    productData: {
        code: number;
        programyear: number;
        programname: string;
        rating: number;
        startprice?: number;
        img_path: string;
        offerPrice?: number | null;
        OverView: string;
        startDate: string;
        endDate: string;
    };
}
interface Supplement {
    code: number;
    'the price includes supplement': string;
}

const DetailsTabs: FunctionComponent<Props> = ({ id, productData }) => {
    const { t } = useTranslation();
    const router = useRouter();
    // const { code, programyear } = router.query;
    const [value, setValue] = React.useState(0);

    const code = router.query.code ? parseInt(router.query.code as string, 10) : undefined;
    const programyear = router.query.programyear
        ? parseInt(router.query.programyear as string, 10)
        : undefined;
    // fetch images
    const { data, error, isLoading } = useGetImgQuery({ code, programyear });
    const tripImages = data?.items || [];

    const [loadingImages, setLoadingImages] = useState(true);
    useEffect(() => {
        if (tripImages.length > 0 || error) {
            setLoadingImages(false);
        }
    }, [tripImages, error]);

    // fetch reviews
    const {
        data: reviewData,
        error: reviewError,
        isLoading: reviewLoading,
    } = useGetReviewQuery({ code, programyear });
    const reviews = reviewData?.items || [];

    // fetch Supplement
    const {
        data: SupplementData,
        error: SupplementError,
        isLoading: SupplementLoading,
    } = useGetSupplementQuery({ code, programyear });
    const Supplements = SupplementData?.items || [];

    if (SupplementError) return <Typography>Error loading Supplements</Typography>;
    if (SupplementLoading)
        return (
            <Typography>
                <CircularProgress />
            </Typography>
        );

    if (reviewError) return <Typography>Error loading reviews</Typography>;
    if (reviewLoading)
        return (
            <Typography>
                <CircularProgress />
            </Typography>
        );

    if (error) return <Typography>Error loading images</Typography>;
    if (isLoading)
        return (
            <Typography>
                <CircularProgress />
            </Typography>
        );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Product Details Tabs"
                sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'space-between' }, px: 2 }}
            >
                <Tab label="Overview" />
                <Tab label="Supplement" />
                <Tab label="Photo Gallery" />
                <Tab label="Reviews" />
            </Tabs>

            {/* overview */}
            <TabPanel value={value} index={0}>
                <Typography variant="body2">
                    {t(productData?.OverView || 'No overview available')}
                </Typography>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('Additional Info')}
                </Typography>
                <Typography variant="body2">
                    Start Date :{t(productData?.startDate || 'No overview available')}
                </Typography>
                <Typography variant="body2">
                    End Date :{t(productData?.endDate || 'No overview available')}
                </Typography>
                <BookButton code={code} programyear={programyear} />
            </TabPanel>

            {/* supplement */}
            <TabPanel value={value} index={1}>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('The price includes supplement:')}
                </Typography>
                <Stack direction="column" spacing={2}>
                    {Supplements.length > 0 ? (
                        Supplements.map((supplement: Supplement, code: number) => (
                            <SupplementItem
                                key={code}
                                description={supplement['the price includes supplement']}
                            />
                        ))
                    ) : (
                        <Typography variant="body2">{t('No supplements available')}</Typography>
                    )}
                </Stack>
                <Divider sx={{ mt: 8, mb: 2 }} />
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ color: 'primary.main' }}
                >
                    <TaskAltIcon />
                    <Typography variant="subtitle1">{t("All prices don't include VAT")}</Typography>
                </Stack>
                {/* <BookButton id={id} /> */}
            </TabPanel>

            {/* tripImages */}
            <TabPanel value={value} index={2}>
                {isLoading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="body2">{t('Error loading images')}</Typography>
                ) : tripImages.length > 0 ? (
                    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                        {tripImages.map((item: any, index: number) => (
                            <ImageListItem key={index} sx={{ mx: 2 }}>
                                <Image
                                    src={`http://${item.image}`}
                                    alt={item.img_name}
                                    layout="fill"
                                    quality={100}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                ) : (
                    <Typography variant="body2">{t('No images available')}</Typography>
                )}
                {/* <BookButton id={id} /> */}
            </TabPanel>

            {/* reviews */}
            <TabPanel value={value} index={3}>
                <ReviewSection reviews={reviews} />
                {code && programyear ? (
                    <ReviewForm code={code} programyear={programyear} />
                ) : (
                    <Typography variant="body2">Unable to load review form</Typography>
                )}
            </TabPanel>
        </div>
    );
};

// Supplement Item component
const SupplementItem: FunctionComponent<{ description: string }> = ({ description }) => (
    <Stack direction="row" spacing={2} alignItems="center">
        <TaskAltIcon sx={{ color: 'secondary.main' }} />
        <Typography variant="body2">{description}</Typography>
    </Stack>
);

// Review Section component
const ReviewSection: FunctionComponent<{
    reviews: { review: string; rate: number; customer: string }[];
}> = ({ reviews }) => (
    <Stack spacing={2}>
        {reviews.length > 0 ? (
            reviews.map((review, index) => (
                <Stack key={index} direction="row" alignItems="top" spacing={2}>
                    <Avatar variant="square" sx={{ width: 56, height: 56 }} />
                    <Box>
                        <Typography variant="subtitle2">{review.customer}</Typography>
                        <Typography variant="body2">{review.review}</Typography>
                        <Divider sx={{ my: 2 }} />
                    </Box>
                    <UserRating readOnly rating={review.rate} />
                </Stack>
            ))
        ) : (
            <Typography variant="body2">No reviews available</Typography>
        )}
    </Stack>
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default DetailsTabs;
