// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
// import SignpostIcon from '@mui/icons-material/Signpost';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
// import React ,{FunctionComponent} from 'react'      
// import { useTranslation } from 'react-i18next';      
// interface Props {}
// const WatchVideoAndMap :FunctionComponent<Props> = () => {

//     const {t} = useTranslation()      

//   return (
//     <Stack
//     direction="row"
//     justifyContent="start"
//     alignItems="center"
//     spacing={5}
//     sx={{ mb: 3 }}
//   >
//     <Button variant="text" sx={{ padding: 0 }}>
//       <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
//         <FavoriteIcon />
//       </IconButton>
//       <Typography variant="body1" sx={{ color: 'body.main' }}>
//         {t('Add to Wishlist')}
//       </Typography>
//     </Button>
//     <Button variant="text" sx={{ padding: 0 }}>
//       <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
//         <PlayArrowRoundedIcon />
//       </IconButton>
//       <Typography variant="body1" sx={{ color: 'body.main' }}>
//         {t('Watch Video')}
//       </Typography>
//     </Button>
//     <Button variant="text" sx={{ padding: 0 }}>
//       <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
//         <SignpostIcon />
//       </IconButton>
//       <Typography variant="body1" sx={{ color: 'body.main' }}>
//         {t('Map')}
//       </Typography>
//     </Button>
//   </Stack>
// )
// };

// export default WatchVideoAndMap
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SignpostIcon from '@mui/icons-material/Signpost';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}

const WatchVideoAndMap: FunctionComponent<Props> = () => {
    const { t } = useTranslation();

    return (
        <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={5}
            sx={{ mb: 3 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="body1" sx={{ color: 'body.main' }}>
                    {t('Add to Wishlist')}
                </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
                    <PlayArrowRoundedIcon />
                </IconButton>
                <Typography variant="body1" sx={{ color: 'body.main' }}>
                    {t('Watch Video')}
                </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <IconButton color="primary" sx={{ boxShadow: 1, mr: 2 }}>
                    <SignpostIcon />
                </IconButton>
                <Typography variant="body1" sx={{ color: 'body.main' }}>
                    {t('Map')}
                </Typography>
            </div>
        </Stack>
    );
};

export default WatchVideoAndMap;
