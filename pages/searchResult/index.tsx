import React, { useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import BackgroundImage from '@/components/ui/BackgroundImage';
import bgSearch from '@/assets/images/search.jpg';
import FilterSearch from '@/pages/searchResult/_components/Filter';
// import ProductDisplay from '@/components/products/ProductDisplay';

const Index: NextPage = () => {
    const { t } = useTranslation();
    const [select, setSelect] = useState('Featured');

    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value as string);
    };

    // const productData = [
    //     {
    //         id: 1,
    //         name: 'Trip to the Pyramids',
    //         price: 100,
    //         rating: 4.5,
    //         image: '/path-to-image',
    //         description: 'A wonderful trip to explore the pyramids.',
    //         rate_review: 4.5,
    //         code: 'TRP-001',
    //         programyear: 2024,
    //         programname: 'Historical Adventure',
    //         startprice: 100,
    //         imagepath: '/path-to-image',
    //     },
    // ];

    return (
        <div>
            <Head>
                <title> Search Result </title>
            </Head>
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" sx={{ color: 'body.light' }}>
                        {t('Entertainment Trip')}
                    </Typography>
                </Stack>
            </BackgroundImage>

            <Container maxWidth="lg">
                <Grid container sx={{ mt: 3 }} spacing={4}>
                    <Grid item xs={3}>
                        <FilterSearch />
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h4">{t('Search Result')}</Typography>
                                <Typography variant="h5">{t(' (50 Trip)')}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography variant="body1" sx={{ mr: 0.5 }}>
                                    {t('Sort by:')}
                                </Typography>
                                <FormControl variant="standard">
                                    <Select
                                        id="start"
                                        value={select}
                                        onChange={handleChange}
                                        defaultValue={'Featured'}
                                        sx={{
                                            '&::before': {
                                                borderBottom: 'unset !important',
                                            },
                                        }}
                                    >
                                        <MenuItem value={'Featured'}>{t('Featured')}</MenuItem>
                                        <MenuItem value={2}>1</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>

                        {/* Map over productData to render each ProductDisplay */}
                        {/* {productData.map(product => (
                            <ProductDisplay key={product.id} productData={product} />
                        ))} */}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Index;
