import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';

import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

type dataAcc = {
  title: string;
  des: string;
};
interface Props {
  data: dataAcc[];
}
const AccordionData: FunctionComponent<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Box>
      {data.slice(0, 3).map(({ title, des },index) => (
        <Accordion
        key={index}
          TransitionProps={{ unmountOnExit: true }}
          sx={{
            boxShadow: 1,
            mt: 2,
            borderRadius: 2,
            '&:before': {
              content: 'unset',
            },
            '&:first-of-type': {
              borderRadius: 2,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle1">{t(title)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t(des)}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionData;
