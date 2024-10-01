import { Favorite, PlayArrowRounded, Signpost } from "@mui/icons-material";
import { Button, Typography, IconButton, Stack} from "@mui/material"
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
interface Props {}
const WatchVideoAndMap :FunctionComponent<Props> = () => {

    const {t} = useTranslation()      

  return (
    <Stack
    direction="row"
    justifyContent="start"
    alignItems="center"
    spacing={5}
    sx={{ mb: 3 }}
  >
    <Button variant="text" sx={{ padding: 0 }}>
      <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
        <Favorite />
      </IconButton>
      <Typography variant="body1" sx={{ color: 'body.main' }}>
        {t('Add to Wishlist')}
      </Typography>
    </Button>
    <Button variant="text" sx={{ padding: 0 }}>
      <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
        <PlayArrowRounded />
      </IconButton>
      <Typography variant="body1" sx={{ color: 'body.main' }}>
        {t('Watch Video')}
      </Typography>
    </Button>
    <Button variant="text" sx={{ padding: 0 }}>
      <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
        <Signpost />
      </IconButton>
      <Typography variant="body1" sx={{ color: 'body.main' }}>
        {t('Map')}
      </Typography>
    </Button>
  </Stack>
)
};

export default WatchVideoAndMap
