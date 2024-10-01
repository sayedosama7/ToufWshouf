import React from "react";
import Slider from "react-slick";

import Sliderbg1 from "@/assets/images/sliderbg1.jpg";
import Sliderbg2 from "@/assets/images/sliderbg2.jpg";
import Sliderbg3 from "@/assets/images/sliderbg3.jpg";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import BackgroundImage from "../../../components/ui/BackgroundImage";

export default function Carousel() {
  const { t } = useTranslation();

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    LazyLoadTypes: "progressively",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function () {
      return <div className="dot"></div>;
    },
    dotsClass: "slick-dots slick-thumb",
  };

  const imagesStyle = {
    height: "79vh",
    width: "100%",
    backgroundPosition: "top",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const ImagesArr = [Sliderbg1, Sliderbg2, Sliderbg3];
  return (
    <Box>
      <Slider {...settings}>
        {ImagesArr.map((image) => (
          <BackgroundImage key={Math.random()} imageSrc={image} height={"79vh"}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="start"
              sx={{
                height: "100%",
                position: "relative",
                zIndex: 5,
                pt: "100px",
                color: "body.light",
              }}
            >
              <Typography variant="h1">
                {t("5 days, 4 nights, Novotel Marsa Alam")}
              </Typography>
              <Container maxWidth="md">
                <Typography variant="body1" sx={{textAlign:"center" ,mt:2}}>
                  {t(
                    "A wonderful tour around Cairo through the open two-story bus to see most of the various landmarks of Cairo and Giza Pyramids of Giza and the Egyptian Museum and lunch through the Nile Crystal cruise."
                  )}
                </Typography>
              </Container>
            </Stack>
          </BackgroundImage>
        ))}
      </Slider>
    </Box>
  );
}
