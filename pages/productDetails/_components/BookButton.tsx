import { FacebookOutlined, Twitter } from "@mui/icons-material";
import {Typography , Button, IconButton ,Stack} from "@mui/material"
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
import { useRouter } from 'next/router';      
interface Props {
    id: string | number | undefined;
}
const BookButton :FunctionComponent<Props> = ({id}) => {

    const {t} = useTranslation()      
    const router = useRouter()      

  return (
    <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mt: 2, color: 'body.main' }}
  >
    <Button variant="contained" size="large"  onClick={() =>router.push(`/booking/${id}`)} >
      Book Now
    </Button>

    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="body1">Share via</Typography>
      <IconButton>
        <FacebookOutlined sx={{ color: 'body.main' }} />
      </IconButton>
      <IconButton>
        <Twitter sx={{ color: 'body.main' }} />
      </IconButton>
    </Stack>
  </Stack>
)
};

export default BookButton
