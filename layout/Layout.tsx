import React from 'react';
import Box from '@mui/material/Box';
import Header from './header';
import Footer from './footer';
import IsAuthPages from '@/hooks/auth/useIsAuthPages';

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {IsAuthPages() ? (
                <>
                    <Box sx={{ height: '42px' }} />

                    <Box>{children}</Box>
                </>
            ) : (
                <>
                    <Box sx={{ height: '149px' }} />
                    <Box>{children}</Box>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Layout;
