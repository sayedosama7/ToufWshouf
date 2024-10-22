import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import BackgroundImage from '../../../components/ui/BackgroundImage';
import axios from 'axios';

interface SliderItem {
    SliderText: string;
    SLIDESUBTEXT: string;
    SLIDEPATH: string;
}

export default function Carousel() {
    const { t } = useTranslation();
    const [sliderData, setSliderData] = useState<SliderItem[]>([]);

    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Slider`);
                setSliderData(response.data.Slider);
            } catch (error) {
                console.error('Error fetching slider data:', error);
            }
        };

        fetchSliderData();
    }, []);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        customPaging: () => <div className="dot"></div>,
        dotsClass: 'slick-dots slick-thumb',
    };

    return (
        <Box>
            <Slider {...settings}>
                {sliderData.map((slide, index) => (
                    <BackgroundImage
                        key={slide.SLIDEPATH}
                        imageSrc={slide.SLIDEPATH}
                        height={'79vh'}
                        priority={index === 0} 
                    >
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="start"
                            sx={{
                                height: '100%',
                                position: 'relative',
                                zIndex: 5,
                                pt: '100px',
                                color: 'body.light',
                            }}
                        >
                            <Typography variant="h2" sx={{ textAlign: 'center' }}>
                                {t(slide.SliderText)}
                            </Typography>
                            <Container maxWidth="md">
                                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                                    {t(slide.SLIDESUBTEXT)}
                                </Typography>
                            </Container>
                        </Stack>
                    </BackgroundImage>
                ))}
            </Slider>
        </Box>
    );
}
