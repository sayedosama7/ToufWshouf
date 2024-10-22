import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React, { FunctionComponent, useEffect, useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import MenuCoin from '@/layout/header/MenuCoin';
import { useAppSelector, useAppDispatch } from '@/hooks/useStore';
import { getLanguage, toggleLanguage } from '@/store/languageSlice';
import { ClientStorage } from '@/hooks/useLocalStroge';
import IsAuthPages from '@/hooks/auth/useIsAuthPages';

const Topbar: FunctionComponent = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const language = useAppSelector(getLanguage);
    const dispatch = useAppDispatch();

    const changeLanguage = () => {
        switch (language) {
            case 'en':
                dispatch(toggleLanguage('ar'));
                ClientStorage.set('language', 'ar');
                break;
            case 'ar':
                dispatch(toggleLanguage('en'));
                ClientStorage.set('language', 'en');
                break;
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('NAME');
        setIsAuthenticated(!!token);
        setUsername(savedUsername);
    }, [router.pathname]);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <HideOnScroll>
            <AppBar
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'body.main',
                    color: 'body.light',
                    boxShadow: 'unset !important',
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ py: 0.5 }}
                    >
                        <Grid item xs={6} sx={{ pl: 'unset !important' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CallIcon />
                                <Typography variant="h3">19341</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1.5}
                                justifyContent="end"
                            >
                                <MenuCoin />
                                <Button
                                    variant="text"
                                    onClick={changeLanguage}
                                    sx={{
                                        fontFamily: 'Cairo , sans-serif',
                                        color: 'body.light',
                                        fontWeight: 500,
                                    }}
                                >
                                    {t('العربيه')}
                                </Button>

                                <Typography variant="body1" sx={{ color: 'body.light' }}>
                                    {username ? `${t('Welcome')}, ${username}` : ''}{' '}
                                </Typography>

                                {isAuthenticated ? (
                                    <Button variant="contained" onClick={handleLogout}>
                                        {t('Logout')}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() => router.push('/login')}
                                    >
                                        {t('Sign in')}
                                    </Button>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
};

export default Topbar;

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        threshold: 0,
        target: window ? window() : undefined,
    });

    return (
        <Zoom appear={false} in={IsAuthPages() ? true : !trigger}>
            {children}
        </Zoom>
    );
}
