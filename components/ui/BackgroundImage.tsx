import { Box, Grid } from "@mui/material";
import React, { FunctionComponent } from "react";
import Image from "next/image";

import { useTranslation } from "react-i18next";
interface Props {
  children: React.ReactNode;
  imageSrc: any;
  height?: string;
}
const BackgroundImage: FunctionComponent<Props> = ({
  imageSrc,
  children,
  height,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        zIndex: 200,
        height: height ? height : "390px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          backgroundColor: "body.main",
          opacity: 0.5,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <Image
        src={imageSrc}
        alt="banner"
        style={{ zIndex: 0 }}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={80}
        placeholder="blur"
      />
      <Box sx={{ position: "relative", zIndex: 5 , height:"100%" }}>{children}</Box>
    </Box>
  );
};

export default BackgroundImage;
