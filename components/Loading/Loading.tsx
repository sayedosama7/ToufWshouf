import Box from '@mui/material/Box';
import React from 'react';
import { keyframes } from '@mui/system';

const rotateSpinner = keyframes`
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
`;

const Loading = () => {
    const containerSpinner = {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(234, 237, 237, 0.521)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    };

    const spinnerStyle = {
        height: '50px',
        width: '50px',
        borderRadius: '50%',
        border: '4px solid #E07026',
        borderTop: '4px solid #fff',
        animation: `${rotateSpinner} 1s linear infinite`,
    };

    return (
        <Box sx={containerSpinner}>
            <Box sx={spinnerStyle} />
        </Box>
    );
};

export default Loading;
