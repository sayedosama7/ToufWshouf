import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import BackgroundImage from "@/components/ui/BackgroundImage";
import bgSearch from "@/assets/images/search.jpg";
import ReservationItem from "./_components/Reservation";

interface Props {}
const Index: NextPage<Props> = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title> My Reservation </title>
      </Head>
      <BackgroundImage imageSrc={bgSearch}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Typography variant="h1" sx={{ color: "body.light" }}>
            {t("My Shopping list")}
          </Typography>
        </Stack>
      </BackgroundImage>
      <Container maxWidth="lg">
        <Grid container sx={{ mt: 3 }}>
          <Grid
            item
            xs={12}
            container
            justifyContent="start"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Grid item md={2}>
              <Button variant="contained" fullWidth size="large">
                {t("Past")}
              </Button>
            </Grid>
            <Grid item md={2}>
              <Button
                variant="text"
                fullWidth
                size="large"
                sx={{ color: "body.main" }}
              >
                {t("Upcoming")}
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ReservationItem IsUpcoming />
            <ReservationItem />
            <ReservationItem IsUpcoming />
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
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
