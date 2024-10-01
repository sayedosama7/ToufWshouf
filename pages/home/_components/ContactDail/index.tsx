import * as React from 'react';
import {
  Box,
  Fab,
  Collapse,
} from '@mui/material';
import { ChatBubble, HorizontalRule, Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ContactDialForm from "./ContactDailForm"


export default function ContactDial(props: any) {
  const [open, setOpen] = React.useState(false);
  const toggleOpenAndclose = () => setOpen(!open);
  const { t } = useTranslation();

  return (
    <Box sx={{ position: 'fixed', zIndex: 222, bottom: 100, right: 100 }}>
      <SpeedDialItem open={open}>
        <ContactDialForm toggleOpenAndclose={toggleOpenAndclose}/>
      </SpeedDialItem>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={toggleOpenAndclose}
        sx={{ position: 'fixed', right: '100px', bottom: '27px' }}
      >
        {open ? <Close /> : <ChatBubble />}
      </Fab>
    </Box>
  );
}

interface SpeedDialItemPropos {
  window?: () => Window;
  children: React.ReactElement;
  open: boolean;
}

function SpeedDialItem(props: SpeedDialItemPropos) {
  const { children, window, open } = props;

  return (
    <Collapse in={open} orientation="vertical">
      {open ? <>{children}</> : ''}
    </Collapse>
  );
}
