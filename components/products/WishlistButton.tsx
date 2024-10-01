import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {Box , Checkbox, Grid} from "@mui/material"
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
interface Props {
    id: string;
}
const WishlistButton :FunctionComponent<Props> = ({id}) => {

    const {t} = useTranslation()      

  return (
    <Box
    sx={{
      borderRadius: "50%",
      backgroundColor: "body.light",
      position: "relative",
    }}
  >
    <Checkbox
      icon={<FavoriteBorder color="primary" />}
      checkedIcon={<Favorite />}
    />
  </Box>
)
};

export default WishlistButton
