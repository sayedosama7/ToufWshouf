import {
  Box,
  Grid,
  useScrollTrigger,
  AppBar,
  Container,
  Stack,
  IconButton,
  Toolbar,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ShoppingBag } from '@mui/icons-material';
import Logo from '@/assets/images/logo_en.webp';
import Link from 'next/link';
import SearchModal from '@/components/ui/SearchModal';

interface Props {
  window?: () => Window;
}
interface PropsComponent {
  window?: () => Window;
  children: React.ReactElement;
}
const Navbar: FunctionComponent<Props> = (props) => {
  const { window } = props;

  const { t } = useTranslation();
  const router = useRouter();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <ElevationScroll {...props}>
      <AppBar
        sx={{
          top: trigger ? 0 : '49px',
          backgroundColor: 'body.light',
          color: 'body.main',
        }}
      >
        <Toolbar>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1 }}
            >
              <Grid item xs={3} sx={{pl:'0px !important'}}>
                <Box  onClick={() => router.push('/')} sx={{cursor:"pointer"}} >
                  <Image src={Logo} alt="logo" priority layout="intrinsic" />
                </Box>
              </Grid>
              <Grid item xs={9} sx={{pl:'0px !important'}}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={6}
                  justifyContent="space-between"
                >
                  <Link href={'/offers'}>{t('Offers')}</Link>
                  <Link href={'/myReservation'}>{t('My Reservations')}</Link>
                  <Link href={''}>{t('Contact Us')}</Link>
                  <Link href={''}>{t('Complaint and Suggestion')}</Link>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    justifyContent="end"
                  >
                    <IconButton
                      sx={{ color: 'body.main' }}
                      onClick={() => router.push('/wishlist')}
                    >
                      <ShoppingBag />
                    </IconButton>
                    <SearchModal />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;

function ElevationScroll(props: PropsComponent) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 1,
    top: trigger ? '0px' : 'top: 49px',
  });
}
