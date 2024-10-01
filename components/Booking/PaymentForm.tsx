import MasterCard from '@/assets/images/payment/masterCard.png';
import PayPal from '@/assets/images/payment/payPal.png';
import Visa from '@/assets/images/payment/visa.png';
import { Box, Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import VisaForm from './VisaForm';

interface Props {}
const PaymentForm: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='icon tabs example'
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
            border: '1px solid ',
            borderColor: 'primary.main',
            height: '145px',
            borderRadius: '5px',
            top: 0,
            bottom: 'unset',
          },
          height: '150px',

          my: 5,
        }}
      >
        <Tab
          icon={
            <Image
              src={Visa}
              placeholder='blur'
              layout='intrinsic'
              objectFit='contain'
              alt='visa'
            />
          }
          aria-label='Visa'
          sx={{
            width: '200px',
            boxShadow: 1,
            borderRadius: '5px',
          }}
        />
        <Tab
          icon={
            <Image
              src={MasterCard}
              placeholder='blur'
              layout='intrinsic'
              objectFit='contain'
              alt='mastercard'
            />
          }
          aria-label='phone'
          sx={{ mx: 4, width: '200px', boxShadow: 1, borderRadius: '5px' }}
        />
        <Tab
          icon={
            <Image
              src={PayPal}
              placeholder='blur'
              layout='intrinsic'
              objectFit='contain'
              alt='paypal'
            />
          }
          aria-label='phone'
          sx={{ width: '200px', boxShadow: 1, borderRadius: '5px' }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <VisaForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VisaForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VisaForm />
      </TabPanel>
    </Box>
  );
};

export default PaymentForm;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
