import { HorizontalRule } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  toggleOpenAndclose: Function;
}
const ContactDailForm: FunctionComponent<Props> = (props) => {
  const { toggleOpenAndclose } = props;

  const { t } = useTranslation();

  return (
    <Box sx={{ color: 'body.light' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderRadius: '5px  5px 0  0',
          backgroundColor: 'secondary.main',
          px: 1.5,
          py: 1,
        }}
      >
        <Typography variant="body2"> {t('Leave  a message')}</Typography>
        <IconButton onClick={()=>toggleOpenAndclose()} sx={{ color: 'body.light' }}>
          <HorizontalRule />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          backgroundColor: 'body.light',
          p: 1.5,
          maxWidth: '250px',
          borderRadius: '0  0 5px  5px',
        }}
        direction="column"
        spacing={2}
      >
        <TextField
          placeholder="Enter your name"
          size="small"
          type="string"
          fullWidth
        />
        <TextField
          placeholder="Enter your Email"
          size="small"
          type="email"
          fullWidth
        />
        <TextField
          placeholder="Enter your Email"
          size="small"
          type="string"
          multiline
          fullWidth
          rows={4}
        />
        <Button type="submit" variant="contained" fullWidth>
          {t('Send')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactDailForm;
