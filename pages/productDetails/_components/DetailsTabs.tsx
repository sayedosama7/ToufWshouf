import { FacebookOutlined, TaskAlt, Twitter } from '@mui/icons-material';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Divider,
  ImageList,
  ImageListItem,
  Avatar,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import G1 from '@/assets/images/products/G1.jpg';
import G2 from '@/assets/images/products/G2.jpg';
import G3 from '@/assets/images/products/G3.jpg';
import G4 from '@/assets/images/products/G4.jpg';
import G5 from '@/assets/images/products/G5.jpg';
import G6 from '@/assets/images/products/G6.jpg';
import ProductRating from '@/components/products/ProductRating';
import BookButton from './BookButton';

const itemData = [G1, G2, G3, G4, G5, G6];

interface Props {
  id: string | number | undefined;
}
const DetailsTabs: FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          '& .MuiTabs-flexContainer': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          },
          px: 2,
        }}
      >
        <Tab label="Overview" />
        <Tab label="Supplement" />
        <Tab label="Photo Gallery" />
        <Tab label="Reviews" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="body2">
          {t(
            'A journey through history starting from the gates of Fatimid Cairo at Bab al-Futuh, passing through our monuments and stories of Egyptian history and heritage From Bab Al-Futuh, through the story of Sidi El-Zouk, passing by Al-Hakim Mosque, Bamir Allah, to the house of Al-Suhaimi ** Prices include: * Entrance tickets * Arab guide * Prices do not include any meals or drinkGs'
          )}
        </Typography>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          {t('Additional Info')}
        </Typography>
        <Typography variant="body2">
          {t(
            'Return Details Returns to original departure point Departure Point 77 Salah Salem, Al Omraneyah Ash Sharqeyah, Giza District, Giza Governorate, Egypt As per requested time our tour guide will be waiting in the lobby of your hotel and he will be holding a sign showing your name on it'
          )}
        </Typography>
        <BookButton id={id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          {t('The price includes supplement:')}
        </Typography>

        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TaskAlt sx={{ color: 'secondary.main' }} />
            <Typography variant="body2">
              {t('12 working hours Hyundai H1 car')}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'secondary.main' }}>
              {t('1290 EGP')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <TaskAlt sx={{ color: 'secondary.main' }} />
            <Typography variant="body2">
              {t('12 working hours Hyundai H1 car')}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'secondary.main' }}>
              {t('1290 EGP')}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ mt: 8, mb: 2 }} />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ color: 'primary.main' }}
        >
          <TaskAlt />
          <Typography variant="subtitle1">
            {t("All prices don't include VAT")}
          </Typography>
        </Stack>
        <BookButton id={id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item, index) => (
            <ImageListItem key={index} sx={{ mx: 2 }}>
              <Image src={item} alt={'Gallery'} layout="fill" quality={100} />
            </ImageListItem>
          ))}
        </ImageList>
        <BookButton id={id} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Stack direction="row" alignItems="top" spacing={2}>
          <Avatar variant="square" sx={{ width: 56, height: 56 }}></Avatar>
          <Box>
            <Typography variant="subtitle2">Ahmed Kamel</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, cum sapientem honestatis ea, verear
              labores feugait sea in, cu j
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
          <ProductRating readOnly rating={4} />
        </Stack>
        <Stack direction="row" alignItems="top" spacing={2}>
          <Avatar variant="square" sx={{ width: 56, height: 56 }}></Avatar>
          <Box>
            <Typography variant="subtitle2">Ahmed Kamel</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, cum sapientem honestatis ea, verear
              labores feugait sea in, cu j
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
          <ProductRating readOnly rating={4} />
        </Stack>
        <Typography variant="body1" sx={{ my: 2 }}>
          Write your review “The Egyptian Gulf”
        </Typography>
        <Typography variant="subtitle1">Reviews</Typography>

        <Box sx={{ my: 3 }}>
          <TextField
            id="outlined-basic"
            placeholder="Write your feedback here.."
            variant="outlined"
            fullWidth
            multiline
            maxRows={5}
            minRows={4}
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2, color: 'body.main' }}
          >
            <Button variant="contained" size="large">
              Submit
            </Button>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">Share via</Typography>
              <IconButton>
                <FacebookOutlined sx={{ color: 'body.main' }} />
              </IconButton>
              <IconButton>
                <Twitter sx={{ color: 'body.main' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </TabPanel>
    </div>
  );
};

export default DetailsTabs;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
