import React, { useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Button
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import BackgroundImage from "@/components/ui/BackgroundImage";
import bgSearch from "@/assets/images/search.jpg";
import SearchItem from "@/components/products/ProductDisplay";

interface Props {}
const Index: NextPage<Props> = () => {
  const { t } = useTranslation();

  return (
    <div >
      <Head >
        <title> Wishlist </title>
      </Head>
      <BackgroundImage  imageSrc={bgSearch}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Typography variant="h1" sx={{ color: "body.light" }}  >
            {t("My Shopping list")}
          </Typography>
        </Stack>
      </BackgroundImage>
      <Container maxWidth="lg">
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <SearchItem myBooking  />
            <SearchItem myBooking />
          </Grid>
        </Grid>
        <Grid container spacing={4} direction="column">
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">{t("Total")}</Typography>
              <Typography variant="h3">{t("2250 EGP")}</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:3}}
          >
            <Grid item md={3}>
                <Button variant="contained" fullWidth size="large">
                    {t('Next')}
                </Button>
            </Grid>
            <Grid item md={3}>
                <Button variant="outlined" fullWidth size="large">
                    {t('Back')}
                </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
