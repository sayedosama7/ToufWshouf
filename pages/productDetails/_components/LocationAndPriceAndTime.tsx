import { AttachMoney, Place, Update } from '@mui/icons-material';
import { Typography, Paper, Stack } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  time: string;
  price: number;
  location: string;
}
const LocationAndPriceAndTime: FunctionComponent<Props> = ({
  time,
  price,
  location,
}) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={1}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={7}
        sx={{ my: 3, p: 4 }}
      >
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
          sx={{ color: 'gray.main' }}
        >
          <Place />
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body1"> {t(' Location: ')} </Typography>
            <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
              {t(location)}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
          sx={{ color: 'gray.main' }}
        >
          <AttachMoney />
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body1"> {t(' Price: ')} </Typography>
            <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
              {t(`${price}`)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
          sx={{ color: 'gray.main' }}
        >
          <Update />
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body1"> {t(' Duration time: ')} </Typography>
            <Typography variant="subtitle1" sx={{ color: 'body.main' }}>
              {t(time)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default LocationAndPriceAndTime;
