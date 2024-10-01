import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import  useCounter  from '@/hooks/useCounter';

interface Props {
  title: string;
  subtitle: string;
}
const Counter: FunctionComponent<Props> = ({ title, subtitle }) => {
  const { t } = useTranslation();
  const { count, increment, decrement } = useCounter(0);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 4, mb: subtitle === '' ? 2.2 : 0 }}
    >
      <Box>
        <Typography variant="subtitle1">{t(title)}</Typography>
        <Typography variant="body2" sx={{ color: 'secondary.main' }}>
          {t(subtitle)}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center">
        <IconButton sx={{ p: 0, mr: '-10px' }} size="large" onClick={increment}>
          <AddCircle sx={{ color: 'secondary.main', fontSize: 32 }} />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ backgroundColor: 'main.counter', px: 2 , width: "60px" , textAlign: 'center' }}
        >
          {count}
        </Typography>
        <IconButton sx={{ p: 0, ml: '-10px' }} size="large" onClick={decrement}>
          <RemoveCircle sx={{ color: 'secondary.main', fontSize: 32 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Counter;
