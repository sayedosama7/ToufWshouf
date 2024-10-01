import { Box, Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useStore";
import { toggleLanguage } from "@/store/languageSlice";
import { ClientStorage } from "@/hooks/useLocalStroge";
import Carousel from "@/pages/home/_components/Carousel";
import ContactDial from "@/pages/home/_components/ContactDail";
import Filter from "@/pages/home/_components/Filters";
import BestProducts from "@/components/products/BestProducts";
import BannerAds from "@/components/ui/BannerAds";

import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import Partners from "@/components/ui/Partners";

const banner1Props = {
  image: banner1.src,
  title: "Planning a vacation?",
  des: "Choose your holiday packages. Book online or talk to our holiday experts",
  bookUrl: "travelUrl",
};
const banner2Props = {
  image: banner2.src,
  title: "Royal Promenade",
  des: `Did you wish to spend a day as if you were a king?
  Only on our royal promenade, you can do so by sailing across
the Nile to reach King Farouk's Rest house.
  `,
  bookUrl: "travelUrl",
};

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const language = ClientStorage.get("language");
    dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Head>
        <title> Home </title>
      </Head>
      <ContactDial />
      <Box>
        <Carousel />
        <Filter />
      </Box>
      <Container maxWidth="lg">
        <BestProducts title="Best Selling" />
        <BannerAds {...banner1Props} />
        <BestProducts offers={true} title="Best Offers" />
        <BannerAds {...banner2Props} />
        <Partners />
      </Container>
    </Box>
  );
};

export default Home;
