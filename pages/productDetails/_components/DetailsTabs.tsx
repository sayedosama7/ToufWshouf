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
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetImgQuery } from '@/store/Products/FetchImagesApi';
import BookButton from './BookButton';
import { useGetReviewQuery } from '@/store/Products/FetchReviewApi';
import { useGetSupplementQuery } from '@/store/Products/FetchSupplementApi';
import UserRating from '@/components/products/UserRating';
import ReviewForm from '../ReviewForm';
import Loading from '@/components/Loading/Loading';

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
    const [value, setValue] = React.useState(0);

    const code = router.query.code ? parseInt(router.query.code as string, 10) : undefined;
    const programyear = router.query.programyear
        ? parseInt(router.query.programyear as string, 10)
        : undefined;

    // Fetch images
    const {
        data,
        error: imgError,
        isLoading: isLoadingImages,
    } = useGetImgQuery({ code, programyear });
    const tripImages = data?.items || [];

    // Fetch reviews
    const {
        data: reviewData,
        error: reviewError,
        isLoading: reviewLoading,
        refetch,
    } = useGetReviewQuery({ code, programyear });
    const reviews = reviewData?.items || [];

    // Fetch Supplement
    const {
        data: SupplementData,
        error: supplementError,
        isLoading: supplementLoading,
    } = useGetSupplementQuery({ code, programyear });
    const Supplements = SupplementData?.items || [];

    // Error and loading handling
    if (imgError || reviewError || supplementError) {
        return <Typography>Error loading data</Typography>;
    }

    if (isLoadingImages || reviewLoading || supplementLoading) {
        return <Loading />;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
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

            {/* Overview */}
            <TabPanel value={value} index={0}>
                <Typography variant="body2">
                    {t(productData?.OverView || 'No overview available')}
                </Typography>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('Additional Info')}
                </Typography>
                <Typography variant="body2">
                    Start Date: {t(productData?.startDate || 'No start date available')}
                </Typography>
                <Typography variant="body2">
                    End Date: {t(productData?.endDate || 'No end date available')}
                </Typography>
                <BookButton code={code} programyear={programyear} />
            </TabPanel>

            {/* Supplement */}
            <TabPanel value={value} index={1}>
                <Typography variant="subtitle2" sx={{ my: 2 }}>
                    {t('The price includes supplement:')}
                </Typography>
                <Stack direction="column" spacing={2}>
                    {Supplements.length > 0 ? (
                        Supplements.map((supplement: Supplement, index: number) => (
                            <SupplementItem
                                key={index}
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
            </TabPanel>

            {/* Photo Gallery */}
            <TabPanel value={value} index={2}>
                {isLoadingImages ? (
                    <Loading />
                ) : tripImages.length > 0 ? (
                    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                        {tripImages.map((item: any, index: number) => (
                            <ImageListItem key={index} sx={{ mx: 2 }}>
                                <Image
                                    src={`https://${item.image}`}
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
            </TabPanel>

            {/* Reviews */}
            <TabPanel value={value} index={3}>
                {reviewLoading ? (
                    <Typography variant="body2">
                        <Loading />
                    </Typography>
                ) : reviewError ? (
                    <Typography variant="body2" color="error">
                        Failed to load reviews. Please try again.
                    </Typography>
                ) : (
                    <>
                        <ReviewSection reviews={reviews} />
                        {code && programyear ? (
                            <ReviewForm
                                code={code}
                                programyear={programyear}
                                onReviewAdded={() => refetch()}
                            />
                        ) : (
                            <Typography variant="body2">Unable to load review form</Typography>
                        )}
                    </>
                )}
            </TabPanel>
        </Box>
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
