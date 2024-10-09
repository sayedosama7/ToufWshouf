import React, { FunctionComponent } from 'react';
import Navbar from './Navbar';
import Topbar from './Topbar';
import useIsAuthPage from '@/hooks/auth/useIsAuthPages';

const Index: FunctionComponent = () => {
    const isAuthPage = useIsAuthPage(); 

    return (
        <>
            <Topbar />
            {!isAuthPage && <Navbar />}
        </>
    );
};

export default Index;
