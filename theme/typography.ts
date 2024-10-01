
import { TypographyOptions } from "@mui/material/styles/createTypography";


  
function pxToRem(value:number) {
    return `${value / 16}rem`;
  }
  
  const typography:TypographyOptions  = {
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    // fontSize: 18,
    h1: {
      fontWeight: 700,
      lineHeight: 80 / 64,
      fontSize: pxToRem(48),
    },
    h2: {
      fontWeight: 600,
      lineHeight: 64 / 48,
      fontSize: pxToRem(30),
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(16),
    },
    subtitle1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      fontWeight: 600,
    },
    subtitle2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
      fontWeight: 600,
    },
    body1: {
      fontSize: pxToRem(16),
    },
    body2: {
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      letterSpacing: 1.1,
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 600,
      lineHeight: 24 / 14,
      letterSpacing:1.25,
      fontSize: pxToRem(14),
      textTransform: "capitalize",
      textDecoration: "none"

    },
  };
  
  export default typography;
  