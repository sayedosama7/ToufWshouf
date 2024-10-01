import * as React from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

import PassengerData from './PassengerData';
import Payment from './Payment';
import Success from './Success';

const stepsComponent = ['Passenger data', 'Payment and confirm', 'Success'];
export default function BookingStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsComponent.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography variant="subtitle1">{t(label)}</Typography>{' '}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === 0 ? (
          <PassengerData handleNext={handleNext} />
        ) : activeStep === 1 ? (
          <Payment handleNext={handleNext} handleBack={handleBack} />
        ) : (
          activeStep === 2 && <Success />
        )}
      </>
    </Box>
  );
}
