import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { FunctionComponent, ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type dataAcc = {
    title: string;
    des: ReactNode;
};
interface Props {
    data: dataAcc[];
}
const AccordionData: FunctionComponent<Props> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Box>
            {data.slice(0, 3).map(({ title, des }, index) => (
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
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="subtitle1">{t(title)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Trans>{des}</Trans>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default AccordionData;
