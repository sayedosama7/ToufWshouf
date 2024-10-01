import { Box, Typography  } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    offerPrice?:number | undefined;
    price:number
}

const Price: FunctionComponent<Props> = ({offerPrice , price}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Box
        sx={{
          backgroundColor: offerPrice ? "secondary.main" : "gray.light",
          borderRadius: "0 0 8px 0",
          px: 1,
          py:offerPrice ? 0.8 : 1.5,
          ml: "0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "main.lightGray",
            textDecoration: offerPrice ? "line-through" : "unset",
          }}
        >
          {offerPrice ? t(`${price} EGP`) : ""}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: offerPrice ? "body.light" : "primary.main" }}
        >
          {offerPrice ? t(`${offerPrice} EGP`) : t(`${price} EGP`)}
        </Typography>
      </Box>
    </div>
  );
};

export default Price;
