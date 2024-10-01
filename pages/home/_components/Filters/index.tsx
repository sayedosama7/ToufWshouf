import { Box, Container, Grow, Tab } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import Outings from './Outings';
import Hotels from './Hotels';
import Transportation from './Transportation';
import Flights from './Flights';
import Packages from './Packages';
import Tickets from './Tickets';
import RestaurantForm from './Restaurant';
import TailoredServices from './TailoredServices';
import {
  AirplaneTicket,
  BeachAccess,
  DirectionsCar,
  Flight,
  LocalOffer,
  LocationCity,
  Restaurant,
  SupportAgent,
} from '@mui/icons-material';
export const FilterTypes = [
  {
    name: 'Outings',
    component: <Outings />,
    icon: <BeachAccess />,
  },
  {
    name: 'Hotels',
    component: <Hotels />,
    icon: <LocationCity />,
  },
  {
    name: 'Transportation',
    component: <Transportation />,
    icon: <DirectionsCar />,
  },
  {
    name: 'Flights',
    component: <Flights />,
    icon: <Flight />,
  },
  {
    name: 'Packages',
    component: <Packages />,
    icon: <LocalOffer />,
  },
  {
    name: 'Tickets',
    component: <Tickets />,
    icon: <AirplaneTicket />,
  },
  {
    name: 'Restaurant',
    component: <RestaurantForm />,
    icon: <Restaurant />,
  },
  {
    name: 'Tailored Services',
    component: <TailoredServices />,
    icon: <SupportAgent />,
  },
];

interface Props {}
const Index: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [filterSelected, setFilterSelected] = React.useState('Outings');

  const changeFilter = (event: React.SyntheticEvent, newValue: string) => {
    setFilterSelected(newValue);
    
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(-100%)',
        zIndex: 100,
        p: 3.4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          backgroundColor: 'body.main',
          opacity: 0.5,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
      />
      <Container maxWidth="lg">
        {/* <NavFilters action={filterSelected} changeFilter={changeFilter} />
         */}
        <Container maxWidth="md">
          <Tabs 
            value={filterSelected}
            onChange={changeFilter}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
              color: 'body.light',
              mb:2
            }}
          >
            {FilterTypes.map((value, index) => (
              <Tab
                icon={value.icon}
                iconPosition="start"
                value={value.name}
                label={value.name}
                key={index}
                sx={{ color: 'body.light', mx: 2.1 }}
              />
            ))}
          </Tabs>
        </Container>

        <Box sx={{ zIndex: 100, position: 'relative' }}>
          {FilterTypes.map(({ name, component }, index) => (
            <Grow in={filterSelected === name} key={index}>
              <div>
                <TabPanel value={filterSelected} index={name}>
                  {component}
                </TabPanel>
              </div>
            </Grow>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Index;

interface TabPanelProps {
  children?: React.ReactElement;
  index: string;
  value: string;
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
      {value === index && <>{children}</>}
    </div>
  );
}
